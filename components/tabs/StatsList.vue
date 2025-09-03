<template>
  <div class="min-h-screen bg-gray-900 text-white p-6">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-2xl font-bold">Статистика</h1>
      <div class="flex gap-4">
        <select
          class="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm hover:bg-gray-700 transition"
        >
          <option>Выберите регион</option>
          <option>Москва</option>
          <option>Санкт-Петербург</option>
        </select>
        <select
          class="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm hover:bg-gray-700 transition"
        >
          <option>Выберите год</option>
          <option>2024</option>
          <option>2023</option>
        </select>
      </div>
    </div>

    <!-- Content -->
    <div class="grid grid-cols-1 gap-6">
      <!-- Participants & Bar Chart -->
      <div class="flex gap-4 w-full">
        <!-- Pie Chart -->
        <div
          class="bg-gray-800 rounded-lg p-6 w-full hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
        >
          <h3 class="text-lg font-semibold mb-2">Количество участников</h3>
          <div class="text-3xl font-bold mb-6">
            {{ totalParticipants.toLocaleString() }}
          </div>

          <div class="flex items-center justify-center mb-6">
            <div class="relative w-48 h-48 group">
              <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <!-- Girls -->
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#ef4444"
                  stroke-width="20"
                  :stroke-dasharray="`${girlsPercentage * 2.51} 251.2`"
                  class="transition-all duration-500 group-hover:opacity-80"
                />
                <!-- Boys -->
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#14b8a6"
                  stroke-width="20"
                  :stroke-dasharray="`${boysPercentage * 2.51} 251.2`"
                  :stroke-dashoffset="`-${girlsPercentage * 2.51}`"
                  class="transition-all duration-500 group-hover:opacity-80"
                />
              </svg>
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="text-center">
                  <div class="text-2xl font-bold">{{ boysPercentage }}%</div>
                  <div class="text-sm text-gray-400">Мужчины</div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-between text-sm">
            <div
              class="flex items-center gap-2 hover:text-red-400 transition cursor-pointer"
            >
              <div class="w-3 h-3 bg-red-500 rounded"></div>
              <span>Девушки</span>
            </div>
            <div
              class="flex items-center gap-2 hover:text-teal-400 transition cursor-pointer"
            >
              <div class="w-3 h-3 bg-teal-500 rounded"></div>
              <span>Мужчины</span>
            </div>
          </div>
        </div>

        <!-- Bar Chart -->
        <div
          class="bg-gray-800 rounded-lg p-6 w-full hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
        >
          <h3 class="text-lg font-semibold mb-2">Количество участников</h3>
          <div class="text-3xl font-bold mb-6">
            {{ totalParticipants.toLocaleString() }}
          </div>

          <div class="h-48 flex items-end justify-between gap-2 mb-4">
            <div
              v-for="year in yearlyData"
              :key="year.year"
              class="flex-1 flex flex-col items-center gap-1"
            >
              <div class="flex gap-1 w-full group">
                <div
                  class="bg-teal-500 rounded-t transition-all duration-300 group-hover:opacity-80"
                  :style="{ height: `${(year.first / 10) * 100}px`, width: '45%' }"
                ></div>
                <div
                  class="bg-red-500 rounded-t transition-all duration-300 group-hover:opacity-80"
                  :style="{ height: `${(year.second / 10) * 100}px`, width: '45%' }"
                ></div>
              </div>
              <span class="text-xs text-gray-400">{{ year.year }}</span>
            </div>
          </div>

          <div class="flex justify-center gap-6 text-sm">
            <div class="flex items-center gap-2 hover:text-teal-400 transition">
              <div class="w-3 h-3 bg-teal-500 rounded"></div>
              <span>1 место</span>
            </div>
            <div class="flex items-center gap-2 hover:text-red-400 transition">
              <div class="w-3 h-3 bg-red-500 rounded"></div>
              <span>2 место</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Regions & Medals -->
      <div class="flex gap-4 w-full">
        <!-- Regional Progress -->
        <div
          class="bg-gray-800 rounded-lg p-6 w-full hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
        >
          <h3 class="text-lg font-semibold mb-2">Количество участников</h3>
          <div class="text-3xl font-bold mb-6">
            {{ totalParticipants.toLocaleString() }}
          </div>

          <div class="space-y-4">
            <div
              v-for="region in regionalData"
              :key="region.name"
              class="flex items-center justify-between hover:scale-[1.01] transition cursor-pointer"
            >
              <span class="text-sm text-gray-300 w-24">{{ region.name }}</span>
              <div class="flex-1 mx-4">
                <div class="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div
                    class="h-2 rounded-full transition-all duration-500"
                    :class="region.color"
                    :style="{ width: `${region.percentage}%` }"
                  ></div>
                </div>
              </div>
              <span class="text-sm text-gray-400">({{ region.count }})</span>
            </div>
          </div>
        </div>

        <!-- Medals -->
        <div
          class="bg-gray-800 rounded-lg p-6 w-full hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
        >
          <h3 class="text-lg font-semibold mb-2">Полученные медали</h3>
          <div class="text-3xl font-bold mb-6">{{ totalMedals }}</div>

          <div class="flex items-center justify-center mb-6">
            <div class="relative w-48 h-48 group">
              <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  v-for="(medal, index) in medalData"
                  :key="medal.type"
                  cx="50"
                  cy="50"
                  r="35"
                  fill="none"
                  :stroke="medal.color"
                  stroke-width="15"
                  :stroke-dasharray="`${medal.percentage * 2.2} 220`"
                  :stroke-dashoffset="`-${
                    medalData.slice(0, index).reduce((sum, m) => sum + m.percentage, 0) *
                    2.2
                  }`"
                  class="transition-all duration-500 group-hover:opacity-80"
                />
              </svg>
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="text-center">
                  <div class="text-lg font-bold">{{ medalData[0].count }}</div>
                  <div class="text-xs text-gray-400">{{ medalData[0].place }}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-4 text-sm">
            <div
              v-for="medal in medalData"
              :key="medal.type"
              class="text-center hover:scale-105 transition cursor-pointer"
            >
              <div class="flex items-center justify-center gap-1 mb-1">
                <div
                  class="w-3 h-3 rounded"
                  :style="{ backgroundColor: medal.color }"
                ></div>
                <span>{{ medal.place }}</span>
              </div>
              <div class="font-bold">{{ medal.count }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// Participants
const totalParticipants = ref(8846);
const girlsPercentage = ref(33);
const boysPercentage = computed(() => 100 - girlsPercentage.value);

// Bar chart data
const yearlyData = ref([
  { year: 2021, first: 7, second: 5 },
  { year: 2022, first: 8, second: 6 },
  { year: 2023, first: 7, second: 5 },
  { year: 2024, first: 8, second: 6 },
  { year: 2025, first: 8, second: 7 },
]);

// Regional data
const regionalData = ref([
  { name: "Андижан", count: 500, percentage: 85, color: "bg-red-500" },
  { name: "Бухара", count: 500, percentage: 70, color: "bg-green-500" },
  { name: "Фергана", count: 500, percentage: 60, color: "bg-yellow-500" },
  { name: "Джизак", count: 500, percentage: 75, color: "bg-teal-500" },
  { name: "Наманган", count: 500, percentage: 65, color: "bg-blue-500" },
  { name: "Навои", count: 500, percentage: 55, color: "bg-purple-500" },
  { name: "Кашкадарья", count: 500, percentage: 90, color: "bg-pink-500" },
  { name: "Самарканд", count: 500, percentage: 45, color: "bg-indigo-500" },
  { name: "Сурхандарья", count: 500, percentage: 80, color: "bg-orange-500" },
  { name: "Ташкент", count: 500, percentage: 95, color: "bg-cyan-500" },
  { name: "Хорезм", count: 500, percentage: 70, color: "bg-lime-500" },
]);

// Medals
const totalMedals = ref(1452);
const medalData = ref([
  { type: "gold", count: 678, place: "1 место", color: "#14b8a6", percentage: 47 },
  { type: "silver", count: 426, place: "2 место", color: "#f59e0b", percentage: 29 },
  { type: "bronze", count: 339, place: "3 место", color: "#ef4444", percentage: 23 },
]);
</script>
