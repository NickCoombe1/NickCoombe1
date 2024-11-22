import React from "react";
import ScoreBoard from "@/app/components/scoring/scoreboard";
import fetchFplData from "@/app/api/fetchFPL";
import getGameWeek from "@/app/api/fetchGame";
import { LeagueEntry, Match } from "@/app/models/league";
import { LeagueResponse } from "@/app/models/league";

export default async function ScoringPage({
  params,
}: {
  params: { leagueID: number; teamID: number; teamIndex: string };
}) {
  const leagueID = params.leagueID;
  const teamID = params.teamID;

  const gameweekInfo = await getGameWeek();
  const leagueInfo: LeagueResponse = await fetchLeagueData(leagueID);

  const currentGameweek = gameweekInfo?.current_event;

  let currentGameweekMatchup: Match | undefined;
  let teamEntry: LeagueEntry | undefined;
  let teamsData;
  const teamIDs: number[] = [];

  if (currentGameweek) {
    teamEntry = leagueInfo?.league_entries.find(
      (team) => team.entry_id == teamID,
    );

    currentGameweekMatchup = leagueInfo?.matches.find(
      (match) =>
        match.event == currentGameweek &&
        (match.league_entry_1 == teamEntry?.id ||
          match.league_entry_2 == teamEntry?.id),
    );

    if (currentGameweekMatchup) {
      const team1ID = leagueInfo?.league_entries.find(
        (team) => team.id == currentGameweekMatchup?.league_entry_1,
      )?.entry_id;
      if (team1ID) {
        teamIDs.push(team1ID);
      }
      const team2ID = leagueInfo?.league_entries.find(
        (team) => team.id == currentGameweekMatchup?.league_entry_2,
      )?.entry_id;

      if (team2ID) {
        teamIDs.push(team2ID);
      }
    }

    teamsData = await fetchFplData(currentGameweek, teamIDs);
  }

  const teamIndex = parseInt(params.teamIndex, 10);
  const nextTeamIndex = teamIndex === 0 ? 1 : 0;
  const teams: LeagueEntry[] = [];
  const team1 = leagueInfo?.league_entries.find(
    (team) => team.entry_id === teamIDs[0],
  );
  const team2 = leagueInfo?.league_entries.find(
    (team) => team.entry_id === teamIDs[1],
  );

  if (team1) {
    teams.push(team1);
  }
  if (team2) {
    teams.push(team2);
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 flex flex-col gap-6 p-4">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold">Gameweek {currentGameweek}</h1>
        <a
          href={`/scoring/${leagueID}/${teamID}/${nextTeamIndex}`}
          className="inline-block px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg shadow-md hover:from-purple-600 hover:to-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          View Other Team
        </a>
      </div>
      <div className="flex flex-col lg:flex-row justify-center gap-8">
        {teamsData &&
          teamsData.map((team, index) => (
            <div
              key={team.teamID}
              className={`${
                nextTeamIndex === index ? "block" : "hidden lg:block"
              } w-full max-w-md`}
            >
              <ScoreBoard
                picks={team.picks}
                team={teams[index]}
                totalPoints={team.totalPoints}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

const fetchLeagueData = async (leagueID: number) => {
  const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? "https://" + process.env.VERCEL_PROJECT_PRODUCTION_URL
    : "http://localhost:3000";
  const response = await fetch(
    baseUrl + `/api/fetchLeagueDetails?leagueID=${leagueID}`,
  );
  if (response.ok) {
    return response.json();
  }
  throw new Error("Failed to fetch league data");
};
