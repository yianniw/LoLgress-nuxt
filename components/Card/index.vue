<script setup>
const props = defineProps({
  showHeader: {
    type: Boolean,
    default: true
  },
  title: String,
  align: String,
  footerShadow: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <div id="card">
    <CardHeader
      v-if="showHeader"
      :value="title"
      :align="align" />
    <slot />
    <CardFooter :shadow="footerShadow"/>
  </div>
</template>

<style scoped>
#card {
  width: 100%;
  display: flex;
  flex-direction: column;

  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  box-shadow: 0px 1px 5px var(--border);
}
</style>