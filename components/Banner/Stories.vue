<template>
    <div class="blog-banner relative">
 
    </div>
</template>

<script setup>
const emit = defineEmits(["showModal"])
const isLoggedIn = useAuth()

</script>

<style scoped>
.blog-banner {
    width: 100%;
    height: 40vh;
    background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("/images/banner.webp");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
}
</style>