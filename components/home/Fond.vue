<template>
  <div class="bg-[#11101B] py-8">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row justify-between gap-4 sm:items-center mb-8">
        <div class="flex flex-wrap items-end gap-2 sm:gap-4">
          <h2 class="text-lg sm:text-xl md:text-2xl font-bold text-white">
            {{ t("found") }}
          </h2>
          <span
            class="text-red-500 text-sm sm:text-base px-3 sm:px-4 py-1 border-2 border-red-500 rounded-lg"
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

      <!-- Cards Grid -->
      <div
        class="md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 hidden"
      >
        <div
          v-for="card in cards"
          :key="card.id"
          class="bg-[#2A2B31] rounded-lg overflow-hidden group hover:bg-[#3A3B41] transition-colors"
        >
          <!-- Image -->
          <div class="relative aspect-[4/3] overflow-hidden">
            <img
              :src="card.image"
              :alt="card.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
            ></div>
            <!-- Progress Badge -->
            <div
              class="absolute top-3 right-3 bg-red-600 text-white text-xs sm:text-sm px-2 py-1 rounded"
            >
              {{ card.progress }}%
            </div>
          </div>

          <!-- Content -->
          <div class="p-4">
            <!-- Profile -->
            <div class="flex items-center gap-3 mb-3">
              <img
                :src="card.avatar"
                :alt="card.name"
                class="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full"
              />
              <div class="min-w-0">
                <h3 class="text-white font-medium text-sm sm:text-base truncate">
                  {{ card.name }}
                </h3>
                <p class="text-gray-400 text-xs sm:text-sm truncate">{{ card.title }}</p>
              </div>
            </div>

            <!-- Description -->
            <p class="text-gray-400 text-sm mb-4 line-clamp-2">
              {{ card.description }}
            </p>

            <!-- Location -->
            <div class="flex items-center gap-2 text-gray-400 text-sm mb-4">
              <MapPin class="w-4 h-4" />
              <span class="truncate">{{ card.location }}</span>
            </div>

            <!-- Progress Bar -->
            <div class="h-1 bg-gray-700 rounded mb-3">
              <div
                class="h-full bg-red-600 rounded"
                :style="{ width: `${card.progress}%` }"
              ></div>
            </div>

            <!-- Stats -->
            <div class="flex justify-between text-sm flex-wrap gap-y-2">
              <div>
                <div class="text-white font-medium">
                  {{ formatPrice(card.currentAmount) }}
                </div>
                <div class="text-gray-400">
                  {{ formatPrice(card.targetAmount) }} {{ t("sum") }}
                </div>
              </div>
              <div class="text-end sm:text-right">
                <div class="text-white font-medium">{{ card.daysLeft }}</div>
                <div class="text-gray-400">{{ t("days") }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Swiper Karusel -->

      <Swiper
        :slides-per-view="'auto'"
        space-between="16"
        class="!pb-4 md:!hidden !block"
      >
        <SwiperSlide
          v-for="card in cards"
          :key="card.id"
          class="!w-[280px] sm:!w-[320px]"
        >
          <div
            class="bg-[#2A2B31] rounded-lg overflow-hidden group hover:bg-[#3A3B41] transition-colors"
          >
            <!-- Card Image -->
            <div class="relative aspect-[4/3] overflow-hidden">
              <img
                :src="card.image"
                :alt="card.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
              ></div>
              <div
                class="absolute top-3 right-3 bg-red-600 text-white text-xs sm:text-sm px-2 py-1 rounded"
              >
                {{ card.progress }}%
              </div>
            </div>

            <!-- Card Content -->
            <div class="p-4">
              <div class="flex items-center gap-3 mb-3">
                <img
                  :src="card.avatar"
                  :alt="card.name"
                  class="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full"
                />
                <div class="min-w-0">
                  <h3 class="text-white font-medium text-sm sm:text-base truncate">
                    {{ card.name }}
                  </h3>
                  <p class="text-gray-400 text-xs sm:text-sm truncate">
                    {{ card.title }}
                  </p>
                </div>
              </div>

              <p class="text-gray-400 text-sm mb-4 line-clamp-2">
                {{ card.description }}
              </p>

              <div class="flex items-center gap-2 text-gray-400 text-sm mb-4">
                <MapPin class="w-4 h-4" />
                <span class="truncate">{{ card.location }}</span>
              </div>

              <div class="h-1 bg-gray-700 rounded mb-3">
                <div
                  class="h-full bg-red-600 rounded"
                  :style="{ width: `${card.progress}%` }"
                ></div>
              </div>

              <div class="flex justify-between text-sm flex-wrap gap-y-2">
                <div>
                  <div class="text-white font-medium">
                    {{ formatPrice(card.currentAmount) }}
                  </div>
                  <div class="text-gray-400">
                    {{ formatPrice(card.targetAmount) }} {{ t("sum") }}
                  </div>
                </div>
                <div class="text-end sm:text-right">
                  <div class="text-white font-medium">{{ card.daysLeft }}</div>
                  <div class="text-gray-400">{{ t("days") }}</div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronRight, MapPin } from "lucide-vue-next";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

import { useI18n } from "vue-i18n";

const { t } = useI18n();

interface FundingCard {
  id: number;
  image: string;
  progress: number;
  avatar: string;
  name: string;
  title: string;
  description: string;
  location: string;
  currentAmount: number;
  targetAmount: number;
  daysLeft: number;
}

const cards: FundingCard[] = [
  {
    id: 1,
    image: "/card.svg",
    progress: 84,
    avatar: "/fond-3.jpg",
    name: "Пратов Максимбек",
    title: "Мухтаржони угли",
    description:
      "Присоединяйтесь ко мне, чтобы помочь талантливым спортсменам в одной из самых сложных областей спорта в мире. Я надеюсь, что 25 человек смогут...",
    location: "Ташкент, Мирзо Улугбекский район",
    currentAmount: 18000000,
    targetAmount: 25000000,
    daysLeft: 25,
  },
  {
    id: 2,
    image: "/fon-1.jpg",
    progress: 88,
    avatar: "/user.svg",
    name: "Руслан Руниддинов",
    title: "Мухтаржони угли",
    description:
      "Присоединяйтесь ко мне, чтобы помочь талантливым спортсменам в одной из самых сложных областей спорта в мире. Я надеюсь, что 25 человек смогут...",
    location: "Ташкент, Мирзо Улугбекский район",
    currentAmount: 16000000,
    targetAmount: 25000000,
    daysLeft: 25,
  },
  {
    id: 3,
    image: "/fond-2.jpg",
    progress: 52,
    avatar: "/fon-1.jpg",
    name: "Алишер Садуллаев",
    title: "Мухтаржони угли",
    description:
      "Присоединяйтесь ко мне, чтобы помочь талантливым спортсменам в одной из самых сложных областей спорта в мире. Я надеюсь, что 25 человек смогут...",
    location: "Ташкент, Мирзо Улугбекский район",
    currentAmount: 16000000,
    targetAmount: 25000000,
    daysLeft: 25,
  },
  {
    id: 4,
    image: "/fond-3.jpg",
    progress: 96,
    avatar: "/fond-2.jpg",
    name: "Бехруз Джамалов",
    title: "Мухтаржони угли",
    description:
      "Присоединяйтесь ко мне, чтобы помочь талантливым спортсменам в одной из самых сложных областей спорта в мире. Я надеюсь, что 25 человек смогут...",
    location: "Ташкент, Мирзо Улугбекский район",
    currentAmount: 19000000,
    targetAmount: 25000000,
    daysLeft: 25,
  },
];

function formatPrice(price: number): string {
  return new Intl.NumberFormat("ru-RU").format(price);
}
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
