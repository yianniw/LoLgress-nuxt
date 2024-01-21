<script setup>
const recents = useRecentsStorage();
</script>

<template>
  <div id="content" class="px-4">
    <div id="main-content" class="mb-8">
      <div class="title text-center pt-4">
        LoLgress
      </div>
      <Search class="pa-8" :recents="recents" />
    </div>
    <RecentsList v-if="recents.hasData.value" :recents="recents"/>
    <div class="spacer" />
  </div>
</template>

<style scoped>
#content {
  height: inherit;
  display: flex;
  flex-grow: 1;
  flex-direction: column;

  align-items: center;
  justify-content: center;
}

#main-content {
  height: 225px;
  width: 100%;
  max-width: 800px;
  border: 1px solid var(--border);
  border-radius: 10px;
  box-shadow: var(--shadow);
  background-color: var(--primary);

  transition: height 1s linear;
}

.title {
  font-size: 40px;
  text-shadow: var(--shadow);
}
</style>