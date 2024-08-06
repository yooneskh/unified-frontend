

export async function authenticationLogoutUser(tokenRef, userRef) {

  await ufetch(`/authentication/logout`, {
    method: 'post',
  });


  tokenRef.value = '';
  userRef.value = undefined;

}
