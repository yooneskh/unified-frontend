import { useWindowSize } from "@vueuse/core";


const size = useWindowSize();

export const isMobile = computed(() =>
  size.width.value < 640
);
