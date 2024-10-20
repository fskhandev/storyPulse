<template>
    <Stories title="Archive" archive="archive"  :is-home-banner="false" />
</template>
<script setup>
useHead({
  title: "Archives - StoryPulse",
})
definePageMeta({
    middleware: ["auth"]
});
</script>