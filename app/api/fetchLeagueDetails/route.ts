import { NextResponse } from "next/server";
import { LeagueData } from "../../models/league";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const leagueID = searchParams.get("leagueID");

  if (!leagueID) {
    return NextResponse.json(
      { error: "League ID is required" },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(
      `https://draft.premierleague.com/api/league/${leagueID}/details`,
      {
        next: { revalidate: 60 },
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch league data: ${response.statusText}`);
    }

    const leagueData: LeagueData = await response.json();

    return NextResponse.json(leagueData);
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

export const fetchLeagueData = async (
  leagueID: number,
): Promise<LeagueData> => {
  const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? "https://" + process.env.VERCEL_PROJECT_PRODUCTION_URL
    : "http://localhost:3000";
  const response = await fetch(
    `${baseUrl}/api/fetchLeagueDetails?leagueID=${leagueID}`,
  );
  if (response.ok) return response.json();
  throw new Error("Failed to fetch league data");
};
