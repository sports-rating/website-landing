// stores/sport.ts
import { defineStore } from "pinia";

export const useSportStore = defineStore("sport", {
  state: () => ({
    activeCategory: null,
  }),
});
