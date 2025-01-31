<template>
  <div class=" bg-[#11101B] py-8">
    <div class="flex items-end gap-4">
      
      <h1 class="text-2xl font-bold text-white mb-8">Статистика по играм</h1>
        <span class="text-red-500 text-sm">В процессе...</span>
      </div>
    <div class="container mx-auto px-6 border py-6">
      <!-- Header -->

      <!-- Filters -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <!-- Tournament Select -->
        <div>
          <label class="block text-sm text-gray-400 mb-2">ТУРНИР</label>
          <div class="relative">
            <select 
              v-model="selectedTournament"
              class="w-full bg-[#1A1B1F] text-white rounded px-4 py-2.5 appearance-none cursor-pointer"
            >
              <option value="all">Все турниры</option>
              <option 
                v-for="tournament in tournaments" 
                :key="tournament.id" 
                :value="tournament.id"
              >
                {{ tournament.name }}
              </option>
            </select>
            <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <!-- Season Select -->
        <div class="">
          <label class="block text-sm text-gray-400 mb-2">СЕЗОН</label>
          <div class="relative">
            <select 
              v-model="selectedSeason"
              class="w-full bg-[#1A1B1F] text-white rounded px-4 py-2.5 appearance-none cursor-pointer"
            >
              <option value="all">Все сезоны</option>
              <option value="2023">Сезон 2023</option>
              <option value="2022">Сезон 2022</option>
            </select>
            <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <!-- Statistics Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <!-- Left Column -->
        <div class="space-y-4">
          <div class="flex justify-between items-center py-2 border-b border-gray-800">
            <span class="text-gray-400">Количество игр</span>
            <span class="text-white">93</span>
          </div>
          <div class="flex justify-between items-center py-2 border-b border-gray-800">
            <span class="text-gray-400">Количество минут на поле</span>
            <span class="text-white">1025</span>
          </div>
          <div class="flex justify-between items-center py-2 border-b border-gray-800">
            <span class="text-gray-400">В старте</span>
            <span class="text-white">13</span>
          </div>
          <div class="flex justify-between items-center py-2 border-b border-gray-800">
            <span class="text-gray-400">На замену</span>
            <span class="text-white">12</span>
          </div>
        </div>

        <!-- Right Column -->
        <div class="space-y-4">
          <div class="flex justify-between items-center py-2 border-b border-gray-800">
            <span class="text-gray-400">Количество передач</span>
            <span class="text-white">16</span>
          </div>
          <div class="flex justify-between items-center py-2 border-b border-gray-800">
            <span class="text-gray-400">Количество голевых передач</span>
            <span class="text-white">3</span>
          </div>
          <div class="flex justify-between items-center py-2 border-b border-gray-800">
            <span class="text-gray-400">Желтые карточки (ЖК)</span>
            <span class="text-white">2</span>
          </div>
          <div class="flex justify-between items-center py-2 border-b border-gray-800">
            <span class="text-gray-400">Красные карточки (КК)</span>
            <span class="text-white">-</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

interface Tournament {
  id: string
  name: string
}

const selectedTournament = ref('all')
const selectedSeason = ref('all')

const tournaments: Tournament[] = [
  { 
    id: 'fonbet-cup',
    name: 'Фонбет кубок Узбекистана-Путь регионов'
  },
  {
    id: 'premier-league',
    name: 'Мир Узбекская премьер-лига'
  },
  {
    id: 'fonbet-cup-uz',
    name: 'Фонбет кубок Узбекистана'
  },
  {
    id: 'friendly',
    name: 'Товарищеские матчи'
  }
]
</script>

<style scoped>
select {
  background-image: none;
}
</style>