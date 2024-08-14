import ButtonPickerDialog from '../button-picker/dialog.vue';


export async function launchButtonPickerDialog({ icon, title, subtitle, text, classes, startButtons, endButtons, options }) {
  return launchDialog({
    component: ButtonPickerDialog,
    props: {
      icon,
      title,
      subtitle,
      text,
      classes,
      startButtons,
      endButtons,
    },
    options,
  });
}
