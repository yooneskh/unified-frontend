<script setup>

import { ref } from 'vue';
import { http, generalHttpHandle } from '../../../services/http/mod';


/* interface */

const props = defineProps({
  mode: {
    type: String,
    default: 'login',
  },
  loading: {
    type: Boolean,
  },
});

const emit = defineEmits([
  'update:mode',
  'update:loading',
  'authenticated',
]);


import { useVModel } from '@vueuse/core';

const mode = useVModel(props, 'mode', emit);
const loading = useVModel(props, 'loading', emit);


/* auth */

import { useToken, useUser } from '../state';

const token = useToken();
const user = useUser();


/* actions */

const phoneNumber = ref('');
const name = ref('');
const captchaId = ref('');
const captchaText = ref('');

const verificationToken = ref('');
const verificationCode = ref('');


import { loadUserWithToken } from '../controller';


async function submitLogin() {

  loading.value = true;
  const { status, data } = await http.post({
    url: `/authentication/login`,
    body: {
      provider: 'phoneNumber',
      phoneNumber: '+98' + phoneNumber.value.slice(1),
    },
    headers: {
      'captcha-id': captchaId.value,
      'captcha-text': captchaText.value
    }
  });
  loading.value = false;

  if (status !== 200) {

    if (confirm('User account does not exist. Do you want to create it?')) {
      mode.value = 'register';
    }

    return;

  }


  if (data.needsVerification) {
    verificationToken.value = data.verificationToken;
    mode.value = 'verify';
  }
  else {
    submitLoadUser(data);
  }

}

async function submitRegister() {

  loading.value = true;
  const { status, data } = await http.post({
    url: `/authentication/register`,
    body: {
      provider: 'phoneNumber',
      phoneNumber: '+98' + phoneNumber.value.slice(1),
      name: name.value,
    },
    headers: {
      'captcha-id': captchaId.value,
      'captcha-text': captchaText.value
    }
  });
  loading.value = false;
  if (generalHttpHandle(status, data)) return;


  if (data.needsVerification) {
    verificationToken.value = data.verificationToken;
    mode.value = 'verify';
  }
  else {
    submitLoadUser(data);
  }

}

async function submitVerification() {

  loading.value = true;
  const { status, data } = await http.post({
    url: `/authentication/verify`,
    body: {
      provider: 'phoneNumber',
      verificationToken: verificationToken.value,
      verificationCode: verificationCode.value
    }
  });
  loading.value = false;
  if (generalHttpHandle(status, data)) {
    mode.value = 'login';
    verificationCode.value = '';
    return;
  }


  submitLoadUser(data);

}

async function submitLoadUser(loginToken) {

  loading.value = true;

  try {

    await loadUserWithToken(loginToken, token, user);
    loading.value = false;

    emit('authenticated');

  }
  catch {

    loading.value = false;

    mode.value = 'login';
    verificationCode.value = '';

  }

}


/* template specific */

import CaptchaField from './captcha-field.vue';

</script>


<template>
  <div class="authentication-handler">

    <template v-if="mode === 'login'">

      <div class="text-body-1">
        Please enter your phone number.
      </div>

      <v-text-field
        label="Phone number"
        inputmode="numeric"
        class="mt-4"
        dir="ltr"
        placeholder="09---------"
        hide-details
        v-model="phoneNumber"
      />

      <client-only>
        <captcha-field
          v-model="captchaText"
          v-model:id="captchaId"
        />
      </client-only>

      <v-btn color="primary" class="mt-8" block size="large" @click="submitLogin()">

        Login

        <v-progress-circular
          v-if="loading"
          indeterminate
          size="16"
          class="ms-3"
        />

      </v-btn>

      <v-btn variant="tonal" class="mt-1" block @click="mode = 'register'">
        Register new account
      </v-btn>

      <v-btn variant="text" class="mt-3" block to="/">
        Return to home page
      </v-btn>

    </template>

    <template v-if="mode === 'register'">

      <div class="text-body-1">
        Please fill these information to create your account.
      </div>

      <v-text-field
        label="Phone number"
        inputmode="numeric"
        class="mt-4"
        dir="ltr"
        placeholder="09---------"
        hide-details
        v-model="phoneNumber"
      />

      <v-text-field
        label="Name"
        class="mt-2"
        hide-details
        v-model="name"
      />

      <client-only>
        <captcha-field
          v-model="captchaText"
          v-model:id="captchaId"
        />
      </client-only>

      <v-btn color="primary" class="mt-8" block size="large" @click="submitRegister()">

        Register

        <v-progress-circular
          v-if="loading"
          indeterminate
          size="16"
          class="ms-3"
        />

      </v-btn>

      <v-btn variant="tonal" class="mt-1" block @click="mode = 'login'">
        Have account before?
      </v-btn>

      <v-btn variant="text" class="mt-3" block to="/">
        Return to home page
      </v-btn>

    </template>

    <template v-if="mode === 'verify'">

      <div class="text-body-1">
        Enter the code below
      </div>

      <v-text-field
        label="Verification Code"
        inputmode="numeric"
        class="mt-4"
        dir="ltr"
        hide-details
        v-model="verificationCode"
      />

      <v-btn color="primary" class="mt-8" block size="large" @click="submitVerification()">

        Check Code

        <v-progress-circular
          v-if="loading"
          indeterminate
          size="16"
          class="ms-3"
        />

      </v-btn>

      <v-btn variant="text" class="mt-2" block to="/">
        Resend Code
      </v-btn>

    </template>

  </div>
</template>