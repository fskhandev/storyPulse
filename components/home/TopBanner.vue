<template>
  <section
    id="home"
    class="home h-[70vh] md:h-screen px-3 md:px-16 flex items-center text-white w-full"
  >
    <div class="md:max-w-[80%]">
      <h2 class="text-4xl font-semibold !leading-snug md:text-6xl text-2xl">
        Empowering Businesses with Cutting-Edge Technologies!
      </h2>
      <p class="italic mt-4 md:text-2xl text-[14px]">
        Driving growth and molding the future through transformative change
      </p>
      <nuxt-link
        to="/contact"
        class="mt-12 font-medium inline-block text-white bg-[#F76236] rounded-xl px-12 py-3"
      >
        GET IN TOUCH
      </nuxt-link>
    </div>
  </section>
</template>

<style scoped>
.home {
  background-image: url("/images/bg.jpg");
  background-position: center;
  background-size: cover;
}
</style>
