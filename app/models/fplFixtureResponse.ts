export interface Stat {
  element: number;
  value: number;
}

export interface StatCategory {
  s: string; // Stat name, e.g., "goals_scored"
  h: Stat[]; // Home team stats
  a: Stat[]; // Away team stats
}

export interface Fixture {
  id: number;
  started: boolean;
  stats: StatCategory[]; // List of stats categories
  code: number;
  finished: boolean;
  finished_provisional: boolean;
  kickoff_time: string; // ISO timestamp
  minutes: number;
  provisional_start_time: boolean;
  team_a_score: number | null; // Away team score
  team_h_score: number | null; // Home team score
  pulse_id: number;
  event: number; // Gameweek or event ID
  team_a: number; // Away team ID
  team_h: number; // Home team ID
}

export type Fixtures = Fixture[];
