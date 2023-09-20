<script setup>

const http = useHttp();

const router = useRouter();
const route = useRoute();


/* page */

definePageMeta({
  name: 'admin.accounts',
  layout: 'admin',
});

useHead({
  title: 'Accounts',
});


/* template */

</script>


<template>
  <resource-manager-card
    icon="i-bx-bxs-bank"
    resource="Account"
    class="mt-6"
  />
</template>