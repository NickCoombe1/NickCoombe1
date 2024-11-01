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
    <div className="min-h-screen gap-16 flex justify-evenly">
      <a
        href={`/scoring/${nextTeamIndex}`}
        className="lg:hidden mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Toggle Scoreboard
      </a>
      {teamsData.map((team, index) => (
        <div
          key={team.teamID}
          className={`${teamIndex === index ? "block" : "hidden lg:block"} w-full max-w-md mx-2`}
        >
          <ScoreBoard teamID={team.teamID} picks={team.picks} />
        </div>
      ))}
    </div>
  );
}
