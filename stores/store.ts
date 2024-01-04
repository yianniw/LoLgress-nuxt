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
    user.value = data;
    useChampUtil().sortChamps(user.value.champion, "points", "descending");
    user.value["topChamp"] = user.value.champion[0];
    userReady.value = true;
  }
  const getUser = () => user.value;

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
      searchError.value = null;
      await setUser(response);
      await navigateTo({ path: `/users/${input[0]}-${input[1]}` });
    } catch (e: any) {
      searchError.value = `Could not find user ${input[0]}#${input[1]}`;
    } finally {
      setIsLoading(false);
    }
  }
  const searchError: Ref<string | null | undefined> = ref();

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
    search, searchError,
    $reset
  }
});

// allow hot-reloading
if(import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot));
}