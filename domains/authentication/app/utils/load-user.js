

export async function authenticationLoadUserWithToken(loginToken, tokenRef, userRef) {

  const data = await ufetch('/authentication/identity', {
    method: 'get',
    headers: {
      Authorization: loginToken,
    },
  });


  tokenRef.value = loginToken;
  userRef.value = data;

}

export async function authenticationReloadUser(silent = false) {
  await authenticationLoadUserWithToken(useToken().value, useToken(), useUser(), silent);
}
