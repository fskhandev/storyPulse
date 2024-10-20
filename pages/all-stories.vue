<template>
  <Stories title="All stories" :is-home-banner="false" />
</template>
<script setup>
useHead({
  title: "All Stories - StoryPulse",
})
definePageMeta({
  middleware: ["auth"]
});
</script>