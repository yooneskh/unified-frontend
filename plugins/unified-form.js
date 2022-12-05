import 'unified-form-vuetify';


export default defineNuxtPlugin(app => {

  app.vueApp.component(
    'u-form',
    defineAsyncComponent(() => import('unified-form'))
  );

});
