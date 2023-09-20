<script setup>

const http = useHttp();

const router = useRouter();
const route = useRoute();


/* page */

definePageMeta({
  name: 'admin.settings.home',
  layout: 'admin',
});

useHead({
  title: 'Home Settings',
});


/* template */

</script>


<template>
  <setting-manager-card
    title="Home Setting"
    resource="HomeSetting"
    class="mt-6"
  />
</template>