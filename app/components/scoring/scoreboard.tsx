import React from "react";
import { PlayerPick } from "@/app/models/playerPick";
import { LeagueEntry } from "@/app/models/league";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPersonRunning,
  faAward,
  faRectangleXmark,
  faArrowRightArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

type ScoreBoardProps = {
  picks: PlayerPick[];
  team: LeagueEntry | undefined;
  totalPoints: number;
};

export default function Scoreboard({
  picks,
  team,
  totalPoints,
}: ScoreBoardProps) {
  return (
    <>
      {/* Team Name and Points */}
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white truncate">
          {team?.entry_name}
        </h2>
        <p className="text-3xl font-extrabold text-indigo-600 mt-1">
          {totalPoints}
        </p>
      </div>

      {/* Player Picks */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-inner p-3">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Player Picks
        </h3>
        <div className="space-y-2">
          {picks &&
            picks
              .sort((a, b) => a.position - b.position)
              .map((pick) => (
                <div
                  key={pick.element}
                  className="flex justify-between items-center p-2 rounded-md bg-white dark:bg-gray-600 shadow-sm border border-gray-200 dark:border-gray-500 text-sm"
                >
                  {/* Player Info */}
                  <span className="text-gray-800 dark:text-gray-100 flex gap-1 items-center">
                    {pick.name}
                    {pick.willBeAutosubbed && (
                      <FontAwesomeIcon
                        icon={faArrowRightArrowLeft}
                        title="Autosubbed"
                      />
                    )}
                    {pick.gameStatus.isInProgress && pick.wasSubbedOn && (
                      <FontAwesomeIcon
                        icon={faPersonRunning}
                        title="Subbed On"
                      />
                    )}
                    {pick.points <= 0 && !pick.isSub && pick.hasPlayed && (
                      <FontAwesomeIcon
                        icon={faAward}
                        className="text-red-500"
                        title="Certified Bum"
                      />
                    )}
                    {pick.yellowCarded && (
                      <FontAwesomeIcon
                        icon={faRectangleXmark}
                        className="text-yellow-400"
                        title="Yellow Card"
                        transform={{ rotate: 90 }}
                      />
                    )}
                    {pick.redCarded && (
                      <FontAwesomeIcon
                        icon={faRectangleXmark}
                        className="text-red-500"
                        title="Red Card"
                        transform={{ rotate: 90 }}
                      />
                    )}
                  </span>

                  {/* Player Points */}
                  <span
                    className={`font-semibold ${
                      pick.hasPlayed
                        ? pick.points > 0
                          ? "text-green-600"
                          : "text-red-600"
                        : "text-gray-500"
                    }`}
                  >
                    {pick.points}
                  </span>
                </div>
              ))}
        </div>
      </div>
    </>
  );
}
