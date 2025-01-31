<template>
  <div class=" bg-[#11101B] py-8">
    <div class="container mx-auto px-4">
      <!-- Header with Categories -->
      <div class="mb-8">
        <div class="flex justify-between items-center mb-6">
        <div class="flex items-end gap-4">
      
          <h2 class="text-2xl font-bold text-white">ФАН-КЛУБЫ</h2>
        <span class="text-red-500 text-base px-4 py-1 border-2 border-red-500 rounded-lg">В процессе...</span>
      </div>
          
        </div>

        <!-- Category Tabs -->
        <div class="flex justify-between gap-2 overflow-x-auto pb-4 hide-scrollbar">
        <div class="flex gap-2">
        
          <button 
            v-for="category in categories" 
            :key="category.id"
            @click="activeCategory = category.id"
            :class="[
              'px-4 py-2 text-sm whitespace-nowrap transition-colors rounded-full',
              activeCategory === category.id 
                ? 'bg-red-600 text-white' 
                : 'bg-[#2A2B31] text-gray-400 hover:bg-[#3A3B41]'
            ]"
          >
            {{ category.name }}
          </button>

        </div>
          <button class="text-gray-400 hover:text-white flex items-center gap-2">
            Перейти к рейтингу
            <ChevronRight class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- Fan Clubs Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          v-for="club in clubs" 
          :key="club.id" 
          class="bg-[#2A2B31] rounded-lg p-4 hover:bg-[#3A3B41] transition-colors"
        >
          <!-- Club Type Badge -->
          <div class="mb-4">
            <span class="bg-red-600 text-white text-xs px-2 py-1 rounded">
              {{ club.type }}
            </span>
          </div>

          <!-- Club Name -->
          <h3 class="text-white font-medium text-lg mb-4">{{ club.name }}</h3>

          <!-- Location -->
          <div class="flex items-start gap-2 mb-3">
            <MapPin class="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
            <p class="text-gray-400 text-sm">{{ club.location }}</p>
          </div>

          <!-- Phone -->
          <div class="flex items-start gap-2 mb-6">
            <Phone class="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
            <div>
              <a 
                v-for="phone in club.phones" 
                :key="phone"
                :href="`tel:${phone}`"
                class="block text-gray-400 text-sm hover:text-white transition-colors"
              >
                {{ formatPhone(phone) }}
              </a>
            </div>
          </div>

          <!-- Action Button -->
          <button class="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors">
            Посмотреть клуб подробнее
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ChevronRight, MapPin, Phone } from 'lucide-vue-next'

interface Category {
  id: number
  name: string
}

interface FanClub {
  id: number
  type: string
  name: string
  location: string
  phones: string[]
}

const activeCategory = ref(1)

const categories: Category[] = [
  { id: 1, name: 'Футбол' },
  { id: 2, name: 'Баскетбол' },
  { id: 3, name: 'Бокс' },
  { id: 4, name: 'Борьба вольная' },
  { id: 5, name: 'Волейбол' },
  { id: 6, name: 'Гандбол' },
  { id: 7, name: 'Греко-римский спорт' }
]

const clubs: FanClub[] = [
  {
    id: 1,
    type: 'Футбол',
    name: 'Футбольный фан клуб Пахтакор',
    location: 'Ташкент, Мирзо Улугбекский район',
    phones: ['+998 55 500 55 55']
  },
  {
    id: 2,
    type: 'Футбол',
    name: 'Футбольный фан клуб Пахтакор',
    location: 'Ташкент, Мирзо Улугбекский район',
    phones: ['+998 55 500 55 55']
  },
  {
    id: 3,
    type: 'Футбол',
    name: 'Футбольный фан клуб Пахтакор',
    location: 'Ташкент, Мирзо Улугбекский район',
    phones: ['+998 55 500 55 55']
  },
  {
    id: 4,
    type: 'Футбол',
    name: 'Футбольный фан клуб Пахтакор',
    location: 'Ташкент, Мирзо Улугбекский район',
    phones: ['+998 55 500 55 55']
  }
]

function formatPhone(phone: string): string {
  return phone.replace(/(\+\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5')
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