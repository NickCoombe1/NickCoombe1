import { NextResponse } from "next/server";
import {
  fetchBootstrapData,
  FplBootstrapResponse,
} from "@/app/api/fetchBootStrap";
import { fetchScoringData, PlayerDataResponse } from "../../api/fetchScoring";
import { fetchTeamData } from "../../api/fetchTeam";
import { PlayerPick } from "../../models/playerPick";
import { FplTeamPicksResponse } from "../../models/fplTeamPicksResponse";

export interface ScoringData {
  totalPoints: number;
  picks: PlayerPick[];
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const teamID = searchParams.get("teamID");
  const gameweek = searchParams.get("gameweek");

  if (!teamID || !gameweek) {
    return NextResponse.json(
      { error: "Both teamID and gameweek are required" },
      { status: 400 },
    );
  }

  try {
    const teamIDNumber = parseInt(teamID, 10);
    const gameweekNumber = parseInt(gameweek, 10);

    const [bootstrapData, scoringData] = await Promise.all([
      fetchBootstrapData(),
      fetchScoringData(gameweekNumber),
    ]);

    const teamData = await processTeamData(
      teamIDNumber,
      gameweekNumber,
      bootstrapData,
      scoringData,
    );

    return NextResponse.json(teamData);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message || "An error occurred" },
        { status: 500 },
      );
    } else {
      return NextResponse.json(
        { error: "An unexpected error occurred" },
        { status: 500 },
      );
    }
  }
}

async function processTeamData(
  teamID: number,
  gameweek: number,
  bootstrapData: FplBootstrapResponse,
  scoringData: PlayerDataResponse,
): Promise<ScoringData> {
  const teamData = await fetchTeamData(teamID, gameweek);
  const picks = mapBootstrapData(bootstrapData, scoringData, teamData);
  const totalPoints = picks.reduce(
    (acc, pick) => acc + (pick.isSub ? 0 : pick.points),
    0,
  );
  return { picks, totalPoints };
}

function mapBootstrapData(
  bootstrapData: FplBootstrapResponse,
  scoringData: PlayerDataResponse,
  teamData: FplTeamPicksResponse,
): PlayerPick[] {
  return teamData.picks.map((pick) => {
    const playerData = scoringData.elements[pick.element];
    const basePoints = playerData?.stats.total_points || 0;
    const totalPoints = basePoints * pick.multiplier;
    const isSub = pick.position > 11;
    const playerInfo = Object.values(bootstrapData.elements).find(
      (player) => player.id === pick.element,
    );
    const playerName = playerInfo?.web_name || "Unknown";

    return {
      ...pick,
      points: totalPoints,
      pointDetails: playerData?.explain,
      name: playerName,
      isSub,
    };
  });
}

export const fetchTeamDetails = async (
  teamID: number,
  gameweek: number,
): Promise<ScoringData> => {
  const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? "https://" + process.env.VERCEL_PROJECT_PRODUCTION_URL
    : "http://localhost:3000";
  const response = await fetch(
    `${baseUrl}/api/fetchScoringData?teamID=${teamID}&gameweek=${gameweek}`,
  );
  if (response.ok) return response.json();
  throw new Error("Failed to fetch team details");
};
