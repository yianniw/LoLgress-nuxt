import { defineStore, acceptHMRUpdate } from "pinia";
import championSummaryData from "~/assets/data/cdragon/champion-summary.json";

export const useStore = defineStore('default', () => {

  const champUtil = useChampUtil();

  const test = async () => {

  }

  const isLoading = ref(false);
  const setIsLoading = (value: boolean) => isLoading.value = value;

  const user = ref();
  const userReady = ref(false);
  const setUser = async (data: any) =>  {
    user.value = data.user;

    let newChamps: Champion[] = [];
    championSummaryData.forEach((champInfo: ChampionInfo) => {
      const champ = user.value.champion.find((champ: Champion) => champ.championId === champInfo.id);
      if(champ) {
        champ["championInfo"] = champInfo;
        return;
      }

      if(champInfo.id === -1)
        return;

      newChamps.push(<Champion> {
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

    champUtil.sortChamps(user.value.champion, "points", "descending");
    user.value["topChamp"] = user.value.champion[0];
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

  // TODO: host on server
  const getChampBanner = (champId: number) => `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/${champId}/${champId}000.jpg`

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
    getChampBanner,
    $reset
  }
});

// allow hot-reloading
if(import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot));
}