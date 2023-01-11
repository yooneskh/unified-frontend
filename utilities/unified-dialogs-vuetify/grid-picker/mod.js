import { launchDialog } from '../../unified-dialogs/mod';

import GridPickerDialog from './dialog.vue';


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
