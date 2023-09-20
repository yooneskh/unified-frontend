

export default defineNuxtPlugin(() => {

  registerValidator({
    key: 'is-number',
    validator: v => !isNaN(v),
  });

  registerValidator({
    key: 'is-digits',
    validator: v => /^[0-9]*$/.test(v),
  });

  registerValidator({
    key: 'is-filled',
    validator: v => {

      if (typeof v === 'string') {
        return v.trim().length > 0;
      }

      if (typeof v === 'number') {
        return v === 0 || !!v;
      }

      return !!v;

    },
  });

});
