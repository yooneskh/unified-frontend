<script setup>

const token = inject('token');
const user = inject('user');

</script>


<template>
  <v-container fluid class="fill-height d-flex flex-column align-center justify-center bg-grey-lighten-4">

    <div class="text-h5">
      Hello From Home
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

    <pre style="width: 512px;">{{ { token, user } }}</pre>

  </v-container>
</template>