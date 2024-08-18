import pluralize from 'pluralize';
import kebabCase from 'lodash/kebabCase';


export function retrieveResourceUrl({ resource }) {
  return kebabCase( pluralize(toValue(resource)) );
}
