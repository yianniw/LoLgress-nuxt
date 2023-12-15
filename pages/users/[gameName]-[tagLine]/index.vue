<script setup>
const store = useStore();
const route = useRoute();
const recents = useRecentsStorage();

const doesNotExist = ref(false);

onMounted(async () => {
  nextTick(async () => {
    if(!store.userReady) {
      try {
        await store.search([route.params.gameName, route.params.tagLine]);
        recents.addToRecents(`${store.getUser().gameName}#${store.getUser().tagLine}`);
      } catch(e) {
        doesNotExist.value = true;
      }
    }
    console.log(store.getUser());
  });
});
</script>

<template>
  <NuxtLayout name="default">

    <template v-if="store.userReady" v-slot:banner-img>
      <img
        id="champ-banner"
        :style="{ top: store.navbarHeight }"
        :src="store.getChampBanner(store.getUser().topChamp.championId)" />
    </template>
    
    <template v-if="store.userReady" v-slot:content>
      <div :class="`${!store.screen.isMobile ? 'page' : 'page-mobile'}`">
        <div class="page-sidebar">
          <UserCard />
        </div>
        <div class="page-content">
          <ChampTable content-height="60vh"/>
          <!-- <ChampGrid content-height="60vh"/> -->
        </div>
      </div>
    </template>

    <template v-else-if="doesNotExist" v-slot:content>
      <div class="not-found" :style="{ fontSize: '6vw' }">
        404 Player Not Found
        <br>
        {{`${route.params.gameName}#${route.params.tagLine}`}}
        <p :style="{ fontSize: '3.6vw' }">Please check your input and try again!</p>
      </div>
    </template>

  </NuxtLayout>
</template>

<style scoped>
#champ-banner {
  z-index: 0;
  position: sticky;
  width: 100%;
  height: 35vmin;

  object-fit: cover;
  object-position: 50% 25%;
  filter: grayscale(85%) brightness(60%);
  margin-bottom: -6px;
}

.page {
  display: flex;
  flex-direction: row;
  gap: 16px;
  padding: 16px;

  .page-sidebar {
    flex-basis: 300px;

    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .page-content {

    /* width: 100%; */
  }
}

.page-mobile {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;

  .page-sidebar {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .page-content {

  }
}

.content {
  display: flex;
  flex-grow: 2;
  justify-content: center;
  padding-inline: 8px;
}

.not-found {
  margin-top: 10vh;
  text-align: center;
}

.page-content {
  display: flex;
  flex-grow: 1;
  justify-content: center;
}
</style>