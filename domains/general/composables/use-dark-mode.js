

export const useDarkMode = () => (
  useLocalState('--general-dark-mode--', () => false)
);
