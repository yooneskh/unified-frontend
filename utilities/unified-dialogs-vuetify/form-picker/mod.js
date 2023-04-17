import FormPickerDialog from './dialog.vue';
const { launchDialog } = useDialog();


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
