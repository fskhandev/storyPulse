<template>
  <div class="fixed bg-[rgba(0,0,0,0.5)] z-40 inset-0 flex justify-center items-center">
    <div class="form w-full mx-4 md:w-[500px] relative rounded-md bg-white shadow-md space-y-4 p-3 md:p-10">
      <IconClose @click="$emit('showModal')" class="text-3xl cursor-pointer absolute right-2 top-2" />
      <h3 class="text-center text-2xl font-semibold">Create Story</h3>
      <input type="text" class="w-full rounded-xl border border-slate-400 focus:outline-none py-2.5 px-5"
        v-model="blog.title" placeholder="Enter title" />
      <textarea name="" id="" class="w-full rounded-xl border border-slate-400 focus:outline-none py-2.5 px-5"
        placeholder="Description" rows="3" v-model="blog.description"></textarea>
      <div class="flex gap-3">
        <div
          class="py-5 cursor-pointer hover:bg-orange-400 h-28 relative border w-1/2 flex justify-center items-center">
          <input class="opacity-0 cursor-pointer absolute w-full h-full" type="file" placeholder="Select image"
            @change="selectImage" />
          <p class="cursor-pointer">Select image</p>
        </div>
        <div class="w-1/2">
          <img :src="showImage" class="h-28 block w-full" alt="" />
        </div>
      </div>
      <button @click="createStory" class="w-full py-2.5 bg-orange-600 text-white rounded-xl">
        Create
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, defineEmits } from "vue";
const emit = defineEmits(["editStory", "showModal", "addStory"]);
const props = defineProps({
  story: {
    default: {},
    type: Object,
  },
  stories: {
    default: [],
    type: Array,
  },
  isEdit: {
    default: false,
    type: Boolean,
  },
});
const user = useUser()
let { story, isEdit } = props;
const { $Fetch } = useNuxtApp();
const showImage = ref("");
const baseUrl = ref("http://localhost:3003/");
const blog = reactive({
  story_id: story?.story_id,
  title: story.title || "",
  description: story.description || "",
  image: story.image ? (showImage.value = baseUrl.value + story.image) : "",
});


function selectImage(event) {
  const imageFiles = event.target.files[0];
  blog.image = imageFiles;
  showImage.value = URL.createObjectURL(imageFiles);
}
async function createStory() {
  const data = new FormData();
  if (blog.story_id) {
    data.append("story_id", blog.story_id);
  }
  data.append("title", blog.title);
  data.append("description", blog.description);
  data.append("image", blog.image);
  const url = isEdit ? `/update-story` : "/create-blog";
  const res = await $Fetch(url, {
    method: "POST",
    body: data,
  });

  if (isEdit) {
    emit("editStory", res.story);
  } else {
    emit("addStory", res.story);
  }
  emit("showModal");

  blog.title = "";
  blog.description = "";
  blog.image = "";
  showImage.image = "";
}
</script>
