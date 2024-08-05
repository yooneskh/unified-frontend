

export function useUFetch(url, options) {
  return useFetch(url, {
    ...(options || {}),
    $fetch: useNuxtApp().$api,
  });
}
