

export function registerTransformer({ criterion, transducer }) {
  useRegisteredTransformers().value.push({
    criterion,
    transducer,
  });
}
