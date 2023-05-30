<script setup>

const router = useRouter();
const route = useRoute();


/* page */

definePageMeta({
  layout: 'admin',
  name: 'admin.users.list',
});


/* template */

</script>


<template>
  <v-container fluid>

    <v-card
      prepend-icon="mdi-account"
      title="Managing Users"
    />

  </v-container>
</template>