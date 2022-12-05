import { resolve } from 'path';


export const routes = [
  {
    name: 'authentication.page',
    path: '/authentication',
    file: resolve('/modules/authentication/page.vue')
  },
  {
    path: '/',
    file: resolve('/modules/general/wrapper.vue'),
    children: [
      {
        name: 'general.home',
        path: '',
        file: resolve('/modules/home/page.vue'),
      },
    ],
  },
  {
    path: '/admin',
    file: resolve('/modules/admin/wrapper.vue'),
    children: [
      {
        name: 'admin.dashboard',
        path: '',
        file: resolve('/modules/admin/dashboard.vue'),
      },
      {
        name: 'admin.users.list',
        path: 'users',
        file: resolve('/utilities/resources/manager-page.vue'),
        meta: {
          resource: 'User',
        },
      },
      {
        name: 'admin.accounts.list',
        path: 'accounts',
        file: resolve('/modules/accounts/page.vue'),
      },
    ],
  },
];
