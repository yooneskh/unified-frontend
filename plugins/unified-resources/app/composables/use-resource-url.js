

export function useResourceUrl({ resource }) {

  return {
    resourceUrlPart: computed(() =>
      retrieveResourceUrl({
        resource,
      })
    ),
  };

}