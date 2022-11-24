import { makeUnifiedNetwork } from 'unified-network';


export const $http = makeUnifiedNetwork({
  baseUrl: 'https://api.zeimaran.com/api',
});


export function generalHttpHandle(status, data, silent) {
  if (status !== 200) {

    if (!silent) {
      alert(data?.message || 'Please try again.');
    }

    return true;

  }
}
