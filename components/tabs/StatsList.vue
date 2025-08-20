<template>
  <div class="min-h-screen bg-[#11101B] text-white p-6">
    <!-- Header -->
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-xl font-bold">Статистика</h1>
      <div class="flex gap-4">
        <select class="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm">
          <option>Выберите регион</option>
        </select>
        <select class="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm">
          <option>Выберите год</option>
        </select>
      </div>
    </div>

    <!-- Dashboard -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Pie Chart -->
      <div class="bg-[#1C1B29] rounded-lg p-6">
        <h3 class="text-lg font-semibold mb-2">Количество участников</h3>
        <div class="text-3xl font-bold mb-6">8,846</div>

        <div class="flex justify-center">
          <div class="relative w-48 h-48">
            <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#ef4444"
                stroke-width="20"
                fill="none"
                stroke-dasharray="33 67"
                stroke-dashoffset="0"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#06b6d4"
                stroke-width="20"
                fill="none"
                stroke-dasharray="67 33"
                stroke-dashoffset="-33"
              />
            </svg>
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="text-center">
                <div class="text-2xl font-bold">67%</div>
                <div class="text-sm text-gray-400">Мужчины</div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-center gap-6 mt-4">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 bg-red-500 rounded"></div>
            <span class="text-sm">Девушки</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 bg-cyan-500 rounded"></div>
            <span class="text-sm">Мужчины</span>
          </div>
        </div>
      </div>

      <!-- Bar Chart -->
      <div class="bg-[#1C1B29] rounded-lg p-6">
        <h3 class="text-lg font-semibold mb-2">Количество участников</h3>
        <div class="text-3xl font-bold mb-6">8,846</div>

        <div class="h-48 flex items-end justify-between gap-2 mb-4">
          <div
            v-for="(data, index) in barChartData"
            :key="index"
            class="flex flex-col items-center gap-1"
          >
            <div class="flex gap-1">
              <div
                v-for="(bar, barIndex) in data.bars"
                :key="barIndex"
                class="w-6 rounded-sm"
                :class="bar.color"
                :style="{ height: `${bar.height}px` }"
              ></div>
            </div>
            <span class="text-xs text-gray-400">{{ data.year }}</span>
          </div>
        </div>

        <div class="flex justify-center gap-4">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 bg-green-500 rounded"></div>
            <span class="text-xs">1 место</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 bg-red-500 rounded"></div>
            <span class="text-xs">3 место</span>
          </div>
        </div>
      </div>

      <!-- Horizontal Bar Chart -->
      <div class="bg-[#1C1B29] rounded-lg p-6">
        <h3 class="text-lg font-semibold mb-2">Количество участников</h3>
        <div class="text-3xl font-bold mb-6">8,846</div>

        <div class="space-y-3">
          <div
            v-for="item in horizontalBarData"
            :key="item.name"
            class="flex items-center gap-3"
          >
            <div class="w-28 text-sm text-gray-400 truncate">{{ item.name }}</div>
            <div class="flex-1 bg-gray-700 rounded-full h-2 relative">
              <div
                class="h-full rounded-full"
                :class="item.color"
                :style="{ width: `${item.percentage}%` }"
              ></div>
            </div>
            <div class="w-12 text-sm text-right">{{ item.value }}</div>
          </div>
        </div>
      </div>

      <!-- Donut Chart -->
      <div class="bg-[#1C1B29] rounded-lg p-6">
        <h3 class="text-lg font-semibold mb-2">Полученные медали</h3>
        <div class="text-3xl font-bold mb-6">1452</div>

        <div class="flex justify-center">
          <div class="relative w-48 h-48">
            <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="35"
                stroke="#fbbf24"
                stroke-width="15"
                fill="none"
                stroke-dasharray="25 75"
              />
              <circle
                cx="50"
                cy="50"
                r="35"
                stroke="#06b6d4"
                stroke-width="15"
                fill="none"
                stroke-dasharray="35 65"
                stroke-dashoffset="-25"
              />
              <circle
                cx="50"
                cy="50"
                r="35"
                stroke="#ef4444"
                stroke-width="15"
                fill="none"
                stroke-dasharray="40 60"
                stroke-dashoffset="-60"
              />
            </svg>
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="text-center">
                <div class="text-xl font-bold">426</div>
                <div class="text-xs text-gray-400">Бронза</div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-center gap-6 mt-4">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 bg-yellow-500 rounded"></div>
            <span class="text-sm">1 место</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 bg-cyan-500 rounded"></div>
            <span class="text-sm">2 место</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 bg-red-500 rounded"></div>
            <span class="text-sm">3 место</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const barChartData = ref([
  {
    year: "2021",
    bars: [
      { height: 60, color: "bg-cyan-500" },
      { height: 40, color: "bg-red-500" },
    ],
  },
  {
    year: "2022",
    bars: [
      { height: 80, color: "bg-cyan-500" },
      { height: 70, color: "bg-red-500" },
    ],
  },
  {
    year: "2023",
    bars: [
      { height: 90, color: "bg-cyan-500" },
      { height: 60, color: "bg-red-500" },
    ],
  },
  {
    year: "2024",
    bars: [
      { height: 100, color: "bg-cyan-500" },
      { height: 80, color: "bg-red-500" },
    ],
  },
  {
    year: "2025",
    bars: [
      { height: 85, color: "bg-cyan-500" },
      { height: 90, color: "bg-red-500" },
    ],
  },
]);

const horizontalBarData = ref([
  { name: "Алматы (500)", value: "500", percentage: 85, color: "bg-cyan-500" },
  { name: "Астана (500)", value: "500", percentage: 75, color: "bg-purple-500" },
  { name: "Шымкент (500)", value: "500", percentage: 65, color: "bg-green-500" },
  { name: "Караганда (500)", value: "500", percentage: 90, color: "bg-yellow-500" },
  { name: "Актобе (500)", value: "500", percentage: 55, color: "bg-blue-500" },
  { name: "Тараз (500)", value: "500", percentage: 70, color: "bg-indigo-500" },
  { name: "Павлодар (500)", value: "500", percentage: 60, color: "bg-pink-500" },
  { name: "Усть-Каменогорск (500)", value: "500", percentage: 80, color: "bg-red-500" },
  { name: "Семей (500)", value: "500", percentage: 45, color: "bg-orange-500" },
  { name: "Атырау (500)", value: "500", percentage: 50, color: "bg-teal-500" },
  { name: "Костанай (500)", value: "500", percentage: 40, color: "bg-lime-500" },
  { name: "Кызылорда (500)", value: "500", percentage: 95, color: "bg-rose-500" },
]);
</script>
