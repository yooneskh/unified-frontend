

export function useResourceTitle({ resource, resourceId }) {

  const title = ref('');
  const refreshHandle = ref(0);


  watch([resource, resourceId, refreshHandle], async () => {

    if (!unref(resourceId)) {
      return;
    }


    title.value = '';

    title.value = await retrieveResourceTitle({
      resource: unref(resource),
      resourceId: unref(resourceId),
    });

  }, { immediate: true });


  return {
    title,
    refresh: () => refreshHandle.value++,
  };

}


export function useResourceArrayTitles({ resource, resourceIds }) {

  const refreshHandle = ref(0);

  const titles = ref({});
  const loading = ref(false);


  watch([resource, resourceIds, refreshHandle], async () => {

    for (const key of Object.keys(titles.value)) {
      if (!( unref(resourceIds).includes(key) )) {
        delete titles.value[key];
      }
    }


    loading.value = true;

    await Promise.all(
      unref(resourceIds).map(resourceId =>
        retrieveResourceTitle({
          resource: unref(resource),
          resourceId: unref(resourceId),
        })
        .then(title =>
          titles.value[unref(resourceId)] = title
        )
      )
    );

    loading.value = false;

  }, { immediate: true });


  return {
    titles,
    loading,
    refresh: () => refreshHandle.value++,
  };

}
