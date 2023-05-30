const http = useHttp();
const cacher = useCacher();


export async function retrieveMeta({ resource }) {

  if (!resource) {
    return [];
  }

  if (cacher.has(`resource.${resource}`)) {
    return cacher.get(`resource.${resource}`);
  }


  return cacher.preempt(`resource.${resource}`, async () => {

    const resourceUrlPart = retrieveResourceUrl({ resource });


    const { status, data } = await http.request({
      method: 'get',
      url: `${resourceUrlPart}/meta`,
    });

    if (generalHttpHandle(status, data, true)) {
      return [];
    }


    return data

  });

}
