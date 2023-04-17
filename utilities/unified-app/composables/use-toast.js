import { launchToast } from "~~/utilities/unified-toasts/mod";


function toast({ color, icon, title, duration, clickHandler, closeHandler, action, actionIcon, actionHandler }) {
  launchToast({
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

function toastSuccess({ color, icon, title, duration, clickHandler, closeHandler, action, actionIcon, actionHandler }) {
  launchToast({
    type: 'success',
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

function toastError({ color, icon, title, duration, clickHandler, closeHandler, action, actionIcon, actionHandler }) {
  launchToast({
    type: 'error',
    color,
    icon,
    title,
    duration: duration || 10000,
    clickHandler,
    closeHandler,
    action,
    actionIcon,
    actionHandler,
  });
}

function toastWarning({ color, icon, title, duration, clickHandler, closeHandler, action, actionIcon, actionHandler }) {
  launchToast({
    type: 'warning',
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

function toastInfo({ color, icon, title, duration, clickHandler, closeHandler, action, actionIcon, actionHandler }) {
  launchToast({
    type: 'info',
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


export function useToast() {
  return {
    toast,
    toastSuccess,
    toastError,
    toastWarning,
    toastInfo,
  };
}
