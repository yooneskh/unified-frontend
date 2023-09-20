import { retrieveResourceArrayTitles } from '../utils/retrieve-resource-title';


export function useResourceTitle({ resource, resourceId }) {

  const title = ref('');
  const loading = ref(false);
  const refreshHandle = ref(0);


  watchImmediate([resource, resourceId, refreshHandle], async () => {

    if (!unref(resourceId)) {
      return;
    }


    loading.value = true;

    try {
      title.value = await retrieveResourceTitle({
        resource: unref(resource),
        resourceId: unref(resourceId),
      });
    }
    catch {
      title.value = '';
    }
    finally {
      loading.value = false;
    }

  });


  return {
    title,
    loading,
    refresh: () => refreshHandle.value++,
  };

}


export function useResourceArrayTitlesMap({ resource, resourceIds }) {

  const titles = ref({});
  const loading = ref(false);
  const refreshHandle = ref(0);


  watchImmediate([resource, resourceIds, refreshHandle], async () => {

    loading.value = true;

    try {
      titles.value = await retrieveResourceArrayTitlesMap({
        resource: unref(resource),
        resourceIds: unref(resourceIds),
      });
    }
    catch {
      titles.value = {};
    }
    finally {
      loading.value = false;
    }

  });


  return {
    titles,
    loading,
    refresh: () => refreshHandle.value++,
  };

}


export function useResourceArrayTitles({ resource, resourceIds, seperator }) {

  const title = ref('');
  const loading = ref(false);
  const refreshHandle = ref(0);

  const _seperator = ref(seperator);


  watchImmediate([resource, resourceIds, _seperator, refreshHandle], async () => {

    loading.value = true;

    try {
      title.value = await retrieveResourceArrayTitles({
        resource: unref(resource),
        resourceIds: unref(resourceIds),
        seperator: unref(_seperator),
      });
    }
    catch {
      title.value = '';
    }
    finally {
      loading.value = false;
    }

  });


  return {
    title,
    loading,
    refresh: () => refreshHandle.value++,
  };

}
