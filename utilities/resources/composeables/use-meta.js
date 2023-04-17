import { cache } from '../../../services/cache/mod';
import { retrieveResourceUrl } from './use-resource-url';
const { generalHttpHandle, http } = useHttp();


export async function retrieveMeta({ resource }) {

  if (!resource) {
    return [];
  }

  if (cache.has(`resource.${resource}`)) {
    return cache.get(`resource.${resource}`);
  }


  return cache.preempt(`resource.${resource}`, async () => {

    const resourceUrlPart = retrieveResourceUrl({ resource });


    const { status, data } = await http.request({
      method: 'get',
      url: `${resourceUrlPart}/meta`,
    });

    if (generalHttpHandle(status, data, true)) {
      return [];
    }


    return data

  });

}


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
