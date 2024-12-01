import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightArrowLeft,
  faPersonRunning,
  faAward,
  faRectangleXmark,
  faChevronDown,
  faChevronUp,
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
            <FontAwesomeIcon icon={faArrowRightArrowLeft} title="Autosubbed" />
          )}
          {pick.gameStatus.isInProgress && pick.wasSubbedOn && (
            <FontAwesomeIcon icon={faPersonRunning} title="Subbed On" />
          )}
          {pick.points <= 0 &&
            !pick.isSub &&
            pick.hasPlayed &&
            pick.gameStatus.isFinished && (
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
