<script setup>

const http = useHttp();

const router = useRouter();
const route = useRoute();


/* page */

definePageMeta({
  name: 'admin.dashboard',
  layout: 'admin',
});

useHead({
  title: 'پنل مدیریت',
});


/* template */

</script>


<template>
  <div class="py-6">
    Manage The Application
  </div>
</template>