<script setup>
const store = useStore();

const view = ref("recents");
const recents = ref(null);
const favorites = ref(null);

const favoriteIcon = 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-champion-details/global/default/star-filled.png';

onMounted(() => {
  const recentsStr = localStorage.getItem("recents");
  if(recentsStr) {
    recents.value = JSON.parse(recentsStr);
  }

  const favoritesStr = localStorage.getItem("favorites");
  if(favoritesStr) {
    favorites.value = JSON.parse(favoritesStr);
    if(favorites.value.length) {
      view.value = "favorites"
    }
  }
});

function isInFavorites(user) {
  if(!favorites.value)
    return false;

  return favorites.value.find((item) => item === user);
}

function modifyFavorites(user) {
  // localStorage doesn't exist, create it
  if(!favorites.value) {
    localStorage.setItem("favorites", JSON.stringify([user]));
    return;
  }

  // user already exists in localStorage
  if(isInFavorites(user)) {
    let index = favorites.value.findIndex((item) => item === user);
    favorites.value.splice(index, 1);
    localStorage.setItem("favorites", JSON.stringify(favorites.value));
    return;
  }

  // user does not exist in localStorage
  favorites.value.unshift(user);
  localStorage.setItem("favorites", JSON.stringify(favorites.value));
}

async function search(input) {
  const inputResult = input.split("#");
  await store.search(inputResult);
}
</script>

<template>
  <div>
    <div class="lhead flex-row text-center">
      <div :style="{ flexGrow: 1 }" @click="view='recents'">Recents</div>
      <div :style="{ flexGrow: 1 }" @click="view='favorites'">Favorites</div>
    </div>
    <div class="lbody">
      <div v-show="view === 'recents'" v-for="user in recents" @click.self="search(user)" class="litem pa-3">
        {{ user }}
          <img
          :class="`favorite-icon pl-3 ${!isInFavorites(user) ? 'grayscale' : ''}`"
          :src="favoriteIcon"
          @click="modifyFavorites(user)"
          title="Add to favorites" />
      </div>
      <div v-show="view === 'favorites'" v-for="user in favorites" @click.self="search(user)" class="litem pa-3">
        {{ user }}
        <img
          :class="`favorite-icon pl-3 ${!isInFavorites(user) ? 'grayscale' : ''}`"
          :src="favoriteIcon"
          @click="modifyFavorites(user)"
          title="Remove from favorites" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.lhead {
  background-color: var(--primary-darker);
  border-bottom: 1px solid var(--border);
  box-shadow: var(--shadow);

  & div:first-child {
    border-right: 1px solid var(--border);
  }

  & div:hover {
    background-color: var(--primary-light);
    cursor: pointer;
    user-select: none;
    transition: 0.225s;
  }
}

.lbody {
  & div {
    border-bottom: 1px solid var(--border);
  }

  & div:last-child {
    border-bottom: none;
  }

  & div:nth-child(even) {
    background-color: var(--primary-dark);
  }

  & div:hover {
    background-color: var(--primary-light);
  }
}

.litem {
  display: flex;
  align-items: center;
}

.favorite-icon {
  min-height: 24px;
  min-width: 24px;
  max-height: 24px;
  max-width: 24px;
  transition: filter .25s;
  margin-left: auto;
}

.favorite-icon:hover {
  filter: grayscale(0);
  cursor: pointer;
}

.grayscale {
  filter: grayscale(1);
}
</style>