

export function useSimpleState(key, factory) {
  return useState(key, factory);
}
