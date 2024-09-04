

export function ufetch(url: string, options?: Parameters<typeof $fetch>[1]) {
  return useNuxtApp().$api(url, options);
}
