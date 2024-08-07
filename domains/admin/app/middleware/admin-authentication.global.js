

export default defineNuxtRouteMiddleware((to) => {
  
  const user = useUser();

  if (to.meta.layout === 'admin' && !user.value?.permissions?.some(it => it.startsWith('admin'))) {
    return navigateTo({
      name: 'authentication',
    });
  }

});
