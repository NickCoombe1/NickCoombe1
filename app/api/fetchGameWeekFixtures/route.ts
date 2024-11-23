import { NextResponse } from "next/server";
import { Fixtures } from "@/app/models/fplFixtureResponse";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const gameweek = searchParams.get("gameweek");

  if (!gameweek) {
    return NextResponse.json(
      { error: "gameweek is required" },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(
      `https://draft.premierleague.com/api/event/${gameweek}/fixtures`,
    );

    if (!response.ok) {
      new Error("Failed to fetch data from FPL API");
    }

    const data: Fixtures = await response.json();

    return NextResponse.json(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message || "An error occurred" },
        { status: 500 },
      );
    } else {
      return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
  }
}
