import { resolve } from 'path';


export const routes = [
  {
    path: '/',
    file: resolve('/modules/base/wrapper.vue'),
    children: [
      {
        name: 'home.page',
        path: '/',
        file: resolve('/modules/home/page.vue'),
      }
    ]
  },
  {
    name: 'authentication.page',
    path: '/authentication',
    file: resolve('/modules/authentication/page.vue')
  },
];
