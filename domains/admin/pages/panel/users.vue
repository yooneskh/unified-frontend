<script setup>

const http = useHttp();

const router = useRouter();
const route = useRoute();


/* page */

definePageMeta({
  name: 'admin.users',
  layout: 'admin',
});

useHead({
  title: 'Users',
});


/* template */

</script>


<template>
  <resource-manager-card
    icon="i-bx-bxs-user-detail"
    resource="User"
    class="mt-6"
  />
</template>