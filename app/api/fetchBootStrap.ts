import { ElementType } from "../models/playerData";
export interface FplBootstrapResponse {
  element_stats: [];
  element_types: [];
  elements: PlayerBootstrapElements;
  events: [];
  fixtures: [];
  settings: [];
  teams: [];
}

export interface PlayerBootstrapData {
  web_name: string;
  id: number;
  chance_of_playing_next_round: number;
  chance_of_playing_this_round: number;
  element_type: ElementType;
}

type PlayerBootstrapElements = Record<string, PlayerBootstrapData>;

export async function fetchBootstrapData(): Promise<FplBootstrapResponse> {
  const url = "https://draft.premierleague.com/api/bootstrap-static";

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch bootstrap data: ${response.statusText}`);
  }

  return response.json();
}
