"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

export default function TeamPage() {
  const router = useRouter();
  const params = useParams();
  const { teamID } = params; // Extract teamID from the URL
  const [teamData, setTeamData] = useState<any | null>(null);
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
        const data = await fetchLeagueID(Number(teamID));
        if (data) {
          setTeamData(data);
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
          Team Information
        </h1>
        <p className="text-gray-700 dark:text-gray-300">
          <strong>Team Name:</strong> {teamData?.entry?.name}
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          <strong>Overall Points:</strong> {teamData?.entry?.overall_points}
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          <strong>Event Points:</strong> {teamData?.entry?.event_points}
        </p>
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
