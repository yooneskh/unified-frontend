import pluralize from 'pluralize';
import snakeCase from 'lodash/snakeCase';


export function useResourceUrl({ resource }) {

  return {
    resourceUrlPart: computed(() =>
      snakeCase( pluralize(unref(resource)) )
    ),
  };

}