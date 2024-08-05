

export function ufetch(url, options) {
  return useNuxtApp().$api(url, options);
}
