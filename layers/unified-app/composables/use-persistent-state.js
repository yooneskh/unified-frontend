import { useLocalStorage } from '@vueuse/core';


export function usePersistentState(key, factory, config) {

  if (import.meta.env.VITE_BUILT_STATIC === 'true') {
    
    const localValue = useLocalStorage(key, factory?.());
  
    return computed({
      get: () => localValue.value,
      set:  v => {
        localValue.value = v;
      },
    });

  }
  else {
    
    const cookie = useCookie(key, {
      maxAge: config?.cookieMaxAge ?? 3600 * 24 * 30,
    });
  
    const state = useState(key, () => cookie.value ?? factory?.());
  
    return computed({
      get: () => state.value,
      set:  v => {
        cookie.value = v;
        state.value = v;
      },
    });

  }

}
