import { useMeta } from './use-meta';
import startCase from 'lodash/startCase';


function convertObjectSchemaToFields(schema) {
  return (
    Object.keys(schema)
      .map(key => ({ ...schema[key], key }))
      .map(convertMetaPropertyToField)
  );
}

function convertMetaPropertyToField(property) {

  let identifier = 'text';

  if (property.handlerElement) {
    identifier = property.handlerElement;
  }
  else if (property.type === 'boolean') {
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
    identifier = 'html';
  }
  else if (property.type === 'series') {
    identifier = 'series';
  }
  else if (property.type === 'string' && property.array) {
    identifier = 'tag-input';
  }
  else if (property.enum || property.array || property.items) {
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
    addable: property.array,
    itemBase: property.seriesBase,
    itemFields: property.seriesSchema ? convertObjectSchemaToFields(property.seriesSchema) : undefined,
    seriesColumns: property.seriesColumns,
    labelFormat: property.labelFormat,
    valueFormat: property.valueFormat,
    dateType: property.dateType,
    rows: property.rows ?? 5,
  };

}


export function useResourceMetaFields({ resource }) {

  const { meta } = useMeta({
    resource,
    filter: it => !it.hidden,
  });


  return {
    fields: computed(() =>
      convertObjectSchemaToFields(meta.value)
    ),
  };

}
