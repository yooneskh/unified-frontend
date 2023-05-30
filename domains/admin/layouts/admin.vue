<script setup>

const router = useRouter();
const route = useRoute();


/* scroll fix */

onMounted(() => {
  document.body.parentElement.style.overflowY = 'unset';
});

onUnmounted(() => {
  document.body.parentElement.style.overflowY = '';
});


/* authentication */

const user = useUser();

watch(route, () => {
  if (!user.value || !user.value._id) {
    router.replace({ name: 'authentication' });
  }
}, { immediate: true });


/* template */

</script>


<template>
  <v-layout>

    <admin-sidebar />

    <v-main class="h-100 overflow-y-auto">
      <slot />
    </v-main>

  </v-layout>
</template>