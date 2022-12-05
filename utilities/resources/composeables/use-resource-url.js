import pluralize from 'pluralize';
import kebabCase from 'lodash/kebabCase';


export function retrieveResourceUrl({ resource }) {
  return kebabCase( pluralize(unref(resource)) );
}


export function useResourceUrl({ resource }) {

  return {
    resourceUrlPart: computed(() =>
      retrieveResourceUrl({ resource })
    ),
  };

}