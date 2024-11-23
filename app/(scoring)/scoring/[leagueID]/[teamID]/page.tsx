"use client";

import React, { useEffect, useState } from "react";
import ScoreBoard from "@/app/components/scoring/scoreboard";
import { LeagueData } from "@/app/models/league";
import { GameStatusData } from "@/app/models/game";
import {
  fetchTeamDetails,
  ScoringData,
} from "@/app/api/fetchScoringData/route";
import LoadingSpinner from "@/app/components/common/loadingSpinner";
import { fetchLeagueData } from "@/app/api/fetchLeagueDetails/route";
import { fetchGameWeekDetails } from "@/app/api/fetchGameWeekDetails/route";

export default function ScoringPage({
  params,
}: {
  params: { leagueID: string; teamID: string };
}) {
  const leagueID = Number(params.leagueID);
  const teamID = Number(params.teamID);
  const [gameweekInfo, setGameweekInfo] = useState<GameStatusData | null>(null);
  const [leagueData, setLeagueData] = useState<LeagueData | null>(null);
  const [teamScoringData, setTeamScoringData] = useState<ScoringData | null>(
    null,
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const gameweekResponse = await fetchGameWeekDetails();
        const leagueResponse = await fetchLeagueData(leagueID);

        if (!gameweekResponse || !leagueResponse) {
          new Error("Failed to load gameweek or league data");
          return;
        }

        setGameweekInfo(gameweekResponse);
        setLeagueData(leagueResponse);

        const currentGameweek = gameweekResponse.current_event;
        if (!currentGameweek) return;

        if (currentGameweek) {
          const teamResponse = await fetchTeamDetails(teamID, currentGameweek);
          if (teamResponse) setTeamScoringData(teamResponse);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [leagueID, teamID]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 flex flex-col gap-6 p-4">
      {teamScoringData && (
        <>
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-3xl font-bold">
              Gameweek {gameweekInfo?.current_event}
            </h1>
          </div>
          <div className="flex flex-col lg:flex-row justify-center gap-8">
            <div className="w-full max-w-md">
              <ScoreBoard
                picks={teamScoringData.picks}
                team={leagueData?.league_entries.find(
                  (team) => team.entry_id == teamID,
                )}
                totalPoints={teamScoringData.totalPoints}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
