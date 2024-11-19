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
