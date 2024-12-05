"use client";

import React, { useState } from "react";

import TitleDesktop from "@/app/components/svgs/titleDesktop";
import ScoreboardDesktop from "@/app/components/svgs/scoreboardDesktop";
import TitleMobile from "@/app/components/svgs/titleMobile";
import ScoreboardMobile from "@/app/components/svgs/scoreboardMobile";
import StyledButton from "@/app/components/common/styledButton";
import { useRouter } from "next/navigation";
import { useTheme } from "@/app/hooks/getTheme";
export default function WelcomePage() {
  const router = useRouter();
  const { theme } = useTheme();
  const [teamInput, setTeamInput] = useState("");
  const [showTutorial, setShowTutorial] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const match = teamInput.match(/entry\/(\d+)/);
    const teamID = match ? match[1] : teamInput;

    if (!teamID || isNaN(Number(teamID))) {
      setError("Please enter a valid Team ID or Points Page URL.");
      return;
    }

    document.cookie = `teamID=${teamID}; path=/; max-age=${60 * 60 * 24 * 30}`; // Expires in 30 days
    router.push(`/team/${teamID}`);
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-4xl h-80 md:h-[461.43px] flex-col justify-start items-center gap-40 md:gap-30 inline-flex">
        <div className="self-stretch flex-col justify-start items-center md:gap-20 gap-12 flex">
          <div className="self-stretch text-center text-light-80 dark:text-dark-80 md:text-sm font-medium font-roobertMono uppercase md:leading-3 md:tracking-wide text-xs leading-[10.80px] tracking-tight">
            WELCOME TO THE
          </div>
          <div className="mx-auto h-[63.71px] relative md:hidden">
            <div className="h-[39.16px] mx-auto">
              {" "}
              <TitleMobile mode={theme} />
            </div>
            <div className="h-[28.91px] left-[65px] top-[30.80px] absolute">
              <div className="w-[129.28px] h-[17.04px] left-[12.61px] top-[2px] absolute">
                {" "}
                <ScoreboardMobile />
              </div>
            </div>
            <div className="left-[315.15px] top-[28.17px] absolute text-center text-[#030303] text-xl font-normal font-['Hexaframe CF'] leading-[17.98px]">
              ©
            </div>
          </div>
          <div className="mx-auto h-[134.43px] relative hidden md:block">
            <div className="mx-auto h-[82.64px]">
              {" "}
              <TitleDesktop mode={theme} />
            </div>
            <div className="w-[338px] h-[61px] left-[165px] top-[70.43px] absolute">
              <div className="w-[272.79px] h-[35.95px] absolute">
                {" "}
                <ScoreboardDesktop />
              </div>
            </div>
            <div className="left-[665px] top-[59.43px] absolute text-center text-light-80 dark:text-dark-80 text-[42.16px] font-normal font-['Hexaframe CF'] leading-[37.94px]">
              ©
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="h-[113px] flex-col justify-start items-center gap-8 flex">
            <div className="justify-start items-start gap-1 inline-flex">
              <div className="text-center text-light-90 dark:text-dark-90 text-sm font-medium leading-normal font-roobert tracking-tight md:leading-3">
                Enter your Team ID or your Points Page URL to get started
              </div>
              <div className="w-3.5 h-3.5 relative">
                <div className="w-[10.50px] h-[10.50px] left-[1.75px] top-[1.75px] absolute"></div>
              </div>
            </div>
            <div className="self-stretch px-8 py-5 bg-black/5 dark:bg-black/20 rounded-lg shadow justify-center items-center gap-2.5 inline-flex">
              <input
                type="text"
                placeholder="Team ID or Points Page URL"
                onChange={(e) => setTeamInput(e.target.value)}
                className="w-full text-center text-light-60 dark:text-dark-60 text-base font-normal font-roobert leading-normal tracking-tight bg-transparent dark:bg-black/20 border-0 focus:ring-0 focus:outline-none"
              />
            </div>
            <div>
              <StyledButton label={"GET IN"} type={"submit"} />
            </div>
          </div>{" "}
        </form>
      </div>
    </div>
  );
}

/*
<div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Welcome to the Draft Fantasy Scoreboard!
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
      </div> */
