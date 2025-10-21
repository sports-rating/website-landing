<template>
  <div class="bg-[#11101B] py-8">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div
        class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-3 sm:gap-0"
      >
        <div class="flex flex-wrap items-end gap-3">
          <h2 class="text-xl sm:text-2xl font-bold text-white">{{ t("news") }}</h2>
          <span
            class="text-red-500 text-sm sm:text-base px-3 py-1 border-2 border-red-500 rounded-lg whitespace-nowrap"
          >
            {{ t("progress") }}
          </span>
        </div>
        <button
          class="text-gray-400 hover:text-white flex items-center gap-2 text-sm sm:text-base whitespace-nowrap"
        >
          {{ t("allFound") }}
          <ChevronRight class="w-4 h-4" />
        </button>
      </div>

      <!-- News Grid -->
      <div class="md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 hidden">
        <div
          v-for="article in news"
          :key="article.id"
          class="group relative bg-[#2A2B31] rounded-lg overflow-hidden hover:bg-[#3A3B41] transition-colors"
        >
          <!-- Article Image -->
          <div class="relative aspect-[4/3] overflow-hidden">
            <img
              :src="article.image"
              :alt="article.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
            ></div>

            <!-- Category Badge -->
            <div class="absolute top-3 left-3">
              <span class="bg-red-600 text-white text-xs px-2 py-1 rounded select-none">
                {{ article.category }}
              </span>
            </div>

            <!-- Date Badge -->
            <div class="absolute top-3 right-3">
              <span class="bg-black/50 text-white text-xs px-2 py-1 rounded select-none">
                {{ formatDate(article.date) }}
              </span>
            </div>
          </div>

          <!-- Article Content -->
          <div class="p-4">
            <h3
              class="text-white font-medium text-lg mb-2 line-clamp-2 group-hover:text-red-500 transition-colors"
            >
              {{ article.title }}
            </h3>

            <p class="text-gray-400 text-sm line-clamp-2">
              {{ article.excerpt }}
            </p>
          </div>

          <!-- Hover Overlay with Link -->
          <a :href="article.url" class="absolute inset-0 z-10" aria-label="Read more"></a>
        </div>
      </div>

      <Swiper
        :slides-per-view="'auto'"
        space-between="16"
        class="!pb-4 md:!hidden !block"
      >
        <SwiperSlide
          v-for="article in news"
          :key="article.id"
          class="!w-[280px] sm:!w-[320px]"
        >
          <div
            class="bg-[#2A2B31] rounded-lg overflow-hidden group hover:bg-[#3A3B41] transition-colors"
          >
            <!-- Article Image -->
            <div class="relative aspect-[4/3] overflow-hidden">
              <img
                :src="article.image"
                :alt="article.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
              ></div>

              <!-- Category Badge -->
              <div class="absolute top-3 left-3">
                <span class="bg-red-600 text-white text-xs px-2 py-1 rounded select-none">
                  {{ article.category }}
                </span>
              </div>

              <!-- Date Badge -->
              <div class="absolute top-3 right-3">
                <span
                  class="bg-black/50 text-white text-xs px-2 py-1 rounded select-none"
                >
                  {{ formatDate(article.date) }}
                </span>
              </div>
            </div>

            <!-- Article Content -->
            <div class="p-4">
              <h3
                class="text-white font-medium text-lg mb-2 line-clamp-2 group-hover:text-red-500 transition-colors"
              >
                {{ article.title }}
              </h3>

              <p class="text-gray-400 text-sm line-clamp-2">
                {{ article.excerpt }}
              </p>
            </div>

            <!-- Hover Overlay with Link -->
            <a
              :href="article.url"
              class="absolute inset-0 z-10"
              aria-label="Read more"
            ></a>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ChevronRight } from "lucide-vue-next";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

interface NewsArticle {
  id: number;
  image: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  url: string;
}

const news: NewsArticle[] = [
  {
    id: 1,
    image: "/boks.svg",
    category: "Футбол",
    date: "2024-01-20",
    title:
      "Юношеская сборная Узбекистана победив Австрию вышла в четвертьфинал Чемпионата мира",
    excerpt:
      "В матче 1/8 финала юношеская сборная Узбекистана обыграла Австрию со счетом 2:1",
    url: "#",
  },
  {
    id: 2,
    image: "/fon-1.jpg",
    category: "Футбол",
    date: "2024-01-19",
    title: "Чемпионат мира по бокса WBSSB 2034 года пройдет в Саудовской Аравии",
    excerpt:
      "ФИФА официально объявила о том, что ЧМ-2034 пройдет в Саудовской Аравии. Это будет первый случай, когда Аравия примет участие в турнире.",
    url: "#",
  },
  {
    id: 3,
    image: "/fond-3.jpg",
    category: "Бокс",
    date: "2024-01-18",
    title: "В Ташкенте пройдет матч профессионального Basketbol WBSSB",
    excerpt:
      "Профессиональный боксерский турнир WBSSB-45 в Ташкенте соберет лучших боксеров региона.",
    url: "#",
  },
  {
    id: 4,
    image: "/fond-2.jpg",
    category: "Футбол",
    date: "2024-01-15",
    title: "«Пахтакор» — обладатель Кубка Узбекистана в третий раз подряд",
    excerpt:
      "Футбольный клуб завоевал престижный трофей в упорной борьбе с достойным соперником.",
    url: "#",
  },
];

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
