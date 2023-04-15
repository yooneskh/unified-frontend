import { makeUnifiedNetwork } from 'unified-network';
import { AppConfig } from '~/app-config';


export const http = makeUnifiedNetwork({
  baseUrl: `${AppConfig.http.baseUrl}/api`,
  processor: async ({ url, method, body, headers }) => {

    try {

      const response = await $fetch.raw(url, {
        method: method.toUpperCase(),
        body,
        headers,
      });


      return {
        status: response?.status,
        headers: Object.fromEntries( response?.headers.entries() ?? [] ),
        data: response?._data,
      };

    }
    catch (error) {

      if (!('statusCode' in error )) {
        console.error(error);
      }

      return {
        status: error.statusCode,
        headers: Object.fromEntries( error.response?.headers.entries() ?? [] ),
        data: error.data,
      };

    }

  }
});


export function generalHttpHandle(status, data, silent) {
  if (status !== 200) {

    if (!silent) {
      alert(data?.message || 'Please try again.');
    }

    return true;

  }
}


export async function syncedRequest(key, config) {

  const response = await useAsyncData(key, () => http.request(config));

  return JSON.parse(JSON.stringify( response.data.value ));

}
