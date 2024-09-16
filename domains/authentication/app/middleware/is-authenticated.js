

export default defineNuxtRouteMiddleware(() => {
  if (!useUser().value) {
    return navigateTo({ name: 'authentication' });
  }
});