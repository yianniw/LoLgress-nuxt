<script setup>
const store = useStore();
const route = useRoute();

onMounted(async () => {
  nextTick(async () => {
    if(!store.userReady) {
      await search(route.params.gameName, route.params.tagLine);
    }

    console.log(store.getUser());
  });
  
});

async function search(nameField, tagField) {
  store.setIsLoading(true);
  try {
    const response = await $fetch('/api/requestUser', {
      method: 'POST',
      body: {
        "GameName": nameField,
        "TagLine": tagField
      }
    });
    await store.setUser(response);
  } catch(e) {
    console.log(e)
  }
  store.setIsLoading(false);
}
</script>

<template>
  <NuxtLayout name="default">
    <template v-slot:banner-img>
      <img v-if="store.userReady"
        id="champ-banner"
        :style="{ top: store.navbarHeight }"
        :src="store.getChampBanner()" />
    </template>
    <template v-slot:content>
      <div v-if="store.userReady"
        id="content"
        :style="{
          flexDirection: `${!store.screen.isMobile ? 'row' : 'column'}`,
          gap: `${!store.screen.isMobile ? '16px' : '0px'}`,
          padding: `${!store.screen.isMobile ? '32px' : '8px'}`,
        }"
      >
        <div class="page-column">
          <Card :title="store.getUser().gameName" align="center" class="mb-4">
            <UserCard />
          </Card>
        </div>
        <div class="page-content">
          <Card title="Champions" align="center">
            <ChampTable id="champ-table" v-if="store.getUser()" />
          </Card>
        </div>
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

#content {
  display: flex;
  flex-grow: 2;
}

.page-column {
  flex-basis: fit-content;
}

.page-content {
  display: flex;
  flex-grow: 1;
  justify-content: center;
}

#champ-table {
  height: 50vh;
  overflow-y: scroll;
}

#champ-table::-webkit-scrollbar {
  display: none;
}
</style>