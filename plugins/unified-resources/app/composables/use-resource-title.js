import { retrieveResourceArrayTitles } from '../utils/retrieve-resource-title';


export function useResourceTitle({ resource, resourceId }) {

  resource = toRef(resource);
  resourceId = toRef(resourceId);

  const title = ref('');
  const loading = ref(false);
  const refreshHandle = ref(0);


  watch([resource, resourceId, refreshHandle], async () => {

    if (!toValue(resourceId)) {
      return;
    }


    loading.value = true;

    try {
      title.value = await retrieveResourceTitle({
        resource: toValue(resource),
        resourceId: toValue(resourceId),
      });
    }
    catch {
      title.value = '';
    }
    finally {
      loading.value = false;
    }

  }, { immediate: true });


  return {
    title,
    loading,
    refresh: () => refreshHandle.value++,
  };

}


export function useResourceArrayTitlesMap({ resource, resourceIds }) {

  resource = toRef(resource);
  resourceIds = toRef(resourceIds);

  const titles = ref({});
  const loading = ref(false);
  const refreshHandle = ref(0);


  watch([resource, resourceIds, refreshHandle], async () => {

    loading.value = true;

    try {
      titles.value = await retrieveResourceArrayTitlesMap({
        resource: toValue(resource),
        resourceIds: toValue(resourceIds),
      });
    }
    catch {
      titles.value = {};
    }
    finally {
      loading.value = false;
    }

  }, { immediate: true, deep: true });


  return {
    titles,
    loading,
    refresh: () => refreshHandle.value++,
  };

}


export function useResourceArrayTitles({ resource, resourceIds, seperator }) {

  resource = toRef(resource);
  resourceIds = toRef(resourceIds);
  seperator = toRef(seperator);

  const title = ref('');
  const loading = ref(false);
  const refreshHandle = ref(0);


  watch([resource, resourceIds, seperator, refreshHandle], async () => {

    loading.value = true;

    try {
      title.value = await retrieveResourceArrayTitles({
        resource: toValue(resource),
        resourceIds: toValue(resourceIds),
        seperator: toValue(seperator),
      });
    }
    catch {
      title.value = '';
    }
    finally {
      loading.value = false;
    }

  }, { immediate: true, deep: true });


  return {
    title,
    loading,
    refresh: () => refreshHandle.value++,
  };

}
