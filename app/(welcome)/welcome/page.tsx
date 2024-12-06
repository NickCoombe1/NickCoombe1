"use client";

import React, { useState } from "react";

import TitleDesktop from "@/app/components/svgs/titleDesktop";
import ScoreboardDesktop from "@/app/components/svgs/scoreboardDesktop";
import TitleMobile from "@/app/components/svgs/titleMobile";
import ScoreboardMobile from "@/app/components/svgs/scoreboardMobile";
import StyledButton from "@/app/components/common/styledButton";
import { useRouter } from "next/navigation";
import { useTheme } from "@/app/hooks/getTheme";
import About from "@/app/components/svgs/about";
import { Modal, useDialog } from "@/app/components/common/modal";
export default function WelcomePage() {
  const router = useRouter();
  const { theme } = useTheme();
  const [teamInput, setTeamInput] = useState("");
  const [error, setError] = useState("");
  const { isOpen, openDialog, closeDialog } = useDialog();
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
      <div className="w-full max-w-4xl h-80 md:h-[461.43px] flex-col justify-start items-center gap-24 md:gap-30 inline-flex ">
        <div className="self-stretch flex-col justify-start items-center md:gap-20 gap-12 flex ">
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
              <div className="text-center text-light-90 dark:text-dark-90 text-sm font-medium leading-normal font-roobert tracking-tight md:leading-3 inline-block">
                Enter your Team ID or your Points Page URL to get started{" "}
                <span
                  className="inline-block align-middle pb-1 md:pb-0.5 pl-0.5"
                  onClick={openDialog}
                >
                  <About mode={theme} height={16} width={16} />
                </span>
              </div>
            </div>
            <div className="self-stretch px-8 py-5 bg-black/5 dark:bg-black/20 rounded-lg  shadow-custom-light justify-center items-center gap-2.5 inline-flex">
              <input
                type="text"
                placeholder="Team ID or Points Page URL"
                onChange={(e) => setTeamInput(e.target.value)}
                className="w-full text-center text-light-60 dark:text-dark-60 text-base font-normal font-roobert leading-normal tracking-tight bg-transparent  border-0 focus:ring-0 focus:outline-none"
              />
            </div>{" "}
            {error && (
              <p className="text-sm text-light-red dark:text-dark-red text-left">
                {error}
              </p>
            )}
            <div>
              <StyledButton label={"GET IN"} type={"submit"} />
            </div>
          </div>{" "}
        </form>
      </div>
      <Modal isOpen={isOpen} closeDialog={closeDialog} />
    </div>
  );
}
