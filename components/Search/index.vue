<script setup>
// FIXME: changing viewport size results in a loss of data
// TODO: figure out the search button
const store = useStore();

const nameField = ref("");
const tagField = ref("");
const searchError = ref("");

const props = defineProps(['screen']);
// const screen = ref(useScreenSize());


onMounted(() => {
  nextTick(() => {
    nameField.value.focus();
  });
});

async function search(nameField, tagField) {
  store.setIsLoading(true);
  try {
    const response = await $fetch('/api/requestUser', {
      method: 'POST',
      body: {
        "GameName": nameField.value,
        "TagLine": tagField.value
      }
    });
    await store.setUser(response);
    await navigateTo({ path: `/users/${nameField.value}-${tagField.value}` });
  } catch(e) {
    searchError.value = e.message;
    // FIXME: console.log()
    console.log(e)
  }
  store.setIsLoading(false);
}

async function search2(nameField, tagField) {
  store.setIsLoading(true);
  try {
    const response = await $fetch('/api/requestUser', {
      method: 'POST',
      body: {
        "GameName": nameField,
        "TagLine": tagField
      }
    });
    store.setUser(response);
    await navigateTo({ path: `/users/${nameField}-${tagField}` });
  } catch(e) {
    searchError.value = e.message;
    console.log(e)
  }
  store.setIsLoading(false);
}

const resetError = () => searchError.value = "";
</script>

<template>
  <div id="search" class="" v-if="true">
    <div v-if="!store.screen.isMobile" class="input-container pa-2 mb-4 align-center">
      <Icon class="input-icon mr-1" name="mdi:search" color="black" />
      <input
        ref="nameField"
        id="name-field"
        type="text"
        maxlength="16"
        placeholder="Game Name..."
        @click="resetError()"
        @keyup.enter="search(nameField, tagField)" />
      <span class="input-icon mr-n1 mt-n1">#</span>
      <input
        ref="tagField"
        id="tag-field"
        type="text" maxlength="5"
        placeholder="Tagline..."
        @click="resetError()"
        @keyup.enter="search(nameField, tagField)" />
      <Icon id="clear-search" class="search-icon ml-1" name="mdi:close" color="black" />
    </div>
    <div v-else class="mb-4 flex-col">
      <div class="input-container pa-2 mb-2 align-center">
        <Icon class="input-icon mr-1" name="mdi:search" color="black" />
        <input
          ref="nameField"
          id="name-field"
          type="text"
          maxlength="16"
          placeholder="Game Name..."
          @click="resetError()"
          @keyup.enter="search(nameField, tagField)" />
      </div>
      <div class="input-container pa-2 mb-4 align-center">
        <span class="input-icon mr-1">#</span>
        <input
          ref="tagField"
          id="tag-field-mobile"
          type="text"
          maxlength="5"
          placeholder="Tagline..."
          @click="resetError()"
          @keyup.enter="search(nameField, tagField)" />
      </div>
    </div>
    <Transition appear name="slide-fade">
      <span v-if="searchError" id="search-error">{{ searchError }}</span>
    </Transition>
    <button @click="search2('Yianni', '9052')">test</button>
  </div>
</template>

<style scoped>
.input-container {
  display: flex;
  background-color: var(--font-color);

  border: 2px solid var(--neutral);
  border-radius: 10px;
  transition: border 0.225s;

  &:hover {
    border: 2px solid var(--primary-light);
  }

  &:focus-within {
    border: 2px solid var(--border-focus);
    box-shadow: var(--shadow);
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

input {
  all: unset;
  color: var(--border);
}

#name-field {
  width: 100%;
}

#tag-field {
  max-width: 110px;
}

#tag-field-mobile {
  width: 100%;
}

#clear-search {
  cursor: pointer;
  border-radius: 100%;
  transition: background-color 0.225s;

  &:hover {
    background-color: var(--border-focus);
  }
}

#search-button {
  margin-left: auto;
  margin-right: auto;
  width: 120px;
  height: 60px;
  background-color: var(--font-color);
  border: 2px solid var(--neutral);
  border-radius: 10px;
  transition: border 0.225s;

  &:hover {
    border: 2px solid var(--primary-light);
  }

  &:active {
    border: 2px solid var(--border-focus);
    box-shadow: var(--shadow);
  }
}

#search-error {
  color: red;
  text-shadow: var(--shadow);
}

</style>