import { cache } from '~~/services/cache/mod';
import { retrieveResourceUrl } from './use-resource-url';
const { generalHttpHandle, http } = useHttp();


export async function retrieveResourceObject({ resource, resourceId }) {

  if (!resource || !resourceId) {
    return;
  }

  if (cache.has(`resource.${resource}.${resourceId}.object`)) {
    return cache.get(`resource.${resource}.${resourceId}.object`);
  }


  return cache.preempt(`resource.${resource}.${resourceId}.object`, async () => {

    const resourceUrl = retrieveResourceUrl({ resource });

    const { status, data } = await http.request({
      method: 'get',
      url: `${resourceUrl}/${resourceId}`,
    });

    if (generalHttpHandle(status, data, true)) {
      return;
    }


    return data;

  });

}


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