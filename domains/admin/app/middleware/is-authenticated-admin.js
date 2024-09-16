

export default defineNuxtRouteMiddleware(() => {
  if (!useUser().value?.permissions?.some(it => it.startsWith('admin'))) {
    return navigateTo({ name: 'authentication' });
  }
});
