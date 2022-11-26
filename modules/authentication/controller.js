import { http, generalHttpHandle, syncedRequest } from '../../services/http/mod';


export async function loadUserWithToken(loginToken, tokenRef, userRef) {

  const { status, data } = await syncedRequest('--auth-profile--', {
    method: 'get',
    url: `/authentication/identity`,
    headers: {
      Authorization: loginToken
    }
  });

  if (generalHttpHandle(status, data)) {
    throw new Error('could not login');
  }


  tokenRef.value = loginToken;
  userRef.value = data;
  http.applyHeader('Authorization', loginToken);

}

export async function logoutUser(tokenRef, userRef) {

  const { status, data } = await http.request({
    method: 'post',
    url: `/authentication/logout`
  });

  if (generalHttpHandle(status, data)) {
    alert('could not logout');
    return;
  }


  tokenRef.value = '';
  userRef.value = undefined;
  http.removeHeader('Authorization');

}
