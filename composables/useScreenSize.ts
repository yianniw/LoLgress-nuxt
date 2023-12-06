export const useScreenSize = () => {
  let width = ref();
  let height = ref();

  const onWidthChange = () => width.value = window.innerWidth;
  const onHeightChange = () => height.value = window.innerHeight;

  onMounted(() => {
    if(!window)
      return;

    nextTick(() => {
      width.value = window.innerWidth;
      height.value = window.innerHeight;
    });
    window.addEventListener('resize', onWidthChange);
    window.addEventListener('resize', onHeightChange);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', onWidthChange);
    window.removeEventListener('resize', onHeightChange);
  });

  const breakpoint = computed(() => {
    if(width.value <= 600) return 'xs';
    if(width.value <= 960) return 'sm';
    if(width.value <= 1280) return 'md';
    if(width.value <= 1920) return 'lg';
    if(width.value <= 2560) return 'xl';
    if(width.value > 2560) return 'xxl';
    return null;
  });

  const isMobile = computed(() => width.value <= 960);
  const isReady = computed(() => !!width.value || !!height.value);

  return { isReady, width, height, isMobile, breakpoint }
}