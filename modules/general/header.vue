<script setup>

import { ref } from 'vue';
const router = useRouter();
const route = useRoute();


/* template */

</script>


<template>
  <v-app-bar title="HelloApp" color="primary">

    <template #prepend>
      <v-icon>
        mdi-facebook
      </v-icon>
    </template>

    <v-spacer />

    <v-toolbar-items>

      <v-btn to="/authentication">
        Login
      </v-btn>

      <v-btn to="/authentication">
        Register
      </v-btn>

    </v-toolbar-items>

  </v-app-bar>
</template>