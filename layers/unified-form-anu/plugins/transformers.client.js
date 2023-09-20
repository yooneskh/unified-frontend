

export default defineNuxtPlugin(() => {
  
  registerTransformer({
    criterion: f => f.identifier === 'number',
    transducer: f => ({
      ...f,
      identifier: 'text',
      type: 'number',
    })
  });

});
