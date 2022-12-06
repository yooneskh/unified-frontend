import { useMeta } from './use-meta';


function convertMetaPropertyToField(property) {

  let identifier = 'text';

  if (property.type === 'boolean') {
    identifier = 'checkbox';
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
    resource: computed(() => resource),
    filter: it => !it.hidden,
  });


  return {
    fields: computed(() =>
      meta.value.map(convertMetaPropertyToField)
    ),
  };

}
