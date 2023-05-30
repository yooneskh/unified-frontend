const http = useHttp();


export async function loadUserWithToken(loginToken, tokenRef, userRef, silent = false) {

  const { status, data } = await syncedRequest('--auth-profile--', {
    method: 'get',
    url: `/authentication/identity`,
    headers: {
      Authorization: loginToken,
    },
  });

  if (generalHttpHandle(status, data, silent)) {
    throw new Error('could not login');
  }


  tokenRef.value = loginToken;
  userRef.value = data;
  http.applyHeader('Authorization', loginToken);

}

export async function reloadUser(silent = false) {

  const token = useToken();
  const user = useUser();

  await loadUserWithToken(token.value, token, user, silent);

}
