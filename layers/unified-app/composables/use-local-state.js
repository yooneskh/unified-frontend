import { useLocalStorage } from '@vueuse/core';


export function useLocalState(key, factory) {

  const localValue = useLocalStorage(key, factory?.());

  return computed({
    get: () => localValue.value,
    set:  v => {
      localValue.value = v;
    },
  });

}
