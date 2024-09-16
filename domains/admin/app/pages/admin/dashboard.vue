<script setup>

/* page */

definePageMeta({
  name: 'admin.dashboard',
  layout: 'admin',
  middleware: 'is-authenticated-admin',
});

useHead({
  title: 'Dashboard',
});

</script>


<template>
  <content-container class="text-center py-8 text-xl font-bold">
    Admin Dashboard
  </content-container>
</template>