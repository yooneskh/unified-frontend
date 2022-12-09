import { useMeta } from './use-meta';


import { registerFormElement } from 'unified-form';

registerFormElement({
  identifier: 'media',
  component: defineAsyncComponent(() => import('../components/form-element-media.vue'))
})


function convertMetaPropertyToField(property) {

  let identifier = 'text';

  if (property.type === 'boolean') {
    identifier = 'checkbox';
  }
  // else if (property.ref === 'Media' && property.array) {
  //   identifier = 'media';
  // }
  else if (property.ref === 'Media') {
    identifier = 'media';
  }
  // else if (property.ref) {
  //   identifier = 'resource';
  // }
  // else if (property.richText) {
  //   identifier = 'editor';
  // }
  // else if (property.type === 'series') {
  //   identifier = 'series';
  // }
  else if (property.enum || property.array) {
    identifier = 'select';
  }
  else if (property.longText) {
    identifier = 'textarea';
  }
  else if (property.type === 'number') {
    identifier = 'number';
  }

  return {
    vIf: property.vIf,
    key: property.key,
    identifier,
    label: property.title,
    resource: property.ref,
    width: property.width,
    multiple: property.array,
    items: property.items ?? property.enum,
    // searchable: true,
    addable: property.array,
    chips: property.type === 'string' && property.array,
  };

}


export function useResourceMetaFields({ resource }) {

  const { meta } = useMeta({
    resource,
    filter: it => !it.hidden,
  });


  return {
    fields: computed(() =>
      meta.value.map(convertMetaPropertyToField)
    ),
  };

}
