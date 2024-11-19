import { FplBootstrapResponse } from "@/app/models/scoring";

export async function fetchBootstrapData(): Promise<FplBootstrapResponse> {
  const url = "https://draft.premierleague.com/api/bootstrap-static";

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch bootstrap data: ${response.statusText}`);
  }

  return response.json();
}
