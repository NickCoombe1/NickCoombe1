import { ElementType, PlayerStats, StatExplanation } from "./playerData";

export interface PlayerPick {
  id: number;
  element: number;
  position: number;
  multiplier: number;
  isSub: boolean;
  points: number;
  pointDetails?: [[StatExplanation][]];
  stats?: PlayerStats;
  name: string;
  hasPlayed: boolean;
  willBeAutosubbed: boolean;
  isInjured: boolean;
  wasSubbedOn: boolean;
  yellowCarded: boolean;
  redCarded: boolean;
  fieldPosition: ElementType;
  gameStatus: {
    isFinished: boolean;
    isInProgress: boolean;
    currentMinute: number | null;
  };
}
