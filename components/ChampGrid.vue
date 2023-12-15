<script setup>
const store = useStore();
const champs = ref(store.getChamps());
const props = defineProps({
  contentHeight: String
});
</script>

<template>
  <Card title="Champion Grid" align="center">
    <div class="root" :style="{ height: contentHeight }">
      <div class="grid">
        <div v-for="champ in champs" class="grid-item py-2" >
          <img class="champ-icon" :src="store.getChampIcon(champ.championId)" />
          {{ champ.championInfo.name }}
        </div>
      </div>
    </div>
  </Card>
</template>

<style scoped>
.root {
  overflow-y: scroll;
  
  &::-webkit-scrollbar {
    display: none;
  }
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
}

.grid-item {
  display: flex;
  flex-direction: column;
  text-align: center;
  /* width: 50%; */

  & img {
    width: inherit;
    margin: auto;
  }
}
</style>