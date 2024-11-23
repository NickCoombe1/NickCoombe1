export interface PlayerPick {
  element: number;
  position: number;
  is_captain: boolean;
  is_vice_captain: boolean;
  multiplier: number;
  name: string;
  points: number;
  isSub: boolean;
  hasPlayed: boolean;
  willBeAutosubbed: boolean;
}
