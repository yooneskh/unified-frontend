

export function usePersistentState(key, factory, config) {
  return useCookie(key, {
    maxAge: config?.cookieMaxAge ?? 3600 * 24 * 30,
    default: () => factory?.(),
  });
}
