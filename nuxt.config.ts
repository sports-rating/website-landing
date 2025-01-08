import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  devtools: { enabled: false },

  modules: [
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@element-plus/nuxt",
    "@nuxtjs/google-fonts",
  ],

  colorMode: {
    preference: "light",
    fallback: "light",
    classSuffix: "",
  },

  app: {
    head: {
      htmlAttrs: {
        class: "light",
      },
    },
  },

  compatibilityDate: "2024-11-21",
});
