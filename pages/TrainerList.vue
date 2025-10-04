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

        <div class="md:flex justify-center grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <!-- Trainers Table -->
          <div
            class="bg-[#2A2B31] rounded-lg overflow-hidden justify-between flex flex-col"
          >
            <!-- SCROLL WRAPPER -->
            <div class="overflow-x-auto no-scrollbar">
              <!-- Table Header -->
              <div
                :class="paginatedTrainers.length ? 'py-0' : '!py-2.5'"
                class="px-4 min-w-[800px] text-xs h-11 text-gray-400 bg-[#212226] py-4 grid grid-cols-[40px,220px,90px,90px,90px,90px,auto]"
              >
                <div>РТГ</div>
                <div>ТРЕНЕР</div>
                <div class="flex justify-center gap-1">
                  <img src="/gold.png" class="w-4 h-4" />
                </div>
                <div class="flex justify-center gap-1">
                  <img src="/silver.png" class="w-4 h-4" />
                </div>
                <div class="flex justify-center gap-1">
                  <img src="/bronza.png" class="w-4 h-4" />
                </div>
                <div class="text-center">Балл</div>

                <!-- Dropdown -->
                <div class="ml-auto mt-[2px]">
                  <el-dropdown @command="handleSelect">
                    <el-button
                      type="text"
                      size="small"
                      class="!text-gray-400 text-xs !pb-[2.3rem]"
                    >
                      {{ selectedView === "1" ? "Личное" : "Учащихся" }}
                      <el-icon><arrow-down /></el-icon>
                    </el-button>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item command="1">Личное достижение</el-dropdown-item>
                        <el-dropdown-item command="2"
                          >Достижения учащихся</el-dropdown-item
                        >
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>
              </div>

              <!-- Trainers Rows -->
              <TransitionGroup name="list" tag="div" class="divide-y divide-gray-700">
                <div v-if="paginatedTrainers.length">
                  <nuxt-link
                    v-for="(trainer, index) in paginatedTrainers"
                    :key="trainer.id"
                    :to="`/trainer/${trainer.id}`"
                    class="px-4 py-3 grid items-center hover:bg-[#3A3B41] transition-colors grid-cols-[40px,220px,90px,90px,90px,90px,auto]"
                  >
                    <div
                      class="w-6 h-6 flex items-center justify-center rounded-full font-bold"
                      :class="{
                        'bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-black':
                          index + 1 + (currentPageTrainers - 1) * pageSize === 1,
                        'bg-gradient-to-r from-gray-400 via-gray-300 to-gray-500 text-black':
                          index + 1 + (currentPageTrainers - 1) * pageSize === 2,
                        'bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600 text-black':
                          index + 1 + (currentPageTrainers - 1) * pageSize === 3,
                        'bg-[#3A3B41] text-gray-300':
                          index + 1 + (currentPageTrainers - 1) * pageSize > 3,
                      }"
                    >
                      {{ index + 1 + (currentPageTrainers - 1) * pageSize }}
                    </div>
                    <div class="text-white truncate text-sm flex items-center gap-2">
                      <img :src="trainer.profile_photo" class="w-6 h-6 rounded-full" />
                      {{ trainer.first_name }} {{ trainer.last_name }}
                    </div>

                    <div class="text-center">
                      <span class="badge text-white">
                        {{
                          selectedView === "1"
                            ? trainer.statistics.own_statistics.gold
                            : trainer.statistics.students_statistics.gold
                        }}
                      </span>
                    </div>
                    <div class="text-center">
                      <span class="badge text-white">
                        {{
                          selectedView === "1"
                            ? trainer.statistics.own_statistics.silver
                            : trainer.statistics.students_statistics.silver
                        }}
                      </span>
                    </div>
                    <div class="text-center">
                      <span class="badge text-white">
                        {{
                          selectedView === "1"
                            ? trainer.statistics.own_statistics.bronze
                            : trainer.statistics.students_statistics.bronze
                        }}
                      </span>
                    </div>
                    <div class="text-center">
                      <span class="badge text-white">{{ trainer.points }}</span>
                    </div>

                    <div></div>
                  </nuxt-link>
                </div>

                <el-empty v-else :image-size="50" description="Нет данных" />
              </TransitionGroup>
            </div>

            <div class="flex justify-center p-3">
              <el-pagination
                v-model:current-page="currentPageTrainers"
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

import { ArrowDown } from "@element-plus/icons-vue";
import { useSportStore } from "@/stores/sport";

const { $api } = useNuxtApp();
const sportStore = useSportStore();

const data = ref<any[]>([]);
const count = ref(0);

const sports = ref<any[]>([]);
const selectedView = ref("2");

const currentPageTrainers = ref(1);
const pageSize = ref(10);

const paginatedTrainers = computed(() => {
  return data.value ?? [];
});

function handleSelect(command: any) {
  selectedView.value = command;
}

const getData = async (id: number) => {
  try {
    const res = await $api.get(
      `/user/profile/trainer/?sport=${id}&page=${currentPageTrainers.value}&page_size=${pageSize.value}`
    );
    count.value = res.data.data.count;
    data.value = res.data.data.data;
  } catch (e) {
    console.log(e);
  }
};



const toggle = (id: number) => {
  sportStore.activeCategory = id as any;

  currentPageTrainers.value = 1;

  getData(id);
};


const getSport = async () => {
  try {
    const res = await $api.get(`/sport/`);
    sports.value = res.data.data;

    if (!sportStore.activeCategory && sports.value.length > 0) {
      sportStore.activeCategory = sports.value[0].id;
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
  sport: number;
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

onMounted(async () => {
  await getSport();

  if (sportStore.activeCategory) {
    toggle(sportStore.activeCategory);
  }
});

watch(currentPageTrainers, () => {
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
