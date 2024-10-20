<template>
  <div class="flex login justify-center px-2 items-center">
    <div class="form w-full sm:w-[400px] rounded-md bg-white shadow-md space-y-4 py-6 px-3 md:p-10">
      <h3 class="text-center text-2xl font-semibold">Login</h3>
      <input type="email" class="w-full rounded-xl border border-slate-400 focus:outline-none py-2.5 px-5"
        v-model="user.email" placeholder="Enter email" />
      <div class="relative">
        <input @keyup.enter="login" :type="type" v-model="user.password"
          class="w-full rounded-xl border border-slate-400 focus:outline-none py-2.5 px-5"
          placeholder="Enter password" />
        <IconEyeShow v-if="type === 'password' && user.password.length" @click="togglePassword"
          class="w-6 cursor-pointer h-6 absolute right-4 top-3" />
        <IconEyeHide v-if="type === 'text' && user.password.length" @click="togglePassword"
          class="w-6 h-6 cursor-pointer absolute right-4 top-3" />
      </div>
      <button @click="login"
        class="w-full hover:bg-orange-500 transition-all py-2.5 bg-orange-600 text-white rounded-xl">
        Login
      </button>
      <div>
        <span>don't have an account?
          <NuxtLink class="text-blue-600" to="/sign-up">Sign up</NuxtLink>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
const cookie = useCookie("token");
import { ref, reactive } from "vue";
const { $Fetch } = useNuxtApp();
const setUser = useUser();
const type = ref("password")
const isLoggedIn = useAuth("auth")
const router = useRouter();
definePageMeta({
layout: "auth",
middleware: "home"
});

useHead({
  title: "Login - StoryPulse",
})

const user = reactive({
  email: "",
  password: "",
});

function togglePassword() {
  if (type.value === 'password') {
    type.value = 'text'
    return
  }
  type.value = 'password'
}

async function login() {
  const userData = {
    email: user.email,
    password: user.password,
  };
  try {
    const res = await $Fetch("/login", {
      method: "POST",
      body: userData,
    });
    if (res.success) {
      cookie.value = res.token;
      isLoggedIn.value = true;
      setUser.value = res.user;
      router.push("/");
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
