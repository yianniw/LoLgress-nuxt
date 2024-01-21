<script setup>
const props = defineProps({
  showHeader: {
    type: Boolean,
    default: true
  },
  title: String,
  align: String,
});
</script>

<template>
  <div class="card">
    <CardHeader
      v-if="showHeader"
      :value="title"
      :align="align"
    />
    <div class="card-body">
      <slot />
    </div>
    <CardFooter />
  </div>
</template>

<style scoped>
.card {
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;

  border-radius: 10px;
  box-shadow: 0px 1px 5px var(--border);
}

.card-body {
  border: 1px solid var(--border);
}
</style>