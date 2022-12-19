<script setup>

import { ref } from 'vue';
const router = useRouter();
const route = useRoute();


/* user */

const token = inject('token');
const user = inject('user');


/* logout */

import { logoutUser } from '../authentication/controller';

function handleLogout() {
  logoutUser(token, user);
}

/* template */

</script>


<template>
  <v-app-bar title="HelloApp">

    <template #prepend>
      <v-icon>
        mdi-facebook
      </v-icon>
    </template>

    <v-spacer />

    <v-toolbar-items>

      <template v-if="user">
        <v-btn prepend-icon="mdi-account">

          {{ user.name }}

          <v-menu offset="4" theme="dark" activator="parent">
            <v-card flat>
              <v-list density="compact" nav>

                <v-list-item
                  title="Your Profile"
                  prepend-icon="mdi-badge-account"
                />

                <v-list-item
                  title="Logout"
                  prepend-icon="mdi-logout-variant"
                  color="error"
                  class="bg-error"
                  @click="handleLogout()"
                />

              </v-list>
            </v-card>
          </v-menu>

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