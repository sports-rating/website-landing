<template>
  <NuxtLayout name="custom">
    <div class="min-h-screen bg-[#11101B]">
      <!-- Player Info Section -->
      <div class="container mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div class="flex flex-col lg:flex-row md:gap-48 gap-8">
          <!-- Profile Image (mobilda birinchi chiqishi uchun order-1 qo‘ydim) -->
          <div class="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div class="relative">
              <img
                :src="
            data?.media?.find((item:any) => item.is_profile_photo)?.file ||
            '/default-avatar.png'
          "
                alt="Player Profile"
                class="w-32 h-32 sm:w-44 sm:h-44 md:w-56 md:h-56 lg:w-[50vh] lg:h-[50vh] object-cover rounded-full border-4 border-gray-600 shadow-lg"
              />
            </div>
          </div>

          <!-- Profile Info (mobilda ikkinchi chiqadi) -->
          <div class="order-2 lg:order-1 flex flex-col w-full lg:w-[55%]">
            <h1
              class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 lg:mb-6 text-white text-center lg:text-left"
            >
              {{ data?.first_name }} {{ data?.last_name }} {{ data?.middle_name }}
            </h1>

            <div class="flex flex-wrap justify-center lg:justify-start gap-2 mb-6">
              <span
                class="bg-[#A0E727] text-black px-3 py-1 rounded-md text-xs sm:text-sm"
              >
                {{ data?.trainer_profile?.sport?.name }}
              </span>

              <span
                class="bg-[#E7273D]/50 text-white text-sm px-3 py-1 rounded-full flex items-center"
              >
                {{ data?.trainer_profile?.points }} очки
              </span>
            </div>

            <div class="grid grid-cols-1 gap-y-4 text-sm">
              <div
                class="flex flex-col sm:flex-row sm:justify-between border-b border-gray-700 pb-2"
              >
                <p class="text-[#8B8992] mb-1 sm:mb-0">Место рождения</p>
                <p class="text-white">
                  {{ data?.region?.name || "Не указано" }}
                </p>
              </div>
              <div
                class="flex flex-col sm:flex-row sm:justify-between border-b border-gray-700 pb-2"
              >
                <p class="text-[#8B8992] mb-1 sm:mb-0">Гражданство</p>
                <p class="text-white">
                  {{ data?.trainer_profile?.address?.citizenship || "Не указано" }}
                </p>
              </div>
              <div
                class="flex flex-col sm:flex-row sm:justify-between border-b border-gray-700 pb-2"
              >
                <p class="text-[#8B8992] mb-1 sm:mb-0">День рождения</p>
                <p class="text-white">{{ data?.birth_date || "Не указано" }}</p>
              </div>
              <div
                class="flex flex-col sm:flex-row sm:justify-between border-b border-gray-700 pb-2"
              >
                <p class="text-[#8B8992] mb-1 sm:mb-0">Рост</p>
                <p class="text-white">
                  {{
                    data?.trainer_profile?.height
                      ? Number(data?.trainer_profile?.height).toFixed(0) + " см"
                      : "Не указано"
                  }}
                </p>
              </div>
              <div
                class="flex flex-col sm:flex-row sm:justify-between border-b border-gray-700 pb-2"
              >
                <p class="text-[#8B8992] mb-1 sm:mb-0">Вес</p>
                <p class="text-white">
                  {{
                    data?.trainer_profile?.weight
                      ? Number(data?.trainer_profile?.weight).toFixed(0) + " кг"
                      : "Не указано"
                  }}
                </p>
              </div>
              <div class="flex flex-col sm:flex-row sm:justify-between">
                <p class="text-[#8B8992] mb-1 sm:mb-0">Федерация</p>
                <p class="text-white">
                  {{ data?.trainer_profile?.federation?.name || "Не указано" }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab Navigation -->
      <div class="lg:mb-6 container px-4 z-10 sm:px-6">
        <div class="flex flex-wrap p-2 gap-2 overflow-x-auto pb-2 no-scrollbar">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200',
              activeTab === tab.id
                ? 'text-white border-b-2 border-red-500 bg-red-500 rounded-md shadow-lg'
                : 'text-white bg-gray-600 hover:bg-gray-500 rounded-md',
            ]"
          >
            {{ tab.name }}
          </button>
        </div>
      </div>

      <!-- Content -->
      <div class="container">
        <div v-if="activeTab === 'overview'" class="flex gap-8 py-8">
          <div class="flex flex-col gap-4 w-[50%]">
            <p class="text-sm text-white">{{ data?.bio }}</p>
          </div>

          <!-- Action Image -->
          <div class="mt-6">
            <img
              src="/public/messi.svg"
              alt="Game Action"
              class="w-[530px] rounded-lg object-cover"
            />
          </div>
        </div>

        <div v-if="activeTab === 'statistics'" class="flex flex-col gap-8">
          <Statistic />
        </div>

        <div v-if="activeTab === 'career'" class="w-full mx-auto mt-5">
          <div class="overflow-x-scroll rounded-lg shadow">
            <table class="w-full text-sm text-left text-white bg-[#11101B]">
              <!-- Header -->
              <thead class="bg-gray-800 text-xs sm:text-sm font-semibold">
                <tr>
                  <th class="px-4 py-3">ЧЕМПИОНАТ</th>
                  <th class="px-4 py-3">СЕЗОН</th>
                  <th class="px-4 py-3 text-center">Место</th>

                  <!-- Agar “учащихся” bo‘lsa medallar chiqadi -->
                  <th
                    v-if="selectedView === '2'"
                    colspan="3"
                    class="px-4 py-3 text-center"
                  >
                    <div class="flex justify-around gap-12">
                      <img src="/gold.png" class="w-5 sm:w-6" alt="Gold" />
                      <img src="/silver.png" class="w-5 sm:w-6" alt="Silver" />
                      <img src="/bronza.png" class="w-5 sm:w-6" alt="Bronze" />
                    </div>
                  </th>

                  <th class="px-4 py-3 text-center">Балл</th>

                  <!-- Dropdown -->
                  <th class="px-4 py-3 text-right">
                    <el-dropdown @command="handleSelect">
                      <el-button
                        type="text"
                        size="small"
                        class="!text-sm !text-white flex items-center"
                      >
                        {{ selectedView === "1" ? "Личное " : "Учащихся " }}
                        <el-icon class="el-icon--right"><arrow-down /></el-icon>
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
                  </th>
                </tr>
              </thead>

              <!-- Body -->
              <tbody>
                <tr
                  v-for="(row, index) in data?.results"
                  :key="index"
                  class="border-t border-gray-700 hover:bg-gray-900 transition"
                >
                  <!-- Tournament -->
                  <td class="px-4 py-3 flex items-center gap-3">
                    <img
                      class="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-md"
                      :src="getTournamentLogo(row.tournament_name)"
                      alt="Tournament Logo"
                    />
                    <span class="truncate">{{ row.tournament_name }}</span>
                  </td>

                  <!-- Season -->
                  <td class="px-4 py-3">{{ row.year }}</td>

                  <!-- Country / Place -->
                  <td class="px-4 py-3 text-center">
                    {{ row.country }}
                  </td>

                  <!-- Medal Counts -->
                  <template v-if="selectedView === '2' && !row.rating">
                    <td class="px-1 py-3 text-center">{{ row.gold }}</td>
                    <td class="px-1 py-3 text-center">{{ row.silver }}</td>
                    <td class="px-1 py-3 text-center">{{ row.bronze }}</td>
                  </template>

                  <!-- Rating -->
                  <td
                    v-if="selectedView === '1' && row.rating"
                    class="px-4 py-3 text-center"
                  >
                    <img
                      v-if="row.rating === 1"
                      src="/gold.png"
                      class="w-5 sm:w-6 inline"
                      alt="Gold"
                    />
                    <img
                      v-if="row.rating === 2"
                      src="/silver.png"
                      class="w-5 sm:w-6 inline"
                      alt="Silver"
                    />
                    <img
                      v-if="row.rating === 3 || row.rating === 4"
                      src="/bronza.png"
                      class="w-5 sm:w-6 inline"
                      alt="Bronze"
                    />
                    {{ row.rating }}
                  </td>

                  <!-- Score -->
                  <td class="px-4 py-3 text-center">{{ row.score }}</td>

                  <!-- Empty last cell for dropdown column -->
                  <td></td>
                </tr>
              </tbody>
            </table>

            <!-- Agar hech narsa bo‘lmasa -->
            <el-empty
              v-if="!data?.results?.length"
              :image-size="100"
              description="Нет данных"
            />
          </div>
        </div>

        <!-- Videos Tab -->
        <div v-if="activeTab === 'videos'" class="container flex flex-col p-0">
          <template v-if="data?.media?.some((item:any) => item.media_type === 'video')">
            <div
              class="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-0"
            >
              <div
                v-for="(video, index) in data?.media?.filter((item: any) => item.media_type === 'video')"
                :key="video.id"
                class="relative group overflow-hidden rounded-lg"
              >
                <video
                  :src="video.file"
                  controls
                  class="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-105"
                ></video>
              </div>
            </div>
          </template>
          <el-empty v-else :image-size="100" description="Нет видео" />
        </div>

        <!-- Photos Tab -->
        <div v-if="activeTab === 'photos'" class="container flex flex-col gap-8 p-0">
          <div class="w-full mx-auto">
            <div
              class="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-0"
            >
              <template
                v-if="data?.media?.some((item:any) => item.media_type === 'image' && item.is_profile_photo === false)"
              >
                <div
                  v-for="(image, index) in data?.media?.filter((item:any) => item.media_type === 'image' && item.is_profile_photo === false)"
                  :key="index"
                  class="relative group overflow-hidden rounded-lg"
                >
                  <img
                    :src="image.file"
                    :alt="image.media_type"
                    class="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </template>

              <!-- Agar rasm topilmasa -->
              <el-empty v-else :image-size="100" description="Нет изображения" />
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'files'" class="container flex flex-col gap-8 p-0">
          <div class="w-full">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-0">
              <!-- Agar PDF bo'lsa -->
              <template
                v-if="data?.media?.some((item: any) => item.media_type === 'pdf')"
              >
                <div
                  v-for="(doc, index) in data?.media?.filter((item: any) => item.media_type === 'pdf')"
                  :key="index"
                  class="bg-white rounded-lg border hover:shadow-md transition-shadow duration-200 p-4"
                >
                  <a :href="doc.file" download target="_blank">
                    <img src="/pdf.svg" alt="PDF" />
                    <h3 class="text-sm text-gray-900 font-medium my-2">
                      {{ doc.file.split("/").pop() }}
                    </h3>
                  </a>
                </div>
              </template>

              <!-- Agar PDF topilmasa -->
              <template v-else>
                <div
                  class="bg-white rounded-lg border hover:shadow-md transition-shadow duration-200 p-4"
                >
                  <img src="/pdf.svg" alt="PDF Not Found" />
                  <h3 class="text-sm text-gray-900 font-medium my-2">PDF Not Found</h3>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>

      <div class="container flex flex-col gap-8 pb-8">
        <div class="mt-5">
          <h2 class="text-2xl font-medium text-white">Достижения</h2>
        </div>

        <template v-if="filteredResults?.length">
          <div class="bg-[#11101B] overflow-hidden w-full">
            <div>
              <dl class="grid grid-cols-3">
                <div
                  v-for="(stat, index) in filteredResults"
                  :key="index"
                  class="px-4 py-5 border overflow-hidden sm:p-6"
                >
                  <dt class="text-2xl font-medium text-white truncate">
                    {{ stat.tournament_name }}
                  </dt>
                  <dd class="mt-1 text-sm font-semibold text-[#8B8992]">
                    {{ stat.year }}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </template>

        <el-empty v-else :image-size="100" description="Достижения не найдены" />
      </div>

      <!-- <Associated/> -->
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ChevronLeftIcon } from "lucide-vue-next";
import { useRoute, useRouter } from "vue-router";
const { $api } = useNuxtApp();
import Associated from "~/components/home/Associated.vue";
import Statistic from "~/components/home/Statistic.vue";
import { ArrowDown } from "@element-plus/icons-vue";

const route = useRoute();
const router = useRouter();
const activeTab = ref("career");
const playerImage = "/boy.svg";

const selectedView = ref("2");
function handleSelect(command: any) {
  selectedView.value = command;
}

const data = ref<any>([]);
const dataTournament = ref<any>([]);

const getData = async () => {
  try {
    const res = await $api.get(`/user/profile/trainer/${route.params.id}/`);
    data.value = res.data.data;
  } catch (e) {
    console.log(e);
  }
};

const filteredResults = computed(() => {
  if (selectedView.value === "1") {
    return data?.value?.results?.filter((stat: any) => stat.rating === 1);
  } else {
    return data?.value?.results?.filter((stat: any) => stat.gold === 1);
  }
});

const getTournament = async () => {
  try {
    const res = await $api.get(`/sport/tournament/`);
    dataTournament.value = res.data.data;
  } catch (e) {
    console.log(e);
  }
};

// Row uchun turnir logotipini olish
const getTournamentLogo = (tournamentName: any) => {
  const tournament = dataTournament.value.find((t: any) => t.name === tournamentName);
  return tournament ? tournament?.logo : "";
};

onMounted(() => {
  getData();
  getTournament();
});

const tabs = [
  // { id: 'overview', name: 'Заявка игрока' },
  // { id: 'statistics', name: 'Статистика' },
  { id: "career", name: "Карьера" },
  { id: "videos", name: "Видео материалы" },
  { id: "photos", name: "Фотографии" },
  { id: "files", name: "Загруженные файлы" },
];
</script>
