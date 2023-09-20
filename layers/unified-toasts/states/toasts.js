

export const useToasts = () => (
  useSimpleState('--unified-toasts-toasts--', () => [])
);
