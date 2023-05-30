

export function useResourceObject({ resource, resourceId }) {

  const _resource = ref(undefined);
  const loading = ref(false);


  watch([resource, resourceId], async () => {

    loading.value = true;

    _resource.value = await retrieveResourceObject({
      resource: unref(resource),
      resourceId: unref(resourceId),
    });

    loading.value = false;

  }, { immediate: true });


  return {
    resource: _resource,
    loading,
  };

}