<script setup lang="ts">
const store = useStore();
</script>

<template>
  <div>
    <Navbar id="navbar" />
    <slot name="banner-img" />
    <main>
      <Loading v-if="store.isLoading" kat />
      <slot name="content" />
    </main>
    <LayoutFooter id="layout-footer" />
  </div>
</template>

<style scoped>
#navbar {
  z-index: 2;

  position: sticky;
  top: 0;
  width: 100%;
  box-shadow: 0px 0px 5px var(--border);
}

main {
  z-index: 1;

  /* required for the footer reveal effect */
  min-height: calc(100svh);
  background-color: var(--primary);
  position: relative;
  box-shadow: 0px 5px 10px var(--border), 0px -5px 10px var(--border);
}

#layout-footer {
  z-index: 0;

  position: sticky;
  bottom: 0;
  width: 100%;
}
</style>