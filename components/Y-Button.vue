<script setup lang="ts">
const props = defineProps<{
  disabled?: boolean,
  icon?: string,
  label?: string,
  primaryColor?: string,
  accentColor?: string,
  textColor?: string
}>();

const hasDisabled = computed(() => props.disabled ? 'disabled' : '');

</script>

<template>
  <button :class="`y-button ${hasDisabled}`">
    
    <div class="inner">
      <slot />
    </div>
    <div class="accent">
      <Icon v-if="icon" :name="icon" />
    </div>
  </button>
</template>

<style scoped>
.y-button {
  all: unset;
  display: flex;
  user-select: none;

  box-shadow: var(--shadow);
  border-radius: 8px;

  &:hover:not(.disabled) { cursor: pointer; }
  &:hover:not(.disabled) .accent { border-color: rgb(42, 157, 143); }
  &:hover:not(.disabled) .inner { border-color: rgb(42, 157, 143); }

  .accent { transition: border 0.125s; }
  .inner { transition: border 0.125s; }
}

.disabled { cursor: not-allowed; }

.accent {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-inline: 4px;

  background-color: rgb(42, 157, 143);
  box-sizing: border-box;
  border: 1px solid var(--border);
  border-left: none;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}

.disabled .accent { filter: grayscale(100%); }

.inner {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

  background-color: var(--neutral);
  border: 1px solid var(--border);
  border-right: none;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;

  padding-block: 4px;
  padding-inline: 8px;

  color: aliceblue;
}
</style>