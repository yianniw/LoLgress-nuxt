<script setup>
const store = useStore();
const route = useRoute();

const recents = useRecentsStorage();

onMounted(async () => {
  nextTick(async () => {
    if(!store.userReady) {
      try {
        await search(route.params.gameName, route.params.tagLine);
        recents.addToRecents(`${store.getUser().gameName}#${store.getUser().tagLine}`);
      } catch(e) {
        // TODO: create a user "Not Found" page
      }
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
    <template v-if="store.userReady" v-slot:content>
      <div 
        id="content"
        :style="{
          flexDirection: `${!store.screen.isMobile ? 'row' : 'column'}`,
          gap: `${!store.screen.isMobile ? '24px' : '0px'}`,
          paddingBlock: `${!store.screen.isMobile ? '24px' : '8px'}`,
        }"
      >
        <div class="page-column" :style="{ maxWidth: `${!store.screen.isMobile ? '400px' : 'none'}` }">
          <Card :title="store.getUser().gameName" align="center" class="mb-4">
            <UserCard />
          </Card>
        </div>
        <div class="page-content" :style="{ maxWidth: '800px' }">
          <Card title="Champions" align="center">
            <ChampTable id="champ-table" />
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
  justify-content: center;
  padding-inline: 8px;
}

.page-column {
  flex-grow: 1;
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