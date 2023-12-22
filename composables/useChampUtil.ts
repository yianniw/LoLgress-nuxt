export const useChampUtil = () => {

  const sortChamps = (champs: Champion[], sortMethod: string, sortOrder: string) => {
    const sortString = sortMethod + "-" + sortOrder;

    switch(sortString) {
      case "chest-ascending": champs.sort((a: Champion, b: Champion) => Number(a.chestGranted) - Number(b.chestGranted)); break;
      case "chest-descending": champs.sort((a: Champion, b: Champion) => Number(b.chestGranted) - Number(a.chestGranted)); break;

      case "level-ascending":
          sortChamps(champs, "points", "ascending");
          champs.sort((a: Champion, b: Champion) => a.championLevel - b.championLevel);
          break;
      case "level-descending":
        sortChamps(champs, "points", "descending");
        champs.sort((a: Champion, b: Champion) => b.championLevel - a.championLevel);
        break;
      
      case "name-ascending": champs.sort((a: Champion, b: Champion) => a.championInfo.name.localeCompare(b.championInfo.name)); break;
      case "name-descending": champs.sort((a: Champion, b: Champion) => b.championInfo.name.localeCompare(a.championInfo.name)); break;
      
      case "nextLevel-ascending": champs.sort((a: Champion, b: Champion) => b.championPointsUntilNextLevel - a.championPointsUntilNextLevel); break;
      case "nextLevel-descending": champs.sort((a: Champion, b: Champion) => a.championPointsUntilNextLevel - b.championPointsUntilNextLevel); break;

      case "tokens-ascending": champs.sort((a: Champion, b: Champion) => a.tokensEarned - b.tokensEarned); break;
      case "tokens-descending": champs.sort((a: Champion, b: Champion) => b.tokensEarned - a.tokensEarned); break;
      
      case "points-ascending": champs.sort((a: Champion, b: Champion) => a.championPoints - b.championPoints); break;
      case "points-descending": champs.sort((a: Champion, b: Champion) => b.championPoints - a.championPoints); break;
      
      case "progress-ascending":
        sortChamps(champs, "points", "ascending");
        champs.sort((a: Champion, b: Champion) =>
          a.championLevel - b.championLevel === 0
            ? a.tokensEarned - b.tokensEarned === 0
              ? b.championPointsUntilNextLevel - a.championPointsUntilNextLevel
              : a.tokensEarned - b.tokensEarned
            : a.championLevel - b.championLevel
        );
        break;
      case "progress-descending":
        sortChamps(champs, "points", "descending");
        champs.sort((a: Champion, b: Champion) =>
          b.championLevel - a.championLevel === 0
            ? b.tokensEarned - a.tokensEarned === 0
              ? a.championPointsUntilNextLevel - b.championPointsUntilNextLevel
              : b.tokensEarned - a.tokensEarned
            : b.championLevel - a.championLevel
        );
        break;

      default:
        sortChamps(champs, "points", "descending");
    }
  }
  // TODO: host on server
  const getChampBanner = (champId: number) => `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/${champId}/${champId}000.jpg`;
  const getChampIcon = (champId: number) => `/data/cdragon/champIcons/${champId}.png`;

  return {
    sortChamps,
    getChampBanner,
    getChampIcon,
  }
}