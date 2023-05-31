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
    <resource-manager-card
      icon="mdi-account"
      resource="User"
    />
  </v-container>
</template>