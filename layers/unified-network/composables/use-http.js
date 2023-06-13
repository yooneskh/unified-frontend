import { makeUnifiedNetwork } from 'unified-network';
import { AppConfig } from '~/app-config';


const http = makeUnifiedNetwork({
  baseUrl: `${AppConfig.http.baseUrl}/api`,
  processor: async ({ url, method, body, headers }) => {

    try {

      const response = await $fetch.raw(url, {
        method: method.toUpperCase(),
        body,
        headers,
        retry: 0,
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


export function useHttp() {
  return http;
}
