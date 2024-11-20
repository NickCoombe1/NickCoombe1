import React from "react";
import { PlayerPick } from "@/app/models/playerPick";
import { HandThumbDownIcon } from "@heroicons/react/20/solid";
import { LeagueEntry } from "@/app/models/league";

type ScoreBoardProps = {
  picks: PlayerPick[];
  team: LeagueEntry;
  totalPoints: number;
};

export default async function ScoreBoard({
  picks,
  team,
  totalPoints,
}: ScoreBoardProps) {
  return (
    <div className="p-6 bg-gray-100 dark:bg-blue-300 rounded-lg shadow-lg flex-1">
      <h2 className="font-bold text-center mb-7 flex-col">
        <div className="text-xl">{team.entry_name}</div>
        <hr className="w-50 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-secondary bg-primary"></hr>
        <div className="text-5xl">{totalPoints}</div>
      </h2>
      <div className="bg-white dark:bg-secondary px-4 py-2 rounded-lg shadow-sm">
        {picks
          .sort((a, b) => a.position - b.position)
          .map((pick) => (
            <div
              key={pick.element}
              className="flex items-center py-2 [&:not(:last-child)]:border-b justify-center gap-4"
            >
              <span className="font-medium ">{pick.name}</span>
              <span className="font-medium ">{pick.points}</span>
              <div className="relative group inline-block">
                {pick.points <= 0 && !pick.isSub ? (
                  <div className="flex items-center">
                    <HandThumbDownIcon
                      height={20}
                      width={20}
                      className="text-red-500"
                    />
                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max rounded-md dark:bg-white dark:text-secondary bg-secondary text-primary text-sm px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Certified Bum Indicator
                    </span>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
