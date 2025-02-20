<template>
  <NuxtLayout name="custom">
    <div class="bg-[#11101B] min-h-screen text-white">
      <div class="container mx-auto px-6 py-8">
        <!-- Header Section -->
        <div class="text-center mb-8">
          <div class="bg-green-500 text-black px-10 w-fit mx-auto py-2 font-bold uppercase text-4xl skew-x-[-10deg]">
            <span class="inline-block skew-x-[10deg]">Рейтинг игроков и тренеров</span>
          </div>
          <p class="mt-4 text-gray-400 text-lg w-[60%] mx-auto">
            Рейтинг спортсменов и тренеров представляет собой систему оценки и классификации, 
            основанную на их достижениях, навыках и вкладе в спорт.
          </p>
        </div>

        <!-- Filters Section -->
        <div class=" rounded-lg flex flex-wrap items-center justify-between gap-4 ">
          <!-- Sports Categories -->
      <div class="flex  overflow-x-scroll no-scrollbar hide-scrollbar justify-between ">
      <div class="flex gap-2">
        

        <button 
          v-for="(sport) in sports" 
          :key="sport.id"
          @click="toggle(sport.id, sport.name)"
          :class="[
            'px-4 py-2 rounded text-sm whitespace-nowrap transition-colors',
            activeCategory === sport.id 
              ? 'bg-red-600 text-white' 
              : 'bg-[#2A2B31] text-gray-400 hover:bg-[#3A3B41]'
          ]"
        >
          {{ sport.name }}
        </button>
      </div>
        
      </div>

          

          <!-- Region Dropdown -->


          <div class="flex gap-4">
          
          <div class="relative w-64">
          <!-- Dropdown Button -->
          <!-- <button 
            class="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-gray-300 px-6 py-2 rounded-lg text-sm flex items-center justify-between hover:text-white hover:shadow-lg transition duration-200 ease-in-out w-full"
            @click="toggleRegionDropdown"
          >
            <span>{{ selectedRegion || 'Все регионы' }}</span>
            <svg 
              class="w-4 h-4 transform transition-transform duration-200" 
              :class="{ 'rotate-180': regionDropdownVisible }" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button> -->

  <!-- Dropdown List -->
  <div 
    v-if="regionDropdownVisible" 
    class="absolute mt-2 w-full bg-[#1E1F25] rounded-lg shadow-lg border border-gray-700 z-50"
  >
    <ul 
      class="overflow-y-scroll no-scrollbar  py-2 max-h-64 overflow-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-600"
    >
      <li 
        v-for="region in regions" 
        :key="region" 
        @click="selectRegion(region)"
        class="px-4 py-2 cursor-pointer text-gray-400 hover:text-white hover:bg-gray-700 transition duration-200 ease-in-out"
        :class="{ 'bg-gray-700 text-white': selectedRegion === region }"
      >
        {{ region }}
      </li>
    </ul>
    <button 
      class="bg-blue-600 text-white px-4 py-2 mt-2 w-full rounded hover:bg-blue-500 transition duration-200 ease-in-out"
      @click="applyRegionFilter"
    >
      Применить
    </button>
  </div>

  <!-- Outside Click Handler -->
  <div 
    v-if="regionDropdownVisible" 
    class="fixed inset-0 z-40"
    @click="regionDropdownVisible = false"
  ></div>
          </div>


          <div class="relative w-64">
          <!-- Dropdown Button -->
          <!-- <button 
            class="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-gray-300 px-6 py-2 rounded-lg text-sm flex items-center justify-between hover:text-white hover:shadow-lg transition duration-200 ease-in-out w-full"
            @click="toggleRegionDropdownn"
          >
            <span>{{ selectedRating || 'Рейтинг тренеров' }}</span>
            <svg 
              class="w-4 h-4 transform transition-transform duration-200" 
              :class="{ 'rotate-180': regionDropdownVisiblee }" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button> -->

  <!-- Dropdown List -->
  <div 
    v-if="regionDropdownVisiblee" 
    class="absolute mt-2 w-full bg-[#1E1F25] rounded-lg shadow-lg border border-gray-700 z-50"
  >
    <ul 
      class="overflow-y-scroll no-scrollbar  py-2 max-h-64 overflow-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-600"
    >
      <li 
        v-for="rating in ratings" 
        :key="rating" 
        @click="selectRating(rating)"
        class="px-4 py-2 cursor-pointer text-gray-400 hover:text-white hover:bg-gray-700 transition duration-200 ease-in-out"
        :class="{ 'bg-gray-700 text-white': selectedRating === rating }"
      >
        {{ rating }}
      </li>
    </ul>
    <button 
      class="bg-blue-600 text-white px-4 py-2 mt-2 w-full rounded hover:bg-blue-500 transition duration-200 ease-in-out"
      @click="applyRatingFilter"
    >
      Применить
    </button>
  </div>

  <!-- Outside Click Handler -->
  <div 
    v-if="regionDropdownVisible" 
    class="fixed inset-0 z-40"
    @click="regionDropdownVisible = false"
  ></div>
          </div>
          </div>
          <!-- <div class="relative">
            <button 
              class="bg-[#1A1B1F] text-gray-400 px-6 py-2 rounded text-sm flex items-center gap-2 hover:text-white"
              @click="toggleRegionDropdown"
            >
              {{ selectedRegion || 'Все регионы' }}
              <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div 
              v-if="regionDropdownVisible" 
              class="absolute mt-2 w-64 bg-[#2A2B31] rounded-lg shadow-lg z-50"
            >
              <ul class="py-2 max-h-64 overflow-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-600">
                <li 
                  v-for="region in regions" 
                  :key="region" 
                  @click="selectRegion(region)"
                  class="px-4 py-2 hover:bg-[#3A3B41] cursor-pointer text-gray-400 hover:text-white"
                >
                  {{ region }}
                </li>
              </ul>
              <button 
                class="bg-red-600 text-white px-4 py-2 mt-2 w-full rounded"
                @click="applyRegionFilter"
              >
                Применить
              </button>
            </div>
          </div> -->
        </div>

        <!-- Players Table -->
        <div class="bg-[#2A2B31] rounded-lg overflow-hidden">
          <div class="bg-[#212226] px-4 py-3 grid grid-cols-12 gap-4">
            <div class="col-span-1 text-gray-400 text-sm">РТГ</div>
            <div class="col-span-3 text-gray-400 text-sm">ИГРОК</div>
            <div class="col-span-1  text-gray-400 text-sm">СТР</div>
            <div class="col-span-1  text-gray-400 text-sm">КМ</div>
            <div class="col-span-2  text-center items-center text-gray-400 text-xs flex"><img src="/gold.png" class="w-6" alt=""/>Золото</div>
            <div class="col-span-2  text-center items-center text-gray-400 text-xs flex"><img src="/silver.png" class="w-6" alt=""/>Серебро</div>
            <div class="col-span-2  text-center items-center text-gray-400 text-xs flex"><img src="/bronza.png" class="w-6" alt=""/>Бронза</div>
          </div>
          
          <TransitionGroup 
            name="list" 
            tag="div" 
            class="divide-y divide-gray-700"
          >
            <nuxt-link  
              v-for="(player, index) in data" 
              :key="player.id"
              :to="`/users/${player.id}`" 
              class="px-4 py-3 grid grid-cols-12 gap-4 items-center hover:bg-[#3A3B41] transition-colors"
            >
              <div class="col-span-1 text-gray-400">{{ index + 1 }}</div>
              <div class="col-span-3 flex items-center gap-3">
                <span class="text-white text-sm truncate">{{ player.first_name }} {{ player.last_name }} </span>
              </div>
              <div class="col-span-1 text-center">
              <img 
                  src="/public/UZ.svg"
                  :alt="player.country"
                  class="w-6 h-4 object-cover rounded"
                />
              </div>
              <div class="col-span-1 text-center">
              <img 
                  :src="`${player?.logo}`" 
                  :alt="player.team"
                  class="w-6 h-6 rounded-full"
                />
              </div>

              
              <div class="col-span-2 ml-7">
              <span  class="bg-[#1A1B1F] text-white px-2 py-1 rounded text-sm">
                {{ player.statistics.total_gold }}

              </span>
              </div>
              <div class="col-span-2 ml-7">
              <span  class="bg-[#1A1B1F] text-white px-2 py-1 rounded text-sm">
                {{ player.statistics.total_silver }}

              </span>
              </div>
              <div class="col-span-2 ml-7">
              <span  class="bg-[#1A1B1F] text-white px-2 py-1 rounded text-sm">
                {{ player.statistics.total_bronze }}
              </span>
              </div>
              
            </nuxt-link>
          </TransitionGroup>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import axios from 'axios';


const data = ref<any>([])
const activeCategory = ref<any>(null)
const sports = ref<any[]>([])

const getData = async (name: string = 'Жиу Житсу') => {
  try {
    const res = await axios.get(
      `https://api.7srating.uz/api/user/profile/sportsman/?sport=${name}`
    );
    data.value = res.data.data;
  } catch (e) {
    console.log(e);
  }
};

const toggle = (id: number, name:string) => {
  activeCategory.value = id;
  getData(name);
};


const getSport = async() => {
  try {
    const res = await axios.get(
    `https://api.7srating.uz/api/sport/`);

    sports.value = res.data.data

    const defaultSport = sports.value.find(sport => sport.name === 'Жиу Житсу');
  if (defaultSport) {
        activeCategory.value = defaultSport.id; // Set default active category to Football's ID
        toggle(defaultSport.id, defaultSport.name); // Trigger data load for Football
      }
      
  } catch (e) {
    console.log(e);
    
  }
}

onMounted(() => {
  getData()
  getSport()
  
})

interface Filter {
  id: number
  name: string
}

interface Player {
  id: number
  name: string
  avatar: string
  country: string
  flag: string
  team: string
  teamLogo: string
  str: string
  km: number
  pos: number
  total: number
  region: string
  rating: any
  sport: number // Corresponds to the filter ID
}

const activeFilter = ref(1)
const regionDropdownVisible = ref(false)
const regionDropdownVisiblee = ref(false)
const selectedRegion = ref<string | null>(null)
const selectedRating = ref<any | null>(null)
const ratings = ref([1, 2, 3, 4, 5])



const regions = [
  'Город Ташкент','Андижанская область', 'Бухарская область', 'Джизакская область',
  'Кашкадарьинская область', 'Навоийская область', 'Наманганская область',
  'Самаркандская область', 'Сурхандарьинская область', 'Сырдарьинская область',
  'Ташкентская область', 'Ферганская область', 'Хорезмская область',
  'Республика Каракалпакстан'
]



const toggleRegionDropdown = () => {
  regionDropdownVisible.value = !regionDropdownVisible.value
}

const toggleRegionDropdownn = () => {
  regionDropdownVisiblee.value = !regionDropdownVisiblee.value
}

const selectRegion = (region: string) => {
  selectedRegion.value = region
}
const selectRating = (rating: number) => {
  selectedRating.value = rating
  
}

const applyRegionFilter = () => {
  regionDropdownVisible.value = false
}
const applyRatingFilter = () => {
  regionDropdownVisiblee.value = false
}

// const filteredPlayers = computed(() => {
//   return data.value.filter(player => {
//     const matchesRegion = selectedRegion.value ? player.region === selectedRegion.value : true
//     const matchesRating = selectedRating.value ? player.rating === selectedRating.value : true
//     const matchesSport = player.sport === activeFilter.value
//     return matchesRegion && matchesSport && matchesRating
//   })
// })
</script>


<style >
.no-scrollbar::-webkit-scrollbar-thumb {
  background-color: transparent !important;
  border: 4px solid transparent;
  border-radius: 8px;
  background-clip: padding-box;
}

.no-scrollbar::-webkit-scrollbar {
  width: 10px;
}

.no-scrollbar {
  -ms-overflow-style: none;
  /* scrollbar-width: thin; */
  /* margin: inherit; */
  scroll-margin-block-start: 0;
}
</style>