<template>
  <NuxtLayout name="custom">
    <div class="bg-[#11101B] min-h-screen text-white">
      <div class="container mx-auto px-6 py-8">
        <div class="text-center mb-8">
          <div
            class="bg-green-500 text-black px-10 w-fit mx-auto py-2 font-bold uppercase text-4xl skew-x-[-10deg]"
          >
            <span class="inline-block skew-x-[10deg]">Рейтинг игроков и тренеров</span>
          </div>
          <p class="mt-4 text-gray-400 sm:text-lg sm:w-[60%] mx-auto">
            Рейтинг спортсменов и тренеров представляет собой систему оценки и
            классификации, основанную на их достижениях, навыках и вкладе в спорт.
          </p>
        </div>

        <div class="rounded-lg flex flex-wrap items-center justify-between gap-4">
          <div class="flex overflow-x-scroll no-scrollbar hide-scrollbar justify-between">
            <div class="flex gap-2">
              <button
                v-for="sport in sports"
                :key="sport.id"
                @click="toggle(sport.id, sport.name)"
                :class="[
                  'px-4 py-2 rounded text-sm whitespace-nowrap transition-colors',
                  activeCategory === sport.id
                    ? 'bg-red-600 text-white'
                    : 'bg-[#2A2B31] text-gray-400 hover:bg-[#3A3B41]',
                ]"
              >
                {{ sport.name }}
              </button>
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

        <div class="md:flex justify-center grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div class="bg-[#2A2B31] rounded-lg overflow-hidden">
            <div
              class="bg-[#212226] px-4 py-3 grid grid-cols-12 gap-2 text-xs text-gray-400 items-center"
            >
              <div class="col-span-1">РТГ</div>
              <div class="col-span-2">ТРЕНЕР</div>
              <div class="col-span-1 text-center">СТР</div>
              <div class="col-span-1 text-center">КМ</div>

              <div class="sm:flex sm:col-span-1 items-center gap-1">
                <img src="/gold.png" class="w-4 h-4" />
                <span class="sm:flex hidden">Золото</span>
              </div>

              <div class="sm:flex sm:col-span-2 items-center gap-1 sm:ml-5">
                <img src="/silver.png" class="w-4 h-4" />
                <span class="sm:flex hidden">Серебро</span>
              </div>

              <div class="sm:flex sm:col-span-2 items-center gap-1">
                <img src="/bronza.png" class="w-4 h-4" />
                <span class="sm:flex hidden">Бронза</span>
              </div>

              <div class="col-span-4 sm:col-span-2 flex justify-end">
                <el-dropdown @command="handleSelect">
                  <el-button type="text" size="small" class="!text-gray-400 text-xs">
                    {{ selectedView === "1" ? "Личное" : "Учащихся" }}
                    <el-icon><arrow-down /></el-icon>
                  </el-button>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item command="1">Личное достижение</el-dropdown-item>
                      <el-dropdown-item command="2">Достижения учащихся</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </div>

            <TransitionGroup name="list" tag="div" class="divide-y divide-gray-700">
              <nuxt-link
                v-for="(trainer, index) in data"
                :key="trainer.id"
                :to="`/trainer/${trainer.id}`"
                class="px-4 py-3 grid grid-cols-12 gap-2 items-center hover:bg-[#3A3B41] transition-colors"
              >
                <div class="col-span-1 text-gray-400 text-sm">{{ index + 1 }}</div>

                <!-- Name -->
                <div class="col-span-2 text-white text-sm truncate">
                  {{ trainer.first_name }} {{ trainer.last_name }}
                </div>

                <!-- Country -->
                <div class="col-span-1 text-center">
                  <img src="/UZ.svg" class="w-5 h-3 rounded object-cover mx-auto" />
                </div>

                <!-- Club Logo -->
                <div class="col-span-1 text-center">
                  <img
                    :src="trainer.logo"
                    class="w-6 h-6 rounded-full mx-auto object-cover"
                  />
                </div>

                <!-- Medals -->
                <div class="col-span-7 grid grid-cols-3 gap-2 text-center">
                  <span
                    class="bg-[#1A1B1F] text-white px-2 py-1 rounded text-xs sm:text-sm"
                  >
                    {{
                      selectedView === "1"
                        ? trainer.statistics.own_statistics.gold
                        : trainer.statistics.students_statistics.gold
                    }}
                  </span>
                  <span
                    class="bg-[#1A1B1F] text-white px-2 py-1 rounded text-xs sm:text-sm"
                  >
                    {{
                      selectedView === "1"
                        ? trainer.statistics.own_statistics.silver
                        : trainer.statistics.students_statistics.silver
                    }}
                  </span>
                  <span
                    class="bg-[#1A1B1F] text-white px-2 py-1 rounded text-xs sm:text-sm"
                  >
                    {{
                      selectedView === "1"
                        ? trainer.statistics.own_statistics.bronze
                        : trainer.statistics.students_statistics.bronze
                    }}
                  </span>
                </div>
              </nuxt-link>
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
import { ArrowDown } from "@element-plus/icons-vue";

const data = ref<any>([]);
const activeCategory = ref<any>(null);
const sports = ref<any[]>([]);
const selectedView = ref("2");

function handleSelect(command: any) {
  selectedView.value = command;
}

const getData = async (name: string = "Джиу Джитсу") => {
  try {
    const res = await axios.get(
      `https://api.7srating.uz/api/user/profile/trainer/?sport=${name}`
    );
    data.value = res.data.data;
  } catch (e) {
    console.log(e);
  }
};

const toggle = (id: number, name: string) => {
  activeCategory.value = id;
  getData(name);
};

const getSport = async () => {
  try {
    const res = await axios.get(`https://api.7srating.uz/api/sport/`);

    sports.value = res.data.data;

    const defaultSport = sports.value.find((sport) => sport.name === "Джиу Джитсу");
    if (defaultSport) {
      activeCategory.value = defaultSport.id; // Set default active category to Джиу Джитсу's ID
      toggle(defaultSport.id, defaultSport.name); // Trigger data load for Football
    }
  } catch (e) {
    console.log(e);
  }
};

onMounted(() => {
  getData();
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
