import { launchDialog } from '../../unified-dialogs/mod';

import ListPickerDialog from './dialog.vue';


export async function launchListPickerDialog({ icon, title, subtitle, text, items, options }) {
  return launchDialog({
    component: ListPickerDialog,
    props: {
      icon,
      title,
      subtitle,
      text,
      items,
    },
    options,
  });
}
