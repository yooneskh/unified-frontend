

export function useMeta({ resource }) {

  resource = toRef(resource);

  const meta = ref({});

  watch([resource], async () => {

    meta.value = await retrieveMeta({
      resource: toValue(resource),
    });

  }, { immediate: true });


  return {
    meta,
  };

}

export function useEnrichedMeta({ resource }) {

  const { meta } = useMeta({
    resource,
  });


  return {
    meta: computed(() => ({
      ...meta.value,
      createdAt: {
        type: 'number',
        labelFormat: 'YY/MM/DD HH:mm',
        dir: 'ltr'
      },
      updatedAt: {
        type: 'number',
        labelFormat: 'YY/MM/DD HH:mm',
        dir: 'ltr'
      },
    }))
  };

}
