<script setup>
const props = defineProps({
  kat: Boolean
});
</script>

<template>
  <div id="loading-indicator">
    <img v-if="kat" src="~/assets/img/kat.gif" />
  </div>
</template>

<style scoped>
#loading-indicator {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>