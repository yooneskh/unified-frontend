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
        name: 'admin.user.list',
        path: 'users',
        file: resolve('/utilities/resources/manager-page.vue'),
        meta: {
          resource: 'User',
        },
      },
      {
        name: 'admin.post.list',
        path: 'posts',
        file: resolve('/utilities/resources/manager-page.vue'),
        meta: {
          resource: 'Post',
        },
      },
      {
        name: 'admin.event.list',
        path: 'events',
        file: resolve('/utilities/resources/manager-page.vue'),
        meta: {
          resource: 'Event',
        },
      },
      {
        name: 'admin.account.list',
        path: 'accounts',
        file: resolve('/modules/accounts/page.vue'),
      },
    ],
  },
];
