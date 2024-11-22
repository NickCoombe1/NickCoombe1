"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { FplTeamResponse } from "@/app/models/fplTeamResponse";
import { LeagueResponse } from "@/app/models/league";

export default function TeamPage() {
  const router = useRouter();
  const params = useParams();
  const { teamID } = params;
  const [teamData, setTeamData] = useState<FplTeamResponse | null>(null);
  const [leagueData, setLeagueData] = useState<LeagueResponse[] | null>(null);
  const [error, setError] = useState("");

  const fetchLeagueID = async (teamID: number) => {
    try {
      const response = await fetch(`/api/fetchLeagueID?teamId=${teamID}`);
      if (!response.ok) {
        new Error("Failed to fetch team data");
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

  if (!teamData) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <p className="text-gray-700 dark:text-gray-300">Loading team data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] bg-gray-50 dark:bg-gray-800 flex flex-col items-center justify-center p-6">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Select a League
        </h1>
        <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="text-left bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
              <th className="py-3 px-4">League Name</th>
            </tr>
          </thead>
          <tbody>
            {leagueData?.map((league, index) => (
              <tr
                key={index}
                className="hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
              >
                <td
                  className="py-3 px-4"
                  onClick={() =>
                    router.push(`/scoring/${league.league.id}/${teamID}/0`)
                  }
                >
                  {league.league.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={() => router.push("/")}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Back to Welcome Page
        </button>
      </div>
    </div>
  );
}
