import React from "react";
import ScoreBoard from "@/app/components/scoring/scoreboard";
import fetchFplData from "@/app/api/fetchFPLData";

export default async function ScoringPage({
  params,
}: {
  params: { teamIndex: string };
}) {
  const [teamsData] = await Promise.all([fetchFplData()]);
  const teamIndex = parseInt(params.teamIndex, 10);
  const nextTeamIndex = teamIndex === 0 ? 1 : 0;
  return (
    <div className="min-h-screen flex flex-col gap-2">
      <div className="flex justify-center">
        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            <a href={`/scoring/${nextTeamIndex}`}>Check Other Team</a>
          </span>
        </button>
      </div>
      <div className="min-h-screen gap-16 flex justify-evenly">
        {teamsData.map((team, index) => (
          <div
            key={team.teamID}
            className={`${teamIndex === index ? "block" : "hidden lg:block"} w-full max-w-md mx-2`}
          >
            <ScoreBoard teamID={team.teamID} picks={team.picks} />
          </div>
        ))}
      </div>{" "}
    </div>
  );
}
