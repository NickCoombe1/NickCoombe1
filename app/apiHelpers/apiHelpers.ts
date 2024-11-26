import { GameStatusData } from "@/app/models/game";
import { LeagueData } from "@/app/models/league";
import { ScoringData } from "@/app/api/fetchScoringData/route";
import { Fixtures } from "@/app/models/fplFixtureResponse";

const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? "https://" + process.env.VERCEL_PROJECT_PRODUCTION_URL
  : "http://localhost:3000";

export const fetchGameWeekDetails = async (): Promise<GameStatusData> => {
  const response = await fetch(`${baseUrl}/api/fetchGameWeekDetails`);
  if (response.ok) return response.json();
  throw new Error("Failed to fetch gameweek details");
};

export const fetchLeagueData = async (
  leagueID: number,
): Promise<LeagueData> => {
  const response = await fetch(
    `${baseUrl}/api/fetchLeagueDetails?leagueID=${leagueID}`,
  );
  if (response.ok) return response.json();
  throw new Error("Failed to fetch league data");
};

export const fetchTeamDetails = async (
  teamID: number,
  gameweek: number,
): Promise<ScoringData> => {
  const response = await fetch(
    `${baseUrl}/api/fetchScoringData?teamID=${teamID}&gameweek=${gameweek}`,
  );
  if (response.ok) return response.json();
  throw new Error("Failed to fetch team details");
};

export const fetchGameweekFixtureData = async (
  gameweek: number,
): Promise<Fixtures> => {
  const response = await fetch(
    `${baseUrl}/api/fetchGameWeekFixtures?gameweek=${gameweek}`,
  );
  if (response.ok) return response.json();
  throw new Error("Failed to gameweek data");
};
