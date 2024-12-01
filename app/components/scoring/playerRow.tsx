import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightArrowLeft,
  faPersonRunning,
  faAward,
  faRectangleXmark,
  faChevronDown,
  faChevronUp,
  faRunning,
} from "@fortawesome/free-solid-svg-icons";
import { PlayerPick } from "@/app/models/playerPick";

type PlayerPickCardProps = {
  pick: PlayerPick;
};

const PlayerPickCard: React.FC<PlayerPickCardProps> = ({ pick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDetails = () => setIsExpanded(!isExpanded);
  return (
    <div className="border border-gray-200 dark:border-gray-500 rounded-md mb-2 bg-white dark:bg-gray-600 shadow-sm">
      <div
        onClick={toggleDetails}
        className="flex justify-between items-center p-2 cursor-pointer text-sm"
      >
        <span className="text-gray-800 dark:text-gray-100 flex gap-1 items-center">
          {pick.name}
          {pick.willBeAutosubbed && (
            <div className="relative group">
              <FontAwesomeIcon icon={faArrowRightArrowLeft} />
              <span className="absolute left-1/2 transform -translate-x-1/2 top-full mt-0.5 text-xs dark:bg-white dark:text-black bg-gray-600 text-white py-1 px-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity shadow-lg whitespace-nowrap">
                Autosubbed
              </span>
            </div>
          )}
          {pick.gameStatus.isInProgress && pick.wasSubbedOn && (
            <div className="relative group">
              <FontAwesomeIcon icon={faRunning} />
              <span className="absolute left-1/2 transform -translate-x-1/2 top-full mt-0.5 text-xs dark:bg-white dark:text-black bg-gray-600 text-white py-1 px-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity shadow-lg whitespace-nowrap">
                On the Pitch
              </span>
            </div>
          )}
          {pick.points <= 0 &&
            !pick.isSub &&
            pick.hasPlayed &&
            pick.gameStatus.isFinished && (
              <div className="relative group">
                <FontAwesomeIcon icon={faAward} className="text-red-500" />
                <span className="absolute left-1/2 transform -translate-x-1/2 top-full mt-0.5 text-xs bg-red-500 text-white py-1 px-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity shadow-lg whitespace-nowrap">
                  Certified Bum
                </span>
              </div>
            )}
          {pick.yellowCarded && (
            <div className="relative group">
              <FontAwesomeIcon
                icon={faRectangleXmark}
                transform={{ rotate: 90 }}
                className="text-yellow-400"
              />
              <span className="absolute left-1/2 transform -translate-x-1/2 top-full mt-0.5 text-xs bg-yellow-400 text-white py-1 px-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity shadow-lg whitespace-nowrap">
                Yellow Card
              </span>
            </div>
          )}
          {pick.redCarded && (
            <div className="relative group">
              <FontAwesomeIcon
                icon={faRectangleXmark}
                transform={{ rotate: 90 }}
                className="text-red-500"
              />
              <span className="absolute left-1/2 transform -translate-x-1/2 top-full mt-0.5 text-xs bg-red-500 text-white py-1 px-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity shadow-lg whitespace-nowrap">
                Red Card
              </span>
            </div>
          )}
        </span>
        <div className="flex items-center gap-2">
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
          <FontAwesomeIcon
            icon={isExpanded ? faChevronUp : faChevronDown}
            className="text-gray-400"
          />
        </div>
      </div>
      {isExpanded && (
        <div className="p-3">
          <table className="table-auto w-full text-sm border-collapse">
            <thead>
              <tr className="text-left border-b dark:border-gray-500">
                <th className="pb-2">Stat</th>
                <th className="pb-2">Value</th>
                <th className="pb-2">Points</th>
              </tr>
            </thead>
            <tbody>
              {pick &&
                pick.pointDetails &&
                pick?.pointDetails[0][0]?.map((detail) => (
                  <tr
                    key={detail.stat}
                    className="border-b dark:border-gray-500"
                  >
                    <td className="py-1">{detail.name}</td>
                    <td className="py-1">{detail.value}</td>
                    <td className="py-1">{detail.points}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PlayerPickCard;
