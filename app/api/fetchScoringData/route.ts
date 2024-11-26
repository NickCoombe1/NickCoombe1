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
import { ElementType } from "@/app/models/playerData";

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

    const [bootstrapData, scoringData, teamData, gameweekFixtureData] =
      await Promise.all([
        fetchBootstrapData(),
        fetchScoringData(gameweekNumber),
        fetchTeamData(teamIDNumber, gameweekNumber),
        fetchGameweekFixtureData(gameweekNumber),
      ]);
    const processedTeamData = await processTeamData(
      bootstrapData,
      scoringData,
      teamData,
      gameweekFixtureData,
    );

    return NextResponse.json(processedTeamData);
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
  bootstrapData: FplBootstrapResponse,
  scoringData: PlayerDataResponse,
  teamData: FplTeamPicksResponse,
  gameweekFixtureData: Fixtures,
): Promise<ScoringData> {
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
  const benchPlayers = teamData.picks.filter((pick) => pick.position > 11);
  const sortedTeam = calculateAutoSubs(picks, benchPlayers);
  return { picks: sortedTeam, totalPoints };
}

function mapBootstrapData(
  bootstrapData: FplBootstrapResponse,
  scoringData: PlayerDataResponse,
  teamData: FplTeamPicksResponse,
  gameweekFixtureData: Fixtures,
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
    const isInjured = playerInfo?.chance_of_playing_this_round == 0;

    const gameStatus = getGameStatus(playerInfo?.team, gameweekFixtureData);

    const hasPlayed = (playerData?.stats.minutes || 0) > 0;
    const fieldPosition = playerInfo?.element_type
      ? playerInfo?.element_type
      : 1;
    const wasSubbedOn =
      gameStatus.isInProgress && playerData?.stats.minutes > 0;
    return {
      ...pick,
      points: totalPoints,
      pointDetails: playerData?.explain,
      name: playerName,
      isSub,
      hasPlayed,
      isInjured,
      wasSubbedOn,
      gameStatus,
      yellowCarded: playerData.stats.yellow_cards > 0,
      redCarded: playerData.stats.red_cards > 0,
      fieldPosition: fieldPosition,
    };
  });
}

export function calculateAutoSubs(
  team: PlayerPick[],
  benchPlayers: PlayerPick[],
): PlayerPick[] {
  team.forEach((pick) => {
    if (
      (pick.gameStatus.isFinished && !pick.hasPlayed && !pick.isSub) ||
      (pick.isInjured && pick.position < 12)
    ) {
      const eligibleSubs = benchPlayers.filter((benchPick) => {
        return (
          benchPick.position >= 12 && // Ensure the player is on the bench
          benchPick.hasPlayed
        );
      });
      const replacement = eligibleSubs.find((sub) => {
        const subType = sub?.fieldPosition;
        if (
          subType === ElementType.Goalkeeper &&
          pick.fieldPosition === ElementType.Goalkeeper
        ) {
          return true;
        } else if (
          subType === ElementType.Goalkeeper &&
          pick.fieldPosition !== ElementType.Goalkeeper
        ) {
          return false;
        }
        return true;
      });

      if (replacement) {
        // Swap the positions of the pick and replacement player
        const replacementIndex = team.findIndex(
          (p) => p.element === replacement.element,
        );
        const pickIndex = team.findIndex((p) => p.element === pick.element);
        if (replacementIndex !== -1 && pickIndex !== -1) {
          // Swap their positions
          const tempPosition = team[pickIndex].position;
          team[pickIndex].position = team[replacementIndex].position;
          team[replacementIndex].position = tempPosition;
        }

        pick.willBeAutosubbed = true; // Set to true as substitution is happening
      } else {
        pick.willBeAutosubbed = false; // No valid replacement found
      }
    }
  });
  return team;
}

function getGameStatus(
  teamID: number | undefined,
  gameweekFixtureData: Fixtures,
): {
  isFinished: boolean;
  isInProgress: boolean;
  currentMinute: number | null;
} {
  if (teamID) {
    for (const match of gameweekFixtureData) {
      if (match.team_a === teamID || match.team_h === teamID) {
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
  }
  return {
    isFinished: false,
    isInProgress: false,
    currentMinute: null,
  };
}
