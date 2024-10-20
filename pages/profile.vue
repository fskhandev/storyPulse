<template>
    <Profile />
</template>

<script setup>
useHead({
  title: "Profile - StoryPulse",
})
definePageMeta({
  middleware: ["auth"]
});
</script>