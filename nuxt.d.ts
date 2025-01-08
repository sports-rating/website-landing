// nuxt.d.ts
import { ColorModeOptions } from "@nuxtjs/color-mode";

declare module "@nuxt/schema" {
  interface NuxtConfig {
    colorMode?: ColorModeOptions;
  }
}
