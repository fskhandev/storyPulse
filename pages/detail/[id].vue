<template>
  <div class="w-full px-3 md:px-20 gap-10 grid grid-cols-5 mx-auto mt-5">
    <div class="col-span-5 md:col-span-3">
      <div v-if="pending">
        <ContentLoader viewBox="0 0 400 500" class="w-full" :speed="2">
          <!-- Profile Image and Name Loader -->
          <circle cx="20" cy="20" r="16" />
          <rect x="40" y="12" rx="3" ry="3" width="140" height="10" />
          <rect x="40" y="30" rx="3" ry="3" width="90" height="8" />

          <!-- Story Image Loader -->
          <rect x="0" y="45" rx="3" ry="3" width="100%" height="250" />

          <!-- Title Loader -->
          <rect x="0" y="320" rx="3" ry="3" width="80%" height="20" />

          <!-- Description Loader -->
          <rect x="0" y="350" rx="3" ry="3" width="90%" height="12" />
          <rect x="0" y="370" rx="3" ry="3" width="85%" height="12" />
        </ContentLoader>
      </div>
      <div v-else class="w-full">
        <NuxtLink
          class="flex gap-1 mb-2 items-center"
          :to="{ name: 'profile', query: { user_id: data.story.user_id } }"
        >
          <img
            v-if="data.story.user.profile_image"
            class="w-10 h-10 rounded-full"
            :src="data.story.user.profile_image"
            alt=""
          />
          <IconProfileAvatar v-else class="w-10 fill-slate-400 h-10" />

          <div>
            <p class="mb-0">{{ data.story.user.name }}</p>
            <small class="-mt-1 block">{{
              moment(data.story.createdAt).fromNow()
            }}</small>
          </div>
        </NuxtLink>
        <div class="flex justify-center">
          <img
            :src="data?.story?.image"
            class="w-full aspect-video h-[300px] md:h-[400px]"
            alt=""
          />
        </div>
        <div class="mt-2 space-y-2">
          <h3 class="text-3xl font-semibold">
            {{
              data?.story.title.slice(0, 1).toUpperCase() +
              data?.story.title.slice(1)
            }}
          </h3>
          <p class="text-lg">{{ data?.story.description }}</p>
        </div>
      </div>
    </div>
    <div class="related-stories col-span-5 md:col-span-2">
      <h1 class="text-2xl font-semibold">Explore More stories</h1>
      <div v-if="data?.otherStories.length" class="mt-3 max-h-[500px] overflow-y-auto">
        <div
          v-for="story in data?.otherStories"
          :key="story.id"
          class="flex mb-4 gap-2 w-full"
        >
          <NuxtLink
            class="w-full"
            :to="{ name: 'detail-id', params: { id: story.story_id } }"
          >
            <img :src="story.image" class="aspect-video w-full h-full" alt="" />
          </NuxtLink>
          <div class="w-full">
            <NuxtLink
              :to="{ name: 'detail-id', params: { id: story.story_id } }"
              class="text-xl transition-all hover:text-blue-400 font-semibold"
              >{{
                (
                  story.title.slice(0, 1).toUpperCase() + story.title?.slice(1)
                ).slice(0, 30)
              }}..</NuxtLink
            >
            <p class="">{{ story.description.slice(0, 60) }}...</p>
          </div>
        </div>
      </div>
      <p v-else class="text-red-500 text-lg py-8 px-14">No record found</p>
    </div>
  </div>
</template>

<script setup>
import { ContentLoader } from "vue-content-loader";

definePageMeta({
  layout: "custom",
  middleware: ["auth"],
});
useHead({
  title: "Story - StoryPulse",
});
import { ref } from "vue";
import moment from "moment";
const router = useRoute();
const { data, pending } = useMyFetch(`/get-story-detail/${router.params.id}`, {
  server: false,
});
</script>
