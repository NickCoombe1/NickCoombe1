import React from "react";
import { PlayerPick } from "@/app/models/scoring";

type ScoreBoardProps = {
  picks: PlayerPick[];
  teamID: number;
};

const ScoreBoard: React.FC<ScoreBoardProps> = ({ picks, teamID }) => {
  return (
    <div className="p-6 bg-gray-100 dark:bg-blue-300 rounded-lg shadow-lg flex-1">
      <h2 className="text-l font-semibold text-center mb-6">
        Head-to-Head Scoreboard: {teamID}
      </h2>
      <div className="bg-white dark:bg-secondary p-4 rounded-lg shadow-sm">
        {picks.map((pick) => (
          <div
            key={pick.element}
            className="flex justify-between items-center py-2 border-b"
          >
            <span className="font-medium ">
              {pick.name} - {pick.element} - {pick.points}
            </span>
            <span className="text-right font-bold text-lg"></span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScoreBoard;
