import React from 'react';
import ScoreBoard from '../components/scoring/scoreboard';
import { FplTeamPicksResponse, PlayerPick } from '@/app/models/scoring';

async function fetchFplData(): Promise<{ teamID: number; picks: PlayerPick[] }[]> {
  const teamIDs = [401955, 406387];
  const gameweek = 1; 

  try {
      const results = await Promise.all(
          teamIDs.map(async (teamID) => {
              const response = await fetch(`https://draft.premierleague.com/api/entry/${teamID}/event/${gameweek}`, {
                  next: { revalidate: 60 }, // Optional: cache data for 60 seconds
              });

              if (!response.ok) {
                  throw new Error(`Failed to fetch data for team ${teamID}: ${response.statusText}`);
              }

              const data: FplTeamPicksResponse = await response.json();
              return { teamID, picks: data.picks };
          })
      );

      return results;
  } catch (error) {
      console.error(error);
      return [];
  }
}


export default async function Scoring() {
  const teamsData = await fetchFplData();
  return (
      <div className="  min-h-screen gap-16 flex">
          {teamsData.map((team) => (
              <ScoreBoard key={team.teamID} teamID={team.teamID} picks={team.picks} />
          ))}
      </div>
  );
}
