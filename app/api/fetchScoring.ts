import { PlayerData } from "../models/playerData";

type PlayerElements = Record<string, PlayerData>;

export interface PlayerDataResponse {
  elements: PlayerElements;
}

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
