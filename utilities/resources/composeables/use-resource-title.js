import { AppConfig } from '~~/app-config';
import { retrieveMeta } from './use-meta';
import { retrieveResourceObject } from './use-resource-object';


export async function retrieveResourceTitle({ resource, resourceId }) {

  const meta = await retrieveMeta({
    resource,
  });

  const resourceObject = await retrieveResourceObject({
    resource,
    resourceId,
  });

  const titleableMetas = meta.filter(it => it.titleable);


  return (await Promise.all(
    titleableMetas.map(async property => {

      if (!property.ref) {

        if (property.variants) {
          return resourceObject[property.key]?.[AppConfig.locale.default];
        }

        return resourceObject[property.key];

      }


      return retrieveResourceTitle({
        resource: property.ref,
        resourceId: resourceObject[property.key],
      });

    })
  )).join(' ');

}


export function useResourceTitle({ resource, resourceId }) {

  const title = ref('');
  const refreshHandle = ref(0);


  watch([resource, resourceId, refreshHandle], async () => {

    if (!unref(resourceId)) {
      return;
    }


    title.value = '';

    title.value = await retrieveResourceTitle({
      resource: unref(resource),
      resourceId: unref(resourceId),
    });

  }, { immediate: true });


  return {
    title,
    refresh: () => refreshHandle.value++,
  };

}
