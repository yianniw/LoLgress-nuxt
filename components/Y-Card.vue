<script setup lang="ts">
interface Props {
  header?: {
    show?: boolean,
    title?: string,
    align?: string,
  },
  footer?: {
    show?: boolean,
    title?: string,
    align?: string,
  },
  color?: string,
  borderRadius?: string,
  bodyOverflow?: string,
};

const props = withDefaults(defineProps<Props>(), {
  header: () => ({
    show: false,
    title: '',
    align: 'center'
  }),
  footer: () => ({
    show: false,
    title: '',
    align: 'center'
  }),
  color: String,
  borderRadius: '10px',
  bodyOverflow: String
});

const showHeader = computed(() => props.header.show || props.header.title);
const showFooter = computed(() => props.footer.show || props.footer.title);
const bodyOverflow = computed(() => props.bodyOverflow ? props.bodyOverflow : 'visible');

const alignHeader = computed(() => {
  switch(props.header.align) {
    case 'start': return 'start';
    case 'center': return 'center';
    case 'end': return 'end';
    default: return 'center';
  }
});

const alignFooter = computed(() => {
  switch(props.footer.align) {
    case 'start': return 'start';
    case 'center': return 'center';
    case 'end': return 'end';
    default: return 'center';
  }
});

const slots = useSlots();
</script>

<template>
  <div class="card">
    <div v-if="showHeader" :class="`card-header rounded-top`">{{ header.title }}</div>
    <div :class="`card-body ${showHeader ? '' : 'rounded-top'} ${showFooter ? '' : 'rounded-bottom'}`">
      <slot />
    </div>
    <div v-if="showFooter" class="card-footer rounded-bottom">{{ footer.title }}</div>
  </div>
</template>

<style scoped>
.card {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  /* flex-grow: 1; */

  box-shadow: var(--shadow);
  box-sizing: border-box;
  border-radius: v-bind(borderRadius);

  .card-header {
    background-color: var(--neutral);
    padding-block: 4px;
    padding-inline: 8px;

    text-align: v-bind(alignHeader);
    font-size: 24px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .card-body {
    background-color: v-bind(color);
    border: 1px solid var(--border);

    flex: 1 1;
    min-height: 0;
    overflow: v-bind(bodyOverflow);
    text-overflow: ellipsis;
    white-space: nowrap;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .card-footer {
    background-color: var(--neutral);
    padding-block: 4px;
    padding-inline: 8px;

    text-align: v-bind(alignFooter);
    font-size: 24px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

.rounded-top {
  border-left: 1px solid var(--border);
  border-right: 1px solid var(--border);
  border-top: 1px solid var(--border);

  border-top-left-radius: v-bind(borderRadius);
  border-top-right-radius: v-bind(borderRadius);
}

.rounded-bottom {
  border-left: 1px solid var(--border);
  border-right: 1px solid var(--border);
  border-bottom: 1px solid var(--border);

  border-bottom-left-radius: v-bind(borderRadius);
  border-bottom-right-radius: v-bind(borderRadius);
}
</style>