<script setup>
const store = useStore();
const currentRoute = useRoute();

const isSelected = (route) => route === currentRoute.fullPath ? 'selected' : '';
</script>

<template>
  <div id="navbar" >
    <NuxtLink :class="isSelected('/')" to="/">LoLgress</NuxtLink>
    <NuxtLink :class="isSelected('/about')" to="/about">About</NuxtLink>
  </div>
</template>

<style scoped>
#navbar {
  height: v-bind('store.navbarHeight');
  padding-left: 16px;

  opacity: 0.975;
  background-color: var(--neutral);
  border-bottom: 1px solid var(--border);

  display: flex;
  flex-direction: row;
}

a {
  padding-inline: 16px;
  padding-top: 16px;

  color: var(--font-color);
  font-size: var(--font-size);
  text-decoration: none;
  
  &:hover:not(.selected) {
    background-color: var(--primary-light);
    transition: 0.225s;
  }

}

.selected {
  background-color: var(--primary);
  border-bottom: 1px solid var(--font-color);
}
</style>