import React from "react";
import ScoreBoard from "@/app/components/scoring/scoreboard";
import fetchFplData from "@/app/api/fetchFPL";
import getGameWeek from "@/app/api/fetchGame";
import getLeague from "@/app/api/fetchLeague";
import { LeagueEntry, Match } from "@/app/models/league";

export default async function ScoringPage({
  params,
}: {
  params: { teamIndex: string };
}) {
  const leagueID = 90342;

  //move this to user input
  const teamID = 401955;

  const gameweekInfo = await getGameWeek();
  const leagueInfo = await getLeague(leagueID);

  const currentGameweek = gameweekInfo?.current_event;

  var currentGameweekMatchup: Match | undefined;
  var teamEntry: LeagueEntry | undefined;
  var teamsData;
  var teamIDs: number[] = [];

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
      let team1ID = leagueInfo?.league_entries.find(
        (team) => team.id == currentGameweekMatchup?.league_entry_1,
      )?.entry_id;
      if (team1ID) {
        teamIDs.push(team1ID);
      }
      let team2ID = leagueInfo?.league_entries.find(
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
  teams.push(
    leagueInfo?.league_entries.find((team) => team.entry_id === teamIDs[0])!,
  );
  teams.push(
    leagueInfo?.league_entries.find((team) => team.entry_id === teamIDs[1])!,
  );

  return (
    <div className="min-h-screen flex flex-col gap-2">
      <div className="flex justify-center lg:hidden">
        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            <a href={`/scoring/${nextTeamIndex}`}>Check Other Team</a>
          </span>
        </button>
      </div>
      <div className=" mb-4">Gameweek {gameweekInfo?.current_event}</div>
      <div className="min-h-screen gap-16 flex justify-evenly">
        {teamsData &&
          teamsData.map((team, index) => (
            <div
              key={team.teamID}
              className={`${teamIndex === index ? "block" : "hidden lg:block"} w-full max-w-md mx-2`}
            >
              <ScoreBoard picks={team.picks} team={teams[index]} />
            </div>
          ))}
      </div>{" "}
    </div>
  );
}
