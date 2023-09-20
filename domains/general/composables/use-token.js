

export const useToken = () => (
  usePersistentState('--general-token--', () => '')
);
