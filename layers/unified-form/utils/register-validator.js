

export function registerValidator({ key, validator }) {
  useRegisteredValidators().value.push({
    key,
    validator,
  });
}
