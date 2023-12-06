<script setup>
const props = defineProps({
  shadow: Boolean
});
</script>

<template>
  <div id="card-footer" :class="(shadow) ? 'card-footer-shadow' : ''">

  </div>
</template>

<style scoped>
#card-footer {
  padding: 3px;
  border: 1px solid var(--border);
  background-color: var(--neutral);
}

.card-footer-shadow {
  box-shadow: 0px -3px 5px var(--primary-darker);
}
</style>