import { defineStore, acceptHMRUpdate } from "pinia";

export const useStore = defineStore('default', () => {

  const test = async () => {

  }

  const isLoading = ref(false);
  const setIsLoading = (value: boolean) => isLoading.value = value;

  const user: Ref<User> = ref(<User>{ isReady: false });
  const $user = () => user.value;

  async function search(input: string[]) {
    setIsLoading(true);
    try {
      const response: User = await $fetch('/api/requestUser', {
        method: 'POST',
        body: {
          gameName: input[0],
          tagLine: input[1]
        }
      });
      searchError.value = null;

      user.value = response;
      useChampUtil().sortChamps($user().champion, "points", "descending");
      $user().isReady = true;
      await navigateTo({ path: `/users/${input[0]}-${input[1]}` });
    } catch (e: any) {
      const errorMessage = `Could not find user ${input[0]}#${input[1]}`;
      searchError.value = errorMessage;
      throw createError({ statusMessage: errorMessage });
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
    user, $user,
    search, searchError,
    $reset
  }
});

// allow hot-reloading
if(import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot));
}