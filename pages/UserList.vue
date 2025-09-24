<template>
  <NuxtLayout name="custom">
    <div class="bg-[#11101B] min-h-screen text-white">
      <div class="container mx-auto px-4 sm:px-6 py-8">
        <!-- Title -->
        <div class="text-center mb-8">
          <div
            class="bg-green-500 text-black px-6 sm:px-10 w-fit mx-auto py-2 font-bold uppercase text-2xl sm:text-4xl skew-x-[-10deg]"
          >
            <span class="inline-block skew-x-[10deg]">Рейтинг игроков и cпортсмен</span>
          </div>
          <p class="mt-4 text-gray-400 text-sm sm:text-lg max-w-xl mx-auto">
            Рейтинг спортсменов и тренеров представляет собой систему оценки и
            классификации, основанную на их достижениях, навыках и вкладе в спорт.
          </p>
        </div>

        <!-- Filters -->
        <div class="rounded-lg flex flex-wrap items-center justify-between gap-4">
          <div class="flex overflow-x-auto no-scrollbar gap-2 py-2 scroll-smooth">
            <div
              v-for="sport in sports"
              :key="sport.id"
              @click="toggle(sport.id)"
              class="p-2 rounded-lg text-xs whitespace-nowrap transition-colors min-w-fit cursor-pointer flex justify-center flex-col items-center gap-2"
              :class="
                sportStore.activeCategory === sport.id
                  ? ' text-gray-400 bg-[#3A3B41] border-[#868688] border-2'
                  : ' text-gray-400 hover:bg-[#3A3B41]'
              "
            >
              <img
                :src="sport?.logo"
                :alt="sport.name"
                class="w-10 h-10 object-contain"
              />
              {{ sport?.name }}
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
          <div
            class="bg-[#2A2B31] rounded-lg overflow-hidden justify-between flex flex-col"
          >
            <!-- Table Header -->
            <div class="overflow-x-auto no-scrollbar">
              <div
                class="bg-[#212226] min-w-[800px] px-4 py-3 grid text-xs text-gray-400 grid-cols-[40px,240px,100px,100px,100px,100px]"
              >
                <div class="flex items-center">РТГ</div>
                <div class="flex items-center">ИГРОК</div>
                <div class="flex items-center justify-center">
                  <img src="/gold.png" class="w-5 mr-1" />
                </div>
                <div class="flex items-center justify-center">
                  <img src="/silver.png" class="w-5 mr-1" />
                </div>
                <div class="flex items-center justify-center">
                  <img src="/bronza.png" class="w-5 mr-1" />
                </div>
                <div class="flex items-center justify-center">Балл</div>
              </div>
              <!-- Players Rows -->
              <TransitionGroup name="list" tag="div" class="divide-y divide-gray-700">
                <div v-if="paginatedPlayers.length">
                  <nuxt-link
                    v-for="(player, index) in paginatedPlayers"
                    :key="player.id"
                    :to="`/users/${player.id}`"
                    class="px-4 py-3 grid items-center hover:bg-[#3A3B41] grid-cols-[40px,240px,100px,100px,100px,100px]"
                  >
                    <div
                      class="w-6 h-6 flex items-center justify-center rounded-full font-bold"
                      :class="{
                        'bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-black':
                          index + 1 + (currentPagePlayers - 1) * pageSize === 1,
                        'bg-gradient-to-r from-gray-400 via-gray-300 to-gray-500 text-black':
                          index + 1 + (currentPagePlayers - 1) * pageSize === 2,
                        'bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600 text-black':
                          index + 1 + (currentPagePlayers - 1) * pageSize === 3,
                        'bg-[#3A3B41] text-gray-300':
                          index + 1 + (currentPagePlayers - 1) * pageSize > 3,
                      }"
                    >
                      {{ index + 1 + (currentPagePlayers - 1) * pageSize }}
                    </div>
                    <div class="text-white truncate text-sm flex items-center gap-2">
                      <img :src="player.profile_photo" class="w-6 h-6 rounded-full" />
                      {{ player.first_name }} {{ player.last_name }}
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

            <div class="flex justify-center p-3">
              <el-pagination
                v-model:current-page="currentPagePlayers"
                :page-size="pageSize"
                layout="prev, pager, next"
                :total="count"
                background
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import axios from "axios";
import { useSportStore } from "@/stores/sport";

const sportStore = useSportStore();

const data = ref<any[]>([]);
const count = ref(0);

const sports = ref<any[]>([]);
const selectedView = ref("2");

const currentPagePlayers = ref(1);
const pageSize = ref(10);

const paginatedPlayers = computed(() => {
  return data.value ?? [];
});

function handleSelect(command: any) {
  selectedView.value = command;
}

const getData = async (id: number) => {
  try {
    const res = await axios.get(
      `https://api.7srating.uz/api/user/profile/sportsman/?sport=${id}&page=${currentPagePlayers.value}&page_size=${pageSize.value}`
    );
    count.value = res.data.data.count;
    data.value = res.data.data.data;
  } catch (e) {
    console.log(e);
  }
};

const toggle = (id: number) => {
  sportStore.activeCategory = id as any;
  getData(id);
};

const getSport = async () => {
  try {
    const res = await axios.get(`https://api.7srating.uz/api/sport/`);
    sports.value = res.data.data;

    if (!sportStore.activeCategory && sports.value.length > 0) {
      sportStore.activeCategory = sports.value[0].id;
    }
  } catch (e) {
    console.log(e);
  }
};

onMounted(async () => {
  await getSport();

  if (sportStore.activeCategory) {
    toggle(sportStore.activeCategory);
  }
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
watch(currentPagePlayers, () => {
  getData(sportStore.activeCategory as any);
});
</script>

<style>
.el-pagination.is-background .btn-next.is-active,
.el-pagination.is-background .btn-prev.is-active,
.el-pagination.is-background .el-pager li.is-active {
  background-color: red !important;
}
</style>
