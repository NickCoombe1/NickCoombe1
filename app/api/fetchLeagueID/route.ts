import { NextResponse } from "next/server";
import { FplTeamResponse } from "../../models/fplTeamResponse";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const teamId = searchParams.get("teamId");

  if (!teamId) {
    return NextResponse.json({ error: "Team ID is required" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://draft.premierleague.com/api/entry/${teamId}/public`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data from FPL API");
    }

    const data: FplTeamResponse = await response.json();

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
