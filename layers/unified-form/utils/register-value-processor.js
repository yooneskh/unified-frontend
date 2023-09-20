

export function appendValueProcessor({ criterion, processor }) {
  useRegisteredValueProcessors().value.push({
    criterion,
    processor,
  });
}

export function prependValueProcessor({ criterion, processor }) {
  useRegisteredValueProcessors().value.unshift({
    criterion,
    processor,
  });
}
