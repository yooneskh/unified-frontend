import ResourceObjectDialog from '../dialogs/resource-object-dialog.vue';


export function launchResourceObjectDialog({ resource, resourceId, options }) {
  return launchDialog({
    component: ResourceObjectDialog,
    props: {
      resource,
      resourceId,
    },
    options,
  });
}
