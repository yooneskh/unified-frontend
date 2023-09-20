import { useDialogs } from '../states/dialogs';


export function launchDialog({ component, props, options }) {
  
  const dialogs = useDialogs();

  return new Promise((resolve, reject) => {

    const dialog = reactive({
      key: makeUuid(),
      component: markRaw(component),
      modelValue: false,
      props: props ?? {},
      options: options ?? {},
      resolve,
      reject,
    });

    dialogs.value.push(dialog);

    setTimeout(() => {
      dialog.modelValue = true;
    }, 5);

  });

}
