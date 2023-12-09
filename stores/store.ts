import { defineStore, acceptHMRUpdate } from "pinia";

export const useStore = defineStore('default', () => {

  const isLoading = ref(false);
  const setIsLoading = (value: boolean) => isLoading.value = value;

  const screen = ref();
  const navbarHeight = "50px";

  const user = ref();
  const userReady = ref(false);
  const setUser = async (data: any) =>  {
    user.value = data.user;
    user.value["sortMethod"] = "points";
    user.value["sortOrder"] = "descending";
    user.value["topChamp"] = user.value.champion[0];

    // FIXME: error checking needs to be done here
    const info: any = await useFetch(`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json`);

    // TODO: cache champion data
    user.value.champion.forEach((champ: any) => {
      champ["championInfo"] = info.data.value.find((element: any) => element.id === champ.championId);
    });

    userReady.value = true;
  }
  const getUser = () => user.value;

  function getUserIcon() {
    if(!getUser())
      return;

    return `https://raw.communitydragon.org/latest/game/assets/ux/summonericons/profileicon${getUser().info.profileIconId}.png`
  }

  function addToRecents(gameName: string, tagLine: string) {
    const user = `${gameName}#${tagLine}`;
    let recentsStr = localStorage.getItem("recents");
  
    // localStorage doesn't exist, create it
    if(!recentsStr) {
      localStorage.setItem("recents", JSON.stringify([user]));
      return;
    }
    
    let recentsArr = JSON.parse(recentsStr);
  
    // user already exists in localStorage
    let index = recentsArr.findIndex((item: string) => item === user);
    if(index !== -1) {
      recentsArr.splice(recentsArr.indexOf(user), 1);
      recentsArr.unshift(user);
      localStorage.setItem("recents", JSON.stringify(recentsArr));
      return;
    }
  
    // user does not exist in localStorage
    recentsArr.unshift(user);
    if(recentsArr.length > 10)
      recentsArr.pop();
  
    localStorage.setItem("recents", JSON.stringify(recentsArr));
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
      addToRecents(getUser().gameName, getUser().tagLine);
      await navigateTo({ path: `/users/${getUser().gameName}-${getUser().tagLine}` });
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

  const getChampBanner = () => {
    if(!getUser())
      return;

    const champId: number = getUser().topChamp.championId;

    return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/${champId}/${champId}000.jpg`;
  }

  const getChampIcon = (champId: number) => {
    return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${champId}.png`;
  }

  /**
   * Reset all store data to default
   */
  function $reset() {
    isLoading.value = false;
  }

  return {
    isLoading, setIsLoading,
    screen, navbarHeight,
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