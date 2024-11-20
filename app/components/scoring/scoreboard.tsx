import React from "react";
import { PlayerPick } from "@/app/models/playerPick";
import { HandThumbDownIcon } from "@heroicons/react/20/solid";
import { LeagueEntry } from "@/app/models/league";

type ScoreBoardProps = {
  picks: PlayerPick[];
  team: LeagueEntry;
  totalPoints: number;
};

export default function ScoreBoard({
  picks,
  team,
  totalPoints,
}: ScoreBoardProps) {
  return (
    <div className="p-8 bg-white dark:bg-gray-700 rounded-lg shadow-md max-w-3xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          {team.entry_name}
        </h2>
        <hr className="my-4 border-gray-300 dark:border-gray-600" />
        <p className="text-4xl font-extrabold text-indigo-600">{totalPoints}</p>
      </div>
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-inner p-4">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Player Picks
        </h3>
        <div className="space-y-3">
          {picks
            .sort((a, b) => a.position - b.position)
            .map((pick) => (
              <div
                key={pick.element}
                className="flex justify-between items-center p-3 rounded-md bg-white dark:bg-gray-600 shadow-sm border border-gray-200 dark:border-gray-500"
              >
                <span className="text-sm font-medium text-gray-800 dark:text-gray-100 flex gap-2">
                  {pick.name}{" "}
                  {pick.points <= 0 && !pick.isSub && (
                    <div className="relative group">
                      <HandThumbDownIcon
                        height={20}
                        width={20}
                        className="text-red-500"
                      />
                      <span className="absolute left-1/2 transform -translate-x-1/2 mt-2 text-xs bg-red-500 text-white py-1 px-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                        Certified Bum
                      </span>
                    </div>
                  )}
                </span>
                <span
                  className={`text-sm font-semibold ${
                    pick.points > 0
                      ? "text-green-600"
                      : pick.points === 0
                        ? "text-gray-500"
                        : "text-red-600"
                  }`}
                >
                  {pick.points}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
