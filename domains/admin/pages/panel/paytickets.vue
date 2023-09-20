<script setup>

const http = useHttp();

const router = useRouter();
const route = useRoute();


/* page */

definePageMeta({
  name: 'admin.paytickets',
  layout: 'admin',
});

useHead({
  title: 'Paytickets',
});


/* template */

</script>


<template>
  <resource-manager-card
    icon="i-bx-money"
    resource="Payticket"
    class="mt-6"
  />
</template>