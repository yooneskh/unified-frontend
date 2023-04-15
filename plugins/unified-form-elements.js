import { registerFormElement, registerValidator, registerTransformer, prependValueProcessor } from 'unified-form';


const charsToReplace = [
  ['۰', '0'],
  ['۱', '1'],
  ['۲', '2'],
  ['۳', '3'],
  ['۴', '4'],
  ['۵', '5'],
  ['۶', '6'],
  ['۷', '7'],
  ['۸', '8'],
  ['۹', '9'],
];

export default defineNuxtPlugin(app => {

  prependValueProcessor({
    criterion: f => f.identifier === 'text',
    processor: v => {

      for (const pair of charsToReplace) {
        v = v.replace(new RegExp(pair[0], 'g'), pair[1]);
      }

      return v;

    },
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
