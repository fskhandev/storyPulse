export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const token = useCookie("token");

  const Fetch = $fetch.create({
    baseURL: config.public.baseUrl,
    async onRequest({ options }) {
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
