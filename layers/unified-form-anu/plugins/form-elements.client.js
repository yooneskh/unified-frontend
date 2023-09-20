

export default defineNuxtPlugin(() => {
  
  registerFormElement({
    identifier: 'text',
    component: defineAsyncComponent(() => import('../elements/element-text.vue')),
    valueProcessor: (v, f) => f.type === 'number' ? Number(v) : v
  });

  registerFormElement({
    identifier: 'media',
    component: defineAsyncComponent(() => import('../elements/element-media.vue')),
  });

  registerFormElement({
    identifier: 'checkbox',
    component: defineAsyncComponent(() => import('../elements/element-checkbox.vue')),
  });

  registerFormElement({
    identifier: 'resource',
    component: defineAsyncComponent(() => import('../elements/element-resource.vue')),
  });

  registerFormElement({
    identifier: 'date',
    component: defineAsyncComponent(() => import('../elements/element-date.vue')),
  });

  registerFormElement({
    identifier: 'select',
    component: defineAsyncComponent(() => import('../elements/element-select.vue')),
  });

  registerFormElement({
    identifier: 'series',
    component: defineAsyncComponent(() => import('../elements/element-series.vue')),
  });

});
