<template>
  <div>
    <BannerHome v-if="isHomeBanner" />
    <BannerStories
      @showModal="showModal"
      v-else-if="!isHomeBanner && !archive"
    />
    <BannerArchive v-if="archive" />
    <div class="md:px-20 px-3 my-5 md:my-8">
      <div class=" flex justify-between">
        <span class="border-b-2 text-2xl font-semibold border-orange-500 pb-1"> {{ title }}</span>
        <button
          @click="showModal"
          class="px-6 py-1.5 rounded-md hover:bg-orange-500 transition-all bg-orange-400 border text-white"
        >
          Create Story
        </button>
      </div>
      <p class="text-center text-xl" v-if="loading">Loading...</p>
      <p
        v-if="!loading && !result.length"
        class="text-xl mt-10 text-center text-red-400"
      >
        No record found
      </p>
      <div class="grid gap-5 md:grid-cols-3 mt-5">
        <div v-for="(story, index) in result" :key="index">
          <StoryCard
            :story="story"
            @updateStory="updateStory"
            @deleteStory="deleteStory"
            :index="index"
            @removeFromArchived="removeFromArchived"
          />
        </div>
      </div>
      <!-- <p v-if="loading" class="text-center text-lg mt-5">Loading..</p> -->
      <StoryModal
        :isEdit="isEdit"
        :story="selectedStory"
        @editStory="editStory"
        @addStory="addStory"
        @showModal="showModal"
        v-if="isModal"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, toRef, nextTick, computed, onMounted } from "vue";
const isModal = ref(false);
const isEdit = ref(false);
const currentPage = ref(1);
const loading = ref(true);
const user = useUser();
const selectedStory = ref({});
const props = defineProps({
  title: {
    default: "",
    type: String,
  },
  popularStories: {
    default: "",
    type: String,
  },
  isHomeBanner: {
    default: true,
    type: Boolean,
  },
  auth: {
    default: false,
    type: Boolean,
  },
  archive: {
    default: "",
    type: String,
  },
});
const { $Fetch } = useNuxtApp();
const result = ref([]);
const { archive } = props;

onMounted(async () => {
  await getStories(currentPage.value);
  const scroll = useScroll(currentPage.value, 10);
  window.addEventListener("scroll", () => {
    scroll(result.value, getStories);
  });
});

async function getStories(page) {
  const params = {};
  try {
    const res = await $Fetch(
      `/get-stories?page=${page}&type=${archive}&story=${props.popularStories}`
    );
    loading.value = false;
    result.value = page === 1 ? res.stories : result.value.concat(res.stories);
  } catch (err) {
    console.log(err);
  }
}

function editStory(story) {
  result.value = result.value.map((item) => {
    if (item.story_id == story.story_id) {
      return { ...story };
    } else {
      return item;
    }
  });
  result.value = result.value.slice();
}

function addStory(story) {
  result.value.unshift(story);
  console.log(story);
}

async function deleteStory(storyId, index) {
  try {
    const res = await $Fetch(`delete-story?story_id=${storyId}`, {
      method: "POST",
    });
    if (res.success) {
      result.value.splice(index, 1);
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

async function removeFromArchived(index) {
  if (props.archive) {
    result.value.splice(index, 1);
  }
}

function showModal() {
  isEdit.value = false;
  isModal.value = !isModal.value;
  if (isModal.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
}
</script>
