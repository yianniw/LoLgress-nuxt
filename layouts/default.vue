<script setup lang="ts">
const store = useStore();
const champUtil = useChampUtil();
const route = useRoute();

const isBannerRoute = ref(route.name === "users-gameName-tagLine")
const bannerSrc = ref('');

watch(() => route.name, (currentRoute) => {
  isBannerRoute.value = currentRoute === "users-gameName-tagLine"
});

watch((): { isReady: boolean } => { return { isReady: store.$user().isReady } }, (isReady) => {
  if(isReady) {
    const topChamp = store.$user().champion[0];
    bannerSrc.value = champUtil.getChampBanner(topChamp.championId);
  }
});
</script>

<template>
  <div>
    <Navbar id="navbar" />
    <img v-if="isBannerRoute && bannerSrc" id="champ-banner" :src="bannerSrc" />
    <main>
      <Loading v-if="store.isLoading" kat />
      <div class="centered">
        <slot />
      </div>
    </main>
    <LayoutFooter id="layout-footer" />
  </div>
</template>

<style scoped>
#navbar {
  z-index: 2;

  position: sticky;
  top: 0;
  width: 100%;
  box-shadow: 0px 0px 5px var(--border);
}

#champ-banner {
  z-index: 0;
  position: sticky;
  width: 100%;
  height: 35vmin;
  top: 50px;

  object-fit: cover;
  object-position: 50% 25%;
  filter: grayscale(85%) brightness(60%);
  margin-bottom: -6px;
}

main {
  display: flex;
  flex-direction: column;
  justify-content: center;

  /* required for the footer reveal effect */
  z-index: 1;
  height: calc(100svh - 50px);
  background-color: var(--primary-dark);
  position: relative;
  box-shadow: 0px 5px 10px var(--border), 0px -5px 10px var(--border);
}

.centered {
  width: 100%;
  max-width: 1280px;
  align-self: center;

  height: 100%;
  min-height: 0;

  display: flex;
  flex-direction: column;
}

#layout-footer {
  z-index: 0;

  position: sticky;
  bottom: 0;
  width: 100%;
}
</style>