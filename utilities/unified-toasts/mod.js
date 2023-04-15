import { markRaw } from 'vue';
import { useToasts } from './state';


function uuid() {
  return (
    new Array(4)
      .fill()
      .map(() => Math.random().toString(16).slice(2))
      .join('-')
  );
}


export function launchToast({ type, color, icon, title, duration, clickHandler, closeHandler, action, actionIcon, actionHandler }) {

  const toasts = useToasts();

  toasts.value.push({
    key: uuid(),
    type,
    color,
    icon,
    title,
    duration,
    clickHandler,
    closeHandler,
    action,
    actionIcon,
    actionHandler,
  });

}


export {
  default as UnifiedToastsProvider
} from './provider.vue';
