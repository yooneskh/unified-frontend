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


export function useResourceArrayTitles({ resource, resourceIds }) {

  const refreshHandle = ref(0);

  const titles = ref({});
  const loading = ref(false);


  watch([resource, resourceIds, refreshHandle], async () => {

    for (const key of Object.keys(titles.value)) {
      if (!( unref(resourceIds).includes(key) )) {
        delete titles.value[key];
      }
    }


    loading.value = true;

    await Promise.all(
      unref(resourceIds).map(resourceId =>
        retrieveResourceTitle({
          resource: unref(resource),
          resourceId: unref(resourceId),
        })
        .then(title =>
          titles.value[unref(resourceId)] = title
        )
      )
    );

    loading.value = false;

  }, { immediate: true });


  return {
    titles,
    loading,
    refresh: () => refreshHandle.value++,
  };

}
