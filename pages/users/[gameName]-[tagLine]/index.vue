<script setup>
const store = useStore();
const route = useRoute();
const champStore = useChampStore();

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
      <div id="content" class="pa-8">
        <Card v-if="store.userReady" :title="store.getUser().gameName" align="center" class="mb-8">
          <UserCard />
        </Card>
        <Card title="Champions" :style="{ maxWidth: '800px' }" align="center">
          <ChampTable id="champ-table" v-if="store.getUser()" />
        </Card>
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
  flex-direction: column;

  align-items: center;
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