<template>
  <div class="shadow h-full border-t border-l border-r relative">
    <div class="py-2 px-1 flex justify-between items-center">
      <NuxtLink
        v-if="!auth"
        class="flex gap-2 items-center"
        :to="{ name: 'profile', query: { user_id: story.user.user_id } }"
      >
        <img
          v-if="story?.user?.profile_image"
          class="w-10 h-10 rounded-full border-2 border-orange-400"
          :src="baseUrl + story?.user?.profile_image"
          alt=""
        />

        <IconProfileAvatar v-else class="w-10 fill-slate-500 h-10" />
        <div>
          <p class="mb-0">{{ story.user.name }}</p>
          <small class="-mt-1 block">{{
            moment(story.createdAt).fromNow()
          }}</small>
        </div>
      </NuxtLink>
      <div v-else class="flex gap-2 items-center">
        <img
          v-if="story?.user?.profile_image"
          class="w-10 h-10 rounded-full border-2 border-orange-400"
          :src="baseUrl + story?.user?.profile_image"
          alt=""
        />

        <IconProfileAvatar v-else class="w-10 fill-slate-500 h-10" />
        <div>
          <p class="mb-0">{{ story.user.name }}</p>
          <small class="-mt-1 block">{{
            moment(story.createdAt).fromNow()
          }}</small>
        </div>
      </div>
      <div class="relative" v-if="story.user.user_id === user.user_id">
        <div
          ref="dots"
          @click="isCardMenu = !isCardMenu"
          class="flex dots gap-0.5"
        >
          <span class="pointer-events-none"></span
          ><span class="pointer-events-none"></span
          ><span class="pointer-events-none"></span>
        </div>
        <ul
          v-if="isCardMenu"
          ref="cardMenu"
          class="absolute rounded-md space-y-1.5 bg-white shadow-md right-5 w-56 py-3"
        >
          <li
            @click="$emit('updateStory', story)"
            class="py-2 rounded-md cursor-pointer px-3 transition-all hover:bg-slate-100 flex gap-2 items-center"
          >
            <iconEdit class="w-5 h-5" /> Edit
          </li>
          <li
            @click="$emit('deleteStory', story.story_id)"
            class="py-2 rounded-md cursor-pointer px-3 transition-all hover:bg-slate-100 flex gap-2 items-center"
          >
            <iconDelete class="w-5 h-5" /> Delete
          </li>
        </ul>
      </div>
    </div>
    <NuxtLink
      class="h-[250px] block w-full"
      :to="{ name: 'detail-id', params: { id: story.story_id } }"
    >
      <img
        class="w-full h-full aspect-video"
        :src="baseUrl + story.image"
        alt=""
      />
    </NuxtLink>
    <div class="space-y-2 mb-8 p-3">
      <NuxtLink
        :to="{ name: 'detail-id', params: { id: story.story_id } }"
        class="text-2xl transition-all hover:text-blue-400 font-semibold"
        >{{
          (
            story?.title.slice(0, 1).toUpperCase() + story?.title.slice(1)
          ).slice(0, 25)
        }}..</NuxtLink
      >
      <p class="text-lg">{{ story?.description?.slice(0, 80) }}...</p>
    </div>
    <div class="absolute flex gap-1 px-3 items-center bottom-2 right-2">
      <span @click="addToArchive(story)" class="cursor-pointer">
        <IconArchive
          :class="[story.is_archived ? 'fill-gray-900' : 'fill-gray-500']"
          class="w-7 h-7"
        />
      </span>
      <span class="flex gap-1 items-center justify-end w-full">
        <iconLike
          @click="addRemoveLike(story)"
          :class="[
            story.user_like && isLoggedIn ? 'fill-green-400' : 'fill-black ',
          ]"
          class="cursor-pointer w-5"
        />
        <small v-if="story.likes_count" class="text-base">{{
          story.likes_count
        }}</small>
      </span>
    </div>
  </div>
</template>

<script setup>
import { toRefs, onMounted } from "vue";
const isLoggedIn = useAuth();
const user = useUser();
import moment from "moment";
const baseUrl = ref("https://story-backend-production-3684.up.railway.app")
const emit = defineEmits(["updateStory", "deleteStory", "removeFromArchived"]);
const { $Fetch } = useNuxtApp();
const isCardMenu = ref(false);
const props = defineProps({
  story: {
    default: {},
    type: Object,
  },
  index: {
    default: 0,
    type: Number,
  },
  auth: {
    default: false,
    type: Boolean,
  },
});
const { story } = toRefs(props);
const { index } = props;

const cardMenu = ref(null);
const dots = ref(null);

onMounted(() => {
  document.addEventListener("click", function (e) {
    if (e.target == cardMenu.value || e.target == dots.value) {
      return;
    }
    isCardMenu.value = false;
  });
});

async function addToArchive(story) {
  try {
    const res = await $Fetch("/add-remove-archive", {
      method: "POST",
      query: {
        story_id: story.story_id,
      },
    });
    if (res.success) {
      if (res.message === "archived") {
        story.is_archived = 1;
      } else {
        story.is_archived = 0;
        emit("removeFromArchived", index);
      }
    }
  } catch (err) {
    console.log(err);
  }
}

async function addRemoveLike(story) {
  try {
    const res = await $Fetch("/add-remove-like", {
      method: "POST",
      query: {
        story_id: story.story_id,
      },
    });
    if (res.success) {
      if (res.message === "liked") {
        story.likes_count += 1;
      } else {
        story.likes_count -= 1;
      }
      story.user_like = !story.user_like;
    }
  } catch (err) {
    console.log(err);
  }
}
</script>
<style>
.dots {
  width: 35px;
  height: 35px;
  border-radius: 35px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.1s all ease;
}
.dots:hover {
  background-color: #f1f1f1;
}
.dots span {
  width: 4px;
  height: 4px;
  border-radius: 4px;
  background-color: brown;
  border: 1px solid brown;
}
</style>
