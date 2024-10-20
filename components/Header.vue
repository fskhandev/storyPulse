<template>
  <div
    :class="[
      isScroll || custom ? 'bg-slate-400' : '',
      custom ? 'sticky' : 'fixed',
    ]"
    class="flex z-40 items-center w-full text-white px-3 md:px-16 top-0 justify-between py-5"
  >
    <NuxtLink to="/" class="font-semibold text-2xl">StoryPulse</NuxtLink>
    <iconHumberger
      @click="toggleSidebar"
      class="w-8 cursor-pointer md:hidden stroke-white fill-white"
    />
    <ul
      :class="[showSidebar ? 'left-0' : '-left-64 ']"
      class="flex fixed px-5 md:px-0 md:flex-row pt-5 transition-all md:pt-0 flex-col top-0 md:text-white text-slate-900 h-screen md:bg-transparent bg-white w-64 md:w-auto md:h-auto md:static gap-4 md:gap-10 md:items-center"
    >
      <div class="flex md:hidden justify-between">
        <h2 class="text-2xl font-semibold">Stories</h2>
        <IconClose @click="toggleSidebar" class="cursor-pointer" />
      </div>
      <NuxtLink
        @click.native="toggleSidebar"
        class="text-lg py-3 md:py-0"
        to="/"
        >Home</NuxtLink
      >
      <NuxtLink
        @click.native="toggleSidebar"
        class="text-lg py-3 md:py-0"
        to="/about-us"
        >About Us</NuxtLink
      >
      <NuxtLink
        @click.native="toggleSidebar"
        class="text-lg py-3 md:py-0"
        to="/all-stories"
        >All Stories</NuxtLink
      >
      <NuxtLink
        @click.native="toggleSidebar"
        class="text-lg py-3 md:py-0"
        to="/archives"
        >Archives</NuxtLink
      >
      <div
        @click.native="getUser"
        v-if="isLoggedIn"
        class="text-lg group relative"
      >
        <p class="cursor-pointe text-lg py-3 md:py-0">Profile</p>
        <ul
          class="absolute group-hover:block py-2 hidden space-y-1 text-slate-900 top-7 -left-20 rounded-md w-48 bg-white shadow-md"
        >
          <NuxtLink
            @click.native="closeDropdown"
            to="/profile"
            class="cursor-pointer flex gap-2 items-center py-1.5 px-1 hover:bg-orange-400 transition-all hover:text-white"
          >
            <img
              v-if="user.profile_image"
              :src="baseUrl + user.profile_image"
              class="w-7 rounded-full h-7"
              alt=""
            />
            <IconProfileAvatar v-else class="w-8 h-8 fill-slate-400" />
            <span> {{ user.name }}</span>
          </NuxtLink>
          <li
            @click="logOut"
            class="cursor-pointer flex gap-3 items-center py-1.5 px-2 hover:bg-orange-400 transition-all hover:text-white"
          >
            <IconLogOut class="w-5 h-7" />
            <span> Log out </span>
          </li>
        </ul>
      </div>
      <NuxtLink
        @click.native="toggleSidebar"
        v-else
        class="text-lg text-lg py-3 md:py-0"
        to="/login"
        >Login</NuxtLink
      >
    </ul>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
const showSidebar = ref(false);
const router = useRouter();
const user = useUser();
const isLoggedIn = useAuth();
const token = useCookie("token");
const baseUrl = ref("http://localhost:3003/");
defineProps({
  isScroll: {
    default: false,
    type: Boolean,
  },
  custom: {
    default: false,
  },
});

function toggleSidebar() {
  showSidebar.value = !showSidebar.value;
}

function closeDropdown(e) {
  const parent = e.currentTarget.parentElement;
  parent.classList.remove("group-hover:block");
  setTimeout(() => {
    parent.classList.add("group-hover:block");
  }, 100);
}

function logOut() {
  token.value = undefined;
  isLoggedIn.value = false;
  router.push("/login");
}
</script>
