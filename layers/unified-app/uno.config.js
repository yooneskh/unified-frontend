import { defineConfig } from 'unocss';


export default defineConfig({
  include: [
    /.*\/anu-vue\.js(.*)?$/,
    './**/*.vue',
    './**/*.md',
  ],
});
