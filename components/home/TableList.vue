<template>
  <div class="pt-10 bg-[#11101B]">
    <div class="container mx-auto px-4 pb-8">
      <!-- Header -->
      <div class="flex flex-wrap justify-between items-center mb-6">
        <h2 class="text-xl sm:text-2xl font-bold text-white">
          РЕЙТИНГИ ИГРОКОВ И ТРЕНЕРОВ
        </h2>
        <button
          @click="goToRatings"
          class="text-gray-400 hover:text-white flex items-center gap-1 whitespace-nowrap mt-2 sm:mt-0"
        >
          Перейти к рейтингу
          <ChevronRight class="w-4 h-4" />
        </button>
      </div>

      <!-- Sports Tabs -->
      <div class="flex overflow-x-auto no-scrollbar gap-2 pb-2 scroll-smooth">
        <button
          v-for="sport in sports"
          :key="sport.id"
          @click="toggle(sport.id, sport.name)"
          class="px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors min-w-fit"
          :class="
            activeCategory === sport.id
              ? 'bg-red-600 text-white'
              : 'bg-[#2A2B31] text-gray-400 hover:bg-[#3A3B41]'
          "
        >
          {{ sport.name }}
        </button>
      </div>

      <!-- Tables -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <!-- Players Table -->
        <div class="bg-[#2A2B31] rounded-lg overflow-hidden">
          <!-- Table Header -->
          <div
            class="bg-[#212226] px-4 py-3 grid grid-cols-12 gap-2 text-xs text-gray-400"
          >
            <div class="col-span-1 flex items-center">РТГ</div>
            <div class="col-span-3 flex items-center">ИГРОК</div>
            <div class="col-span-1 flex items-center">СТР</div>
            <div class="col-span-1 flex items-center">КМ</div>
            <div class="col-span-2 flex items-center md:justify-normal justify-center">
              <img src="/gold.png" class="w-5 mr-1" />
              <span class="sm:flex hidden">Золото</span>
            </div>
            <div class="col-span-2 flex items-center md:justify-normal justify-center">
              <img src="/silver.png" class="w-5 mr-1" />
              <span class="sm:flex hidden">Серебро</span>
            </div>
            <div class="col-span-2 flex items-center md:justify-normal justify-center">
              <img src="/bronza.png" class="w-5 mr-1" />
              <span class="sm:flex hidden">Бронза</span>
            </div>
          </div>

          <!-- Players Rows -->
          <TransitionGroup name="list" tag="div" class="divide-y divide-gray-700">
            <nuxt-link
              v-for="(player, index) in data"
              :key="player.id"
              :to="`/users/${player.id}`"
              class="px-4 py-3 grid grid-cols-12 gap-2 items-center hover:bg-[#3A3B41] transition-colors"
            >
              <div class="col-span-1 text-gray-400">{{ index + 1 }}</div>
              <div class="col-span-3 text-white truncate text-sm">
                {{ player.first_name }} {{ player.last_name }}
              </div>
              <div class="col-span-1 text-center">
                <img src="/public/UZ.svg" class="w-5 h-3 rounded object-cover" />
              </div>
              <div class="col-span-1 text-center">
                <img :src="player.logo" class="w-6 h-6 rounded-full" />
              </div>
              <div class="col-span-2 text-center">
                <span class="bg-[#1A1B1F] px-2 py-1 rounded text-white text-sm">{{
                  player.statistics.total_gold
                }}</span>
              </div>
              <div class="col-span-2 text-center">
                <span class="bg-[#1A1B1F] px-2 py-1 rounded text-white text-sm">{{
                  player.statistics.total_silver
                }}</span>
              </div>
              <div class="col-span-2 text-center">
                <span class="bg-[#1A1B1F] px-2 py-1 rounded text-white text-sm">{{
                  player.statistics.total_bronze
                }}</span>
              </div>
            </nuxt-link>
          </TransitionGroup>
        </div>

        <div class="bg-[#2A2B31] rounded-lg overflow-hidden">
          <!-- Table Header -->
          <div
            class="bg-[#212226] px-4 py-3 grid grid-cols-12 gap-2 text-xs text-gray-400 items-center"
          >
            <div class="col-span-1">РТГ</div>
            <div class="col-span-2">ТРЕНЕР</div>
            <div class="col-span-1 text-center">СТР</div>
            <div class="col-span-1 text-center">КМ</div>

            <!-- Gold -->
            <div class="sm:flex sm:col-span-1 items-center gap-1">
              <img src="/gold.png" class="w-4 h-4" />
              <span class="sm:flex hidden">Золото</span>
            </div>

            <!-- Silver -->
            <div class="sm:flex sm:col-span-2 items-center gap-1 sm:ml-5">
              <img src="/silver.png" class="w-4 h-4" />
              <span class="sm:flex hidden">Серебро</span>
            </div>

            <!-- Bronze -->
            <div class="sm:flex sm:col-span-2 items-center gap-1">
              <img src="/bronza.png" class="w-4 h-4" />
              <span class="sm:flex hidden">Бронза</span>
            </div>

            <!-- Dropdown -->
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

          <!-- Trainers List -->
          <TransitionGroup name="list" tag="div" class="divide-y divide-gray-700">
            <nuxt-link
              v-for="(trainer, index) in data1"
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
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { ChevronRight } from "lucide-vue-next";
import axios from "axios";
import { useRouter } from "vue-router";
import { ArrowDown } from "@element-plus/icons-vue";

const router = useRouter();

function handleSelect(command: any) {
  selectedView.value = command;
}

const data = ref<any>([]);
const data1 = ref<any>([]);
const activeCategory = ref<any>(null);
const sports = ref<any[]>([]);
const selectedView = ref("2");

const goToRatings = () => {
  router.push("/RatingsPage");
};

const getData = async (name: string = "Джиу Джитсу") => {
  try {
    const res = await axios.get(
      `https://api.7srating.uz/api/user/profile/sportsman/?sport=${name}`
    );
    data.value = res.data.data;
  } catch (e) {
    console.log(e);
  }
};

const getTrainer = async (name: string = "Джиу Джитсу") => {
  try {
    const res = await axios.get(
      `https://api.7srating.uz/api/user/profile/trainer/?sport=${name}`
    );
    data1.value = res.data.data;
  } catch (e) {
    console.log(e);
  }
};

const toggle = (id: number, name: string) => {
  activeCategory.value = id;
  getData(name);
  getTrainer(name);
};

const getSport = async () => {
  try {
    const res = await axios.get(`https://api.7srating.uz/api/sport/`);

    sports.value = res.data.data;

    const defaultSport = sports.value.find((sport) => sport.name === "Джиу Джитсу");
    if (defaultSport) {
      activeCategory.value = defaultSport.id;
      toggle(defaultSport.id, defaultSport.name);
    }
  } catch (e) {
    console.log(e);
  }
};

onMounted(() => {
  getData();
  getSport();
  getTrainer();
});

interface Player {
  id: number;
  name: string;
  country: string;
  flag: string;
  team: string;
  teamLogo: string;
  str: number;
  km: number;
  nap: string;
  total: number;
  categoryId: number;
}
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar-thumb {
  background-color: transparent !important;
  border: 4px solid transparent;
  border-radius: 8px;
  background-clip: padding-box;
}

.no-scrollbar::-webkit-scrollbar {
  width: 10px !important;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scroll-margin-block-start: 0;
}
</style>
