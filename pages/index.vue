<script setup>
</script>

<template>
  <NuxtLayout name="default">
    <template v-slot:content>
      <div id="content" class="px-4">
        <div class="spacer" />
        
        <div id="main-content" class="mb-8">
          <div class="title text-center pt-4">
            LoLgress
          </div>
          <Transition appear name="slide-fade">
            <Search class="pa-8" />
          </Transition>
        </div>
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

.spacer {
  min-height: 25vh;
}
</style>