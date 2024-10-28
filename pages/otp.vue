<template>
  <div class="flex login justify-center px-2 items-center">
    <div
      class="form w-full relative sm:w-[400px] rounded-md bg-white shadow-md space-y-4 py-6 px-3 md:p-10"
    >
      <span
        v-if="message"
        class="absolute bg-white text-red-400 left-0 border -top-10 px-8 py-2 rounded-md"
      >
        {{ message }}
      </span>
      <h3 class="text-center text-2xl text-orange-600 font-semibold">
        Verify your account
      </h3>
      <h3 class="text-center text-xl font-semibold">Enter the 4-Digit Code</h3>
      <div class="flex box-border justify-center">
        <v-otp-input
          ref="otpInput"
          input-classes="h-14 ml-3 otp-input block w-full text-2xl text-center focus:outline-none border border-slate-300 rounded-xl"
          :conditionalClass="['one', 'two', 'three', 'four']"
          separator=""
          inputType="letter-numeric"
          :num-inputs="4"
          :should-auto-focus="true"
          :should-focus-order="true"
          @on-complete="handleOnComplete"
        />
      </div>
      <p class="font-semibold">
        Code not Received? <button class="text-orange-600">Resend Code</button>
      </p>
      <button
        @click="verify"
        :disabled="otpCode.length < 4"
        :class="[
          otpCode.length < 4
            ? 'bg-orange-300'
            : 'bg-orange-600 hover:bg-orange-500',
        ]"
        class="w-2/3 mx-auto block py-2.5 rounded-xl text-white font-semibold"
      >
        Verify
      </button>
    </div>
  </div>
</template>

<script setup>
import VOtpInput from "vue3-otp-input";
import { ref, reactive, onMounted } from "vue";
const cookie = useCookie("token");
const isLoggedIn = useAuth("auth");
const otpCode = ref("");
const { $Fetch } = useNuxtApp();
const router = useRouter();
const setUser = useUser()
const route = useRoute();
const message = ref("");
if (route.query.status) {
  message.value =
    "Your account is not verified. Please verify your account by entering the OTP sent to your email.";
}

definePageMeta({
  layout: "auth",
  middleware: "home",
});

useHead({
  title: "OTP - StoryPulse",
});

const handleOnComplete = (value) => {
  otpCode.value = value;
};

async function verify() {
  const userData = {
    email: localStorage.getItem("email"),
    otp: otpCode.value,
  };
  if (route.query.status) {
    userData.status = route.query.status;
  }
  try {
    const res = await $Fetch("/verify-otp", {
      method: "POST",
      body: userData,
    });
    if(res.success && route.query.status) {
      cookie.value = res.token;
      console.log(res.user);
      isLoggedIn.value = true;
      setUser.value = res.user;
      router.push("/");
    }
    if (res.success) {
      localStorage.removeItem("email");
      router.push("/login");
    }
  } catch (err) {
    console.log(err);
  }
}
</script>

<style scoped>
.login {
  background-image: url("/images/login.jpeg");
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100vh;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
