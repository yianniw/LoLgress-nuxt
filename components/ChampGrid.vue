<script setup>
const store = useStore();
const champs = store.$user().champion;
const champUtil = useChampUtil();
const props = defineProps({
  contentHeight: String
});
</script>

<template>
  <Card title="Champion Grid" align="center">
    <div class="root" :style="{ height: contentHeight }">
      <div class="grid">
        <div v-for="champ in champs" class="grid-item py-2" >
          <img class="champ-icon" :src="champUtil.getChampIcon(champ.championId)" />
          <span>{{ champ.championInfo.name }}</span>
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

  max-width: 750px;
  margin-inline: auto;
}

.grid-item {
  display: flex;
  flex-direction: column;
  text-align: center;
  /* width: 50%; */

  & img {
    --img-size: 72px;
    width: 8vw;
    height: 8vw;
    max-width: var(--img-size);
    max-height: var(--img-size);
    margin: auto;
  }

  & span {
    font-size: 12px;
    max-width: 64px;
    margin-inline: auto;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>