

export function useResourceObject({ resource, resourceId }) {

  resource = toRef(resource);
  resourceId = toRef(resourceId);

  const _resource = ref(undefined);
  const loading = ref(false);


  watch([resource, resourceId], async () => {

    loading.value = true;

    _resource.value = await retrieveResourceObject({
      resource: toValue(resource),
      resourceId: toValue(resourceId),
    });

    loading.value = false;

  }, { immediate: true });


  return {
    resource: _resource,
    loading,
  };

}