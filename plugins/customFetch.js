export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const Fetch = $fetch.create({
    baseURL: config.public.baseUrl,
    async onRequest({ options }) {
      const token = useCookie("token");
      if (token.value) {
        options.headers = {
          ...options.headers,
          token: token.value
        };
      }
    }
  });

  return {
    provide: {
      Fetch: Fetch,
    },
  };
});
