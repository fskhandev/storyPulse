<template>
    <div class="blog-banner relative">
        <button v-if="isLoggedIn" @click="$emit('showModal')"
            class="px-8 py-2 text-xl rounded-md border-orange-300 border text-white absolute right-10 bottom-5">
            Create Story
        </button>
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