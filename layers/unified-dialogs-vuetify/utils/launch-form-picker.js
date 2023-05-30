import FormPickerDialog from '../form-picker/dialog.vue';


export async function launchFormPickerDialog({ icon, title, subtitle, text, initialForm, fields, submitLabel, cancelLabel, submitHandler, options }) {
  return launchDialog({
    component: FormPickerDialog,
    props: {
      icon,
      title,
      subtitle,
      text,
      initialForm,
      fields,
      submitLabel,
      cancelLabel,
      submitHandler,
    },
    options,
  });
}
