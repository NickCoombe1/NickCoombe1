import { fetchBootstrapData, FplBootstrapResponse } from "./fetchBootStrap";
import { fetchScoringData, PlayerDataResponse } from "./fetchScoring";
import { fetchTeamData } from "./fetchTeam";
import { PlayerPick } from "../models/playerPick";
import { FplTeamPicksResponse } from "../models/fplTeamPicksResponse";
interface TeamPicks {
  teamID: number;
  picks: PlayerPick[];
}

export default async function fetchFplData(
  gameweek: number,
): Promise<TeamPicks[]> {
  const teamIDs = [401955, 406387];

  try {
    const [bootstrapData, scoringData] = await Promise.all([
      fetchBootstrapData(),
      fetchScoringData(gameweek),
    ]);

    const teamDataPromises = teamIDs.map((teamID) =>
      processTeamData(teamID, gameweek, bootstrapData, scoringData),
    );
    return await Promise.all(teamDataPromises);
  } catch (error) {
    console.error("Error fetching FPL data:", error);
    return [];
  }
}

async function processTeamData(
  teamID: number,
  gameweek: number,
  bootstrapData: FplBootstrapResponse,
  scoringData: PlayerDataResponse,
): Promise<TeamPicks> {
  const teamData = await fetchTeamData(teamID, gameweek);
  const picks = mapBootstrapData(bootstrapData, scoringData, teamData);

  return { teamID, picks };
}

function mapBootstrapData(
  bootstrapData: FplBootstrapResponse,
  scoringData: PlayerDataResponse,
  teamData: FplTeamPicksResponse,
): PlayerPick[] {
  return teamData.picks.map((pick) => {
    const playerData = scoringData.elements[pick.element];
    const basePoints = playerData?.stats.total_points || 0;
    const totalPoints = basePoints * pick.multiplier;

    const playerInfo = Object.values(bootstrapData.elements).find(
      (player) => player.id === pick.element,
    );
    const playerName = playerInfo?.web_name || "Unknown";

    return {
      ...pick,
      points: totalPoints,
      pointDetails: playerData?.explain,
      name: playerName,
    };
  });
}
