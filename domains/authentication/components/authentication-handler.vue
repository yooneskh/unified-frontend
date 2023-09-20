<script setup>

const http = useHttp();

const router = useRouter();
const route = useRoute();

const token = useToken();
const user = useUser();


/* interface */

const props = defineProps({

});


const mode = defineModel('mode', {
  type: String,
  default: 'login',
  local: true,
});

const loading = defineModel('loading', {
  type: Boolean,
  local: true,
});


const emit = defineEmits([
  'authenticated',
]);


/* authentication */

const captchaId = ref('');
const captchaText = ref('');


/* login */

const phoneNumber = ref('');

const codedPhoneNumber = computed(() =>
  '+98' + phoneNumber.value.slice(1)
);


async function submitLogin() {

  loading.value = true;
  const { status, data } = await http.request({
    method: 'post',
    url: `/authentication/login`,
    body: {
      provider: 'phoneNumber',
      phoneNumber: codedPhoneNumber.value,
    },
    headers: {
      'captcha-id': captchaId.value,
      'captcha-text': captchaText.value,
    }
  });
  loading.value = false;

  if (status === 404) {

    if (confirm('This account does not exist. Do you want to create an account with this number?')) {
      mode.value = 'register';
    }

    return;

  }
  else if (generalHttpHandle(status, data)) {
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


/* register */

const userName = ref('');


async function submitRegister() {

  loading.value = true;
  const { status, data } = await http.request({
    method: 'post',
    url: `/authentication/register`,
    body: {
      provider: 'phoneNumber',
      phoneNumber: codedPhoneNumber.value,
      name: userName.value,
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


/* verification */

const verificationToken = ref('');
const verificationCode = ref('');

async function submitVerification() {

  loading.value = true;
  const { status, data } = await http.request({
    method: 'post',
    url: `/authentication/verify`,
    body: {
      provider: 'phoneNumber',
      verificationToken: verificationToken.value,
      verificationCode: verificationCode.value,
    }
  });
  loading.value = false;

  if (generalHttpHandle(status, data)) {
    mode.value = 'login';
    authStates.verificationCode = '';
    return;
  }


  submitLoadUser(data);

}


/* profile */

async function submitLoadUser(loginToken) {

  loading.value = true;

  try {

    await loadUserWithToken(loginToken, token, user);
    loading.value = false;

    emit('authenticated');

  }
  catch (error) {

    console.error(error);

    loading.value = false;

    mode.value = 'login';
    verificationCode.value = '';

  }

}


/* template */

import { AppConfig } from '~/app-config';

</script>


<template>
  <a-card class="pa-4 max-w-512">

    <div class="flex items-center justify-center mt-3 mb-7">
      <img
        src="/logo-small.webp"
        class="w-40px h-40px"
      />
      <div class="text-2xl font-black ms-3">
        Login to {{ AppConfig.brand.title }}
      </div>
    </div>

    <div v-if="mode === 'login'" class="flex flex-col gap-3">
    
      <p>
        Please enter your phone number to login.
      </p>
  
      <a-input
        label="Phone number"
        input-classes="ltr"
        v-model="phoneNumber"
      />
  
      <a-btn
        color="primary"
        class="mt-2 w-full text-lg"
        :disabled="!phoneNumber"
        :loading="loading"
        @click="submitLogin()">
        Login to account
      </a-btn>

    </div>

    <div v-else-if="mode === 'register'" class="flex flex-col gap-3">
    
      <p>
        Please enter your information to create your account.
      </p>
  
      <a-input
        label="Phone number"
        input-classes="ltr"
        v-model="phoneNumber"
      />

      <a-input
        label="Name"
        v-model="userName"
      />
  
      <a-btn
        color="primary"
        class="mt-2 w-full text-lg"
        :disabled="!phoneNumber || !userName"
        :loading="loading"
        @click="submitRegister()">
        Create your account
      </a-btn>

    </div>

    <div v-else-if="mode === 'verify'" class="flex flex-col gap-3">
    
      <p>
        Please enter the code sent to {{ phoneNumber }} below.
      </p>
  
      <a-input
        label="Verification code"
        input-classes="ltr"
        v-model="verificationCode"
      />

      <a-btn
        color="primary"
        class="mt-2 w-full text-lg"
        :disabled="!verificationCode"
        :loading="loading"
        @click="submitVerification()">
        Check code
      </a-btn>

    </div>

  </a-card>
</template>