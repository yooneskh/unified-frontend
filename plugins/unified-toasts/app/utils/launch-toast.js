// @unocss-include

import { useToasts } from '../states/toasts';


function launchToast({ color, icon, title, duration, clickHandler, closeHandler, action, actionIcon, actionHandler }) {
  useToasts().value.push({
    key: makeUuid(),
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

export function toast({ color, icon, title, duration, clickHandler, closeHandler, action, actionIcon, actionHandler }) {
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

export function toastSuccess({ color, icon, title, duration, clickHandler, closeHandler, action, actionIcon, actionHandler }) {
  launchToast({
    color: color ?? 'success',
    icon: icon ?? 'i-mdi-check',
    title,
    duration,
    clickHandler,
    closeHandler,
    action,
    actionIcon,
    actionHandler,
  });
}

export function toastDanger({ color, icon, title, duration, clickHandler, closeHandler, action, actionIcon, actionHandler }) {
  launchToast({
    color: color ?? 'danger',
    icon: icon || 'i-mdi-alert',
    title,
    duration: duration || 10000,
    clickHandler,
    closeHandler,
    action,
    actionIcon,
    actionHandler,
  });
}

export function toastWarning({ color, icon, title, duration, clickHandler, closeHandler, action, actionIcon, actionHandler }) {
  launchToast({
    color: color ?? 'warning',
    icon: icon ?? 'i-mdi-bell',
    title,
    duration,
    clickHandler,
    closeHandler,
    action,
    actionIcon,
    actionHandler,
  });
}

