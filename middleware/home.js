export default defineNuxtRouteMiddleware(async (to, from) => {
  const isLoggedIn = useAuth("auth");
  const cookie = useCookie("token")
  if (isLoggedIn.value) {
    return navigateTo("/");
  }
});
