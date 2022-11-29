import { http, generalHttpHandle } from '../../../services/http/mod';


export function useNetwork({ method, url }) {

  const loading = ref(false);

  const status = ref(0)
  const data = ref(undefined);
  const headers = ref({});

  const error = ref(false);


  watchEffect(async () => {

    if (!unref(method) || !unref(url)) {
      return;
    }


    loading.value = true;
    const response = await http.request({
      method: unref(method),
      url: unref(url),
    });
    loading.value = false;

    if (generalHttpHandle(response.status, response.data)) {
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
  };

}