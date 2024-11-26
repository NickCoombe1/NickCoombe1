import { PlayerPick } from "@/app/models/playerPick";
import { ElementType } from "@/app/models/playerData";
import { calculateAutoSubs } from "@/app/api/fetchScoringData/route";

const mockTeam: PlayerPick[] = [
  {
    id: 1,
    element: 101,
    position: 1,
    multiplier: 1,
    isSub: false,
    points: 0,
    name: "Goalkeeper",
    hasPlayed: true,
    willBeAutosubbed: false,
    wasSubbedOn: false,
    isInjured: false,
    yellowCarded: false,
    redCarded: false,
    fieldPosition: ElementType.Goalkeeper,
    gameStatus: { isFinished: false, isInProgress: false, currentMinute: null },
  },
  {
    id: 2,
    element: 102,
    position: 2,
    multiplier: 1,
    isSub: false,
    points: 2,
    name: "Defender 1",
    hasPlayed: true,
    willBeAutosubbed: false,
    wasSubbedOn: false,
    isInjured: false,
    yellowCarded: false,
    redCarded: false,
    fieldPosition: ElementType.Defender,
    gameStatus: { isFinished: true, isInProgress: false, currentMinute: null },
  },
  {
    id: 3,
    element: 103,
    position: 3,
    multiplier: 1,
    isSub: false,
    points: 0,
    name: "Defender 2",
    hasPlayed: true,
    willBeAutosubbed: false,
    wasSubbedOn: false,
    isInjured: false,
    yellowCarded: false,
    redCarded: false,
    fieldPosition: ElementType.Defender,
    gameStatus: { isFinished: true, isInProgress: false, currentMinute: null },
  },
  {
    id: 4,
    element: 104,
    position: 3,
    multiplier: 1,
    isSub: false,
    points: 0,
    name: "Defender 3",
    hasPlayed: false,
    willBeAutosubbed: false,
    wasSubbedOn: false,
    isInjured: false,
    yellowCarded: false,
    redCarded: false,
    fieldPosition: ElementType.Defender,
    gameStatus: { isFinished: true, isInProgress: false, currentMinute: null },
  },
  {
    id: 5,
    element: 105,
    position: 12,
    multiplier: 1,
    isSub: true,
    points: 5,
    name: "Midfielder Sub",
    hasPlayed: true,
    willBeAutosubbed: false,
    wasSubbedOn: false,
    isInjured: false,
    yellowCarded: false,
    redCarded: false,
    fieldPosition: ElementType.Midfielder,
    gameStatus: { isFinished: true, isInProgress: false, currentMinute: null },
  },
  {
    id: 6,
    element: 106,
    position: 13,
    multiplier: 1,
    isSub: true,
    points: 6,
    name: "Defender Sub",
    hasPlayed: true,
    willBeAutosubbed: false,
    wasSubbedOn: false,
    isInjured: false,
    yellowCarded: false,
    redCarded: false,
    fieldPosition: ElementType.Defender,
    gameStatus: { isFinished: true, isInProgress: false, currentMinute: null },
  },
];

describe("Defender substitution tests", () => {
  it("Substitutes a Defender when Defenders = 3 and Defender is unavailable", () => {
    const startingTeam: PlayerPick[] = [...mockTeam]; // Clone the mock data

    // Simulate unavailable defender
    startingTeam[2].hasPlayed = false; // Defender 2 hasn't played
    startingTeam[2].isInjured = true; // Defender 2 is injured

    const benchPlayers = startingTeam.filter((pick) => pick.position > 11);

    // Apply substitution logic
    const updatedTeam = calculateAutoSubs(startingTeam, benchPlayers);

    // Validate the results
    const injuredDefender = updatedTeam.find((p) => p.id === 3); // Original Defender 2
    const subDefender = updatedTeam.find((p) => p.id === 5); // Substituted Defender

    // Original injured defender should have been substituted
    expect(injuredDefender?.position).toBeGreaterThan(11); // Moved to bench
    expect(subDefender?.position).toBe(3); // Moved to starting XI

    // Confirm substitution occurred
    expect(injuredDefender?.willBeAutosubbed).toBe(true);
    expect(subDefender?.willBeAutosubbed).toBe(false); // Sub itself is not substituted
  });
});
