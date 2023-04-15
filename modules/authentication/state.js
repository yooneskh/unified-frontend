

export const useToken = () => {

  const cookie = useCookie('--auth-token--', { // todo: handle spa mode separately
    maxAge: 3600 * 24 * 30,
  });

  const state = useState('--auth-token--', () => cookie.value);

  return computed({
    get: () => state.value,
    set:  v => {
      cookie.value = v;
      state.value = v;
    },
  });

};

export const useUser = () => (
  useState('--auth-user--', () => undefined)
);
