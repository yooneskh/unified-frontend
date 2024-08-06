

export const useToken = () => (
  usePersistentState(`--${useAppConfig().id}-auth-token--`, () => '')
);
