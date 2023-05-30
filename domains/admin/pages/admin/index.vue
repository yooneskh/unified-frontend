<script setup>

const router = useRouter();
const route = useRoute();


/* page */

definePageMeta({
  layout: 'admin',
  name: 'admin.dashboard',
});


/* template */

</script>


<template>
  <v-container fluid>

    <v-card
      prepend-icon="mdi-home"
      title="Hello to Dashboard"
    />

  </v-container>
</template>