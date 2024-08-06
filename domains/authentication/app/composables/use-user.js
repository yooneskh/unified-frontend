

export const useUser = () => (
  useSimpleState('--auth-user--', () => undefined)
);
