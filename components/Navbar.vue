<script setup lang="ts">
const supabase = useSupabaseClient();
const currentRoute = useRoute();

const showDevRoute = ref(false);

onMounted(async () => {
  const sessionResult = await supabase.auth.getSession();
  showDevRoute.value = !!sessionResult.data.session;
});

const isSelected = (route: string) => route === currentRoute.fullPath ? 'selected' : '';

</script>

<template>
  <div id="navbar" >
    <div class="px-2" />
    <NuxtLink to="/" :class="isSelected('/')">LoLgress</NuxtLink>
    <NuxtLink to="/about" :class="isSelected('/about')">About</NuxtLink>
    <div :style="{ flexGrow: 1 }" />
    <NuxtLink v-if="showDevRoute" to="/dev" :class="isSelected('/dev')">Dev</NuxtLink>
    <div class="px-2" />
  </div>
</template>

<style scoped>
#navbar {
  height: 50px;

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