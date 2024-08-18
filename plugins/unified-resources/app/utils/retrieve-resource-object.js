const cacher = useCacher();


export async function retrieveResourceObject({ resource, resourceId }) {

  if (!resource || !resourceId) {
    return;
  }

  if (cacher.has(`resource.${resource}.${resourceId}.object`)) {
    return cacher.get(`resource.${resource}.${resourceId}.object`);
  }


  return cacher.preempt(`resource.${resource}.${resourceId}.object`, async () => {

    const resourceUrl = retrieveResourceUrl({ resource });

    try {
      return await ufetch(`${resourceUrl}/${resourceId}`);
    }
    catch {
      return undefined;
    }

  });

}