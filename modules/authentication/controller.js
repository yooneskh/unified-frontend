import { $http, generalHttpHandle } from '../../services/http/mod';


export async function loadUserWithToken(loginToken, token, user) {

  const { status, data } = await $http.get({
    url: `/authentication/identity`,
    headers: {
      Authorization: loginToken
    }
  });

  if (generalHttpHandle(status, data)) {
    throw new Error('could not login');
  }


  token.value = loginToken;
  user.value = data;
  $http.applyHeader('Authorization', loginToken);

}

export async function logoutUser(token, user) {

  const { status, data } = await $http.post({
    url: `/authentication/logout`
  });

  if (generalHttpHandle(status, data)) {
    alert('could not logout');
    return;
  }


  token.value = '';
  user.value = undefined;
  $http.removeHeader('Authorization');

}
