<script setup>

const router = useRouter();


/* page */

definePageMeta({
  name: 'authentication',
});

useHead({
  title: 'Login',
});


/* auth */

const mode = ref('login');
const captchaId = ref('');
const captchaText = ref('');
const loading = ref(false);


/* login */

const email = ref('');

async function doLogin() {

  const data = await ufetch(`/authentication/login`, {
    loading,
    method: 'post',
    body: {
      provider: 'email',
      email: email.value,
    },
    headers: {
      'captcha-id': captchaId.value,
      'captcha-text': captchaText.value,
    },
    onResponseError: ({ response }) => {
      if (response?.status === 404) {
        initiateRegister();
      }
    },
  });


  if (data.needsVerification) {
    verificationToken.value = data.verificationToken;
    mode.value = 'verify';
  }
  else {
    submitLoadUser(data);
  }

}


/* register */

async function initiateRegister() {
  launchButtonPickerDialog({
    icon: 'i-mdi-account',
    title: 'Register a new account',
    text: 'There is no account with this email "", do you want to create a new account?',
    endButtons: [
      {
        label: 'No, cancel'
      },
    ],
    startButtons: [
      {
        label: 'Create new account',
        handler: async () => {

          const data = await ufetch(`/authentication/register`, {
            loading,
            method: 'post',
            body: {
              provider: 'phoneNumber',
              name: userName.value,
              phoneNumber: codedPhoneNumber.value,
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
            submitLoadUser(data);
          }

        },
      },
    ],
  });

}


/* verification */

const verificationToken = ref('');
const verificationCode = ref('');

async function submitVerification() {

  const data = await ufetch(`/authentication/verify`, {
    loading,
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


  submitLoadUser(data);

}


/* profile */

async function submitLoadUser(loginToken) {

  loading.value = true;

  try {

    await authenticationLoadUserWithToken(loginToken, useToken(), useUser());
    loading.value = false;

    router.push({ name: 'general.home' })

  }
  catch (error) {

    console.error(error);

    loading.value = false;

    mode.value = 'login';
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
        class="fill primary rounded-full mt-6 px-20"
        :click-handler="doLogin"
      />

    </template>

    <template v-if="mode === 'verify'">

      <u-input
        label="Enter the code sent to you"
        v-model="verificationCode"
      />

      <u-btn
        label="Verify"
        class="fill primary rounded-full mt-6 px-20"
        :click-handler="submitVerification"
      />

    </template>

  </div>
</template>