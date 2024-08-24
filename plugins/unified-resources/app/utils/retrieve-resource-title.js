

export async function retrieveResourceTitle({ resource, resourceId }) {

  const meta = await retrieveMeta({
    resource,
  });

  const resourceObject = await retrieveResourceObject({
    resource,
    resourceId,
  });

  const titleableMetas = Object.entries(meta).map(it => ({ ...it[1], key: it[0] })).filter(it => it.titleable);


  return (await Promise.all(
    titleableMetas.map(async property => {

      if (!property.ref) {

        if (property.variants) {
          return resourceObject[property.key]?.[useAppConfig().locale.default];
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


export async function retrieveResourceArrayTitles({ resource, resourceIds, seperator = ' - ' }) {

  const titles = await Promise.all(
    resourceIds.map?.(resourceId =>
      retrieveResourceTitle({
        resource,
        resourceId,
      })
    )
  );

  return titles.join(seperator);
  
}


export async function retrieveResourceArrayTitlesMap({ resource, resourceIds }) {

  const titles = {};

  await Promise.all(
    resourceIds.map?.(resourceId =>
      retrieveResourceTitle({
        resource,
        resourceId,
      })
      .then(title => {
        titles[resourceId] = title
      })
    )
  );

  return titles;

}
