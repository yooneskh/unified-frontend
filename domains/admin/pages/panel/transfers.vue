<script setup>

const http = useHttp();

const router = useRouter();
const route = useRoute();


/* page */

definePageMeta({
  name: 'admin.transfers',
  layout: 'admin',
});

useHead({
  title: 'Transfers',
});


/* template */

</script>


<template>
  <resource-manager-card
    icon="i-bx-transfer"
    resource="Transfer"
    class="mt-6"
  />
</template>