const http = useHttp();
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

    const { status, data } = await http.request({
      method: 'get',
      url: `${resourceUrl}/${resourceId}`,
    });

    if (generalHttpHandle(status, data, true)) {
      return;
    }


    return data;

  });

}