import { PlayerPick } from "./playerPick";

export interface FplTeamPicksResponse {
  picks: PlayerPick[];
  entry_history: Record<string, any>;
  subs: any[];
}
