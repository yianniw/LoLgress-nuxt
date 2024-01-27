<script setup lang="ts">
const store = useStore();
const route = useRoute();
const recents = useRecentsStorage();
const doesNotExist = ref(false);

enum Views {
  MasteryTable = "MasteryTable",
  MasteryChart = "MasteryChart",
  Challenges = "Challenges"
}
const currentView = ref(Views.MasteryTable);
const toggleView = () => {
  currentView.value === Views.MasteryTable || currentView.value === Views.MasteryChart
    ? currentView.value = Views.Challenges
    : currentView.value = Views.MasteryTable;
}

onMounted(async () => {
  nextTick(async () => {
    if(!store.$user().isReady) {
      try {
        await store.search([route.params.gameName as string, route.params.tagLine as string]);
        recents.addToRecents(`${store.$user().gameName}#${store.$user().tagLine}`);
      } catch(e) {
        doesNotExist.value = true;
      }
    }
    console.log(store.$user());
  });
});
</script>

<template>
  <div v-if="store.$user().isReady" class="page">
    <div class="sidebar">
      <UserCard />
      <MasteryScore class="mastery-score"/>
      <button @click="toggleView()">View</button>
    </div>
    <ChampTable v-if="currentView === Views.MasteryTable" class="content" />
    <ChallengesView v-if="currentView === Views.Challenges" class="content" />
  </div>
  <div v-else-if="doesNotExist">
    <div class="not-found" :style="{ fontSize: '6vw' }">
      404 Player Not Found
      <br>
      {{`${route.params.gameName}#${route.params.tagLine}`}}
      <p :style="{ fontSize: '3.6vw' }">Please check your input and try again!</p>
    </div>
  </div>
</template>

<style scoped>
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

.page {
  height: 100%;
  min-height: 0;
  box-sizing: border-box;
}

@media (min-width: 960px) {
  .page {
    padding: 16px;
    display: grid;
    grid-template-columns: minmax(300px, 300px) 1fr;
    gap: 16px;
  }

  .sidebar {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .content {
    min-height: 0;
  }
}

@media (max-width: 960px) {
  .page {
    padding-block: 8px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-inline: 4px;
  }

  .sidebar {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .mastery-score {
      display: none;
    }
  }

  .content {
    min-height: 0;
  }
}

.not-found {
  margin-top: 10vh;
  text-align: center;
}
</style>