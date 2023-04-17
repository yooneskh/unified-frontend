import { generalHttpHandle, http, syncedRequest } from "~/services/http/mod";


export function useHttp() {
  return {
    http,
    generalHttpHandle,
    syncedRequest,
  };
}
