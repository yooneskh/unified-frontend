import { useNetwork } from "./use-network";


export function useMeta({ resource }) {

  const { loading, data, error } = useNetwork({
    method: 'get',
    url: `${unref(resource).toLowerCase()}s/meta`,
  });

  return computed(() =>
    (loading.value || error.value) ? ([]) : (data.value)
  );

}