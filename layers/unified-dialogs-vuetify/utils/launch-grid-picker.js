import GridPickerDialog from '../grid-picker/dialog.vue';


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
