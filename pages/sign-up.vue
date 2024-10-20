<template>
  <div class="flex login justify-center items-center px-2">
    <div class="form w-full sm:w-[400px] rounded-md bg-white shadow-md space-y-4 py-5 px-3 md:p-8">
      <h3 class="text-center text-2xl font-semibold">Sign up</h3>
      <input type="text" class="w-full rounded-md border border-slate-400 focus:outline-none py-2.5 px-5"
        v-model="user.name" placeholder="Enter name" />
      <input type="email" class="w-full rounded-md border border-slate-400 focus:outline-none py-2.5 px-5"
        v-model="user.email" placeholder="Enter email" />
      <input type="text" v-model="user.contact"
        class="w-full rounded-md border border-slate-400 focus:outline-none py-2.5 px-5" placeholder="Enter contact" />
      <div class="relative">
        <input :type="type" v-model="user.password" @keyup.enter="signUp"
          class="w-full rounded-md border border-slate-400 focus:outline-none py-2.5 px-5"
          placeholder="Create password" />
        <IconEyeShow v-if="type === 'password' && user.password.length" @click="togglePassword"
          class="w-6 cursor-pointer h-6 absolute right-4 top-3" />
        <IconEyeHide v-if="type === 'text' && user.password.length" @click="togglePassword"
          class="w-6 h-6 cursor-pointer absolute right-4 top-3" />
      </div>
      <button @click="signUp"
        class="w-full hover:bg-orange-500 transition-all py-2.5 bg-orange-600 text-white rounded-md">
        Sign up
      </button>
      <div>
        <span>Already have an account?
          <NuxtLink class="text-blue-600" to="/login">Login</NuxtLink>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

definePageMeta({
  layout: "auth"
});

useHead({
  title: "Sign Up - StoryPulse",
})


const type = ref("password")
const router = useRouter();

const user = reactive({
  name: "",
  email: "",
  contact: "",
  password: "",
});
const { $Fetch } = useNuxtApp();

function togglePassword() {
  if (type.value === 'password') {
    type.value = 'text'
    return
  }
  type.value = 'password'
}

async function signUp() {
  const data = {
    name: user.name,
    email: user.email,
    contact: user.contact,
    password: user.password,
  };
  try {
    const res = await $Fetch("/create-account", {
      method: "POST",
      body: data,
    });
    if (res.success) {
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
</style>
