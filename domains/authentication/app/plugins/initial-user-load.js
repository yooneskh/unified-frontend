

export default defineNuxtPlugin(async () => {

  if (!useToken().value) {
    return;
  }


  const { data } = await useUFetch('/authentication/identity', {
    method: 'get',
    headers: {
      Authorization: useToken().value,
    },
  });

  useUser().value = data.value;

});
