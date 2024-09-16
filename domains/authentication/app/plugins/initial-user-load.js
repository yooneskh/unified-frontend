

export default defineNuxtPlugin(async () => {

  if (!useToken().value || useUser().value) {
    return;
  }

  try {

    const data = await ufetch('/authentication/identity', {
      headers: {
        Authorization: useToken().value,
      },
      silent: true,
    });
  
    useUser().value = data;

  }
  catch {
    useToken().value = '';
    useUser().value = undefined;
  }

});
