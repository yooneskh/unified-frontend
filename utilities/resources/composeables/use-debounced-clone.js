

export function useDebouncedClone({ source, timeout, deep }) {

  source = ref(source);
  timeout = ref(timeout);

  const target = ref(JSON.parse(JSON.stringify(unref((source)))));
  let debounceHandle;

  watch([source, timeout], () => {

    if (debounceHandle) {
      clearTimeout(debounceHandle);
    }

    debounceHandle = setTimeout(() => {
      target.value = JSON.parse(JSON.stringify(unref((source))));
    }, unref(timeout));

  }, { deep });


  return {
    target,
  };

}
