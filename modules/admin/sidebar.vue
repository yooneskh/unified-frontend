<script setup>

const router = useRouter();
const route = useRoute();


/* items */

const items = [
  {
    icon: 'mdi-home',
    name: 'General',
    children: [
      {
        icon: 'mdi-home',
        name: 'Dashboard',
        pathName: 'admin.dashboard',
      },
      {
        icon: 'mdi-account-multiple',
        name: 'Users',
        pathName: 'admin.users.list',
      },
    ],
  },
  {
    icon: 'mdi-cash',
    name: 'Financial',
    children: [
      {
        icon: 'mdi-bank',
        name: 'Accounts',
        pathName: 'admin.accounts.list',
      },
      {
        icon: 'mdi-cash-register',
        name: 'Transfers',
        pathName: 'admin.transfers.list',
      },
    ],
  },
];


const selectedGroupName = ref('General');

const selectedGroup = computed(() =>
  items.find(it => it.name === selectedGroupName.value)
);


/* template */

</script>


<template>
  <v-navigation-drawer permanent elevation="2">
    <div class="fill-height d-flex flex-column">

      <v-card color="blue-lighten-1" class="ma-2 flex-grow-0 d-flex align-center py-3 px-4" flat>

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

      <div class="flex-grow-1 d-flex flex-row" style="height: 0; border-top: 1px solid rgba(0, 0, 0, 0.175);">

        <div class="flex-grow-0 fill-height d-flex flex-column" style="padding: 6px; gap: 6px; overflow-y: auto; border-right: 1px solid rgba(0, 0, 0, 0.175);">

          <v-btn
            v-for="group of items" :key="group.name"
            variant="text"
            min-width="0"
            width="36"
            height="36"
            :title="group.name"
            @click="selectedGroupName = group.name">
            <v-icon
              :icon="group.icon"
              color="grey-darken-1"
            />
          </v-btn>

        </div>

        <v-list nav density="compact" class="flex-grow-1" style="padding: 6px;">
          <v-list-item
            v-for="child of selectedGroup.children" :key="child.name"
            :prepend-icon="child.icon"
            :title="child.name"
            class="sidebar-nav-child"
            :to="{ name: 'general.home' /* child.pathName */ }"
          />
        </v-list>

      </div>

    </div>
  </v-navigation-drawer>
</template>

<style lang="scss" scoped>
  .sidebar-nav-child :deep(.v-icon) {
    margin-inline-end: 12px;
    font-size: 1.2em;
  }
</style>