
export default defineNuxtPlugin(async (nuxtApp) => {
  const token = useCookie("token");
  const getUser = useUserAuth();

  if (token.value) {
    await getUser();
  }
  if (process.server) {
    const headers = useRequestHeaders();
    console.log('Incoming Headers on Server:', headers);
  }
});
