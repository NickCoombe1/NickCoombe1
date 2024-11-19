import { PlayerDataResponse } from "@/app/models/scoring";

export async function fetchScoringData(
  gameweek: number,
): Promise<PlayerDataResponse> {
  const url = `https://draft.premierleague.com/api/event/${gameweek}/live`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch scoring data for gameweek ${gameweek}: ${response.statusText}`,
    );
  }

  return response.json();
}
