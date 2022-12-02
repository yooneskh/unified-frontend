

export async function retrieveResourceTitle({ resource, resourceObject }) {
  return '---';
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