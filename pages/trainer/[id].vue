<template>
  <NuxtLayout name="custom">
    <div class="min-h-screen bg-[#11101B]">
      <div class="container mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div class="flex flex-col lg:flex-row md:gap-48 gap-8">
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

          <div class="order-2 lg:order-1 flex flex-col w-full lg:w-[55%]">
            <h1
              class="text-2xl flex gap-2 sm:text-3xl lg:text-4xl font-bold mb-4 lg:mb-6 text-white text-center lg:text-left"
            >
              {{ data?.first_name }} {{ data?.last_name }} {{ data?.middle_name }}

              <img
                class="flex w-6 h-6 mb-4"
                :src="
                  data?.trainer_profile?.is_trainer_verified
                    ? '/verified.png'
                    : '/cancel.png'
                "
                alt="verify"
              />
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
                {{ data?.trainer_profile?.points }} {{ t("glasses") }}
              </span>
            </div>

            <div class="grid grid-cols-1 gap-y-4 text-sm">
              <div
                class="flex flex-col sm:flex-row sm:justify-between border-b border-gray-700 pb-2"
              >
                <p class="text-[#8B8992] mb-1 sm:mb-0">{{ t("birthPlace") }}</p>
                <p class="text-white">
                  {{ data?.region?.name || t("notSpecified") }}
                </p>
              </div>
              <div
                class="flex flex-col sm:flex-row sm:justify-between border-b border-gray-700 pb-2"
              >
                <p class="text-[#8B8992] mb-1 sm:mb-0">{{ t("citizenship") }}</p>
                <p class="text-white">
                  {{ data?.trainer_profile?.address?.citizenship || t("birthPlace") }}
                </p>
              </div>
              <div
                class="flex flex-col sm:flex-row sm:justify-between border-b border-gray-700 pb-2"
              >
                <p class="text-[#8B8992] mb-1 sm:mb-0">{{ t("birthday") }}</p>
                <p class="text-white">{{ data?.birth_date || t("birthPlace") }}</p>
              </div>
              <div
                class="flex flex-col sm:flex-row sm:justify-between border-b border-gray-700 pb-2"
              >
                <p class="text-[#8B8992] mb-1 sm:mb-0">{{ t("height") }}</p>
                <p class="text-white">
                  {{
                    data?.trainer_profile?.height
                      ? Number(data?.trainer_profile?.height).toFixed(0) + " см"
                      : t("birthPlace")
                  }}
                </p>
              </div>
              <div
                class="flex flex-col sm:flex-row sm:justify-between border-b border-gray-700 pb-2"
              >
                <p class="text-[#8B8992] mb-1 sm:mb-0">{{ t("weight") }}</p>
                <p class="text-white">
                  {{
                    data?.trainer_profile?.weight
                      ? Number(data?.trainer_profile?.weight).toFixed(0) + " кг"
                      : t("birthPlace")
                  }}
                </p>
              </div>
              <div class="flex flex-col sm:flex-row sm:justify-between">
                <p class="text-[#8B8992] mb-1 sm:mb-0">{{ t("federation") }}</p>
                <p class="text-white">
                  {{ data?.trainer_profile?.federation?.name || t("birthPlace") }}
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
          <!-- Desktop table view -->
          <div class="overflow-x-auto rounded-lg shadow hidden md:block">
            <table class="w-full text-sm text-left text-white bg-[#11101B]">
              <thead class="bg-gray-800 text-xs sm:text-sm font-semibold">
                <tr>
                  <th class="px-4 py-3">{{ t("championship") }}</th>
                  <th class="px-4 py-3">{{ t("season") }}</th>
                  <th class="px-4 py-3 text-center">{{ t("country") }}</th>

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

                  <th class="px-4 py-3 text-center">{{ t("points") }}</th>

                  <!-- Dropdown (desktop) -->
                  <th class="px-4 py-3 text-right">
                    <el-dropdown @command="handleSelect">
                      <el-button
                        type="text"
                        size="small"
                        class="!text-sm !text-white flex items-center"
                      >
                        {{ selectedView === "1" ? t("personal") : t("students") }}
                        <el-icon class="el-icon--right"><arrow-down /></el-icon>
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
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr
                  v-for="(row, index) in data?.results"
                  :key="index"
                  class="border-t border-gray-700 hover:bg-gray-900 transition"
                >
                  <td class="px-4 py-3 flex items-center gap-3">
                    <img
                      class="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-md"
                      :src="getTournamentLogo(row.tournament_name)"
                      alt="Tournament Logo"
                    />
                    <span class="truncate">{{ row.tournament_name }}</span>
                  </td>

                  <td class="px-4 py-3">{{ row.year }}</td>

                  <td class="px-4 py-3 text-center">
                    {{ row.country }}
                  </td>

                  <template v-if="selectedView === '2' && !row.rating">
                    <td class="px-1 py-3 text-center">{{ row.gold }}</td>
                    <td class="px-1 py-3 text-center">{{ row.silver }}</td>
                    <td class="px-1 py-3 text-center">{{ row.bronze }}</td>
                  </template>

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

                  <td class="px-4 py-3 text-center">{{ row.score }}</td>

                  <td></td>
                </tr>
              </tbody>
            </table>

            <el-empty
              v-if="!data?.results?.length"
              :image-size="100"
              description="Нет данных"
            />
          </div>

          <!-- Mobile card view -->
          <div class="md:hidden space-y-4">
            <!-- Dropdown for mobile -->
            <div class="flex justify-end mb-3">
              <el-dropdown @command="handleSelect">
                <el-button
                  type="text"
                  size="small"
                  class="!text-sm !text-white flex items-center bg-[#11101B] px-3 py-2 rounded-md"
                >
                  {{ selectedView === "1" ? t("personal") : t("students") }}
                  <el-icon class="el-icon--right"><arrow-down /></el-icon>
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

            <div
              v-for="(row, index) in data?.results"
              :key="index"
              class="bg-[#11101B] text-white rounded-xl p-4 shadow border border-gray-700"
            >
              <div class="flex items-center gap-3 mb-3">
                <img
                  class="w-12 h-12 object-contain rounded-md"
                  :src="getTournamentLogo(row.tournament_name)"
                  alt="Tournament Logo"
                />
                <h3 class="font-semibold text-base">{{ row.tournament_name }}</h3>
              </div>

              <p class="text-sm">
                <span class="font-semibold">{{ t("season") }}:</span> {{ row.year }}
              </p>
              <p class="text-sm">
                <span class="font-semibold">{{ t("country") }}:</span> {{ row.country }}
              </p>

              <template v-if="selectedView === '2' && !row.rating">
                <div class="flex justify-between mt-2">
                  <div class="flex items-center gap-1">
                    <img src="/gold.png" class="w-5" alt="Gold" /> {{ row.gold }}
                  </div>
                  <div class="flex items-center gap-1">
                    <img src="/silver.png" class="w-5" alt="Silver" /> {{ row.silver }}
                  </div>
                  <div class="flex items-center gap-1">
                    <img src="/bronza.png" class="w-5" alt="Bronze" /> {{ row.bronze }}
                  </div>
                </div>
              </template>

              <template v-else-if="selectedView === '1' && row.rating">
                <div class="mt-2">
                  <span class="font-semibold">{{ t("rating") }}:</span>
                  <img
                    v-if="row.rating === 1"
                    src="/gold.png"
                    class="w-5 inline ml-1"
                    alt="Gold"
                  />
                  <img
                    v-if="row.rating === 2"
                    src="/silver.png"
                    class="w-5 inline ml-1"
                    alt="Silver"
                  />
                  <img
                    v-if="row.rating === 3 || row.rating === 4"
                    src="/bronza.png"
                    class="w-5 inline ml-1"
                    alt="Bronze"
                  />
                  {{ row.rating }}
                </div>
              </template>

              <p class="text-sm mt-2">
                <span class="font-semibold">{{ t("points") }}:</span> {{ row.score }}
              </p>
            </div>

            <el-empty
              v-if="!data?.results?.length"
              :image-size="80"
              :description="t('noValue')"
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
          <el-empty v-else :image-size="100" :description="t('noVideos')" />
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
              <el-empty v-else :image-size="100" :description="t('noImages')" />
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
                  <h3 class="text-sm text-gray-900 font-medium my-2">
                    {{ t("noFiles") }}
                  </h3>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>

      <div class="container flex flex-col gap-8 pb-8">
        <div class="mt-5">
          <h2 class="text-2xl font-medium text-white text-center sm:text-left">
            {{ t("achievements") }}
          </h2>
        </div>

        <template v-if="filteredResults?.length">
          <div class="bg-[#11101B] w-full overflow-hidden">
            <dl class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px">
              <div
                v-for="(stat, index) in filteredResults"
                :key="index"
                class="px-4 py-5 sm:p-6 bg-[#11101B] border border-gray-800 hover:bg-gray-900 transition rounded-none rounded-lg"
              >
                <dt class="text-lg sm:text-xl font-semibold text-white truncate">
                  {{ stat.tournament_name }}
                </dt>
                <dd class="mt-1 text-sm sm:text-base font-medium text-[#8B8992]">
                  {{ stat.year }}
                </dd>
              </div>
            </dl>
          </div>
        </template>

        <el-empty
          v-else
          :image-size="100"
          :description="t('achievementsNotFound')"
          class="text-white"
        />
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
import { useI18n } from "vue-i18n";

const { t } = useI18n();
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

const tabs = computed(() => [
  // { id: 'overview', name: 'Заявка игрока' },
  // { id: 'statistics', name: t('statistics') },
  { id: "career", name: t("career") },
  { id: "videos", name: t("videos") },
  { id: "photos", name: t("photos") },
  { id: "files", name: t("files") },
]);
</script>
