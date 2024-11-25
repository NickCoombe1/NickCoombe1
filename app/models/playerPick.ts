import { ElementType } from "./playerData";

export interface PlayerPick {
  id: number;
  element: number;
  position: number;
  multiplier: number;
  isSub: boolean;
  points: number;
  pointDetails?: any;
  name: string;
  hasPlayed: boolean;
  willBeAutosubbed: boolean;
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
