<script setup>
const store = useStore();

const props = defineProps(["recents"]);
const view = ref("recents");

onMounted(() => {
  if(props.recents.favorites.value) {
    view.value = "favorites";
  }
})

const favoriteIcon = 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-champion-details/global/default/star-filled.png';

async function search(input) {
  const inputResult = input.split("#");
  await store.search(inputResult);
  await navigateTo({ path: `/users/${store.getUser().gameName}-${store.getUser().tagLine}` });
}
</script>

<template>
  <Card :style="{ maxWidth: '600px' }" title="Recent Players" align="center">
    <div v-if="recents.favorites.value" class="lhead flex-row text-center">
      <div @click="view='recents'" :class="`${view === 'recents' ? 'selected' : ''}`">Recents</div>
      <div @click="view='favorites'" :class="`${view === 'favorites' ? 'selected' : ''}`">Favorites</div>
    </div>
    <div class="lbody">
      <div v-if="view === 'recents'"
        v-for="user in recents.recents.value"
        @click.self="search(user)"
        class="litem pa-3"
      >
        {{ user }}
        <img
          :class="`favorite-icon pl-3 ${!recents.isInFavorites(user) ? 'grayscale' : ''}`"
          :src="favoriteIcon"
          @click="recents.modifyFavorites(user)"
          title="Add to favorites" />
      </div>
      <div v-else-if="view === 'favorites'"
        v-for="user in recents.favorites.value"
        @click.self="search(user)"
        class="litem pa-3"
      >
        {{ user }}
        <img
          :class="`favorite-icon pl-3 ${!recents.isInFavorites(user) ? 'grayscale' : ''}`"
          :src="favoriteIcon"
          @click="recents.modifyFavorites(user)"
          title="Remove from favorites" />
      </div>
    </div>
  </Card>
</template>

<style scoped>
.lhead {
  background-color: var(--primary-darker);
  border-bottom: 1px solid var(--border);

  & div {
    flex-grow: 1;
  }

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

.selected {
  background-color: var(--primary-light);
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