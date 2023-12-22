import { defineStore, acceptHMRUpdate } from "pinia";
import championSummaryData from "~/assets/data/cdragon/champion-summary.json";

export const useStore = defineStore('default', () => {

  const test = async () => {

  }

  const isLoading = ref(false);
  const setIsLoading = (value: boolean) => isLoading.value = value;

  const user = ref();
  const userReady = ref(false);
  const setUser = async (data: any) =>  {
    user.value = data.user;
    user.value["sortMethod"] = "points";
    user.value["sortOrder"] = "descending";
    user.value["topChamp"] = user.value.champion[0];

    let newChamps: Champion[] = [];
    championSummaryData.forEach((champInfo: ChampionInfo) => {
      const champ = user.value.champion.find((champ: Champion) => champ.championId === champInfo.id);
      if(champ) {
        champ["championInfo"] = champInfo;
        return;
      }

      if(champInfo.id === -1)
        return;

      newChamps.push(<Champion>{
        championId: champInfo.id,
        championInfo: champInfo,
        championLevel: 0,
        championPoints: 0,
        championPointsSinceLastLevel: 0,
        championPointsUntilNextLevel: 0,
        chestGranted: false,
        lastPlayTime: 0,
        puuid: user.value.puuid,
        summonerId: '',
        tokensEarned: 0
      });
    });
    user.value.champion.push(...newChamps);

    userReady.value = true;
  }
  const getUser = () => user.value;

  function getUserIcon() {
    if(!getUser())
      return;

    return `https://raw.communitydragon.org/latest/game/assets/ux/summonericons/profileicon${getUser().info.profileIconId}.png`
  }

  async function search(input: string[]) {
    setIsLoading(true);
    try {
      const response = await $fetch('/api/requestUser', {
        method: 'POST',
        body: {
          "GameName": input[0],
          "TagLine": input[1]
        }
      });
      await setUser(response);
    } catch (e: any) {
      throw createError({
        statusMessage: `Could not find user ${input[0]}#${input[1]}`
      });
    } finally {
      setIsLoading(false);
    }
  }

  const getChamps = () => getUser() ? getUser().champion : undefined;

  // FIXME: this is actually disgusting and needs to be refactored
  const sortChamps = (sortMethod: string) => {
    if(!getUser())
      return;

    if(getUser().sortMethod === sortMethod) {
      getUser().sortOrder = getUser().sortOrder === "descending" ? "ascending" : "descending";
    } else {
      getUser().sortMethod = sortMethod;
      getUser().sortOrder = "ascending";
    }

    // TODO: sort by chestGranted
    switch(getUser().sortMethod + '-' + getUser().sortOrder) {
      case 'points-descending':
        getChamps().sort((a: Champion, b: Champion) => b.championPoints - a.championPoints);
        break;
      case 'points-ascending':
        getChamps().sort((a: Champion, b: Champion) => a.championPoints - b.championPoints);
        break;
      case 'level-descending':
        getChamps().sort((a: Champion, b: Champion) =>
          b.championLevel - a.championLevel === 0
            ? b.championPoints - a.championPoints
            : b.championLevel - a.championLevel
        );
        break;
      case 'level-ascending':
        getChamps().sort((a: Champion, b: Champion) =>
          a.championLevel - b.championLevel === 0
            ? a.championPoints - b.championPoints
            : a.championLevel - b.championLevel
        );
        break;
      case 'name-descending':
        getChamps().sort((a: Champion, b: Champion) => b.championInfo.name.localeCompare(a.championInfo.name));
        break;
      case 'name-ascending':
        getChamps().sort((a: Champion, b: Champion) => a.championInfo.name.localeCompare(b.championInfo.name));
        break;
      case 'progress-descending':
        getChamps().sort((a: Champion, b: Champion) =>
          b.championLevel - a.championLevel === 0
            ? b.tokensEarned - a.tokensEarned === 0
              ? a.championPointsUntilNextLevel - b.championPointsUntilNextLevel
              : b.tokensEarned - a.tokensEarned
            : b.championLevel - a.championLevel
        );
        break;
      case 'progress-ascending':
        getChamps().sort((a: Champion, b: Champion) =>
          a.championLevel - b.championLevel === 0
            ? a.tokensEarned - b.tokensEarned === 0
              ? b.championPointsUntilNextLevel - a.championPointsUntilNextLevel
              : a.tokensEarned - b.tokensEarned
            : a.championLevel - b.championLevel
        );
        break;
      default: // points-descending
        getChamps().sort((a: Champion, b: Champion) => b.championPoints - a.championPoints);
    }
  }

  // TODO: host on server
  const getChampBanner = (champId: number) => `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/${champId}/${champId}000.jpg`
  const getChampIcon = (champId: number) => `/data/cdragon/champIcons/${champId}.png`

  /**
   * Reset all store data to default
   */
  function $reset() {
    isLoading.value = false;
  }

  return {
    test,
    isLoading, setIsLoading,
    user, userReady, setUser, getUser,
    search,
    getChamps, sortChamps, getChampBanner, getChampIcon,
    $reset
  }
});

// allow hot-reloading
if(import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot));
}