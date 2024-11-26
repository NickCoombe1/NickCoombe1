import { GET } from "@/app/api/fetchLeagueID/route";
import { createMocks } from "node-mocks-http";
const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? "https://" + process.env.VERCEL_PROJECT_PRODUCTION_URL
  : "http://localhost:3000";

describe("GET /api/fetchLeagueID", () => {
  const validTeamId = "123";

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should return 400 if no teamId is provided", async () => {
    const { req } = createMocks({
      method: "GET",
      url: baseUrl + "/api/fetchLeagueID",
    });

    const response = await GET(req as Request);
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json).toEqual({ error: "Team ID is required" });
  });

  it("should return team data for a valid teamId", async () => {
    const mockTeamResponse = {
      entry: {
        event_points: 10,
        favourite_team: 1,
        id: validTeamId,
        league_set: [1, 2, 3],
        name: "Test Team",
        overall_points: 100,
        player_first_name: "John",
        player_last_name: "Doe",
        region_name: "Test Region",
        region_code_short: "TR",
        region_code_long: "TEST_REGION",
        started_event: 1,
        transactions_event: 2,
        transactions_total: 3,
      },
    };

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockTeamResponse),
    });

    const { req } = createMocks({
      method: "GET",
      url: baseUrl + `/api/fetchLeagueID?teamId=${validTeamId}`,
    });

    const response = await GET(req as Request);
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json).toEqual(mockTeamResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      `https://draft.premierleague.com/api/entry/${validTeamId}/public`,
    );
  });

  it("should return 500 for unknown errors", async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error("Unknown error"));

    const { req } = createMocks({
      method: "GET",
      url: baseUrl + `/api/fetchLeagueID?teamId=${validTeamId}`,
    });

    const response = await GET(req as Request);
    const json = await response.json();

    expect(response.status).toBe(500);
    expect(json).toEqual({ error: "Unknown error" });
  });
});
