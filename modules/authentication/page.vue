<script setup>

const router = useRouter();
const route = useRoute();

/* authentication */

const mode = ref('login');


onMounted(() => {
  if (route.query['mode'] === 'register') {
    mode.value = 'register';
  }
});


function handleAuthentication() {
  router.push(route.query['next'] || '/');
}


/* template specific */

import CoverImage from './images/cover.webp';
import AuthenticationHandler from './components/authentication-handler.vue';

const isDesktop = inject('isDesktop');

</script>


<template>
  <v-container fluid class="pa-0">

    <v-row no-gutters style="min-height: 100vh;">
      <v-col v-if="isDesktop" cols="5" class="pa-3 d-flex flex-column" style="height: 100vh;">
        <v-card
          :image="CoverImage"
          class="flex-grow-1 cover"
          style="height: 0; width: 100%;"
        />
      </v-col>
      <v-col class="d-flex flex-column align-center justify-center">

        <v-card flat width="420" max-width="90%" color="transparent">

          <div class="d-flex align-center justify-center mb-8">

            <v-img
              src="/logo.png"
              width="64"
              class="flex-grow-0"
            />

            <div class="text-h4 ms-3 font-weight-bold">
              Login
            </div>

          </div>

          <authentication-handler
            v-model:mode="mode"
            @authenticated="handleAuthentication()"
          />

        </v-card>

      </v-col>
    </v-row>

  </v-container>
</template>


<style lang="scss" scoped>
  .v-card.cover {
    box-shadow: 0 1px 1px rgba(0,0,0,0.12),
            0 2px 2px rgba(0,0,0,0.12),
            0 4px 4px rgba(0,0,0,0.12),
            0 8px 8px rgba(0,0,0,0.12),
            0 16px 16px rgba(0,0,0,0.12);
  }
</style>