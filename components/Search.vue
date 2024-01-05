<script setup>
const store = useStore();

const props = defineProps(['recents']);

const searchField = ref(null);
const searchValue = ref("");
const searchError = ref("");

onMounted(() => {
  nextTick(() => {
    searchField.value.focus();
  });
});

async function search(input) {
  const inputResult = input.split("#");
  
  try {
    await store.search(inputResult);
    props.recents.addToRecents(`${store.$user().gameName}#${store.$user().tagLine}`);
  } catch(e) {
    searchError.value = e.statusMessage;
  }
}

const resetError = () => store.searchError = null;
</script>

<template>
  <div>
    <div id="search-container" class="flex-row">
      <div id="input-container" class="align-center">
        <Icon class="input-icon pl-2 pr-1" name="mdi:search" color="black" />
        <input
          ref="searchField"
          v-model="searchValue"
          @keydown.enter="search(searchValue)"
          @click="resetError()"
          placeholder="GameName#Tagline" />
      </div>
      <button id="search-button" @click="search(searchValue)">
        <Icon name="material-symbols:expand-circle-right-outline" color="aliceblue" size="32px"/>
      </button>
    </div>

    <Transition appear name="slide-fade">
      <div v-if="store.searchError" id="search-error" class="pt-4 text-center">
        {{ store.searchError }}
      </div>
    </Transition>
  </div>
</template>

<style scoped>
#search-container {
  height: 45px;
  width: 100%;

  outline: 2px solid var(--neutral);
  border-radius: 10px;
  transition: outline 0.225s;

  &:hover {
    outline: 2px solid var(--primary-light);
    border-right: none;
  }

  &:focus-within {
    outline: 2px solid var(--border-focus);
    border-right: none;
    box-shadow: var(--shadow);
  }
}

#input-container {
  width: 100%;

  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;

  display: flex;
  background-color: var(--font-color);

  & input {
    all: unset;
    color: var(--border);
    width: 100%;
  }
}

.input-icon {
  color: black;
  pointer-events: none;
  text-align: center;

  min-width: 24px;
  max-width: 24px;
  min-height: 24px;
  max-height: 24px;
}

#search-button {
  width: 80px;

  border: none;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;

  background-color: var(--border-focus-less);
  font-family: 'Nunito Sans', sans-serif;
  font-size: larger;

  cursor: pointer;
}

#search-error {
  color: red;
  text-shadow: var(--shadow);
}

</style>