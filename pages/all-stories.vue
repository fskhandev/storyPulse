<template>
  <Stories popularStories="popular" title="Popular stories" />
</template>
<script setup>
useHead({
  title: "Popular Stories - StoryPulse",
})
definePageMeta({
  middleware: ["auth"]
});
</script>