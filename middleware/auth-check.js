// // import { useAuthStore } from "~/stores/auth";

// export default defineNuxtRouteMiddleware((to, from) => {
//   const authStore = useAuthStore();

//   if (authStore.token && tokenExpired(authStore.token)) {
//     authStore.clearToken();
//     return navigateTo("/login");
//   }

//   function tokenExpired(token) {
//     const payload = JSON.parse(atob(token.split(".")[1]));
//     return payload.exp * 1000 < Date.now();
//   }
// });
