const http = useHttp();


export async function syncedRequest(key, config) {

  const response = await useAsyncData(key, () => http.request(config));

  return JSON.parse(JSON.stringify( response.data.value ));

}