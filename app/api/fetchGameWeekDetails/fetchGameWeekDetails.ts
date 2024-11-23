import { NextResponse } from "next/server";
import { GameStatusResponse } from "@/app/models/game";

export async function GET() {
  try {
    const response = await fetch("https://draft.premierleague.com/api/game", {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch game status: ${response.statusText}`);
    }

    const gameData: GameStatusResponse = await response.json();
    return NextResponse.json(gameData);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message || "An error occurred" },
        { status: 500 },
      );
    } else {
      return NextResponse.json(
        { error: "An unexpected error occurred" },
        { status: 500 },
      );
    }
  }
}
