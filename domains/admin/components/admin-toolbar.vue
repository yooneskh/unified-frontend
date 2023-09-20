<script setup>

const http = useHttp();

const router = useRouter();
const route = useRoute();

const user = useUser();


/* interface */

const props = defineProps({

});

const emit = defineEmits([

]);


/* toolbar */

const toolbarItems = [
  {
    name: 'admin.dashboard',
    icon: 'i-bx-bxs-dashboard',
    title: 'Dashboard',
  },
  {
    name: 'admin.users',
    icon: 'i-bx-bxs-user-detail',
    title: 'Users',
  },
  {
    name: 'admin.factors',
    icon: 'i-bx-receipt',
    title: 'Factors',
  },
  {
    name: 'admin.paytickets',
    icon: 'i-bx-money',
    title: 'Paytickets',
  },
  {
    name: 'admin.accounts',
    icon: 'i-bx-bxs-bank',
    title: 'Accounts',
  },
  {
    name: 'admin.transfers',
    icon: 'i-bx-transfer',
    title: 'Transfers',
  },
  {
    name: 'admin.settings.home',
    icon: 'i-bx-home-circle',
    title: 'Home Settings',
  },
];


/* template */

</script>


<template>
  <div class="bg-gray/10 border-y-1px border-gray/25">
    <content-container class="flex gap-2 py-2">

      <nuxt-link
        v-for="item of toolbarItems" :key="item.name"
        :href="{ name: item.name }">
        <a-btn
          variant="fill"
          :color="route.name === item.name ? 'primary' : ''"
          :icon="item.icon"
          class="px-6 shadow-primary transition-all duration-300"
          :class="{
            'shadow': route.name === item.name,
          }">
          {{ item.title }}
        </a-btn>
      </nuxt-link>

    </content-container>
  </div>
</template>