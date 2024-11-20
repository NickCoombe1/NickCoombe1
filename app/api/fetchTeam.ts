import { FplTeamPicksResponse } from "@/app/models/fplTeamPicksResponse";

export async function fetchTeamData(
  teamID: number,
  gameweek: number,
): Promise<FplTeamPicksResponse> {
  const url = `https://draft.premierleague.com/api/entry/${teamID}/event/${gameweek}`;

  const response = await fetch(url, { next: { revalidate: 60 } });
  if (!response.ok) {
    throw new Error(
      `Failed to fetch team data for team ${teamID}: ${response.statusText}`,
    );
  }

  return response.json();
}
