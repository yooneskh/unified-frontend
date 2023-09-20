<script setup>

const http = useHttp();

const router = useRouter();
const route = useRoute();


/* page */

definePageMeta({
  name: 'admin.factors',
  layout: 'admin',
});

useHead({
  title: 'Factors',
});


/* template */

</script>


<template>
  <resource-manager-card
    icon="i-bx-receipt"
    resource="Factor"
    class="mt-6"
  />
</template>