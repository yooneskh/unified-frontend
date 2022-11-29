import { useNetwork } from './use-network';
import { useResourceUrl } from './use-resource-url';


export function useMeta({ resource }) {

  const { resourceUrlPart } = useResourceUrl({
    resource,
  })

  const { loading, data, error } = useNetwork({
    method: 'get',
    url: computed(() =>
      `${resourceUrlPart.value}/meta`
    ),
  });


  return {
    meta: computed(() =>
      (loading.value || error.value) ? ([]) : (data.value)
    ),
  };

}