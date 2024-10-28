<template>
  <div class="flex login justify-center px-2 items-center">
    <form
      @submit.prevent="login"
      class="form w-full relative sm:w-[400px] rounded-md bg-white shadow-md space-y-4 py-6 px-3 md:p-10"
    >
      <h3 class="text-center text-2xl font-semibold">Login</h3>
      <input
        type="email"
        required
        class="w-full rounded-xl border border-slate-400 focus:outline-none py-2.5 px-5"
        v-model="user.email"
        placeholder="Enter email"
      />
      <div class="relative">
        <input
          required
          @keyup.enter="login"
          :type="type"
          v-model="user.password"
          class="w-full rounded-xl border border-slate-400 focus:outline-none py-2.5 px-5"
          placeholder="Enter password"
        />
        <IconEyeShow
          v-if="type === 'password' && user.password.length"
          @click="togglePassword"
          class="w-6 cursor-pointer h-6 absolute right-4 top-3"
        />
        <IconEyeHide
          v-if="type === 'text' && user.password.length"
          @click="togglePassword"
          class="w-6 h-6 cursor-pointer absolute right-4 top-3"
        />
      </div>
      <button
        type="submit"
        :disabled="loader"
        class="w-full flex disabled:hover:bg-orange-600 h-12 items-center justify-center hover:bg-orange-500 transition-all py-2.5 bg-orange-600 text-white rounded-xl"
      >
        <span
          class="w-5 h-5 block border-2 border-gray-200 border-t-blue-300 rounded-full animate-spin"
          v-if="loader"
        ></span>
        <span v-else>Login {{ userData }} {{ token ? token : "no token" }}</span>
      </button>
      <div>
        <span
          >don't have an account?
          <NuxtLink class="text-blue-600" to="/sign-up">Sign up</NuxtLink>
        </span>
      </div>
      <p
        v-if="errMsg.length"
        class="absolute block -right-2 -top-5 border bg-gray-300 text-red-500 bg-white px-8 py-1.5 rounded-md"
      >
        {{ errMsg }}
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
const { $Fetch } = useNuxtApp();
const setUser = useUser();
const cookie = useCookie("token");
const type = ref("password");
const loader = ref(false);
const errMsg = ref("");
const isLoggedIn = useAuth("auth");
const router = useRouter();
const route = useRoute();
const userData = useUser();
definePageMeta({
  layout: "auth",
  middleware: "home",
});

useHead({
  title: "Login - StoryPulse",
});

const user = reactive({
  email: "",
  password: "",
});

function togglePassword() {
  if (type.value === "password") {
    type.value = "text";
    return;
  }
  type.value = "password";
}

async function login() {
  const userData = {
    email: user.email,
    password: user.password,
  };
  loader.value = true;
  try {
    const res = await $Fetch("/login", {
      method: "POST",
      body: userData,
    });
    loader.value = false;
    if (res.success && !res.is_verified) {
      router.push({ path: "/otp", query: { status: "non_verified" } });
      localStorage.setItem("email", user.email);
      return;
    }
    if (res.success) {
      cookie.value = res.token;
      isLoggedIn.value = true;
      setUser.value = res.user;
      router.push("/");
    } else {
      errMsg.value = res.message;
      setTimeout(() => {
        errMsg.value = "";
      }, 4000);
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
</style>
