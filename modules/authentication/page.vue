<script setup>

const router = useRouter();
const route = useRoute();


/* template */

</script>


<template>
  <v-container fluid class="fill-height d-flex flex-column align-center justify-center bg-grey-lighten-4">

    <div class="text-h5">
      Hello to authentication
    </div>

    <v-btn variant="outlined" class="mt-4 text-none" @click="router.back()">
      Go Back
    </v-btn>

  </v-container>
</template>