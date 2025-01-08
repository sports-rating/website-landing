// import { useAuthStore } from "~/stores/auth";

// export default defineNuxtPlugin(() => {
//   setInterval(() => {
//     const authStore = useAuthStore();

//     if (authStore.token && tokenExpired(authStore.token)) {
//       authStore.clearToken();
//       navigateTo("/login");
//     }
//   }, 60000); // Har bir daqiqada tekshiradi

//   function tokenExpired(token) {
//     const payload = JSON.parse(atob(token.split(".")[1]));
//     return payload.exp * 1000 < Date.now();
//   }
// });
