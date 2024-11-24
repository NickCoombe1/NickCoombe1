import React from "react";
import { PlayerPick } from "@/app/models/playerPick";
import { LeagueEntry } from "@/app/models/league";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonRunning } from "@fortawesome/free-solid-svg-icons";
import { faAward } from "@fortawesome/free-solid-svg-icons";
import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons";

type ScoreBoardProps = {
  picks: PlayerPick[];
  team: LeagueEntry | undefined;
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
          {team?.entry_name}
        </h2>
        <hr className="my-4 border-gray-300 dark:border-gray-600" />
        <p className="text-4xl font-extrabold text-indigo-600">{totalPoints}</p>
      </div>
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-inner p-4">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Player Picks
        </h3>
        <div className="space-y-3">
          {picks &&
            picks
              .sort((a, b) => a.position - b.position)
              .map((pick) => (
                <div
                  key={pick.element}
                  className="flex justify-between items-center p-3 rounded-md bg-white dark:bg-gray-600 shadow-sm border border-gray-200 dark:border-gray-500"
                >
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-100 flex gap-2">
                    {pick.name}
                    {pick.willBeAutosubbed && <span> (autosub)</span>}
                    {pick.gameStatus.isInProgress && pick.isOnField && (
                      <div className="relative group">
                        <FontAwesomeIcon icon={faPersonRunning} />
                      </div>
                    )}
                    {pick.points <= 0 && !pick.isSub && pick.hasPlayed && (
                      <div className="relative group">
                        <FontAwesomeIcon
                          icon={faAward}
                          className="text-red-500"
                        />
                        <span className="absolute left-1/2 transform -translate-x-1/2 top-full mt-0.5 text-xs bg-red-500 text-white py-1 px-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity shadow-lg whitespace-nowrap">
                          Certified Bum
                        </span>
                      </div>
                    )}
                    {pick.yellowCarded && (
                      <div className="relative group">
                        {pick.yellowCarded && (
                          <FontAwesomeIcon
                            icon={faRectangleXmark}
                            transform={{ rotate: 90 }}
                            className="text-yellow-400"
                          />
                        )}
                      </div>
                    )}
                    {pick.redCarded && (
                      <div className="relative group">
                        {pick.yellowCarded && (
                          <FontAwesomeIcon
                            icon={faRectangleXmark}
                            transform={{ rotate: 90 }}
                            className="text-red-500"
                          />
                        )}
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
