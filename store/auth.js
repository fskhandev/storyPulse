import { defineStore } from "pinia";

export const useAuthStore = defineStore("useAuth", () => {
  const isLoggedIn = useState();
  const user = useUser();
  const { $Fetch } = useNuxtApp();
  const token = useCookie("token");

  async function getUser() {
    if (token.value) {
      try {
        const res = await $Fetch("/auth/me");
        isLoggedIn.value = true;
        user.value = res.user;
      } catch (err) {
        console.log(err);
      }
    }
  }
  return { isLoggedIn, getUser, user };
});
