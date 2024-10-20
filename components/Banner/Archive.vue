<template>
  <div class="blog-banner relative"></div>
</template>

<script setup>
const emit = defineEmits(["showModal"]);
const isLoggedIn = useAuth();
</script>

<style scoped>
.blog-banner {
  width: 100%;
  height: 35vh;
  background-image: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("/images/archive.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
