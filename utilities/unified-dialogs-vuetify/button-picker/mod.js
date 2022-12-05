import { launchDialog } from '../../unified-dialogs/mod';

import ButtonPickerDialog from './dialog.vue';


export async function launchButtonPickerDialog({ icon, title, subtitle, text, startButtons, endButtons, isReversed, options }) {
  return launchDialog({
    component: ButtonPickerDialog,
    props: {
      icon,
      title,
      subtitle,
      text,
      startButtons,
      endButtons,
      isReversed,
    },
    options,
  });
}
