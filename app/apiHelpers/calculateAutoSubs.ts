import { PlayerPick } from "@/app/models/playerPick";
import { ElementType } from "@/app/models/playerData";

export function calculateAutoSubs(team: PlayerPick[]): PlayerPick[] {
  const MinimumFormationRequirements = {
    [ElementType.Goalkeeper]: 1,
    [ElementType.Defender]: 3,
    [ElementType.Midfielder]: 3,
    [ElementType.Forward]: 1,
  };
  const MaximumFormationRequirements = {
    [ElementType.Goalkeeper]: 1,
  };

  const isFormationValid = (updatedTeam: PlayerPick[]): boolean => {
    for (const [position, minRequired] of Object.entries(
      MinimumFormationRequirements,
    )) {
      const count = getFieldPlayersByType(
        Number(position) as ElementType,
        updatedTeam,
      ).length;
      if (count < minRequired) return false;
    }
    for (const [position, maxRequired] of Object.entries(
      MaximumFormationRequirements,
    )) {
      const count = getFieldPlayersByType(
        Number(position) as ElementType,
        updatedTeam,
      ).length;
      if (count > maxRequired) return false;
    }
    return true;
  };

  const getFieldPlayersByType = (type: ElementType, players: PlayerPick[]) =>
    players.filter(
      (player) => player.fieldPosition === type && player.position < 12,
    );
  const benchPlayers = team.filter((pick) => pick.position > 11);
  team.forEach((pick) => {
    if (
      (pick.gameStatus.isFinished && !pick.hasPlayed && !pick.isSub) ||
      (pick.isInjured && pick.position < 12)
    ) {
      const eligibleSubs = benchPlayers.filter((benchPick) => {
        return (
          benchPick.position >= 12 && // Ensure the player is on the bench
          benchPick.hasPlayed &&
          !benchPick.isInjured
        );
      });
      const replacement = eligibleSubs.find((sub) => {
        // Check if this substitution is valid by simulating the change
        const originalTeam = JSON.parse(JSON.stringify(team)); // Clone team for validation
        const subIndex = team.findIndex((p) => p.element === sub.element);
        const pickIndex = team.findIndex((p) => p.element === pick.element);
        // Perform the substitution in the cloned team
        if (subIndex !== -1 && pickIndex !== -1) {
          originalTeam[subIndex].position = team[pickIndex].position;
          originalTeam[pickIndex].position = team[subIndex].position;

          // Check if the updated team meets formation requirements
          if (isFormationValid(originalTeam)) {
            return true;
          }
        }

        return false; // Reject substitution if it invalidates the formation
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
          team[replacementIndex].isSub = false;
          team[replacementIndex].willBeAutosubbed = true;
        }

        pick.isSub = true;
        pick.willBeAutosubbed = true; // Set to true as substitution is happening
      } else {
        pick.willBeAutosubbed = false; // No valid replacement found
      }
    }
  });
  return team;
}
