import { useDialogs } from '../states/dialogs';


export function launchDialog({ component, props, options }) {

  const dialogs = useDialogs();

  return new Promise((resolve, reject) => {
    dialogs.value.push({
      key: makeUuid(),
      component: markRaw(component),
      modelValue: true,
      props: props ?? {},
      options: options ?? {},
      resolve,
      reject,
    });
  });

}
