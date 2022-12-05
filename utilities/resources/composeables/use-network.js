import { http, generalHttpHandle } from '../../../services/http/mod';


export function useNetwork({ method, url, queries }) {

  const loading = ref(false);

  const status = ref(0)
  const data = ref(undefined);
  const headers = ref({});

  const error = ref(false);

  const refreshHandle = ref(0);


  watchEffect(async () => {

    if (!unref(method) || !unref(url)) {
      return;
    }


    loading.value = refreshHandle.value > -1; // to make it refresh
    const response = await http.request({
      method: unref(method),
      url: unref(url),
      queries: unref(queries),
    });
    loading.value = false;

    if (generalHttpHandle(response.status, response.data, true)) {
      error.value = true;
      return;
    }


    status.value = response.status;
    data.value = response.data;
    headers.value = response.headers;

  });


  return {
    loading,
    status,
    data,
    headers,
    error,
    refresh: () => refreshHandle.value++,
  };

}