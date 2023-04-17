<script setup>

const { http, generalHttpHandle } = useHttp();


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

const token = useToken();
const user = useUser();


/* actions */

const authStates = reactive({
  phoneNumber: '',
  name: '',
  verificationCode: '',
});

const captchaId = ref('');
const captchaText = ref('');

const verificationToken = ref('');


async function submitLogin() {

  loading.value = true;
  const { status, data } = await http.request({
    method: 'post',
    url: `/authentication/login`,
    body: {
      provider: 'phoneNumber',
      phoneNumber: '+98' + authStates.phoneNumber.slice(1),
    },
    headers: {
      'captcha-id': captchaId.value,
      'captcha-text': captchaText.value,
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
  const { status, data } = await http.request({
    method: 'post',
    url: `/authentication/register`,
    body: {
      provider: 'phoneNumber',
      phoneNumber: '+98' + authStates.phoneNumber.slice(1),
      name: authStates.name,
    },
    headers: {
      'captcha-id': captchaId.value,
      'captcha-text': captchaText.value
    }
  });
  loading.value = false;

  if (generalHttpHandle(status, data)) {
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

async function submitVerification() {

  loading.value = true;
  const { status, data } = await http.request({
    method: 'post',
    url: `/authentication/verify`,
    body: {
      provider: 'phoneNumber',
      verificationToken: verificationToken.value,
      verificationCode: authStates.verificationCode,
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


import { loadUserWithToken } from '../controller';

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

      <u-form
        :target="authStates"
        :fields="[
          {
            key: 'phoneNumber', identifier: 'text', label: 'Phone Number',
            placeholder: '09---------',
          }
        ]"
      />

      <client-only>
        <captcha-field
          v-model="captchaText"
          v-model:id="captchaId"
        />
      </client-only>

      <v-btn color="primary" class="mt-8" block size="large" :loading="loading" @click="submitLogin()">
        Login
      </v-btn>

      <v-btn variant="tonal" class="mt-2" block @click="mode = 'register'">
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

      <u-form
        :target="authStates"
        :fields="[
          {
            key: 'phoneNumber', identifier: 'text', label: 'Phone Number',
            placeholder: '09---------',
          },
          {
            key: 'name', identifier: 'text', label: 'Your Name',
          },
        ]"
      />

      <client-only>
        <captcha-field
          v-model="captchaText"
          v-model:id="captchaId"
        />
      </client-only>

      <v-btn color="primary" class="mt-8" block size="large" :loading="loading" @click="submitRegister()">
        Register
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

      <u-form
        :target="authStates"
        :fields="[
          {
            key: 'verificationCode', identifier: 'text', label: 'Verification Code',
          },
        ]"
      />

      <v-btn color="primary" class="mt-8" block size="large" :loading="loading" @click="submitVerification()">
        Check Code
      </v-btn>

      <v-btn variant="text" class="mt-2" block to="/">
        Resend Code
      </v-btn>

    </template>

  </div>
</template>