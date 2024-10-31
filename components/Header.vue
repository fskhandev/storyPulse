<template>
  <div
    :class="[
      isScroll || custom ? 'bg-[#f1f1f1] text-slate-900' : 'md:text-white',
      custom ? 'sticky' : 'fixed',
    ]"
    class="flex z-40 items-center w-full px-3 md:px-16 top-0 justify-between py-4"
  >
    <NuxtLink
      :class="[isScroll || custom ? 'text-slate-900' : 'text-white']"
      to="/"
      class="font-semibold text-2xl"
      >StoryPulse</NuxtLink
    >

    <div class="flex gap-4">
      <ul
        :class="[showSidebar ? 'left-0' : '-left-64 ']"
        class="flex fixed px-5 md:px-0 md:flex-row pt-5 transition-all md:pt-0 flex-col top-0 h-screen md:bg-transparent bg-white w-64 md:w-auto md:h-auto md:static gap-4 md:gap-10 md:items-center"
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
          to="/popular"
          >Popular Stories</NuxtLink
        >
        <NuxtLink
          @click.native="toggleSidebar"
          class="text-lg py-3 md:py-0"
          to="/archives"
          >Archives</NuxtLink
        >
      </ul>
      <div v-if="isLoggedIn" class="text-lg md:px-4 group z-40 relative">
        <p
          :class="[isScroll || custom ? 'text-slate-900' : 'text-white']"
          @mouseover="showProfileMenu"
          @mouseleave="closeProfileMenu"
          class="cursor-pointer text-lg py-3 md:py-0"
        >
          Profile
        </p>
        <div
          @mouseleave="closeProfileMenu"
          @mouseover="showProfileMenu"
          :class="[isProfileMenu ? 'block' : 'hidden']"
          class="top-5 absolute pt-5 -left-24 md:-left-20"
        >
          <ul
            class="z-50 py-2 space-y-1 text-slate-900 rounded-md w-48 bg-white shadow-md"
          >
            <NuxtLink
              to="/profile"
              @click="closeProfileMenu"
              class="cursor-pointer flex gap-2 items-center py-1.5 px-1 hover:bg-orange-400 transition-all hover:text-white"
            >
              <img
                v-if="user.profile_image"
                :src="user.profile_image"
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
      </div>
      <NuxtLink
        @click="toggleSidebar"
        v-else
        class="text-lg text-lg py-3 md:py-0"
        to="/login"
        >Login</NuxtLink
      >
      <iconHumberger
        @click="toggleSidebar"
        :class="[
          isScroll || custom
            ? 'stroke-slate-900 fill-slate-900'
            : 'stroke-white fill-white',
        ]"
        class="w-8 cursor-pointer md:hidden"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
const showSidebar = ref(false);
const dropdownMenu = ref(false);
const isProfileMenu = ref(false);
const router = useRouter();
const user = useUser();
const isLoggedIn = useAuth();
const token = useCookie("token");
defineProps({
  isScroll: {
    default: false,
    type: Boolean,
  },
  custom: {
    default: false,
  },
});

function showProfileMenu() {
  isProfileMenu.value = true;
}

function closeProfileMenu() {
  isProfileMenu.value = false;
}

function toggleSidebar() {
  showSidebar.value = !showSidebar.value;
}

function logOut() {
  token.value = undefined;
  isLoggedIn.value = false;
  router.push("/login");
}
</script>
