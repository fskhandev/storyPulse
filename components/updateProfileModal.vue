<template>
  <div
    class="fixed md:py-1 h-screen overflow-x-hidden bg-[rgba(0,0,0,0.5)] z-40 inset-0 flex justify-center items-center"
  >
    <form
      @submit.prevent="updateProfile"
      class="form w-full overflow-y-auto max-h-[95%] md:max-h-[100%] mx-1 md:w-4/6 relative rounded-md bg-white shadow-md space-y-4 p-4"
    >
      <IconClose
        @click="$emit('toggleModal')"
        class="text-3xl cursor-pointer absolute right-2 top-2"
      />
      <div class="flex gap-10 flex-wrap">
        <div class="w-full md:w-auto">
          <h3 class="text-xl font-semibold">Profile image</h3>
          <div class="flex gap-3 mt-2 w-full">
            <div
              class="py-5 cursor-pointer hover:bg-orange-400 h-28 w-full relative border md:w-44 flex flex-col justify-center items-center"
            >
              <input
                class="opacity-0 cursor-pointer absolute w-full h-full"
                type="file"
                placeholder="Select image"
                @change="selectProfileImage"
              />
              <IconAvatar class="w-5 h-5" />
              <p class="cursor-pointer text-xs md:text-base whitespace-nowrap">Upload profile image</p>
            </div>
            <div class="h-28 w-full md:w-44">
              <img :src="showProfileImage" class="h-full block w-full" alt="" />
            </div>
          </div>
        </div>
        <div class="w-full md:w-auto">
          <h3 class="text-xl font-semibold">Cover image</h3>

          <div class="flex gap-3 mt-2 w-full">
            <div
              class="py-5 cursor-pointer hover:bg-orange-400 h-28 flex-col relative border w-44 flex justify-center items-center"
            >
              <input
                class="opacity-0 cursor-pointer absolute w-full h-full"
                type="file"
                placeholder="Select image"
                @change="selectCoverImage"
              />
              <IconAvatar class="w-5 h-5" />
              <p class="cursor-pointer  text-xs md:text-base whitespace-nowrap">Upload cover image</p>
            </div>
            <div class="w-44 h-28">
              <img :src="showCoverImage" class="h-full block w-full" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 gap-x-4 gap-y-2 md:grid-cols-2">
        <div>
          <label for="">Name</label>
          <input
            type="text"
            ref="userName"
            required
            class="w-full mt-2 rounded-xl border border-slate-400 focus:outline-none py-2 px-3"
            v-model="user.name"
            placeholder="Enter name"
          />
        </div>
        <div>
          <label for="">Email</label>
          <input
            type="text"
            required
            class="w-full mt-2 rounded-xl border border-slate-400 focus:outline-none py-2 px-3"
            v-model="user.email"
            disabled
            placeholder="Enter email"
          />
        </div>
      </div>
      <div>
        <label for="">About</label>
        <textarea
          name=""
          id=""
          class="w-full mt-2 rounded-xl border border-slate-400 focus:outline-none py-2 px-3"
          placeholder="Enter about description"
          rows="3"
          v-model="user.description"
        ></textarea>
      </div>
      <button
        :disabled="loader"
        type="submit"
        :class="[!loader ? 'hover:bg-orange-500' : '']"
        class="w-36 flex justify-center transition-all items-center h-11 ml-auto bg-orange-600 text-white rounded-xl"
      >
        <span
          class="w-5 h-5 block border-2 border-gray-100 border-t-blue-300 rounded-full animate-spin"
          v-if="loader"
        ></span>
        <span v-else>Update profile</span>
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, defineEmits, toRef } from "vue";

const emit = defineEmits(["toggleModal"]);
const props = defineProps({
  userDetail: {
    default: {},
  },
});

const getUser = useUser();

const { name, email, description, profile_image, cover_image } = getUser.value;

const { $Fetch } = useNuxtApp();
const showProfileImage = ref(profile_image || "");
const showCoverImage = ref(cover_image || "");
const loader = ref(false);
const userName = ref("");

const user = reactive({
  name: name,
  email: email,
  profile_image: "",
  cover_image: "",
  description: description || "",
});

onMounted(() => {
  userName.value.focus();
});

function selectProfileImage(event) {
  const imageFiles = event.target.files[0];
  user.profile_image = imageFiles;
  showProfileImage.value = URL.createObjectURL(imageFiles);
}

function selectCoverImage(event) {
  const imageFiles = event.target.files[0];
  user.cover_image = imageFiles;
  showCoverImage.value = URL.createObjectURL(imageFiles);
}

async function updateProfile() {
  const data = new FormData();
  data.append("name", user.name);
  data.append("email", user.email);
  data.append("description", user.description);
  data.append("profile_image", user.profile_image);
  data.append("cover_image", user.cover_image);
  loader.value = true;
  try {
    const res = await $Fetch("/update-profile", {
      method: "POST",
      body: data,
    });
    loader.value = false;
    if (res.success) {
      emit("toggleModal", res.user);
      getUser.value = res.user;
    }
  } catch (err) {
    console.log(err);
  }
}
</script>
