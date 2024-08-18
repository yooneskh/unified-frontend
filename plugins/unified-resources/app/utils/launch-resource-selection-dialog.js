import ResourceSelectionDialog from '../dialogs/resource-selection-dialog.vue';


export function launchResourceSelectionDialog({ resource, multiple, resourceIds, options }) {
  return launchDialog({
    component: ResourceSelectionDialog,
    props: {
      resource,
      multiple,
      resourceIds,
    },
    options,
  });
}
