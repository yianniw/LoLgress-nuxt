export const useRecentsStorage = () => {

  const recents = ref();
  const favorites = ref();

  const hasData = ref(false);
  
  onMounted(() => {
    if(!localStorage)
      return;

    const recentsStr = localStorage.getItem("recents");
    if(recentsStr) {
      recents.value = JSON.parse(recentsStr);
      hasData.value = true;
    }

    const favoritesStr = localStorage.getItem("favorites");
    if(favoritesStr) {
      favorites.value = JSON.parse(favoritesStr);
      hasData.value = true;
    }
  });

  function isInRecents(user: string) {
    if(!recents.value)
      return false;
  
    return !!recents.value.find((item: string) => item === user);
  }

  function addToRecents(user: string) {
    // localStorage doesn't exist, create it and add the user
    if(!recents.value) {
      localStorage.setItem("recents", JSON.stringify([user]));

      const recentsStr = localStorage.getItem("recents");
      if(recentsStr) {
        favorites.value = JSON.parse(recentsStr);
        hasData.value = true;
      }
      return;
    }

    // user already exists in localStorage, bump them to the top
    if(isInRecents(user)) {
      let index = recents.value.findIndex((item: string) => item === user);
      recents.value.splice(index, 1);
      recents.value.unshift(user);
      localStorage.setItem("recents", JSON.stringify(recents.value));
      return;
    }

    // user does not exist in localStorage, add them
    recents.value.unshift(user);
    if(recents.value.length > 10)
      recents.value.pop();
  
    localStorage.setItem("recents", JSON.stringify(recents.value));
  }

  function isInFavorites(user: string) {
    if(!favorites.value)
      return false;
  
    return !!favorites.value.find((item: string) => item === user);
  }

  function modifyFavorites(user: string) {
    // localStorage doesn't exist, create it and add the user
    if(!favorites.value) {
      localStorage.setItem("favorites", JSON.stringify([user]));
      
      const favoritesStr = localStorage.getItem("favorites");
      if(favoritesStr) {
        favorites.value = JSON.parse(favoritesStr);
        hasData.value = true;
      }
      return;
    }
  
    // user already exists in localStorage, remove them
    if(isInFavorites(user)) {
      let index = favorites.value.findIndex((item: string) => item === user);
      favorites.value.splice(index, 1);

      if(!favorites.value.length) {
        localStorage.removeItem("favorites");
        favorites.value = null;
      }
      else {
        localStorage.setItem("favorites", JSON.stringify(favorites.value));
      }

      return;
    }
  
    // user does not exist in localStorage, add them
    favorites.value.unshift(user);
    localStorage.setItem("favorites", JSON.stringify(favorites.value));
  }

  return {
    hasData,
    recents, isInRecents, addToRecents,
    favorites, isInFavorites, modifyFavorites
  }
}