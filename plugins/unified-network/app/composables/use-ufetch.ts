

export function useUFetch(url: string, options?: Parameters<typeof useFetch>[1]) {
  return useFetch(url, {
    ...(options || {}),
    $fetch: useNuxtApp().$api,
  });
}
