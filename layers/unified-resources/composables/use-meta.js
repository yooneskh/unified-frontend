

export function useMeta({ resource, filter }) {

  const meta = ref([]);

  watch([resource], async () => {

    let rawMetas = await retrieveMeta({
      resource: unref(resource),
    });


    if (filter) {
      rawMetas = rawMetas.filter(filter || Boolean);
    }


    meta.value = rawMetas;

  }, { immediate: true });


  return {
    meta,
  };

}

export function useEnrichedMeta({ resource, filter }) {

  const { meta } = useMeta({
    resource,
    filter,
  });


  return {
    meta: computed(() =>
      [
        ...meta.value,
        {
          key: 'createdAt',
          type: 'number',
          labelFormat: 'YYYY/MM/DD HH:mm:ss',
          dir: 'ltr'
        },
        {
          key: 'updatedAt',
          type: 'number',
          labelFormat: 'YYYY/MM/DD HH:mm:ss',
          dir: 'ltr'
        },
      ]
    ),
  };

}
