import FormPickerDialog from '../form-picker/dialog.vue';


export async function launchFormPickerDialog({ icon, title, subtitle, text, classes, fields, submitLabel, cancelLabel, handler, options }) {
  return launchDialog({
    component: FormPickerDialog,
    props: {
      icon,
      title,
      subtitle,
      text,
      classes,
      fields,
      submitLabel,
      cancelLabel,
      handler,
    },
    options,
  });
}
