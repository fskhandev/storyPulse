<template>
    <div class="flex h-[500px] md:h-screen banner items-center">
        <div class="banner-contents max-w-[550px] z-20 mx-2 md:mx-16 text-white">
            <h3 class="text-2xl md:text-5xl">
                A space where stories come to life! Dive into a world of
                captivating narratives..
            </h3>
            <p class="mt-3 text-lg">
                Join our community of avid readers and storytellers. Share your thoughts, engage with the stories, and
                become part of a vibrant literary community. Each post is more than just words on a screen—it's a
                gateway to another world, a moment in time, and an experience waiting to unfold.
            </p>
            <div class="overlay"></div>
        </div>
    </div>
</template>
<style scoped>
.banner {
    width: 100%;
    position: relative;
    background-image: url("/images/banner.webp");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}

.overlay {
    position: absolute;
    z-index: -2;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}
</style>