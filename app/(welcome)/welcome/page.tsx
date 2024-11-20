"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { cookies } from "next/headers";

export default function WelcomePage() {
  const [leagueID, setLeagueID] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!leagueID || isNaN(Number(leagueID))) {
      setError("Please enter a valid League ID.");
      return;
    }

    // Store leagueID in cookies
    document.cookie = `leagueID=${leagueID}; path=/; max-age=${60 * 60 * 24 * 30}`; // Expires in 30 days

    // Redirect or confirm
    router.push(`/scoring/${leagueID}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-6">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Welcome to Fantasy Premier League Tracker!
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
          Enter your league ID to get started.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter League ID"
            value={leagueID}
            onChange={(e) => setLeagueID(e.target.value)}
            className="w-full px-4 py-2 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <p className="text-sm text-red-500 text-left">{error}</p>}
          <button
            type="submit"
            className="w-full px-6 py-3 text-white bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg shadow-md hover:from-purple-600 hover:to-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            Save and Continue
          </button>
        </form>
      </div>
    </div>
  );
}
