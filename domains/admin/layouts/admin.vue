<script setup>

const router = useRouter();


/* authentication */

const user = useUser();

watch(user, () => {
  if (!user.value || !user.value._id) {
    router.replace({
      name: 'authentication',
      query: {
        next: '::admin.dashboard',
      },
    });
  }
}, { immediate: true });


/* locale */

useElementClass({
  el: () => document.body,
  classes: 'ltr',
});


/* template */

</script>


<template>
  <div v-if="user && user._id">
    <general-header />
    <admin-toolbar />
    <content-container>
      <slot />  
    </content-container>
  </div>
</template>
