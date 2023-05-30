

export const useUser = () => (
  useState('--auth-user--', () => undefined)
);
