import { LeagueResponse } from "../models/league";

export default async function getLeague(
  leagueID: number,
): Promise<LeagueResponse | null> {
  try {
    const response = await fetch(
      `https://draft.premierleague.com/api/league/${leagueID}/details`,
      {
        next: { revalidate: 60 },
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch game status: ${response.statusText}`);
    }

    const gameData: LeagueResponse = await response.json();
    return gameData;
  } catch (error) {
    console.error("Error fetching game status:", error);
    return null;
  }
}
