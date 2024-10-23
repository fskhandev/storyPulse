<template>
  <div class="flex login justify-center items-center px-2">
    <form
      @submit.prevent="signUp"
      class="form relative w-full sm:w-[400px] rounded-md bg-white shadow-md space-y-4 py-5 px-3 md:p-8"
    >
 

      <h3 class="text-center text-2xl font-semibold">Sign up</h3>
      <input
        required
        type="text"
        class="w-full rounded-xl border border-slate-400 focus:outline-none py-2.5 px-5"
        v-model="user.name"
        placeholder="Enter name"
      />
      <input
        required
        type="email"
        class="w-full rounded-xl border border-slate-400 focus:outline-none py-2.5 px-5"
        v-model="user.email"
        placeholder="Enter email"
      />
      <div class="relative">
        <input
          required
          :type="type"
          v-model="user.password"
          @keyup.enter="signUp"
          class="w-full rounded-xl border border-slate-400 focus:outline-none py-2.5 px-5"
          placeholder="Create password"
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
        class="w-full flex h-12 justify-center items-center hover:bg-orange-500 transition-all py-2.5 bg-orange-600 text-white rounded-md"
      >
        <span
          class="w-5 h-5 r block border-2 border-gray-200 border-t-blue-300 rounded-full animate-spin"
          v-if="loader"
        ></span>
        <span v-else>Sign Up</span>
      </button>
      <div>
        <span
          >Already have an account?
          <NuxtLink class="text-blue-600" to="/login">Login</NuxtLink>
        </span>
      </div>
      <p
        v-if="errMsg.length"
        class="absolute block -right-2 -top-5 border bg-gray-300 text-red-500 bg-white px-8 py-1.5 rounded-md"
        >{{ errMsg }}</p
      >
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

definePageMeta({
  layout: "auth",
});

useHead({
  title: "Sign Up - StoryPulse",
});

const type = ref("password");
const router = useRouter();
const loader = ref(false);
const errMsg = ref("");

const user = reactive({
  name: "",
  email: "",
  password: "",
});
const { $Fetch } = useNuxtApp();

function togglePassword() {
  if (type.value === "password") {
    type.value = "text";
    return;
  }
  type.value = "password";
}

async function signUp() {
  const data = {
    name: user.name,
    email: user.email,
    password: user.password,
  };
  loader.value = true;
  try {
    const res = await $Fetch("/create-account", {
      method: "POST",
      body: data,
    });
    loader.value = false;
    if (res.success) {
      router.push("/otp");
      localStorage.setItem("email", user.email);
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
