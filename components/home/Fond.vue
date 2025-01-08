<template>
  <div class=" bg-[#11101B] py-8">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-2xl font-bold text-white">ФОНД "БИРДАМЛИК"</h2>
        <button class="text-gray-400 hover:text-white flex items-center gap-2">
          Посмотреть все
          <ChevronRight class="w-4 h-4" />
        </button>
      </div>

      <!-- Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          v-for="card in cards" 
          :key="card.id" 
          class="bg-[#2A2B31] rounded-lg overflow-hidden group hover:bg-[#3A3B41] transition-colors"
        >
          <!-- Card Image -->
          <div class="relative aspect-[4/3] overflow-hidden">
            <img 
              src="/public/card.svg" 
              :alt="card.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <!-- Progress Badge -->
            <div class="absolute top-3 right-3 bg-red-600 text-white text-sm px-2 py-1 rounded">
              {{ card.progress }}%
            </div>
          </div>

          <!-- Card Content -->
          <div class="p-4">
            <!-- Profile -->
            <div class="flex items-center gap-3 mb-3">
              <img 
                src="/public/user.svg " 
                :alt="card.name"
                class="w-16 h-16 rounded-full "
              />
              <div>
                <h3 class="text-white font-medium">{{ card.name }}</h3>
                <p class="text-gray-400 text-sm">{{ card.title }}</p>
              </div>
            </div>

            <!-- Description -->
            <p class="text-gray-400 text-sm mb-4 line-clamp-2">{{ card.description }}</p>

            <!-- Location -->
            <div class="flex items-center gap-2 text-gray-400 text-sm mb-4">
              <MapPin class="w-4 h-4" />
              <span>{{ card.location }}</span>
            </div>

            <!-- Progress Bar -->
            <div class="h-1 bg-gray-700 rounded mb-3">
              <div 
                class="h-full bg-red-600 rounded" 
                :style="{ width: `${card.progress}%` }"
              ></div>
            </div>

            <!-- Stats -->
            <div class="flex justify-between text-sm">
              <div>
                <div class="text-white font-medium">{{ formatPrice(card.currentAmount) }}</div>
                <div class="text-gray-400">{{ formatPrice(card.targetAmount) }} сум</div>
              </div>
              <div class="text-right">
                <div class="text-white font-medium">{{ card.daysLeft }}</div>
                <div class="text-gray-400">дней</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronRight, MapPin } from 'lucide-vue-next'

interface FundingCard {
  id: number
  image: string
  progress: number
  avatar: string
  name: string
  title: string
  description: string
  location: string
  currentAmount: number
  targetAmount: number
  daysLeft: number
}

const cards: FundingCard[] = [
  {
    id: 1,
    image: '/public/card.svg',
    progress: 84,
    avatar: '/public/user.svg',
    name: 'Пратов Максимбек',
    title: 'Мухтаржони угли',
    description: 'Присоединяйтесь ко мне, чтобы помочь талантливым спортсменам в одной из самых сложных областей спорта в мире. Я надеюсь, что 25 человек смогут...',
    location: 'Ташкент, Мирзо Улугбекский район',
    currentAmount: 18000000,
    targetAmount: 25000000,
    daysLeft: 25
  },
  {
    id: 2,
    image: '/public/card.svg',
    progress: 88,
    avatar: '/public/user.svg',
    name: 'Пратов Максимбек',
    title: 'Мухтаржони угли',
    description: 'Присоединяйтесь ко мне, чтобы помочь талантливым спортсменам в одной из самых сложных областей спорта в мире. Я надеюсь, что 25 человек смогут...',
    location: 'Ташкент, Мирзо Улугбекский район',
    currentAmount: 16000000,
    targetAmount: 25000000,
    daysLeft: 25
  },
  {
    id: 3,
    image: '/public/card.svg',
    progress: 52,
    avatar: '/public/user.svg',
    name: 'Пратов Максимбек',
    title: 'Мухтаржони угли',
    description: 'Присоединяйтесь ко мне, чтобы помочь талантливым спортсменам в одной из самых сложных областей спорта в мире. Я надеюсь, что 25 человек смогут...',
    location: 'Ташкент, Мирзо Улугбекский район',
    currentAmount: 16000000,
    targetAmount: 25000000,
    daysLeft: 25
  },
  {
    id: 4,
    image: '/public/card.svg',
    progress: 96,
    avatar: '/public/user.svg',
    name: 'Пратов Максимбек',
    title: 'Мухтаржони угли',
    description: 'Присоединяйтесь ко мне, чтобы помочь талантливым спортсменам в одной из самых сложных областей спорта в мире. Я надеюсь, что 25 человек смогут...',
    location: 'Ташкент, Мирзо Улугбекский район',
    currentAmount: 19000000,
    targetAmount: 25000000,
    daysLeft: 25
  }
]

function formatPrice(price: number): string {
  return new Intl.NumberFormat('ru-RU').format(price)
}
</script>

<style scoped>
/* Add any component-specific styles here */
</style>