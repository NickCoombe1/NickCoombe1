export interface PlayerPick {
  element: number;
  position: number;
  is_captain: boolean;
  is_vice_captain: boolean;
  multiplier: number;
}

export interface PlayerData {
  explain: PlayerExplain;
  stats: PlayerStats;
}

export interface PlayerDataResponse {
  elements: Record<string, PlayerData>;
}

export interface FplTeamPicksResponse {
  picks: PlayerPick[];
  entry_history: Record<string, any>;
  subs: any[];
}

interface StatExplanation {
  name: string;
  points: number;
  value: number;
  stat: string;
}

export interface PlayerExplain {
  explain: [StatExplanation[], number][];
}

interface PlayerStats {
  minutes: number;
  goals_scored: number;
  assists: number;
  clean_sheets: number;
  goals_conceded: number;
  own_goals: number;
  penalties_saved: number;
  penalties_missed: number;
  yellow_cards: number;
  red_cards: number;
  saves: number;
  bonus: number;
  bps: number;
  influence: number;
  creativity: number;
  threat: number;
  ict_index: number;
  starts: number;
  expected_goals: number;
  expected_assists: number;
  expected_goal_involvements: number;
  expected_goals_conceded: number;
  total_points: number;
  in_dreamteam: boolean;
}
