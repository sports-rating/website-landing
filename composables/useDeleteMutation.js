// import { useMutation, useQueryClient } from "@tanstack/vue-query";
// import { useNuxtApp } from "#app";

// export const useDeleteMutation = (url) => {
//   const { $axios } = useNuxtApp();
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (id) => {
//       const response = await $axios.delete(`${url}/${id}`);
//       return response.data;
//     },
//     onSuccess: () => {
//       // Cache-ni yangilash (ixtiyoriy)
//       queryClient.invalidateQueries(["users"]); // 'users' ni yangilash
//     },
//   });
// };
