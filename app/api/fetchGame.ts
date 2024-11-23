import { GameStatusData } from "../models/game";

export default async function getGameWeek(): Promise<GameStatusData | null> {
  try {
    const response = await fetch("https://draft.premierleague.com/api/game", {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch game status: ${response.statusText}`);
    }

    const gameData: GameStatusData = await response.json();
    return gameData;
  } catch (error) {
    console.error("Error fetching game status:", error);
    return null;
  }
}
