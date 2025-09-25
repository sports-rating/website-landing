<template>
  <NuxtLayout name="custom">
    <div class="bg-[#11101B] min-h-screen text-white">
      <div class="container mx-auto px-6 py-8">
        <div class="pt-10 bg-[#11101B]">
          <div class="container mx-auto px-4 pb-8">
            <!-- Header with Title and View All -->
            <div class="flex mb-6">
              <h2 class="text-2xl font-bold text-white">РЕЙТИНГИ ИГРОКОВ И ТРЕНЕРОВ</h2>
            </div>

            <!-- Sports Categories -->
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

            <!-- Tables -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <!-- Players Table -->
              <div
                class="bg-[#2A2B31] rounded-lg overflow-hidden justify-between flex flex-col"
              >
                <!-- Table Header -->
                <div class="overflow-x-auto no-scrollbar">
                  <div
                    class="bg-[#212226] md:min-w-[580px] min-w-[610px] px-4 py-3 grid text-xs text-gray-400 grid-cols-[40px,220px,70px,70px,70px,70px]"
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
                        class="px-4 py-3 grid items-center hover:bg-[#3A3B41] grid-cols-[40px,220px,70px,70px,70px,70px]"
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

              <!-- Trainers Table -->
              <div
                class="bg-[#2A2B31] rounded-lg overflow-hidden justify-between flex flex-col"
              >
                <!-- SCROLL WRAPPER -->
                <div class="overflow-x-auto no-scrollbar">
                  <!-- Table Header -->
                  <div
                    :class="paginatedTrainers.length ? 'py-0' : '!py-2.5'"
                    class="px-4 text-xs md:min-w-[580px] min-w-[610px] h-11 text-gray-400 bg-[#212226] py-4 grid grid-cols-[40px,200px,60px,60px,60px,60px,60px]"
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
                            <el-dropdown-item command="1"
                              >Личное достижение</el-dropdown-item
                            >
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
                        class="px-4 py-3 grid items-center hover:bg-[#3A3B41] transition-colors grid-cols-[40px,200px,60px,60px,60px,60px,auto]"
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
                          <img
                            :src="trainer.profile_photo"
                            class="w-6 h-6 rounded-full"
                          />
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
                    :total="count1"
                    background
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

import { ArrowDown } from "@element-plus/icons-vue";
import { useSportStore } from "@/stores/sport";

const { $api } = useNuxtApp();
const sportStore = useSportStore();

// Players
const data = ref<any[]>([]);
const count = ref(0);

// Trainers
const data1 = ref<any[]>([]);
const count1 = ref(0);

// Sports
const sports = ref<any[]>([]);
const selectedView = ref("2");

// Pagination states
const currentPagePlayers = ref(1);
const currentPageTrainers = ref(1);
const pageSize = ref(10);

// Players list
const paginatedPlayers = computed(() => {
  return data?.value ?? [];
});

// Trainers list
const paginatedTrainers = computed(() => {
  return data1?.value ?? [];
});

function handleSelect(command: any) {
  selectedView.value = command;
}

const getData = async (id: number) => {
  if (!id) return;
  try {
    const res = await $api.get(
      `/user/profile/sportsman/?sport=${id}&page=${currentPagePlayers.value}&page_size=${pageSize.value}`
    );
    count.value = res.data.data.count;
    data.value = res.data.data.data;
  } catch (e) {
    console.log(e);
  }
};

const getTrainer = async (id: number) => {
  if (!id) return;
  try {
    const res = await $api.get(
      `/user/profile/trainer/?sport=${id}&page=${currentPageTrainers.value}&page_size=${pageSize.value}`
    );
    count1.value = res.data.data.count;
    data1.value = res.data.data.data;
  } catch (e) {
    console.log(e);
  }
};

const toggle = (id: number) => {
  sportStore.activeCategory = id as any;
  getData(id);
  getTrainer(id);
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

onMounted(async () => {
  await getSport();

  if (sportStore.activeCategory) {
    toggle(sportStore.activeCategory);
  }
});

watch(currentPagePlayers, () => {
  getData(sportStore.activeCategory as any);
});
watch(currentPageTrainers, () => {
  getTrainer(sportStore.activeCategory as any);
});
</script>

<style>
.el-pagination.is-background .btn-next.is-active,
.el-pagination.is-background .btn-prev.is-active,
.el-pagination.is-background .el-pager li.is-active {
  background-color: red !important;
}
</style>
