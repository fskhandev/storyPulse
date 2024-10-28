import { logger } from "nuxt/kit";

export default defineNuxtPlugin(async (nuxtApp) => {
  const token = useCookie("token");
  const getUser = useUserAuth();

  if (token.value) {
    await getUser();
  }
});
