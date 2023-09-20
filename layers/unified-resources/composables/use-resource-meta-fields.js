import { useMeta } from './use-meta';


function convertSeriesSchemaToFields(schema) {
  return (
    Object.keys(schema)
      .map(key => ({ ...schema[key], key }))
      .map(convertMetaPropertyToField)
  );
}


import startCase from 'lodash/startCase';

function convertMetaPropertyToField(property) {

  let identifier = 'text';

  if (property.type === 'boolean') {
    identifier = 'checkbox';
  }
  else if (property.ref === 'Media' && property.array) {
    identifier = 'media-list';
  }
  else if (property.ref === 'Media') {
    identifier = 'media';
  }
  else if (property.ref) {
    identifier = 'resource';
  }
  else if (property.richText) {
    identifier = 'editor';
  }
  else if (property.type === 'series') {
    identifier = 'series';
  }
  else if (property.enum || property.array) {
    identifier = 'select';
  }
  else if (property.longText) {
    identifier = 'textarea';
  }
  else if (property.labelFormat || property.valueFormat || property.dateType) {
    identifier = 'date';
  }
  else if (property.type === 'number') {
    identifier = 'number';
  }

  return {
    vIf: property.vIf,
    variants: property.variants,
    key: property.key,
    identifier,
    label: property.title ?? startCase(property.key),
    width: property.width,
    resource: property.ref,
    multiple: property.array,
    items: property.items ?? property.enum,
    // searchable: true,
    addable: property.array,
    chips: property.type === 'string' && property.array,
    itemBase: property.seriesBase,
    itemFields: property.seriesSchema ? convertSeriesSchemaToFields(property.seriesSchema) : undefined,
    seriesColumns: property.seriesColumns,
    labelFormat: property.labelFormat,
    valueFormat: property.valueFormat,
    dateType: property.dateType,
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
