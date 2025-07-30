<template>
  <div class="bg-[#11101B] py-8">
    <div class="container mx-auto px-4">
      <!-- Header with Categories -->
      <div class="mb-8">
        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 sm:gap-0"
        >
          <div class="flex flex-wrap items-end gap-3">
            <h2 class="text-xl sm:text-2xl font-bold text-white">ФАН-КЛУБЫ</h2>
            <span
              class="text-red-500 text-sm sm:text-base px-3 py-1 border-2 border-red-500 rounded-lg whitespace-nowrap"
            >
              В процессе...
            </span>
          </div>
        </div>

        <!-- Category Tabs -->
        <div class="flex justify-between gap-2 overflow-x-auto pb-4 hide-scrollbar">
          <div class="flex gap-2 min-w-max">
            <button
              v-for="category in categories"
              :key="category.id"
              @click="activeCategory = category.id"
              :class="[
                'px-4 py-2 text-sm whitespace-nowrap rounded-full transition-colors flex-shrink-0',
                activeCategory === category.id
                  ? 'bg-red-600 text-white'
                  : 'bg-[#2A2B31] text-gray-400 hover:bg-[#3A3B41]',
              ]"
            >
              {{ category.name }}
            </button>
          </div>
          <button
            class="text-gray-400 hover:text-white flex items-center gap-2 whitespace-nowrap"
          >
            Перейти к рейтингу
            <ChevronRight class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- Fan Clubs Grid -->
      <div class="md:grid hidden grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="club in clubs"
          :key="club.id"
          class="bg-[#2A2B31] rounded-lg p-4 hover:bg-[#3A3B41] transition-colors flex flex-col"
        >
          <!-- Club Type Badge -->
          <div class="mb-4">
            <span class="bg-red-600 text-white text-xs px-2 py-1 rounded select-none">
              {{ club.type }}
            </span>
          </div>

          <!-- Club Name -->
          <h3 class="text-white font-medium text-lg mb-4 line-clamp-2">
            {{ club.name }}
          </h3>

          <!-- Location -->
          <div class="flex items-start gap-2 mb-3">
            <MapPin class="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
            <p class="text-gray-400 text-sm">{{ club.location }}</p>
          </div>

          <!-- Phone -->
          <div class="flex items-start gap-2 mb-6">
            <Phone class="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
            <div class="flex flex-col space-y-1">
              <a
                v-for="phone in club.phones"
                :key="phone"
                :href="`tel:${phone}`"
                class="text-gray-400 text-sm hover:text-white transition-colors truncate"
              >
                {{ formatPhone(phone) }}
              </a>
            </div>
          </div>

          <!-- Action Button -->
          <button
            class="mt-auto w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap"
          >
            Посмотреть клуб подробнее
          </button>
        </div>
      </div>

      <Swiper
        :slides-per-view="'auto'"
        space-between="16"
        class="!pb-4 md:!hidden !block"
      >
        <SwiperSlide
          v-for="club in clubs"
          :key="club.id"
          class="!w-[280px] sm:!w-[320px]"
        >
          <div
            class="bg-[#2A2B31] p-4 rounded-lg overflow-hidden group hover:bg-[#3A3B41] transition-colors"
          >
            <!-- Club Type Badge -->
            <div class="mb-4">
              <span class="bg-red-600 text-white text-xs px-2 py-1 rounded select-none">
                {{ club.type }}
              </span>
            </div>

            <!-- Club Name -->
            <h3 class="text-white font-medium text-lg mb-4 line-clamp-2">
              {{ club.name }}
            </h3>

            <!-- Location -->
            <div class="flex items-start gap-2 mb-3">
              <MapPin class="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
              <p class="text-gray-400 text-sm">{{ club.location }}</p>
            </div>

            <!-- Phone -->
            <div class="flex items-start gap-2 mb-6">
              <Phone class="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
              <div class="flex flex-col space-y-1">
                <a
                  v-for="phone in club.phones"
                  :key="phone"
                  :href="`tel:${phone}`"
                  class="text-gray-400 text-sm hover:text-white transition-colors truncate"
                >
                  {{ formatPhone(phone) }}
                </a>
              </div>
            </div>

            <!-- Action Button -->
            <button
              class="mt-auto w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap"
            >
              Посмотреть клуб подробнее
            </button>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { ChevronRight, MapPin, Phone } from "lucide-vue-next";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

interface Category {
  id: number;
  name: string;
}

interface FanClub {
  id: number;
  type: string;
  name: string;
  location: string;
  phones: string[];
}

const activeCategory = ref(1);

const categories: Category[] = [
  { id: 1, name: "Футбол" },
  { id: 2, name: "Баскетбол" },
  { id: 3, name: "Бокс" },
  { id: 4, name: "Борьба вольная" },
  { id: 5, name: "Волейбол" },
  { id: 6, name: "Гандбол" },
  { id: 7, name: "Греко-римский спорт" },
];

const clubs: FanClub[] = [
  {
    id: 1,
    type: "Футбол",
    name: "Футбольный фан клуб Пахтакор",
    location: "Ташкент, Мирзо Улугбекский район",
    phones: ["+998 55 500 55 55"],
  },
  {
    id: 2,
    type: "Футбол",
    name: "Футбольный фан клуб Пахтакор",
    location: "Ташкент, Мирзо Улугбекский район",
    phones: ["+998 55 500 55 55"],
  },
  {
    id: 3,
    type: "Футбол",
    name: "Футбольный фан клуб Пахтакор",
    location: "Ташкент, Мирзо Улугбекский район",
    phones: ["+998 55 500 55 55"],
  },
  {
    id: 4,
    type: "Футбол",
    name: "Футбольный фан клуб Пахтакор",
    location: "Ташкент, Мирзо Улугбекский район",
    phones: ["+998 55 500 55 55"],
  },
];

function formatPhone(phone: string): string {
  return phone.replace(/(\+\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5");
}
</script>

<style scoped>
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
