import { VueQueryPlugin, QueryClient, hydrate, dehydrate } from '@tanstack/vue-query';

export default defineNuxtPlugin((nuxtApp) => {
  // Create a QueryClient instance
  const queryClient = new QueryClient();

  // Hydrate the query client (for SSR support)
  if (process.server) {
    nuxtApp.hook('app:rendered', () => {
      nuxtApp.payload.vueQueryState = dehydrate(queryClient);
    });
  } else if (process.client) {
    hydrate(queryClient, nuxtApp.payload.vueQueryState);
  }

  // Install the VueQueryPlugin
  nuxtApp.vueApp.use(VueQueryPlugin, { queryClient });
});
