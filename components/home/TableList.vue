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
          @click="toggle(sport.id)"
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
                  <span class="badge text-white">{{ player.statistics.total_gold }}</span>
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

        <!-- Trainers Table -->
        <div class="bg-[#2A2B31] rounded-lg overflow-hidden">
          <!-- Table Header -->
          <div
            :class="data1.length ? 'py-0' : '!py-2.5'"
            class="px-4 grid grid-cols-[40px,160px,60px,60px,80px,80px,80px,60px,auto] items-center text-xs text-gray-400 bg-[#212226]"
          >
            <div>РТГ</div>
            <div>ТРЕНЕР</div>
            <div class="text-center">СТР</div>
            <div class="text-center">КМ</div>
            <div class="flex items-center justify-center gap-1">
              <img src="/gold.png" class="w-4 h-4" />
              <span class="hidden sm:inline">Золото</span>
            </div>
            <div class="flex items-center justify-center gap-1">
              <img src="/silver.png" class="w-4 h-4" />
              <span class="hidden sm:inline">Серебро</span>
            </div>
            <div class="flex items-center justify-center gap-1">
              <img src="/bronza.png" class="w-4 h-4" />
              <span class="hidden sm:inline">Бронза</span>
            </div>
            <div class="text-center">Балл</div>

            <!-- Dropdown -->
            <div class="ml-auto">
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

          <!-- Trainers Rows -->
          <TransitionGroup name="list" tag="div" class="divide-y divide-gray-700">
            <div v-if="data1.length">
              <nuxt-link
                v-for="(trainer, index) in data1"
                :key="trainer.id"
                :to="`/trainer/${trainer.id}`"
                class="px-4 py-3 grid grid-cols-[40px,160px,60px,60px,80px,80px,80px,60px,auto] items-center hover:bg-[#3A3B41] transition-colors"
              >
                <div class="text-gray-400">{{ index + 1 }}</div>
                <div class="text-white truncate text-sm">
                  {{ trainer.first_name }} {{ trainer.last_name }}
                </div>
                <div class="text-center">
                  <img src="/UZ.svg" class="w-5 h-3 rounded object-cover mx-auto" />
                </div>
                <div class="text-center">
                  <img :src="trainer.logo" class="w-6 h-6 rounded-full mx-auto" />
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
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

const getData = async (id: number) => {
  if (!id) return;
  try {
    const res = await axios.get(
      `https://api.7srating.uz/api/user/profile/sportsman/?sport=${id}`
    );
    data.value = res.data.data;
  } catch (e) {
    console.log(e);
  }
};

const getTrainer = async (id: number) => {
  if (!id) return;
  try {
    const res = await axios.get(
      `https://api.7srating.uz/api/user/profile/trainer/?sport=${id}`
    );
    data1.value = res.data.data;
  } catch (e) {
    console.log(e);
  }
};

const toggle = (id: number) => {
  activeCategory.value = id;
  getData(id);
  getTrainer(id);
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
