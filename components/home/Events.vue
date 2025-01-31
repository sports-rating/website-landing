<template>
  <div class=" bg-[#11101B] py-8">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
      <div class="flex items-end gap-4">
      
        <h2 class="text-2xl font-bold text-white">ГОДОВЫЕ СПОРТИВНЫЕ СОЗТЕЗАНИЕ</h2>
        <span class="text-red-500 text-base px-4 py-1 border-2 border-red-500 rounded-lg">В процессе...</span>
      </div>
        <button class="text-gray-400 hover:text-white flex items-center gap-2">
          Посмотреть все
          <ChevronRight class="w-4 h-4" />
        </button>
      </div>

      <!-- Events Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="event in events" 
          :key="event.id" 
          class="group relative bg-[#2A2B31] rounded-lg overflow-hidden hover:bg-[#3A3B41] transition-colors"
        >
          <!-- Event Image -->
          <div class="relative aspect-video overflow-hidden">
            <img 
              :src="event.image" 
              :alt="event.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            
            <!-- Date Badge -->
            <div class="absolute top-3 right-3 bg-red-600 text-white text-xs px-2 py-1 rounded">
              {{ formatDate(event.date) }}
            </div>

            <!-- Category Badge -->
            <div class="absolute bottom-3 left-3 bg-black/50 text-white text-xs px-2 py-1 rounded">
              {{ event.category }}
            </div>
          </div>

          <!-- Event Content -->
          <div class="p-4">
            <h3 class="text-white font-medium text-lg mb-2 line-clamp-2">{{ event.title }}</h3>
            
            <p class="text-gray-400 text-sm mb-4 line-clamp-2">{{ event.description }}</p>
            
            <!-- Location and Stats -->
            <div class="flex items-center justify-between text-sm">
              <div class="flex items-center gap-2">
                <img 
                  src="/public/franse.svg" 
                  :alt="event.country"
                  class="w-4 h-3 rounded"
                />
                <span class="text-gray-400">{{ event.location }}</span>
              </div>
              
              <!-- Views/Participants -->
              <div class="flex items-center gap-1 text-gray-400">
                <Users class="w-4 h-4" />
                <span>{{ formatNumber(event.participants) }}</span>
              </div>
            </div>
          </div>

          <!-- Hover Overlay -->
          <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button class="bg-red-600 text-white px-4 py-2 rounded-lg transform -translate-y-2 group-hover:translate-y-0 transition-transform">
              Подробнее
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronRight, Users } from 'lucide-vue-next'

interface Event {
  id: number
  image: string
  title: string
  description: string
  date: string
  category: string
  country: string
  countryFlag: string
  location: string
  participants: number
}

const events: Event[] = [
  {
    id: 1,
    image: '/events.svg',
    title: 'Ивановский полумарафон «Красная нить»',
    description: 'В этом забеге принимают участие полумарафонцы. Они используют высокую технику бега по асфальту на большой скорости.',
    date: '2024-01-20',
    category: 'Марафон',
    country: 'UZ',
    countryFlag: '/public/user.svg',
    location: 'Ташкент, Узбекистан',
    participants: 7500
  },
  {
    id: 2,
    image: '/fond-3.jpg',
    title: 'В Ташкенте пройдет бой профессионального бокса WBSSB',
    description: 'Профессиональный боксерский турнир WBSSB-45 в Ташкенте соберет лучших боксеров региона.',
    date: '2024-01-25',
    category: 'Бокс',
    country: 'UZ',
    countryFlag: '/public/user.svg',
    location: 'Ташкент, Узбекистан',
    participants: 2500
  },
  {
    id: 3,
    image: '/fond-2.jpg',
    title: '«Пахтакор» — обладатель Кубка Узбекистана в третий раз подряд',
    description: 'Футбольный клуб завоевал престижный трофей в упорной борьбе.',
    date: '2024-01-15',
    category: 'Футбол',
    country: 'UZ',
    countryFlag: '/public/user.svg',
    location: 'Ташкент, Узбекистан',
    participants: 15000
  },
]

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

function formatNumber(num: number): string {
  return new Intl.NumberFormat('ru-RU').format(num)
}
</script>

<style scoped>
/* Add any component-specific styles here */
</style>