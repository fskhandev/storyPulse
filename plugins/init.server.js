
export default defineNuxtPlugin(async (nuxtApp) => {
  const token = useCookie("token", {
    httpOnly: true, // Make the cookie inaccessible to JavaScript
    secure: true,   // Ensures the cookie is sent only over HTTPS
    sameSite: 'Lax' // Set SameSite attribute to 'Lax'
  });
const getUser = useUserAuth();

if (token.value) {
  await getUser();
}
console.log("server side token", token.value);

  // if (process.server) {
  //   const headers = useRequestHeaders();
  //   console.log('Incoming Headers on Server:', headers);
  // }
});
