<template>
  <NuxtLayout name="custom">
    <div class="min-h-screen bg-[#11101B]">
      <!-- Header Section -->
      <div class="container mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div class="flex flex-col lg:flex-row md:gap-48 gap-8">
          <!-- Profile Image (MOBILE birinchi, DESKTOP o‘ngda) -->
          <div class="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div class="relative">
              <img
                :src="
            data?.media?.find((item:any) => item.is_profile_photo)?.file ||
            '/default-avatar.png'
          "
                alt="Player Profile"
                class="w-32 h-32 sm:w-52 sm:h-52 lg:w-[52vh] lg:h-[52vh] object-cover rounded-full border-4 border-gray-600 shadow-lg"
              />
            </div>
          </div>

          <!-- Profile Info -->
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
                {{ data?.sportsman_profile?.sport?.name }}
              </span>
              <span
                class="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-xs sm:text-sm"
              >
                {{ data?.sportsman_profile?.sport_rank }}
              </span>
              <span
                class="bg-[#E7273D]/50 text-white text-sm px-3 py-1 rounded-full flex items-center"
              >
                {{ data?.sportsman_profile?.points }} oчки
              </span>
            </div>

            <!-- Info grid (o‘zgarmaydi) -->
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
                  {{ data?.sportsman_profile?.address?.citizenship || "Не указано" }}
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
                    data?.sportsman_profile?.height
                      ? Number(data?.sportsman_profile?.height).toFixed(0) + " см"
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
                    data?.sportsman_profile?.weight
                      ? Number(data?.sportsman_profile?.weight).toFixed(0) + " кг"
                      : "Не указано"
                  }}
                </p>
              </div>
              <div class="flex flex-col sm:flex-row sm:justify-between">
                <p class="text-[#8B8992] mb-1 sm:mb-0">Воспитанник</p>
                <p class="text-white">
                  {{ data?.sportsman_profile?.trainer?.full_name || "Не указано" }}
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

      <!-- Tab Content -->
      <div class="container px-4 sm:px-6">
        <!-- Statistics Tab -->
        <div v-if="activeTab === 'statistics'" class="flex flex-col gap-6 lg:gap-8">
          <Statistic />
        </div>

        <!-- Career Tab -->
        <div v-if="activeTab === 'career'" class="flex flex-col gap-6 lg:gap-8">
          <div class="w-full mx-auto">
            <template v-if="data?.results?.length">
              <!-- Mobile Career View -->
              <div class="lg:hidden">
                <div class="space-y-4">
                  <div
                    v-for="(row, index) in data?.results"
                    :key="index"
                    class="bg-gray-800 rounded-lg p-4 text-white"
                  >
                    <div class="flex items-center gap-3 mb-3">
                      <img
                        class="w-10 h-10 rounded-full"
                        :src="getTournamentLogo(row.tournament_name)"
                        alt=""
                        @error="$event.target.style.display = 'none'"
                      />
                      <div class="flex-1">
                        <h3 class="font-semibold text-sm">{{ row.tournament_name }}</h3>
                        <p class="text-xs text-gray-400">
                          {{ row.year }} • {{ row.country }}
                        </p>
                      </div>
                    </div>
                    <div class="flex justify-between items-center text-xs">
                      <span class="text-gray-400">
                        Тренер:
                        {{ data?.sportsman_profile?.trainer?.name || "Не указано" }}
                      </span>

                      <span class="text-gray-400">
                        Балл:
                        {{ row.score || "Не указано" }}
                      </span>
                      <div class="flex items-center gap-2">
                        <img
                          v-if="row.rating === 1"
                          src="/gold.png"
                          class="md:w-4 md:h-4 w-8 h-8"
                        />
                        <img
                          v-if="row.rating === 2"
                          src="/silver.png"
                          class="md:w-4 md:h-4 w-8 h-8"
                        />
                        <img
                          v-if="row.rating === 3"
                          src="/bronza.png"
                          class="md:w-4 md:h-4 w-8 h-8"
                        />
                        <img
                          v-if="row.rating === 4"
                          src="/bronza.png"
                          class="md:w-4 md:h-4 w-8 h-8"
                        />
                        <span class="m-0 font-semibold md:text-sm text-xl">{{
                          row.rating
                        }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Desktop Career View -->
              <div class="hidden lg:block">
                <div
                  class="bg-gray-800 text-white grid grid-cols-12 text-sm font-medium rounded-t-lg"
                >
                  <div class="p-3 col-span-4">ЧЕМПИОНАТ</div>
                  <div class="p-3 col-span-1">СЕЗОН</div>
                  <div class="p-3 col-span-1">СТРАНА</div>
                  <div class="p-3 col-span-2">ТРЕНЕР</div>
                  <div class="p-3 col-span-2">Балл</div>
                  <div class="p-3 col-span-2">Рейтинг</div>
                </div>

                <div class="bg-[#11101B] divide-y divide-gray-700 rounded-b-lg">
                  <div
                    v-for="(row, index) in data?.results"
                    :key="index"
                    class="grid grid-cols-12 text-white cursor-pointer hover:bg-gray-800 transition-colors"
                  >
                    <div class="p-3 col-span-4 flex gap-4 items-center">
                      <img
                        class="w-12 h-12 rounded-full"
                        :src="getTournamentLogo(row.tournament_name)"
                        alt=""
                        @error="$event.target.style.display = 'none'"
                      />
                      <span class="truncate">{{ row.tournament_name }}</span>
                    </div>
                    <div class="p-3 col-span-1">{{ row.year }}</div>
                    <div class="p-3 col-span-1">{{ row.country }}</div>
                    <div class="p-3 col-span-2 truncate">
                      {{ data?.sportsman_profile?.trainer?.name || "Не указано" }}
                    </div>
                    <div class="p-3 col-span-2 flex items-center gap-2">
                      <span class="font-semibold">{{ row.score }}</span>
                    </div>
                    <div class="p-3 col-span-2 flex items-center gap-2">
                      <img v-if="row.rating === 1" src="/gold.png" class="w-6 h-6" />
                      <img v-if="row.rating === 2" src="/silver.png" class="w-6 h-6" />
                      <img v-if="row.rating === 3" src="/bronza.png" class="w-6 h-6" />
                      <img v-if="row.rating === 4" src="/bronza.png" class="w-6 h-6" />
                      <span class="font-semibold">{{ row.rating }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <!-- Empty State -->
            <el-empty v-else :image-size="100" description="Результаты не найдены." />
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

        <!-- Files Tab -->
        <div
          v-if="activeTab === 'files'"
          class="container flex flex-col gap-6 lg:gap-8 p-0"
        >
          <div class="w-full">
            <template v-if="data?.media?.some((item:any) => item.media_type === 'pdf')">
              <div
                class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 p-0"
              >
                <div
                  v-for="(doc, index) in data?.media?.filter((item:any) => item.media_type === 'pdf')"
                  :key="index"
                  class="bg-white rounded-lg border hover:shadow-lg transition-all duration-200 p-4 transform hover:scale-105"
                >
                  <a :href="doc.file" download target="_blank" class="block">
                    <div class="flex items-center justify-center mb-3">
                      <img src="/pdf.svg" alt="pdf icon" class="w-12 h-12" />
                    </div>
                    <h3
                      class="text-xs sm:text-sm text-gray-900 font-medium text-center line-clamp-2"
                    >
                      {{ doc.file.split("/").pop() }}
                    </h3>
                  </a>
                </div>
              </div>
            </template>

            <el-empty v-else :image-size="100" description="PDF-файл не найден" />
          </div>
        </div>
      </div>

      <!-- Achievements Section -->
      <div class="container flex flex-col gap-6 lg:gap-8 pb-8 px-4 sm:px-6">
        <div class="mt-5">
          <h2 class="text-xl sm:text-2xl font-medium text-white">Достижения</h2>
        </div>

        <template v-if="filteredResults?.length">
          <div class="bg-[#11101B] overflow-hidden w-full rounded-lg">
            <div>
              <dl class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                <div
                  v-for="(stat, index) in filteredResults"
                  :key="index"
                  class="px-4 py-4 sm:py-5 border-b border-gray-700 last:border-b-0 sm:border-b-0 sm:border-r last:border-r-0"
                >
                  <dt
                    class="text-lg sm:text-xl lg:text-2xl font-medium text-white truncate"
                  >
                    {{ stat.tournament_name }}
                  </dt>
                  <dd class="mt-1 text-xs sm:text-sm font-semibold text-[#8B8992]">
                    {{ stat.year }}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </template>

        <!-- Empty State -->
        <el-empty v-else :image-size="100" description="Достижения не найдены" />
      </div>
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

const route = useRoute();
const router = useRouter();
const activeTab = ref("career");
const playerImage = "/boy.svg";

const data = ref<any>([]);
const dataTournament = ref<any>([]);

const getData = async () => {
  try {
    const res = await $api.get(`/user/profile/sportsman/${route.params.id}/`);
    data.value = res.data.data;
  } catch (e) {
    console.log(e);
  }
};

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

const filteredResults = computed(() => {
  return data?.value?.results?.filter(
    (stat: any) => stat.rating === 1 || stat.gold === 1
  );
});

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

<style>
/* Responsive utilities */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Smooth transitions */
.transition-all {
  transition: all 0.3s ease;
}

/* Hover effects */
.hover\:scale-105:hover {
  transform: scale(1.05);
}

.hover\:scale-110:hover {
  transform: scale(1.1);
}

/* Mobile optimizations */
@media (max-width: 640px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

/* Touch-friendly buttons */
button {
  /* min-height: 44px; */
  min-width: 44px;
}

/* Improved focus states */
button:focus {
  outline: 2px solid #a0e727;
  outline-offset: 2px;
}

/* Loading states */
.loading {
  opacity: 0.6;
  pointer-events: none;
}
</style>
