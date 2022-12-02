import pluralize from 'pluralize';
import snakeCase from 'lodash/snakeCase';


export function retrieveResourceUrl({ resource }) {
  return snakeCase( pluralize(unref(resource)) );
}


export function useResourceUrl({ resource }) {

  return {
    resourceUrlPart: computed(() =>
      retrieveResourceUrl({ resource })
    ),
  };

}