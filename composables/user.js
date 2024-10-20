export const useUser = () => useState("user", () => {});
export const useAuth = () => useState("auth", () => false);
export const useUserAuth = () => {
  const user = useUser();
  const isLoggedIn = useAuth();

  return async () => {
    try {
      const { data, pending } = await useMyFetch("/auth/me");
      user.value = data.value.user;
      isLoggedIn.value = true;
      return data.value;
    } catch (err) {
      console.log(err);
    }
  };
};
