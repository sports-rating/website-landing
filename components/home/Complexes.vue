<template>
  <div class="bg-[#11101B] py-8">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div
        class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-3 sm:gap-0"
      >
        <div class="flex flex-wrap items-end gap-3">
          <h2 class="text-xl sm:text-2xl font-bold text-white">СПОРТИВНЫЕ КОМПЛЕКСЫ</h2>
          <span
            class="text-red-500 text-sm sm:text-base px-3 py-1 border-2 border-red-500 rounded-lg whitespace-nowrap"
          >
            В процессе...
          </span>
        </div>
        <button
          class="text-gray-400 hover:text-white flex items-center gap-2 text-sm sm:text-base whitespace-nowrap"
        >
          Посмотреть все
          <ChevronRight class="w-4 h-4" />
        </button>
      </div>

      <!-- Complexes Grid -->
      <div class="md:grid grid-cols-1 md:grid-cols-2 gap-6 hidden">
        <div
          v-for="complex in complexes"
          :key="complex.id"
          class="group bg-[#2A2B31] rounded-lg overflow-hidden hover:bg-[#3A3B41] transition-colors"
        >
          <!-- Complex Image -->
          <div class="relative aspect-[16/7] overflow-hidden">
            <img
              :src="complex.image"
              :alt="complex.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
            ></div>
          </div>

          <!-- Complex Content -->
          <div class="p-4">
            <h3 class="text-white font-medium text-lg mb-2 line-clamp-2">
              {{ complex.name }}
            </h3>

            <p class="text-gray-400 text-sm mb-4 line-clamp-3">
              {{ complex.description }}
            </p>

            <!-- Facilities -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="facility in complex.facilities"
                :key="facility"
                class="text-xs bg-[#1A1B1F] text-gray-400 px-2 py-1 rounded"
              >
                {{ facility }}
              </span>
            </div>

            <!-- Footer -->
            <div
              class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0"
            >
              <!-- Location -->
              <div class="flex items-center gap-2 text-gray-400 text-sm truncate">
                <MapPin class="w-4 h-4" />
                <span class="truncate">{{ complex.location }}</span>
              </div>

              <!-- Rating -->
              <div
                class="flex items-center gap-2 text-gray-400 text-sm whitespace-nowrap"
              >
                <div class="flex">
                  <Star
                    v-for="i in 5"
                    :key="i"
                    :class="[
                      'w-4 h-4',
                      i <= complex.rating ? 'text-yellow-400' : 'text-gray-600',
                    ]"
                    :fill="i <= complex.rating ? 'currentColor' : 'none'"
                  />
                </div>
                <span>{{ complex.reviewCount }} отзывов</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Swiper
        :slides-per-view="'auto'"
        space-between="16"
        class="!pb-4 md:!hidden !block"
      >
        <SwiperSlide
          v-for="complex in complexes"
          :key="complex.id"
          class="!w-[280px] sm:!w-[320px]"
        >
          <div
            class="bg-[#2A2B31] rounded-lg overflow-hidden group hover:bg-[#3A3B41] transition-colors"
          >
            <!-- Complex Image -->
            <div class="relative aspect-[16/7] overflow-hidden">
              <img
                :src="complex.image"
                :alt="complex.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
              ></div>
            </div>

            <!-- Complex Content -->
            <div class="p-4">
              <h3 class="text-white font-medium text-lg mb-2 line-clamp-2">
                {{ complex.name }}
              </h3>

              <p class="text-gray-400 text-sm mb-4 line-clamp-3">
                {{ complex.description }}
              </p>

              <!-- Facilities -->
              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="facility in complex.facilities"
                  :key="facility"
                  class="text-xs bg-[#1A1B1F] text-gray-400 px-2 py-1 rounded"
                >
                  {{ facility }}
                </span>
              </div>

              <!-- Footer -->
              <div
                class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0"
              >
                <!-- Location -->
                <div class="flex items-center gap-2 text-gray-400 text-sm truncate">
                  <MapPin class="w-4 h-4" />
                  <span class="truncate">{{ complex.location }}</span>
                </div>

                <!-- Rating -->
                <div
                  class="flex items-center gap-2 text-gray-400 text-sm whitespace-nowrap"
                >
                  <div class="flex">
                    <Star
                      v-for="i in 5"
                      :key="i"
                      :class="[
                        'w-4 h-4',
                        i <= complex.rating ? 'text-yellow-400' : 'text-gray-600',
                      ]"
                      :fill="i <= complex.rating ? 'currentColor' : 'none'"
                    />
                  </div>
                  <span>{{ complex.reviewCount }} отзывов</span>
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
import { ChevronRight, MapPin, Star } from "lucide-vue-next";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

interface SportComplex {
  id: number;
  image: string;
  name: string;
  description: string;
  facilities: string[];
  location: string;
  rating: number;
  reviewCount: number;
}

const complexes: SportComplex[] = [
  {
    id: 1,
    image: "/complexes.svg",
    name: " Humo Arena",
    description:
      "Спортивный комплекс включает в себя ледовую арену, тренажерный зал, бассейн и другие спортивные объекты.",
    facilities: ["Ледовая арена", "Тренажерный зал", "Бассейн", "Фитнес-центр"],
    location: "Ташкент, Мирзо Улугбекский район",
    rating: 5,
    reviewCount: 128,
  },
  {
    id: 2,
    image: "/barsa.jpg",
    name: "Centre Camp Nou",
    description:
      "Современный фитнес-центр с новейшим оборудованием, спа-зоной и профессиональными тренерами.",
    facilities: ["Тренажерный зал", "СПА", "Групповые занятия", "Бассейн"],
    location: "Ташкент, Мирзо Улугбекский район",
    rating: 4,
    reviewCount: 85,
  },
  // {
  //   id: 3,
  //   image: "/placeholder.svg?height=400&width=600",
  //   name: "Motion Sport",
  //   description:
  //     "Специализированный спортивный комплекс с профессиональным оборудованием для силовых тренировок.",
  //   facilities: ["Силовые тренажеры", "Кроссфит", "Персональные тренировки"],
  //   location: "Ташкент, Мирзо Улугбекский район",
  //   rating: 5,
  //   reviewCount: 92,
  // },
  // {
  //   id: 4,
  //   image: "/placeholder.svg?height=400&width=600",
  //   name: "Savage",
  //   description:
  //     "Многофункциональный спортивный центр с современным оборудованием и опытными тренерами.",
  //   facilities: ["Тренажерный зал", "Бокс", "Йога", "Танцы"],
  //   location: "Ташкент, Мирзо Улугбекский район",
  //   rating: 4,
  //   reviewCount: 76,
  // },
];
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
