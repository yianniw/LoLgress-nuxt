<script setup>
</script>

<template>
  <NuxtLayout name="default">
    <template v-slot:content>
      <div id="content" class="px-4">
        <div :style="{ minHeight: '25vh' }" />
        <div id="main-content" class="mb-8">
          <div class="title text-center pt-4">
            LoLgress
          </div>
          <Search class="pa-8" />
        </div>
        <Card :style="{ maxWidth: '600px' }" title="Recent Players" align="center">
          <RecentsList />
        </Card>
        <div class="spacer" />
      </div>
    </template>
  </NuxtLayout>
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

  transition: height 1s linear;
}

.title {
  font-size: 40px;
  text-shadow: var(--shadow);
}
</style>