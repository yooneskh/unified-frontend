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
        name: 'home.page',
        path: '/',
        file: resolve('/modules/home/page.vue'),
      }
    ]
  },
  {
    path: '/admin',
    file: resolve('/modules/admin/wrapper.vue'),
    children: [

    ],
  },
];
