export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore();

  const restrictedRoutes = ["/login", "/register", "/phoneVerification"];

  if (authStore.token && restrictedRoutes.includes(useRoute().path)) {
    return navigateTo("/");
  }
});
