<script setup>
const props = defineProps({
  value: String,
  align: {
    type: String,
    default: 'start'
  }
})

function calcAlignment(val) {
  switch(val.toLowerCase()) {
    case 'center':
      return 'text-center';
    case 'end':
      return 'text-end';
    default:
      return 'text-start';
  }
}
</script>

<template>
  <div :class="`card-header py-1 ${calcAlignment(align)}`">
    {{ value }}
  </div>
</template>

<style scoped>
.card-header {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-left: 1px solid var(--border);
  border-right: 1px solid var(--border);
  border-top: 1px solid var(--border);
  background-color: var(--neutral);
  
  font-size: var(--font-size-header);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>