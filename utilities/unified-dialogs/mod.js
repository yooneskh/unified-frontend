import { markRaw } from 'vue';
import { useDialogs } from './state';


function uuid() {
  return (
    new Array(4)
      .fill()
      .map(() => Math.random().toString(16).slice(2))
      .join('-')
  );
}


export function launchDialog({ component, props, options }) {

  const dialogs = useDialogs();

  return new Promise((resolve, reject) => {
    dialogs.value.push({
      key: uuid(),
      component: markRaw(component),
      modelValue: true,
      props: props ?? {},
      options: options ?? {},
      resolve,
      reject,
    });
  });

}


export {
  default as UnifiedDialogProvider
} from './provider.vue';
