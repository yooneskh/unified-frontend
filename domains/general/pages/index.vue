<script setup>

const http = useHttp();

const router = useRouter();
const route = useRoute();


/* page */

definePageMeta({
  layout: 'general',
  name: 'general.home.page',
});

useHead({
  title: 'Home',
});


/* template */

</script>


<template>
  <v-container fluid class="h-100 d-flex flex-column align-center justify-center">

    <div class="text-h5">
      Hello From Unified Frontend
    </div>

    <v-btn
      variant="outlined"
      color="primary"
      prepend-icon="mdi-link"
      class="mt-4 text-none"
      href="https://github.com/yooneskh"
      target="_blank">
      Made By YoonesKh
    </v-btn>

  </v-container>
</template>