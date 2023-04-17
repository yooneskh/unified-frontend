import ListPickerDialog from './dialog.vue';
const { launchDialog } = useDialog();


export async function launchListPickerDialog({ icon, title, subtitle, text, items, isNavigation, options }) {
  return launchDialog({
    component: ListPickerDialog,
    props: {
      icon,
      title,
      subtitle,
      text,
      items,
      isNavigation,
    },
    options,
  });
}
