<script setup>

const router = useRouter();
const route = useRoute();


/* user */

const user = useUser();

const isAdmin = computed(() =>
  user.value && user.value.permissions?.some(it =>
    it.startsWith('admin')
  )
);


function submitLogout() {

}


/* night mode */

const isDarkMode = useDarkMode();

function toggleNightMode() {
  isDarkMode.value = !isDarkMode.value;
}


/* template */

import { AppConfig } from '~/app-config';

</script>


<template>
  <header>
    <content-container class="h-64px flex items-center gap-2">

      <nuxt-link :to="{ name: 'general.home' }">
        <img
          src="/logo-small.webp"
          class="h-36px"
        />
      </nuxt-link>
  
      <nuxt-link :to="{ name: 'general.home' }">
        <div class="text-xl font-bold">
          {{ AppConfig.brand.title }}
        </div>
      </nuxt-link>

      <div class="grow" />

      <a-btn
        :icon="isDarkMode ? 'i-bx-moon' : 'i-bx-sun'"
        icon-only
        @click="toggleNightMode()">
        <a-tooltip>
          Toggle Dark Mode
        </a-tooltip>
      </a-btn>

      <a-btn v-if="user" icon="i-bx-bxs-user" icon-only>
        <a-menu trigger="hover">
          <a-list states class="a-list-items-pill">

            <nuxt-link v-if="isAdmin" :to="{ name: 'admin.dashboard' }">
              <a-list-item
                icon="i-bx-bxs-dashboard"
                title="View Admin Panel"
                value
              />
            </nuxt-link>

            <a-list-item
              icon="i-bx-log-out"
              title="Logout"
              class="text-danger"
              value
              @click="submitLogout()"
            />

          </a-list>
        </a-menu>
      </a-btn>

    </content-container>
  </header>
</template>