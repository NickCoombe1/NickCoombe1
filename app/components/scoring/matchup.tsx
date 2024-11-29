import React, { useState } from "react";
import { PlayerPick } from "@/app/models/playerPick";
import { LeagueEntry } from "@/app/models/league";
import Scoreboard from "@/app/components/scoring/scoreboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExchangeAlt,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";

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
  const [isScoreboardVisible, setIsScoreboardVisible] = useState(false);

  const handleToggleTeam = () => {
    setShowTeam1(!showTeam1);
  };

  const handleToggleScoreboard = () => {
    setIsScoreboardVisible(!isScoreboardVisible);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white p-2">
          {`${team1.team?.entry_name} VS ${team2.team?.entry_name}`}
        </h2>
        <button
          onClick={handleToggleTeam}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition"
          aria-label="Switch Teams"
        >
          <FontAwesomeIcon icon={faExchangeAlt} />
          <span>Switch</span>
        </button>
      </div>
      <div className="text-center mb-5">
        <p className="text-4xl font-semibold text-indigo-600">
          {`${team1.totalPoints} vs ${team2.totalPoints}`}
        </p>
      </div>
      <div>
        <button
          onClick={handleToggleScoreboard}
          className="flex items-center gap-2 text-sm font-medium text-gray-800 dark:text-white hover:underline mb-4"
          aria-label="Toggle Scoreboard"
        >
          <span>
            {isScoreboardVisible ? "Hide Scoreboard" : "Show Scoreboard"}
          </span>
          <FontAwesomeIcon
            icon={isScoreboardVisible ? faChevronUp : faChevronDown}
          />
        </button>
        {isScoreboardVisible &&
          (showTeam1 ? (
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
          ))}
      </div>
    </div>
  );
}
