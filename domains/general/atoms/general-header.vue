<script setup>

const router = useRouter();
const route = useRoute();


/* user */

const token = useToken();
const user = useUser();


/* logout */

function handleLogout() {
  logoutUser(token, user);
}


/* template */

</script>


<template>
  <v-app-bar>

    <div
      class="d-flex align-center ms-2 pe-4"
      style="cursor: pointer;"
      @click="router.push({ name: 'general.home.page' })">

      <v-img
        src="/logo.png"
        class="flex-grow-0 me-3"
        height="44px"
        width="44px"
      />

      <div class="text-h5 font-weight-black text-primary">
        Hello App
      </div>

    </div>

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

        <v-btn :to="{ name: 'authentication.page' }">
          Login
        </v-btn>

        <v-btn :to="{ name: 'authentication.page', query: { mode: 'register' } }">
          Register
        </v-btn>

      </template>

    </v-toolbar-items>

  </v-app-bar>
</template>