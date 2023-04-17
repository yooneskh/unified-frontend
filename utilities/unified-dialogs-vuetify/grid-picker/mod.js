import GridPickerDialog from './dialog.vue';
const { launchDialog } = useDialog();


export async function launchGridPickerDialog({ icon, title, subtitle, text, items, selectedItem, options }) {
  return launchDialog({
    component: GridPickerDialog,
    props: {
      icon,
      title,
      subtitle,
      text,
      items,
      selectedItem,
    },
    options,
  });
}
