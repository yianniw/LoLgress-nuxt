<script setup>
const recents = useRecentsStorage();
</script>

<template>
  <YCard class="title-card" color="var(--primary)">
    <div class="title text-center pt-4">
      LoLgress
    </div>
    <Search class="px-8 pt-4" :recents="recents" />
    <div class="pa-8">
      <RecentsList v-if="recents.hasData.value" :recents="recents" />
    </div>
  </YCard>
</template>

<style scoped>
.title-card {
  justify-self: center;
  max-width: 800px;
  margin: auto;
}

.title {
  font-size: 48px;
  text-shadow: var(--shadow);
}
</style>