<script setup lang="ts">
const props = defineProps(['recents']);

const store = useStore();

const searchField = ref();
const searchValue = ref("");

onMounted(() => {
  nextTick(() => {
    searchField.value.input.focus();
  });
});

async function search(input: string) {
  const inputResult = input.split("#");
  
  try {
    if(!inputResult[0] || !inputResult[1]) {
      throw createError({ message: "Riot ID must be in the form:\n\"GameName#TagLine\"" });
    }
    await store.search(inputResult);
    props.recents.addToRecents(`${store.$user().gameName}#${store.$user().tagLine}`);
  } catch(e: any) {
    store.searchError = e.message;
  }
}
</script>

<template>
  <div>
    <YInput
      class="search"
      ref="searchField"
      v-model="searchValue"
      leading="mdi:search"
      placeholder="GameName#Tagline"
      :button="{
        revealOnInput: true,
        icon: 'ph:arrow-circle-right-duotone'
      }"
      @on-input="store.searchError = null"
      @keydown.enter="search(searchValue)"
      @button-click="search(searchValue)"
    />
    <Transition appear name="slide-fade">
      <div v-if="store.searchError" id="search-error" class="pt-4 text-center">
        {{ store.searchError }}
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.search {
  background-color: var(--primary-dark);
  box-shadow: var(--shadow-inset);

  &:hover {
    outline: 2px solid var(--primary-light);
  }

  &:focus-within {
    border: 1px solid var(--border-focus);
    outline: 1px solid var(--border-focus);
    box-shadow: var(--shadow);
  }
}

#search-error {
  color: red;
  text-shadow: var(--shadow);
}
</style>