

export async function logoutUser(tokenRef, userRef) {

  const { status, data } = await http.request({
    method: 'post',
    url: `/authentication/logout`,
  });

  if (generalHttpHandle(status, data)) {
    alert('could not logout');
    return;
  }


  tokenRef.value = '';
  userRef.value = undefined;
  http.removeHeader('Authorization');

}
