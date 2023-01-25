import { http, generalHttpHandle } from '~/services/http/mod';

import { useToken, useUser } from '~/modules/authentication/state';

import { launchDialog } from '~/services/dialogs/mod';

import dayjs from 'dayjs';
import jalaliDay from 'jalaliday';


export default defineNuxtPlugin(app => {

  /* http */

  app.vueApp.provide('http', http);
  app.vueApp.provide('generalHttpHandle', generalHttpHandle);


  /* authentication */

  const token = useToken();
  const user = useUser();

  app.vueApp.provide('token', token);
  app.vueApp.provide('user', user);


  /* unified dialogs */

  app.vueApp.provide('launchDialog', launchDialog);


  /* uuid */

  app.vueApp.provide('makeUuid', (sections = 4) => {
    return (
      new Array(sections)
        .fill()
        .map(() => Math.random().toString(16).slice(2))
        .join('-')
    );
  });


  /* date format */

  dayjs.extend(jalaliDay);

  app.vueApp.provide('formatDate', (timestamp, format = 'YYYY/MM/DD HH:mm', calendar = 'gregori', locale = 'en') => {
    return dayjs(timestamp).calendar(calendar).locale(locale).format(format);
  });

});
