<template>
  <div class="">
    <div
      :style="{ backgroundImage: `url(${baseUrl + userDetail.cover_image})` }"
      class="h-[30vh] md:h-[50vh] relative profile-banner"
    >
      <div class="absolute w-full h-full bg-[rgba(0,0,0,0.4)]"></div>
      <div
        class="absolute w-full justify-center items-center md:flex-row flex-col md:justify-between items-center -bottom-2/4 px-8 flex md:-bottom-12"
      >
        <div class="flex flex-col items-center">
          <img
            v-if="userDetail.profile_image"
            :src="baseUrl + userDetail.profile_image"
            class="w-40 rounded-full h-40 object-cover border-white border-4"
            alt=""
          />
          <IconProfileAvatar v-else class="w-40 h-40 fill-blue-100" />
          <p class="text-xl font-semibold">{{ userDetail.name }}</p>
        </div>
        <div class="text-slate-900 md:text-white">
          <p class="text-xl font-semibold">
            {{ userDetail.totalStoriesCount }} Stories
          </p>
        </div>
        <div
          class="flex gap-3 md:mt-0 mt-4"
          v-if="userDetail.user_id === user?.user_id"
        >
          <button
            @click="showModal"
            class="px-8 py-2 rounded-md border-orange-200 border md:text-white text-slate-900 md:ext-white"
          >
            Create story
          </button>
          <button
            @click="toggleModal"
            class="bg-orange-500 px-8 rounded-md py-2 text-white"
          >
            Edit profile
          </button>
        </div>
      </div>
      <updateProfileModal
        :userDetail="userDetail"
        @toggleModal="toggleModal"
        v-if="showEditModal"
      />
      <StoryModal
        :isEdit="isEdit"
        :story="selectedStory"
        @editStory="editStory"
        @addStory="addStory"
        v-if="isModal"
        @showModal="showModal"
      />
    </div>
    <div class="md:max-w-[60%] mt-40 md:mt-5 text-justify mx-auto px-3">
      <p>
        {{ userDetail.description }}
      </p>
    </div>
    <div class="stories mt-10 mb-10 md:px-16 px-3">
      <h2 class="border-b border-slate-700 text-xl font-semibold text-center">
        <span class="border-b-2 border-orange-500"> Stories</span>
      </h2>
      <div class="grid mt-5 grid-cols-1 gap-6 md:grid-cols-3">
        <StoryCard
          :auth="true"
          v-for="(story, index) in userStories"
          :key="index"
          @deleteStory="deleteStory"
          @updateStory="updateStory"
          :story="story"
          :index="index"
          :isEdit="isEdit"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
const router = useRoute();
const baseUrl = ref("https://story-backend-production-3684.up.railway.app")
const { $Fetch } = useNuxtApp();
const showEditModal = ref(false);
const userStories = ref([]);
const userDetail = ref({});
const isEdit = ref(false);
const currentPage = ref(1);
const isModal = ref(false);
const selectedStory = ref();

const user = useUser();
if (router.query.user_id) {
  const { data } = await useMyFetch("/get-profile", {
    sever: false,
    query: {
      user_id: router.query.user_id,
    },
  });
  userDetail.value = data.value.user;
} else {
  userDetail.value = user.value;
}

const getUserStories = async (page) => {
  const res = await $Fetch("/user-stories", {
    query: {
      user_id: router.query.user_id ? router.query.user_id : user.value.user_id,
      page: page,
    },
  });
  userStories.value =
    page === 1 ? res.stories : userStories.value.concat(res.stories);
};

onMounted(() => {
  getUserStories(currentPage.value);
  const scroll = useScroll(currentPage.value, 10);
  window.addEventListener("scroll", () => {
    scroll(userStories.value, getUserStories);
  });
});

function toggleModal(updatedUser) {
  showEditModal.value = !showEditModal.value;
  if (!showEditModal.value && updatedUser) {
    userDetail.value = updatedUser;
  }
  if (showEditModal.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
}

function showModal() {
  isEdit.value = false;
  selectedStory.value = {}
  isModal.value = !isModal.value;
  if (isModal.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
}

function editStory(story) {
  userStories.value = userStories.value.map((item) => {
    if (item.story_id == story.story_id) {
      return { ...story };
    } else {
      return item;
    }
  });
}

function addStory(story) {
  userStories.value.unshift(story);
}

async function deleteStory(storyId, index) {
  try {
    const res = await $Fetch(`delete-story?story_id=${storyId}`, {
      method: "POST",
    });
    if (res.success) {
      userStories.value.splice(index, 1);
    }
  } catch (err) {
    console.log(err);
  }
}

function updateStory(story) {
  isModal.value = !isModal.value;
  isEdit.value = true;
  selectedStory.value = story;
}
</script>
<style>
.profile-banner {
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  /* background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)); */
}
</style>
