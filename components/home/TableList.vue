<template>
  <div class="pt-10 bg-[#11101B]">
    <div class="container mx-auto px-4 pb-8">
      <!-- Header -->
      <div class="flex flex-wrap justify-between items-center mb-6">
        <h2 class="text-xl sm:text-2xl font-bold text-white">
          {{ t("games") }}
        </h2>
        <button
          @click="goToRatings"
          class="text-gray-400 hover:text-white flex items-center gap-1 whitespace-nowrap mt-2 sm:mt-0"
        >
          {{ t("all") }}
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
            sportStore.activeCategory === sport.id
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
              class="bg-[#212226] min-w-[600px] px-4 py-3 grid text-xs text-gray-400 grid-cols-[50px,220px,80px,80px,80px,80px]"
            >
              <div class="flex items-center">{{ t("rtg") }}</div>
              <div class="flex items-center">{{ t("game") }}</div>
              <div class="flex items-center justify-center">
                <img src="/gold.png" class="w-5 mr-1" />
              </div>
              <div class="flex items-center justify-center">
                <img src="/silver.png" class="w-5 mr-1" />
              </div>
              <div class="flex items-center justify-center">
                <img src="/bronza.png" class="w-5 mr-1" />
              </div>
              <div class="flex items-center justify-center">{{ t("point") }}</div>
            </div>
            <!-- Players Rows -->
            <TransitionGroup name="list" tag="div" class="divide-y divide-gray-700">
              <div v-if="paginatedPlayers.length">
                <nuxt-link
                  v-for="(player, index) in paginatedPlayers"
                  :key="player.id"
                  :to="`/users/${player.id}`"
                  class="px-4 py-3 grid items-center hover:bg-[#3A3B41] grid-cols-[50px,220px,80px,80px,80px,80px]"
                >
                  <div
                    class="w-6 h-6 flex items-center justify-center rounded-full font-bold"
                    :class="{
                      'bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-black':
                        index === 0,
                      'bg-gradient-to-r from-gray-400 via-gray-300 to-gray-500 text-black':
                        index === 1,
                      'bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600 text-black':
                        index === 2,
                      'bg-[#3A3B41] text-gray-300': index > 2,
                    }"
                  >
                    {{ index + 1 }}
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
              <el-empty v-else :image-size="50" :description="t('noValue')" />
            </TransitionGroup>
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
              class="px-4 text-xs h-11 text-gray-400 min-w-[600px] bg-[#212226] py-4 grid grid-cols-[40px,220px,60px,60px,60px,60px,80px]"
            >
              <div>{{ t("rtg") }}</div>
              <div>{{ t("gameTrainer") }}</div>
              <div class="flex justify-center gap-1">
                <img src="/gold.png" class="w-4 h-4" />
              </div>
              <div class="flex justify-center gap-1">
                <img src="/silver.png" class="w-4 h-4" />
              </div>
              <div class="flex justify-center gap-1">
                <img src="/bronza.png" class="w-4 h-4" />
              </div>
              <div class="text-center">{{ t("point") }}</div>

              <!-- Dropdown -->
              <div class="ml-auto mt-[2px]">
                <el-dropdown @command="handleSelect">
                  <el-button
                    type="text"
                    size="small"
                    class="!text-gray-400 text-xs !pb-[2.3rem]"
                  >
                    {{ selectedView === "1" ? t("personal") : t("students") }}
                    <el-icon><arrow-down /></el-icon>
                  </el-button>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item command="1">{{
                        t("achievementPersonal")
                      }}</el-dropdown-item>
                      <el-dropdown-item command="2">{{
                        t("achievementStudents")
                      }}</el-dropdown-item>
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
                  class="px-4 py-3 grid items-center hover:bg-[#3A3B41] transition-colors grid-cols-[40px,220px,60px,60px,60px,60px,auto]"
                >
                  <div
                    class="w-6 h-6 flex items-center justify-center rounded-full font-bold"
                    :class="{
                      'bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-black':
                        index === 0,
                      'bg-gradient-to-r from-gray-400 via-gray-300 to-gray-500 text-black':
                        index === 1,
                      'bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600 text-black':
                        index === 2,
                      'bg-[#3A3B41] text-gray-300': index > 2,
                    }"
                  >
                    {{ index + 1 }}
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

              <el-empty v-else :image-size="50" :description="t('noValue')" />
            </TransitionGroup>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { ChevronRight } from "lucide-vue-next";
import { useRouter } from "vue-router";
import { ArrowDown } from "@element-plus/icons-vue";
import { useSportStore } from "@/stores/sport";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const { $api } = useNuxtApp();
const sportStore = useSportStore();
const router = useRouter();

const data = ref<any>([]);
const data1 = ref<any>([]);
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

const getData = async (id?: number) => {
  try {
    const url = id ? `/user/profile/sportsman/?sport=${id}` : `/user/profile/sportsman/`;

    const res = await $api.get(url);
    data.value = res.data.data;
  } catch (e) {
    console.log(e);
  }
};

const getTrainer = async (id?: number) => {
  try {
    const url = id ? `/user/profile/trainer/?sport=${id}` : `/user/profile/trainer/`;

    const res = await $api.get(url);
    data1.value = res.data.data;
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

    // if (!sportStore.activeCategory && sports.value.length > 0) {
    //   sportStore.activeCategory = sports.value[0].id;
    // }
  } catch (e) {
    console.log(e);
  }
};

onMounted(async () => {
  await getSport();
  getData();
  getTrainer();

  if (sportStore.activeCategory) {
    toggle(sportStore.activeCategory);
  }
});
</script>

<style>
.el-pagination.is-background .btn-next.is-active,
.el-pagination.is-background .btn-prev.is-active,
.el-pagination.is-background .el-pager li.is-active {
  background-color: red !important;
}
</style>
