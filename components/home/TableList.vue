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
      <div class="flex overflow-x-auto no-scrollbar gap-2 py-2 scroll-smooth">
        <div
          v-for="sport in sports"
          :key="sport.id"
          @click="toggle(sport.id)"
          class="p-2 rounded-lg text-xs whitespace-nowrap transition-colors min-w-fit cursor-pointer flex justify-center flex-col items-center gap-2"
          :class="
            activeCategory === sport.id
              ? ' text-gray-400 bg-[#3A3B41] border-[#868688] border-2'
              : ' text-gray-400 hover:bg-[#3A3B41]'
          "
        >
          <img :src="sport?.logo" :alt="sport.name" class="w-10 h-10 object-contain" />
          {{ sport?.name }}
        </div>
      </div>

      <!-- Tables -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <!-- Players Table -->
        <div
          class="bg-[#2A2B31] rounded-lg overflow-hidden justify-between flex flex-col"
        >
          <!-- Table Header -->
          <div class="overflow-x-auto no-scrollbar">
            <div
              class="bg-[#212226] min-w-[700px] px-4 py-3 grid text-xs text-gray-400 grid-cols-[40px,120px,50px,50px,40px,40px,40px,50px] sm:grid-cols-[40px,150px,60px,60px,40px,40px,40px,60px] md:grid-cols-[40px,180px,60px,60px,40px,40px,40px,60px] lg:grid-cols-[40px,200px,50px,50px,50px,50px,50px,80px]"
            >
              <div class="flex items-center">РТГ</div>
              <div class="flex items-center">ИГРОК</div>
              <div class="flex items-center justify-center">СТР</div>
              <div class="flex items-center justify-center">КМ</div>
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
                  class="px-4 py-3 grid items-center hover:bg-[#3A3B41] grid-cols-[40px,120px,50px,50px,40px,40px,40px,50px] sm:grid-cols-[40px,150px,60px,60px,40px,40px,40px,60px] md:grid-cols-[40px,180px,60px,60px,40px,40px,40px,60px] lg:grid-cols-[40px,200px,50px,50px,50px,50px,50px,80px]"
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

          <!-- <div class="flex justify-center p-3">
            <el-pagination
              v-model:current-page="currentPagePlayers"
              :page-size="pageSize"
              layout="prev, pager, next"
              :total="data.length"
              background
            />
          </div> -->
        </div>

        <!-- Trainers Table -->
        <div
          class="bg-[#2A2B31] rounded-lg overflow-hidden justify-between flex flex-col"
        >
          <!-- SCROLL WRAPPER -->
          <div class="overflow-x-auto no-scrollbar">
            <!-- Table Header -->
            <div
              :class="paginatedTrainers.length ? 'py-0' : '!py-2.5'"
              class="px-4 text-xs h-11 text-gray-400 min-w-[700px] bg-[#212226] py-4 grid grid-cols-[40px,120px,50px,50px,40px,40px,40px,50px,auto] sm:grid-cols-[40px,150px,60px,60px,40px,40px,40px,60px,auto] md:grid-cols-[40px,160px,60px,60px,40px,40px,40px,60px,auto] lg:grid-cols-[40px,140px,50px,50px,50px,50px,50px,80px,auto]"
            >
              <div>РТГ</div>
              <div>ТРЕНЕР</div>
              <div class="text-center">СТР</div>
              <div class="text-center">КМ</div>
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
              <div class="ml-auto">
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
                      <el-dropdown-item command="2">Достижения учащихся</el-dropdown-item>
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
                  class="px-4 py-3 grid items-center hover:bg-[#3A3B41] transition-colors grid-cols-[40px,120px,50px,50px,40px,40px,40px,50px,auto] sm:grid-cols-[40px,150px,60px,60px,40px,40px,40px,60px,auto] md:grid-cols-[40px,160px,60px,60px,40px,40px,40px,60px,auto] lg:grid-cols-[40px,140px,50px,50px,50px,50px,50px,80px,auto]"
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

          <!-- <div class="flex justify-center p-3">
            <el-pagination
              v-model:current-page="currentPageTrainers"
              :page-size="pageSize"
              layout="prev, pager, next "
              :total="data1.length"
              background
            />
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { ChevronRight } from "lucide-vue-next";
import axios from "axios";
import { useRouter } from "vue-router";
import { ArrowDown } from "@element-plus/icons-vue";

const router = useRouter();
const data = ref<any>([]);
const data1 = ref<any>([]);
const activeCategory = ref<any>(null);
const sports = ref<any[]>([]);
const selectedView = ref("2");

const currentPagePlayers = ref(1);
const currentPageTrainers = ref(1);
const pageSize = ref(10);

const paginatedPlayers = computed(() => {
  const start = (currentPagePlayers.value - 1) * pageSize.value;
  return data.value?.data ? data.value.data.slice(start, start + pageSize.value) : [];
});

const paginatedTrainers = computed(() => {
  const start = (currentPageTrainers.value - 1) * pageSize.value;
  return data1.value?.data ? data1.value.data.slice(start, start + pageSize.value) : [];
});

function handleSelect(command: any) {
  selectedView.value = command;
}

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
<style>
.el-pagination.is-background .btn-next.is-active,
.el-pagination.is-background .btn-prev.is-active,
.el-pagination.is-background .el-pager li.is-active {
  background-color: red !important;
}
</style>
