import React from "react";
import ScoreBoard from "../components/scoring/scoreboard";
import {
  FplBootstrapResponse,
  FplTeamPicksResponse,
  PlayerDataResponse,
  PlayerPick,
} from "@/app/models/scoring";

async function fetchFplData(): Promise<
  {
    teamID: number;
    picks: PlayerPick[];
  }[]
> {
  const teamIDs = [401955, 406387];
  const gameweek = 9;

  try {
    return await Promise.all(
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
        const bootStrap = await fetch(
          `https://draft.premierleague.com/api/bootstrap-static`,
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch data for team ${teamID}: ${response.statusText}`,
          );
        }

        const teamData: FplTeamPicksResponse = await response.json();
        const scoringData: PlayerDataResponse = await scoringRequest.json();
        const bootStrapData: FplBootstrapResponse = await bootStrap.json();

        const picksWithPoints = mapBootstrapData(
          bootStrapData,
          scoringData,
          teamData,
        );
        console.log(picksWithPoints);
        return {
          teamID,
          picks: picksWithPoints,
        };
      }),
    );
  } catch (error) {
    console.error(error);
    return [];
  }
}

function mapBootstrapData(
  FplBootstrapResponse: FplBootstrapResponse,
  scoringData: PlayerDataResponse,
  teamData: FplTeamPicksResponse,
) {
  return teamData.picks.map((pick) => {
    //find player's points for the week

    const playerData = scoringData.elements[pick.element];
    const basePoints = playerData?.stats.total_points || 0;
    const totalPoints = basePoints * pick.multiplier;
    let playerName;
    //find player's info
    const playerInfo = Object.values(FplBootstrapResponse.elements).find(
      (player) => player.id === pick.element,
    );
    if (playerInfo === undefined) {
      playerName = "Unknown";
    } else {
      playerName = playerInfo.web_name;
    }

    return {
      ...pick,
      points: totalPoints,
      pointDetails: playerData?.explain,
      name: playerName,
    };
  });
}
export default async function Scoring() {
  const teamsData = await fetchFplData();

  return (
    <div className="min-h-screen gap-16 flex justify-evenly">
      {teamsData.map((team) => (
        <ScoreBoard key={team.teamID} teamID={team.teamID} picks={team.picks} />
      ))}
    </div>
  );
}
