import { AppConfig } from '~~/app-config';
import { retrieveMeta } from './use-meta';
import { retrieveResourceObject } from './use-resource-object';


export async function retrieveResourceTitle({ resource, resourceObject }) {

  const meta = await retrieveMeta({ resource });

  const titleableMetas = meta.filter(it => it.titleable);


  return (await Promise.all(
    titleableMetas.map(async property => {

      if (!property.ref) {

        if (property.variants) {
          return resourceObject[property.key][AppConfig.locale.default];
        }

        return resourceObject[property.key];

      }


      return retrieveResourceTitle({
        resource: property.ref,
        resourceObject: await retrieveResourceObject({
          resource: property.ref,
          resourceId: resourceObject[property.key],
        }),
      });

    })
  )).join(' ');

}


export function useResourceTitle({ resource, resourceObject }) {

  const title = ref('');


  watch([resource, resourceObject], async () => {

    if (!unref(resourceObject)) {
      return;
    }


    title.value = '';

    title.value = await retrieveResourceTitle({
      resource: unref(resource),
      resourceObject: unref(resourceObject),
    });

  }, { immediate: true });


  return {
    title,
  };

}
