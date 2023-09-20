const http = useHttp();


export async function syncedRequest(key, config) {

  if (import.meta.env.VITE_BUILT_STATIC === 'true') {
    const response = await http.request(config);
    return JSON.parse(JSON.stringify( response ));
  }
  else {
    const response = await useAsyncData(key, () => http.request(config));
    return JSON.parse(JSON.stringify( response.data.value ));
  }

}