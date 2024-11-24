import { NextResponse } from "next/server";
import {
  fetchBootstrapData,
  FplBootstrapResponse,
} from "@/app/api/fetchBootStrap";
import { fetchScoringData, PlayerDataResponse } from "../../api/fetchScoring";
import { fetchTeamData } from "../../api/fetchTeam";
import { PlayerPick } from "../../models/playerPick";
import { FplTeamPicksResponse } from "../../models/fplTeamPicksResponse";
import { fetchGameweekFixtureData } from "@/app/apiHelpers/apiHelpers";
import { Fixtures } from "@/app/models/fplFixtureResponse";

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
  const gameweekFixtureData = await fetchGameweekFixtureData(gameweek);
  const picks = mapBootstrapData(
    bootstrapData,
    scoringData,
    teamData,
    gameweekFixtureData,
  );
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
  gameweekFixtureData: Fixtures,
): PlayerPick[] {
  const benchPlayers = teamData.picks.filter((pick) => pick.position > 11);

  return teamData.picks.map((pick) => {
    const playerData = scoringData.elements[pick.element];
    const basePoints = playerData?.stats.total_points || 0;
    const totalPoints = basePoints * pick.multiplier;
    const isSub = pick.position > 11;
    const playerInfo = Object.values(bootstrapData.elements).find(
      (player) => player.id === pick.element,
    );
    const playerName = playerInfo?.web_name || "Unknown";
    const isInjured = playerInfo?.chance_of_playing_this_round == 0;

    const gameStatus = getGameStatus(pick.element, gameweekFixtureData);

    const hasPlayed = (playerData?.stats.minutes || 0) > 0;

    const wasSubbedOn =
      gameStatus.isInProgress && playerData?.stats.minutes > 0;
    const isOnField =
      wasSubbedOn &&
      playerData?.stats.minutes < (gameStatus?.currentMinute || 0);

    let willBeAutosubbed = false;

    if ((gameStatus.isFinished && !hasPlayed && !isSub) || isInjured) {
      const eligibleSubs = benchPlayers.filter((benchPick) => {
        const benchPlayerData = scoringData.elements[benchPick.element];
        return (
          benchPick.position <= 12 && // Ensure the player is on the bench
          (benchPlayerData?.stats.minutes || 0) > 0 // Bench player has played
        );
      });
      willBeAutosubbed = eligibleSubs.length > 0;
    }

    return {
      ...pick,
      points: totalPoints,
      pointDetails: playerData?.explain,
      name: playerName,
      isSub,
      hasPlayed,
      willBeAutosubbed,
      isInjured,
      isOnField,
      gameStatus,
    };
  });
}

function getGameStatus(
  playerId: number,
  gameweekFixtureData: Fixtures,
): {
  isFinished: boolean;
  isInProgress: boolean;
  currentMinute: number | null;
} {
  for (const match of gameweekFixtureData) {
    if (match.team_a === playerId || match.team_h === playerId) {
      const isFinished = match.finished;
      const isInProgress = match.started && !match.finished;
      const currentMinute = isInProgress ? match.minutes : null;

      return {
        isFinished,
        isInProgress,
        currentMinute,
      };
    }
  }
  return {
    isFinished: false,
    isInProgress: false,
    currentMinute: null,
  };
}
