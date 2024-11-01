import React from "react";
import ScoreBoard from "../components/scoring/scoreboard";
import fetchFplData from "@/app/api/fetchFPLData";

export default async function Scoring() {
  const [teamsData] = await Promise.all([fetchFplData()]);
  return (
    <div className="min-h-screen gap-16 flex justify-evenly">
      <button className="lg:hidden mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
        Toggle Scoreboard
      </button>
      {teamsData.map((team) => (
        <ScoreBoard key={team.teamID} teamID={team.teamID} picks={team.picks} />
      ))}
    </div>
  );
}
