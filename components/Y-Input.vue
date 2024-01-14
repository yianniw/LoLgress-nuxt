<script setup lang="ts">
const props = defineProps<{
  size?: {
    type: string,
    default: "md"
  },
  color?: string,
  placeholder?: string,
  placeholderColor?: string,
  leading?: string,
  trailing?: string,
  button?: {
    show?: boolean,
    revealOnInput?: boolean,
    icon: string
  },
  iconColor?: string,
}>();

const model = defineModel();

const input = ref();
defineExpose({ input });

const emit = defineEmits(['buttonClick']);

const isButtonVisible = () => {
  if (!props.button) return false;
  if (props.button.revealOnInput) return model.value;
  return props.button.show;
}
</script>

<template>
  <span class="container">
    <Icon v-if="leading" :name="leading" class="px-1" />
    <input
      ref="input"
      v-model="model"
      :placeholder="placeholder"
    />
    <button v-if="isButtonVisible()" @click="emit('buttonClick')">
      <Icon :name="button!.icon" class="px-1" />
    </button>
    <Icon v-else-if="trailing" :name="trailing" class="px-1" />
  </span>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  border: 1px solid var(--neutral);
  border-radius: 6px;
}

.icon {
  min-height: 28px;
  min-width: 28px;
  color: v-bind(iconColor);
}

input {
  all: unset;
  background-color: unset;
  width: 100%;
  padding-block: 4px;
  color: v-bind(color);
}

::placeholder {
  opacity: .6;
  color: v-bind(placeholderColor);
}

button {
  all: unset;

  &:hover {
    cursor: pointer;
    filter: brightness(150%);
  }
}
</style>