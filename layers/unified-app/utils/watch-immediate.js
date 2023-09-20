

export function watchImmediate(sources, cb, options) {
  watch(sources, cb, {
    immediate: true,
    ...(options ?? {}),
  });
}
