import { PlayerPick } from "@/app/models/playerPick";
import { ElementType } from "@/app/models/playerData";

export function calculateAutoSubs(
  team: PlayerPick[],
  benchPlayers: PlayerPick[],
): PlayerPick[] {
  team.forEach((pick) => {
    if (
      (pick.gameStatus.isFinished && !pick.hasPlayed && !pick.isSub) ||
      (pick.isInjured && pick.position < 12)
    ) {
      const eligibleSubs = benchPlayers.filter((benchPick) => {
        return (
          benchPick.position >= 12 && // Ensure the player is on the bench
          benchPick.hasPlayed
        );
      });
      const replacement = eligibleSubs.find((sub) => {
        const subType = sub?.fieldPosition;
        if (
          subType === ElementType.Goalkeeper &&
          pick.fieldPosition === ElementType.Goalkeeper
        ) {
          return true;
        } else if (
          subType === ElementType.Goalkeeper &&
          pick.fieldPosition !== ElementType.Goalkeeper
        ) {
          return false;
        }
        return true;
      });

      if (replacement) {
        // Swap the positions of the pick and replacement player
        const replacementIndex = team.findIndex(
          (p) => p.element === replacement.element,
        );
        const pickIndex = team.findIndex((p) => p.element === pick.element);
        if (replacementIndex !== -1 && pickIndex !== -1) {
          // Swap their positions
          const tempPosition = team[pickIndex].position;
          team[pickIndex].position = team[replacementIndex].position;
          team[replacementIndex].position = tempPosition;

          team[replacementIndex].willBeAutosubbed = true;
        }

        pick.willBeAutosubbed = true; // Set to true as substitution is happening
      } else {
        pick.willBeAutosubbed = false; // No valid replacement found
      }
    }
  });
  return team;
}
