<script setup>

const router = useRouter();
const route = useRoute();


/* groups */

const groups = [
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
      {
        icon: 'mdi-file-sign',
        name: 'Posts',
        pathName: 'admin.posts.list',
      },
      {
        icon: 'mdi-calendar',
        name: 'Events',
        pathName: 'admin.events.list',
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
    ],
  },
];


const selectedGroupName = ref('General');

const selectedGroup = computed(() =>
  groups.find(it => it.name === selectedGroupName.value)
);


const previewingGroupName = ref('');

const previewingGroup = computed(() =>
  (!previewingGroupName.value) ? [] : groups.find(it => it.name === previewingGroupName.value)
);


const visibleGroupName = computed(() =>
  previewingGroupName.value || selectedGroupName.value
);

const visibleGroup = computed(() =>
  groups.find(it => it.name === visibleGroupName.value)
);


(function identifyStartingGroup() {

  if (route.name === 'admin.dashboard') {
    return;
  }


  const initialGroup = groups.find(it => it.children.some(i => i.pathName === route.name));

  if (!initialGroup) {
    return;
  }


  selectedGroupName.value = initialGroup.name;

})();


/* template */

</script>


<template>
  <v-navigation-drawer :model-value="true" permanent elevation="2">
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

        <div class="flex-grow-0 fill-height d-flex flex-column" style="padding: 6px; gap: 4px; overflow-y: auto; border-right: 1px solid rgba(0, 0, 0, 0.175);">

          <v-btn
            v-for="group of groups" :key="group.name"
            :variant="(group.name === previewingGroupName) ? ('outlined') : ('text')"
            min-width="0"
            width="40"
            height="40"
            :title="group.name"
            :active="group.name === selectedGroupName"
            @click="previewingGroupName = group.name">
            <v-icon
              :icon="group.icon"
              color="grey-darken-1"
            />
          </v-btn>

        </div>

        <v-list nav density="compact" class="flex-grow-1" style="padding: 6px;">
          <v-list-item
            v-for="child of visibleGroup.children" :key="child.name"
            :prepend-icon="child.icon"
            :title="child.name"
            class="sidebar-nav-child"
            :to="{ name: child.pathName }"
            exact
            @click="selectedGroupName = visibleGroup.name; previewingGroupName = '';"
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