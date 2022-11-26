<script setup>

import { ref } from 'vue';
const router = useRouter();
const route = useRoute();


/* user */

const user = inject('user');


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

      <template v-if="user">
        <v-btn to="/profile" prepend-icon="mdi-account">
          Your Profile
        </v-btn>
      </template>

      <template v-else>

        <v-btn to="/authentication">
          Login
        </v-btn>

        <v-btn to="/authentication?mode=register">
          Register
        </v-btn>

      </template>

    </v-toolbar-items>

  </v-app-bar>
</template>