import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  devtools: { enabled: false },

   runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_API_BASE,
    },
  },

  modules: [
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@element-plus/nuxt",
    "@nuxtjs/google-fonts",
  ],

  css: ["vue-tel-input/vue-tel-input.css"],

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
      link: [{ rel: "icon", type: "image/svg", href: "/s.svg" }],
    },
  },

  compatibilityDate: "2024-11-21",
});
