import React from "react";
import ScoreBoard from "../components/scoring/scoreboard";
import {
  FplTeamPicksResponse,
  PlayerDataResponse,
  PlayerExplain,
  PlayerPick,
} from "@/app/models/scoring";

async function fetchFplData(): Promise<
  {
    teamID: number;
    picks: (PlayerPick & { points: number; pointDetails?: PlayerExplain })[];
  }[]
> {
  const teamIDs = [401955, 406387];
  const gameweek = 9;

  try {
    const results = await Promise.all(
      teamIDs.map(async (teamID) => {
        const scoringRequest = await fetch(
          `https://draft.premierleague.com/api/event/${gameweek}/live`,
        );
        const response = await fetch(
          `https://draft.premierleague.com/api/entry/${teamID}/event/${gameweek}`,
          {
            next: { revalidate: 60 },
          },
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch data for team ${teamID}: ${response.statusText}`,
          );
        }

        const data: FplTeamPicksResponse = await response.json();
        const scoringData: PlayerDataResponse = await scoringRequest.json();

        const picksWithPoints = data.picks.map((pick) => {
          const playerData = scoringData.elements[pick.element.toString()];
          const basePoints = playerData?.stats.total_points || 0;
          const totalPoints = basePoints * pick.multiplier;

          return {
            ...pick,
            points: totalPoints,
            pointDetails: playerData?.explain,
          };
        });

        return {
          teamID,
          picks: picksWithPoints,
        };
      }),
    );

    return results;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function Scoring() {
  const teamsData = await fetchFplData();
  return (
    <div className="  min-h-screen gap-16 flex">
      {teamsData.map((team) => (
        <ScoreBoard key={team.teamID} teamID={team.teamID} picks={team.picks} />
      ))}
    </div>
  );
}
