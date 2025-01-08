// import { useMutation, useQueryClient } from "@tanstack/vue-query";
// import { useNuxtApp } from "#app";

// export const usePutMutation = (url) => {
//   const { $axios } = useNuxtApp();
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (data) => {
//       const response = await $axios.put(url, data);
//       return response.data;
//     },
//     onSuccess: () => {
//       // Cache-ni yangilash
//       queryClient.invalidateQueries(["users"]);
//     },
//   });
// };

// export const usePatchMutation = (url) => {
//   const { $axios } = useNuxtApp();
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (data) => {
//       const response = await $axios.patch(url, data);
//       return response.data;
//     },
//     onSuccess: () => {
//       // Cache-ni yangilash
//       queryClient.invalidateQueries(["users"]);
//     },
//   });
// };
