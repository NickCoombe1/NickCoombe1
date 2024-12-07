"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { FplTeamResponse } from "@/app/models/fplTeamResponse";
import { LeagueData } from "@/app/models/league";
import StyledButton from "@/app/components/common/styledButton";
import LoadingSpinner from "@/app/components/common/loadingSpinner";
import { Button } from "@headlessui/react";

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
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6">
      <div className="w-full md:h-[330px] flex-col justify-start items-center gap-10 inline-flex mt-auto">
        <div className="self-stretch text-center text-light-80 dark:text-dark-80 text-sm font-medium font-roobertMono uppercase leading-3 tracking-wide">
          SELECT A LEAGUE
        </div>
        <div className="w-1/2 h-[277px] flex-col justify-start items-center gap-2 flex">
          {!teamData && !error && <LoadingSpinner />}
          {leagueData?.map((league, index) => (
            <Button
              key={index}
              className="self-stretch px-10 py-8 bg-black/20 rounded-2xl shadow-custom-light justify-center items-center inline-flex"
              onClick={() =>
                router.push(`/scoring/${league.league.id}/${teamID}`)
              }
            >
              <div className="text-center text-light-90 dark:text-dark-90 text-[26px] font-semibold font-roobert leading-normal">
                {league.league.name}
              </div>
            </Button>
          ))}
        </div>
      </div>
      <div className="mt-auto">
        <StyledButton
          label={"BACK TO HOMEPAGE"}
          type={"submit"}
          onClick={() => router.push("/")}
        />
      </div>
    </div>
  );
}
