import React, { useState } from "react";
import { PlayerPick } from "@/app/models/playerPick";
import { LeagueEntry } from "@/app/models/league";
import Scoreboard from "@/app/components/scoring/scoreboard";

type MatchUpCardProps = {
  team1: {
    picks: PlayerPick[];
    team: LeagueEntry | undefined;
    totalPoints: number;
  };
  team2: {
    picks: PlayerPick[];
    team: LeagueEntry | undefined;
    totalPoints: number;
  };
};

export default function MatchUpCard({ team1, team2 }: MatchUpCardProps) {
  const [showTeam1, setShowTeam1] = useState(true);

  const handleToggle = () => {
    setShowTeam1(!showTeam1);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md max-w-3xl mx-auto">
      <div className="flex flex-col">
        <div className="flex flex-col justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white ">
            {team1.team?.entry_name || "Team 1"}
          </h2>

          <div className="text-lg font-bold">VS</div>

          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            {team2.team?.entry_name || "Team 2"}
          </h2>
        </div>

        <div className="mb-4 mx-auto">
          <button
            onClick={handleToggle}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition"
          >
            Show {showTeam1 ? team2.team?.entry_name : team1.team?.entry_name}
          </button>
        </div>
      </div>
      {showTeam1 ? (
        <Scoreboard
          picks={team1.picks}
          team={team1.team}
          totalPoints={team1.totalPoints}
        />
      ) : (
        <Scoreboard
          picks={team2.picks}
          team={team2.team}
          totalPoints={team2.totalPoints}
        />
      )}
    </div>
  );
}
