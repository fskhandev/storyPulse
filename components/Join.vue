<template>
  <section
    class="mt-20 help bg-orange-300 flex items-center justify-center text-white"
  >
    <div class="flex items-center gap-3 justify-center flex-col text-center">
      <h1
        data-aos="fade-right"
        data-aos-duration="400"
        class="font-heading font-semibold md:text-5xl text-xl"
      >
        Stay in touch
      </h1>
      <p class="font-heading font-medium">
        Are you ready to push boundaries and explore new frontiers of
        innovation?
      </p>

      <nuxt-link
        to="/contact"
        class="bg-[#262B3F] transition-all hover:scale-110 px-14 py-3 text-white rounded-lg"
      >
        Contact us
      </nuxt-link>
    </div>
  </section>
</template>

<style scoped>
.help {
  height: 300px;
}
</style>
