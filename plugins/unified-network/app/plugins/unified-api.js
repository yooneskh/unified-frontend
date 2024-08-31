

function generalHandler(options, request, response) {

  if (options.loading) {
    options.loading.value = false;
  }

  if (!options.handled && response && response?.status !== 200 && !options.silent) {

    toastDanger({
      title: response?._data?.error ?? 'There was a problem. Please try again later.',
    });

    options.handled = true;

  }

}


export default defineNuxtPlugin(() => {

  const $api = $fetch.create({
    baseURL: useAppConfig().http.apiUrl,
    onRequest: ({ options }) => {

      if (options.loading) {
        options.loading.value = true;
      }

      if (useToken().value) {
        options.headers = {
          Authorization: useToken().value,
          ...(options.headers ?? {}),
        };
      }

    },
    onRequestError: ({ options, request, response }) => {
      generalHandler(options, request, response)
    },
    onResponse: ({ options, request, response }) => {
      generalHandler(options, request, response)
    },
    onResponseError: ({ options, request, response }) => {
      generalHandler(options, request, response)
    },
  });


  return {
    provide: {
      api: $api,
    },
  };

});
