<script setup>

import { ref } from 'vue';
const router = useRouter();
const route = useRoute();


/* template */

</script>


<template>
  <v-navigation-drawer permanent elevation="2">

    <v-card color="yellow-darken-4" class="ma-1 d-flex align-center py-3 px-4" flat>

      <v-img
        src="/logo.png"
        class="flex-grow-0"
        width="40"
      />

      <div class="ms-4">
        <div class="text-h5">
          Facebook
        </div>
        <div class="text-caption">
          Management
        </div>
      </div>

    </v-card>

  </v-navigation-drawer>
</template>