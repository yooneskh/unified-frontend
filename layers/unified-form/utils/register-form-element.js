

export function registerFormElement({ identifier, component, valueProcessor }) {
  useRegisteredElements().value.push({
    identifier,
    component: markRaw(component),
    valueProcessor,
  });
}
