const cacher = useCacher();


export async function retrieveMeta({ resource }) {

  if (!resource) {
    return {};
  }

  if (cacher.has(`resource.${resource}`)) {
    return cacher.get(`resource.${resource}`);
  }


  return cacher.preempt(`resource.${resource}`, async () => {

    const resourceUrlPart = retrieveResourceUrl({ resource });

    try {
      return await ufetch(`${resourceUrlPart}/meta`);
    }
    catch {
      return [];
    }

  });

}
