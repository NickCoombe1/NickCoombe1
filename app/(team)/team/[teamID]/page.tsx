"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { FplTeamResponse } from "@/app/models/fplTeamResponse";
import { LeagueData } from "@/app/models/league";
import LoadingSpinner from "@/app/components/common/loadingSpinner";

export default function TeamPage() {
  const router = useRouter();
  const params = useParams();
  const { teamID } = params;
  const [teamData, setTeamData] = useState<FplTeamResponse | null>(null);
  const [leagueData, setLeagueData] = useState<LeagueData[] | null>(null);
  const [error, setError] = useState("");

  const fetchLeagueID = async (teamID: number) => {
    try {
      const response = await fetch(`/api/fetchLeagueID?teamId=${teamID}`);
      if (!response.ok) {
        throw new Error("Failed to fetch team data");
      }
      const data = await response.json();
      setError(""); // Clear any previous errors
      return data;
    } catch (error) {
      console.error("Error fetching team data:", error);
      setError("Failed to fetch team data. Please try again.");
      return null;
    }
  };

  useEffect(() => {
    if (!teamID) {
      setError("Team ID is missing.");
      return;
    }

    const fetchData = async () => {
      try {
        const data: FplTeamResponse = await fetchLeagueID(Number(teamID));
        if (data) {
          const leaguePromises = data.entry.league_set.map(async (league) => {
            const response = await fetch(
              `/api/fetchLeagueDetails?leagueID=${league}`,
            );
            if (!response.ok) {
              throw new Error("Failed to fetch league data");
            }
            return await response.json();
          });
          const leagueResponses = await Promise.all(leaguePromises);
          setLeagueData(leagueResponses); // Set all league data
          setTeamData(data); // Set team data
        } else {
          setError("Failed to fetch team data.");
        }
      } catch (error) {
        console.error("Error in fetching data:", error);
        setError("An unexpected error occurred.");
      }
    };

    fetchData();
  }, [teamID]);

  if (error) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] bg-gray-50 dark:bg-secondary flex flex-col items-center justify-center p-6">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Select a League
        </h1>
        <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="text-left bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
              <th className="py-3 px-4">Leagues</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!teamData && !error && (
              <tr>
                <td colSpan={2} className="py-3 px-4 flex justify-center">
                  <LoadingSpinner />
                </td>
              </tr>
            )}
            {leagueData?.map((league, index) => (
              <tr
                key={index}
                className="hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                <td className="py-3 px-4">{league.league.name}</td>
                <td className="py-3 px-4 border-l-2 border-gray-300 dark:border-gray-600 flex flex-wrap justify-center gap-2">
                  <button
                    onClick={() =>
                      router.push(`/scoring/${league.league.id}/${teamID}`)
                    }
                    className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    View Scoring
                  </button>
                  <button
                    onClick={() =>
                      router.push(`/matchup/${league.league.id}/${teamID}`)
                    }
                    className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    View Matchup
                  </button>
                  <button
                    onClick={() => router.push(`/league/${league.league.id}`)}
                    className="px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    League Scoring
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={() => router.push("/")}
          className="mt-6 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          Back to Welcome Page
        </button>
      </div>
    </div>
  );
}
