import { retrieveMeta } from './use-meta';


export async function retrieveResourceTitle({ resource, resourceObject }) {

  const meta = await retrieveMeta({ resource });

  console.log(meta);

  const titleableMetas = meta.filter(it => it.titleable);


  return (await Promise.all(
    titleableMetas.map(async property => {
      return resourceObject[property.key];
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