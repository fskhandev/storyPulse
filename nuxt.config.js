// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "StoryPulse",
      description: 'A space where stories come to life! Dive into a world of captivating narratives..',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },
  devtools: { enabled: true },


  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL,
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ["@nuxt/image", "@pinia/nuxt"],
  css: ["~/assets/css/main.css"],
});
