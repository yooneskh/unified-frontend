<script setup>

const router = useRouter();


/* page */

definePageMeta({
  name: 'authentication',
  layout: 'empty',
});

useHead({
  title: 'Login',
});


/* auth */

const mode = ref('login');
const captchaId = ref('');
const captchaText = ref('');


/* login */

const email = ref('');

async function doLogin() {

  const data = await ufetch(`/authentication/login`, {
    method: 'post',
    body: {
      method: 'email',
      email: email.value,
    },
    headers: {
      'captcha-id': captchaId.value,
      'captcha-text': captchaText.value,
    },
    onResponseError: async ({ response }) => {
      if (response?.status === 404) {
        await initiateRegister();
      }
    },
  });


  if (data.needsVerification) {
    verificationToken.value = data.verificationToken;
    mode.value = 'verify';
  }
  else {
    await submitLoadUser(data.token);
  }

}


/* register */

async function initiateRegister() {
  await launchButtonPickerDialog({
    icon: 'i-mdi-account',
    title: 'Register a new account',
    text: `There is no account with this email "${email.value}", do you want to create a new account?`,
    endButtons: [
      {
        label: 'No, cancel'
      },
    ],
    startButtons: [
      {
        label: 'Create new account',
        classes: 'primary',
        handler: async () => {
          captchaText.value = '';
          mode.value = 'register';
        },
      },
    ],
  });
}

async function doRegister() {

  const data = await ufetch(`/authentication/register`, {
    method: 'post',
    body: {
      method: 'email',
      email: email.value,
    },
    headers: {
      'captcha-id': captchaId.value,
      'captcha-text': captchaText.value,
    },
  });


  if (data.needsVerification) {
    verificationToken.value = data.verificationToken;
    mode.value = 'verify';
  }
  else {
    await submitLoadUser(data.token);
  }

}


/* verification */

const verificationToken = ref('');
const verificationCode = ref('');

async function submitVerification() {

  const data = await ufetch(`/authentication/verify`, {
    method: 'post',
    body: {
      verificationToken: verificationToken.value,
      verificationCode: verificationCode.value,
    },
    onResponseError: () => {
      mode.value = 'login';
      verificationCode.value = '';
    },
  });


  await submitLoadUser(data.token);

}


/* profile */

async function submitLoadUser(loginToken) {
  try {

    await authenticationLoadUserWithToken(loginToken, useToken(), useUser());

    if (useUser().value?.permissions?.some(it => it.startsWith('admin'))) {
      router.push({ name: 'admin.dashboard' })
    }
    else {
      router.push({ name: 'general.home' })
    }

  }
  catch (error) {

    console.error(error);

    mode.value = 'login';
    email.value = '';
    captchaId.value = '';
    captchaText.value = '';
    verificationCode.value = '';

  }
}

</script>


<template>
  <div class="min-h-screen flex flex-col items-center justify-center">

    <div class="text-xl font-bold mb-8">
      Login | Register
    </div>

    <template v-if="mode === 'login'">

      <u-input
        label="Email"
        v-model="email"
      />

      <captcha-input
        :key="mode"
        class="mt-2"
        v-model:captcha-id="captchaId"
        v-model:captcha-text="captchaText"
      />

      <u-btn
        label="Login"
        class="fill primary mt-6 px-20"
        :click-handler="doLogin"
      />

    </template>

    <template v-if="mode === 'register'">

      <captcha-input
        :key="mode"
        class="mt-2"
        v-model:captcha-id="captchaId"
        v-model:captcha-text="captchaText"
      />

      <u-btn
        label="Register"
        class="fill primary mt-6 px-20"
        :click-handler="doRegister"
      />

    </template>

    <template v-if="mode === 'verify'">

      <u-input
        label="Enter the code sent to you"
        v-model="verificationCode"
      />

      <u-btn
        label="Verify"
        class="fill primary mt-6 px-20"
        :click-handler="submitVerification"
      />

    </template>

  </div>
</template>