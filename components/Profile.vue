<template>
  <div class="">
    <div class="h-[45vh] md:h-[50vh] relative profile-banner">
      <img :src="userDetail.cover_image" class="w-full h-full" alt="" />
      <div class="absolute w-full top-0 h-full bg-[rgba(0,0,0,0.6)]"></div>
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
    <div
      class="-translate-y-1/2 md:-translate-y-2/3 w-full justify-center items-center md:flex-row flex-col md:justify-between items-center px-8 flex"
    >
      <div class="flex flex-col items-center">
        <img
          v-if="userDetail.profile_image"
          :src="userDetail.profile_image"
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
        class="flex gap-2 md:gap-3 md:mt-0 mt-4"
        v-if="userDetail.user_id === user?.user_id"
      >
        <button
          @click="showModal"
          class="px-8 hover:bg-orange-500 hover:text-white transition-all py-1.5 md:py-2 rounded-md whitespace-nowrap text-sm md:text-base border-orange-500 border md:text-white text-slate-900 md:ext-white"
        >
          Create story
        </button>
        <button
          @click="toggleModal"
          class="bg-orange-500 hover:bg-orange-400 transition-all whitespace-nowrap text-sm md:text-base px-8 rounded-md py-1.5 md:py-2 text-white"
        >
          Edit profile
        </button>
      </div>
    </div>
    <div class="-mt-28 md:-mt-36">
      <div class="md:max-w-[60%] px-4 md:px-16 text-justify mx-auto">
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
        <div v-if="loading" class="grid w-full mt-10 gap-5 md:grid-cols-3">
          <ContentLoader
            v-for="(i, index) in 10"
            :key="index"
            viewBox="0 0 300 270"
            class="shadow h-full border-t border-l border-r relative"
          >
            <!-- Profile Image Loader -->
            <circle cx="30" cy="30" r="20" />
            <!-- Reduced radius from 20 to 15 and adjusted y-coordinate -->

            <!-- User Name Loader -->
            <rect x="60" y="20" rx="3" ry="3" width="150" height="10" />

            <!-- Time Ago Loader -->
            <rect x="60" y="35" rx="3" ry="3" width="120" height="8" />

            <!-- Story Image Loader -->
            <rect x="0" y="60" rx="3" ry="3" width="300" height="150" />

            <!-- Title Loader -->
            <rect x="0" y="220" rx="3" ry="3" width="200" height="15" />

            <!-- Description Loader -->
            <rect x="0" y="240" rx="3" ry="3" width="250" height="10" />
          </ContentLoader>
        </div>

        <p
          v-if="!loading && !userStories.length"
          class="text-xl mt-10 text-center text-red-400"
        >
          No record found
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import { ContentLoader } from "vue-content-loader";

const router = useRoute();
const { $Fetch } = useNuxtApp();
const showEditModal = ref(false);
const userStories = ref([]);
const userDetail = ref({});
const isEdit = ref(false);
const loading = ref(true)
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
  loading.value = true
  const res = await $Fetch("/user-stories", {
    query: {
      user_id: router.query.user_id ? router.query.user_id : user.value.user_id,
      page: page,
    },
  });
  loading.value = false
  userStories.value =
    page === 1 ? res.stories : userStories.value.concat(res.stories);
};

onMounted(() => {
  getUserStories(currentPage.value);
  const scroll = useScroll(currentPage.value, 9);
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
  selectedStory.value = {};
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
}
</style>
