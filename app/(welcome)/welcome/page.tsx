"use client";

import React, { useState } from "react";

export default function WelcomePage() {
  const [teamInput, setTeamInput] = useState("");
  const [showTutorial, setShowTutorial] = useState(false);
  const [error, setError] = useState("");
  const [teamData, setTeamData] = useState<any | null>(null);

  const fetchLeagueID = async (teamID: number) => {
    try {
      const response = await fetch(`/api/fetchLeagueID?teamId=${teamID}`);
      if (!response.ok) {
        throw new Error("Failed to fetch team data");
      }
      const data = await response.json();
      setError("");
      return data;
    } catch (error) {
      console.error("Error fetching team data:", error);
      setError("Failed to fetch team data. Please try again.");
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const match = teamInput.match(/entry\/(\d+)/);
    const teamID = match ? match[1] : teamInput;

    if (!teamID || isNaN(Number(teamID))) {
      setError("Please enter a valid Team ID or Points Page URL.");
      return;
    }

    document.cookie = `teamID=${teamID}; path=/; max-age=${60 * 60 * 24 * 30}`; // Expires in 30 days

    const data = await fetchLeagueID(Number(teamID));

    if (data) {
      setTeamData(data);
      // router.push(`/scoring/${teamID}`);
    } else {
      setError(
        "Failed to fetch team data. Please check the Team ID and try again.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 flex flex-col items-center justify-center p-6">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Welcome to Draft Fantasy Tracker!
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
          Enter your Team ID or your Points Page URL to get started.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter Team ID or Points Page URL"
            value={teamInput}
            onChange={(e) => setTeamInput(e.target.value)}
            className="w-full px-4 py-2 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <p className="text-sm text-red-500 text-left">{error}</p>}
          <button
            type="submit"
            className="w-full px-6 py-3 text-white bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg shadow-md hover:from-purple-600 hover:to-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            Get in!
          </button>
        </form>

        {teamData && (
          <div className="mt-6 text-left">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Team Information:
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mt-2">
              <strong>Team Name:</strong> {teamData.entry.name}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Overall Points:</strong> {teamData.entry.overall_points}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Event Points:</strong> {teamData.entry.event_points}
            </p>
          </div>
        )}

        <div className="mt-6">
          <button
            onClick={() => setShowTutorial(!showTutorial)}
            className="text-sm text-blue-500 hover:underline"
          >
            How to find your Team ID or URL?
          </button>
          {showTutorial && (
            <div className="mt-4 text-left text-gray-700 dark:text-gray-300">
              <ol className="list-decimal list-inside">
                <li>Log in to your Draft Fantasy Premier League account.</li>
                <li>
                  Go to the <strong>Points</strong> page by clicking on the
                  points tab in the menu.
                </li>
                <li>
                  Copy the URL from your browser's address bar. It will look
                  like this:
                  <code className="block bg-gray-100 dark:bg-gray-700 px-2 py-1 my-2 rounded break-words">
                    https://draft.premierleague.com/entry/123456/event/11
                  </code>
                </li>
                <li>
                  Paste this URL into the input box above, or extract the{" "}
                  <strong>Team ID</strong> (e.g., <strong>123456</strong>) and
                  enter it directly.
                </li>
              </ol>
              <p className="mt-4">
                Need more help? Visit the{" "}
                <a
                  href="https://draft.premierleague.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  official Draft Premier League website
                </a>
                .
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
