import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  // if (to.path !== "/login" && to.path !== "/register") {
  //   if (!authStore.isAuthenticated()) {
  //     return navigateTo("/login");
  //   }
  // }
});
