<template>
  <NuxtLayout name="custom">
    <div class="bg-[#11101B] min-h-screen text-white">
      <div class="container mx-auto px-4 sm:px-6 py-8">
        <!-- Title -->
        <div class="text-center mb-8">
          <div
            class="bg-green-500 text-black px-6 sm:px-10 w-fit mx-auto py-2 font-bold uppercase text-2xl sm:text-4xl skew-x-[-10deg]"
          >
            <span class="inline-block skew-x-[10deg]">Рейтинг игроков и тренеров</span>
          </div>
          <p class="mt-4 text-gray-400 text-sm sm:text-lg max-w-xl mx-auto">
            Рейтинг спортсменов и тренеров представляет собой систему оценки и
            классификации, основанную на их достижениях, навыках и вкладе в спорт.
          </p>
        </div>

        <!-- Filters -->
        <div class="rounded-lg flex flex-wrap items-center justify-between gap-4">
          <div
            class="flex overflow-x-scroll no-scrollbar hide-scrollbar gap-2 justify-between"
          >
            <div
              v-for="sport in sports"
              :key="sport.id"
              @click="toggle(sport.id)"
              :class="[
                ' rounded-lg p-2 text-sm whitespace-nowrap transition-colors',
                activeCategory === sport.id
                  ? 'bg-[#2A2B31] text-gray-400 border-red-500 border-2'
                  : 'bg-[#2A2B31] text-gray-400 hover:bg-[#3A3B41]',
              ]"
            >
              <img
                :src="sport?.logo"
                :alt="sport.name"
                class="w-10 h-10 object-contain"
              />
            </div>
          </div>

          <div class="flex gap-4">
            <div class="relative w-64">
              <div
                v-if="regionDropdownVisible"
                class="absolute mt-2 w-full bg-[#1E1F25] rounded-lg shadow-lg border border-gray-700 z-50"
              >
                <ul
                  class="overflow-y-scroll no-scrollbar py-2 max-h-64 overflow-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-600"
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

              <div
                v-if="regionDropdownVisible"
                class="fixed inset-0 z-40"
                @click="regionDropdownVisible = false"
              ></div>
            </div>

            <div class="relative w-64">
              <div
                v-if="regionDropdownVisiblee"
                class="absolute mt-2 w-full bg-[#1E1F25] rounded-lg shadow-lg border border-gray-700 z-50"
              >
                <ul
                  class="overflow-y-scroll no-scrollbar py-2 max-h-64 overflow-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-600"
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

              <div
                v-if="regionDropdownVisible"
                class="fixed inset-0 z-40"
                @click="regionDropdownVisible = false"
              ></div>
            </div>
          </div>
        </div>

        <!-- Tables -->
        <div class="md:flex justify-center grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <!-- Players Table -->
          <div class="bg-[#2A2B31] rounded-lg overflow-hidden">
            <!-- Table Header -->
            <div
              class="bg-[#212226] px-4 py-3 grid grid-cols-[40px,1fr,60px,60px,80px,80px,80px,60px] text-xs text-gray-400"
            >
              <div class="flex items-center">РТГ</div>
              <div class="flex items-center">ИГРОК</div>
              <div class="flex items-center justify-center">СТР</div>
              <div class="flex items-center justify-center">КМ</div>
              <div class="flex items-center justify-center">
                <img src="/gold.png" class="w-5 mr-1" />
                <span class="hidden sm:inline">Золото</span>
              </div>
              <div class="flex items-center justify-center">
                <img src="/silver.png" class="w-5 mr-1" />
                <span class="hidden sm:inline">Серебро</span>
              </div>
              <div class="flex items-center justify-center">
                <img src="/bronza.png" class="w-5 mr-1" />
                <span class="hidden sm:inline">Бронза</span>
              </div>
              <div class="flex items-center justify-center">Балл</div>
            </div>

            <!-- Players Rows -->
            <TransitionGroup name="list" tag="div" class="divide-y divide-gray-700">
              <div v-if="data.length">
                <nuxt-link
                  v-for="(player, index) in data"
                  :key="player.id"
                  :to="`/users/${player.id}`"
                  class="px-4 py-3 grid grid-cols-[40px,1fr,60px,60px,80px,80px,80px,60px] items-center hover:bg-[#3A3B41] transition-colors"
                >
                  <div class="text-gray-400">{{ index + 1 }}</div>
                  <div class="text-white truncate text-sm">
                    {{ player.first_name }} {{ player.last_name }}
                  </div>
                  <div class="text-center">
                    <img src="/UZ.svg" class="w-5 h-3 rounded object-cover mx-auto" />
                  </div>
                  <div class="text-center">
                    <img :src="player.logo" class="w-6 h-6 rounded-full mx-auto" />
                  </div>
                  <div class="text-center">
                    <span class="badge text-white">{{
                      player.statistics.total_gold
                    }}</span>
                  </div>
                  <div class="text-center">
                    <span class="badge text-white">{{
                      player.statistics.total_silver
                    }}</span>
                  </div>
                  <div class="text-center">
                    <span class="badge text-white">{{
                      player.statistics.total_bronze
                    }}</span>
                  </div>
                  <div class="text-center">
                    <span class="badge text-white">{{ player.points }}</span>
                  </div>
                </nuxt-link>
              </div>
              <el-empty v-else :image-size="50" description="Нет данных" />
            </TransitionGroup>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import axios from "axios";

const data = ref<any>([]);
const activeCategory = ref<any>(null);
const sports = ref<any[]>([]);

const getData = async (id: number) => {
  try {
    const res = await axios.get(
      `https://api.7srating.uz/api/user/profile/sportsman/?sport=${id}`
    );
    data.value = res.data.data;
  } catch (e) {
    console.log(e);
  }
};

const toggle = (id: number) => {
  activeCategory.value = id;
  getData(id);
};

const getSport = async () => {
  try {
    const res = await axios.get(`https://api.7srating.uz/api/sport/`);

    sports.value = res.data.data;

    if (sports.value.length > 0) {
      activeCategory.value = sports.value[0].id;
      toggle(activeCategory.value);
    }
  } catch (e) {
    console.log(e);
  }
};

onMounted(() => {
  getSport();
});

interface Filter {
  id: number;
  name: string;
}

interface Player {
  id: number;
  name: string;
  avatar: string;
  country: string;
  flag: string;
  team: string;
  teamLogo: string;
  str: string;
  km: number;
  pos: number;
  total: number;
  region: string;
  rating: any;
  sport: number; // Corresponds to the filter ID
}

const activeFilter = ref(1);
const regionDropdownVisible = ref(false);
const regionDropdownVisiblee = ref(false);
const selectedRegion = ref<string | null>(null);
const selectedRating = ref<any | null>(null);
const ratings = ref([1, 2, 3, 4, 5]);

const regions = [
  "Город Ташкент",
  "Андижанская область",
  "Бухарская область",
  "Джизакская область",
  "Кашкадарьинская область",
  "Навоийская область",
  "Наманганская область",
  "Самаркандская область",
  "Сурхандарьинская область",
  "Сырдарьинская область",
  "Ташкентская область",
  "Ферганская область",
  "Хорезмская область",
  "Республика Каракалпакстан",
];

const toggleRegionDropdown = () => {
  regionDropdownVisible.value = !regionDropdownVisible.value;
};

const toggleRegionDropdownn = () => {
  regionDropdownVisiblee.value = !regionDropdownVisiblee.value;
};

const selectRegion = (region: string) => {
  selectedRegion.value = region;
};
const selectRating = (rating: number) => {
  selectedRating.value = rating;
};

const applyRegionFilter = () => {
  regionDropdownVisible.value = false;
};
const applyRatingFilter = () => {
  regionDropdownVisiblee.value = false;
};

// const filteredPlayers = computed(() => {
//   return data.value.filter(player => {
//     const matchesRegion = selectedRegion.value ? player.region === selectedRegion.value : true
//     const matchesRating = selectedRating.value ? player.rating === selectedRating.value : true
//     const matchesSport = player.sport === activeFilter.value
//     return matchesRegion && matchesSport && matchesRating
//   })
// })
</script>

<style>
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
