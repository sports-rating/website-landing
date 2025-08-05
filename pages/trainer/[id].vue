<template>
  <NuxtLayout name="custom">
    <div class="min-h-screen bg-[#11101B]">
      <!-- Player Info Section -->
      <div class="container mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div class="flex flex-col lg:flex-row gap-8">
          <!-- Profile Info -->
          <div class="flex flex-col sm:w-[45%]">
            <h1
              class="text-2xl sm:text-3xl text-white lg:text-4xl font-bold mb-4 lg:mb-6"
            >
              {{ data?.first_name }} {{ data?.last_name }} {{ data?.middle_name }}
            </h1>

            <div class="flex flex-wrap gap-2 mb-6">
              <span
                class="bg-[#A0E727] text-black px-3 py-1 rounded-md text-xs sm:text-sm"
              >
                {{ data?.trainer_profile?.sport?.name }}
              </span>
              <span
                class="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-xs sm:text-sm"
              >
                {{ data?.trainer_profile?.skill_level }}
              </span>
            </div>

            <div class="grid grid-cols-1 gap-y-4 text-sm">
              <div
                class="flex flex-col sm:flex-row sm:justify-between border-b border-gray-700 pb-2"
              >
                <p class="text-[#8B8992] mb-1 sm:mb-0">Место рождения</p>
                <p class="text-white">
                  {{ data?.trainer_profile?.address?.place_of_birth || "Не указано" }}
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
                    data?.trainer_profile?.user_metrics?.height
                      ? Number(data?.trainer_profile?.user_metrics?.height).toFixed(0) +
                        " см"
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
                    data?.trainer_profile?.user_metrics?.weight
                      ? Number(data?.trainer_profile?.user_metrics?.weight).toFixed(0) +
                        " кг"
                      : "Не указано"
                  }}
                </p>
              </div>
              <div class="flex flex-col sm:flex-row sm:justify-between">
                <p class="text-[#8B8992] mb-1 sm:mb-0">Воспитанник</p>
                <p class="text-white">
                  {{ data?.educations?.[0]?.school_name || "Не указано" }}
                </p>
              </div>
            </div>
          </div>

          <!-- Profile Image -->
          <div
            class="order-1 lg:order-2 flex justify-center lg:justify-end md:ml-48 md:mt-20"
          >
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
      <div class="py-8 container">
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

        <div v-if="activeTab === 'career'" class="flex flex-col gap-8">
          <div class="w-full mx-auto mt-5">
            <!-- Header -->
            <div class="sm:container bg-gray-800 text-white overflow-x-auto">
              <div
                class="min-w-[720px] grid grid-cols-12 text-xs sm:text-sm font-medium whitespace-nowrap"
              >
                <div class="p-3 col-span-4">ЧЕМПИОНАТ</div>
                <div class="p-3 col-span-2">СЕЗОН</div>
                <div
                  class="p-3"
                  :class="selectedView === '2' ? 'col-span-1' : 'col-span-2'"
                >
                  Место
                </div>

                <div
                  v-if="selectedView === '2'"
                  class="col-span-3 flex justify-between items-center text-center"
                >
                  <div class="p-3 flex items-center gap-2">
                    <img src="/gold.png" class="w-6" alt="" />
                    Золото
                  </div>
                  <div class="p-3 flex items-center gap-2">
                    <img src="/silver.png" class="w-6" alt="" />
                    Серебр
                  </div>
                  <div class="p-3 flex items-center gap-2">
                    <img src="/bronza.png" class="w-6" alt="" />
                    Бронза
                  </div>
                </div>

                <div
                  v-if="selectedView === '1'"
                  class="col-span-2 text-center items-center flex"
                >
                  Рейтинг
                </div>

                <div class="p-3 col-span-2 w-[10rem]">
                  <el-dropdown @command="handleSelect">
                    <el-button type="text" size="small" class="!text-sm !text-white">
                      {{ selectedView === "1" ? "Личное " : "Учащихся " }}
                      <el-icon class="el-icon--right">
                        <arrow-down />
                      </el-icon>
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
            </div>

            <!-- Table Rows -->
            <div class="container bg-[#11101B] divide-y divide-gray-200">
              <div
                v-for="(row, index) in data?.results"
                :key="index"
                class="grid grid-cols-6 sm:grid-cols-12 text-white text-sm cursor-pointer"
              >
                <!-- Championship -->
                <div
                  v-if="
                    (selectedView === '1' && row.rating) ||
                    (selectedView === '2' && !row.rating)
                  "
                  class="p-3 col-span-3 sm:col-span-4 flex gap-2 sm:gap-4 items-center"
                >
                  <img
                    class="w-10 h-10 sm:w-12 sm:h-12"
                    :src="getTournamentLogo(row.tournament_name)"
                    alt=""
                  />
                  <span class="truncate">{{ row.tournament_name }}</span>
                </div>

                <!-- Season -->
                <div
                  v-if="
                    (selectedView === '1' && row.rating) ||
                    (selectedView === '2' && !row.rating)
                  "
                  class="p-3 col-span-1 sm:col-span-2"
                >
                  {{ row.year }}
                </div>

                <!-- Country -->
                <div
                  v-if="
                    (selectedView === '1' && row.rating) ||
                    (selectedView === '2' && !row.rating)
                  "
                  class="p-3"
                  :class="
                    selectedView === '2'
                      ? 'col-span-1 sm:col-span-1'
                      : 'col-span-2 sm:col-span-2'
                  "
                >
                  {{ row.country }}
                </div>

                <!-- Medal Counts -->
                <div
                  v-if="selectedView === '2' && !row.rating"
                  class="p-3 col-span-6 sm:col-span-3 flex justify-between sm:justify-around items-center"
                >
                  <div class="text-center">{{ row.gold }}</div>
                  <div class="text-center">{{ row.silver }}</div>
                  <div class="text-center">{{ row.bronze }}</div>
                </div>

                <!-- Rating -->
                <div
                  v-if="selectedView === '1' && row.rating"
                  class="p-3 col-span-3 flex items-center gap-2"
                >
                  <img
                    v-if="row.rating === 1"
                    src="/gold.png"
                    class="w-5 sm:w-6"
                    alt=""
                  />
                  <img
                    v-if="row.rating === 2"
                    src="/silver.png"
                    class="w-5 sm:w-6"
                    alt=""
                  />
                  <img
                    v-if="row.rating === 3 || row.rating === 4"
                    src="/bronza.png"
                    class="w-5 sm:w-6"
                    alt=""
                  />
                  {{ row.rating }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'videos'" class="container flex flex-col gap-8">
          <div class="mt-5">
            <div class="container mx-auto">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Match Review Cards -->
                <div
                  v-for="match in matches"
                  :key="match.id"
                  class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div class="relative">
                    <img
                      :src="match.image"
                      :alt="match.title"
                      class="w-full h-48 object-cover"
                    />
                    <div
                      v-if="match.hasVideo"
                      @click="openVideo(match)"
                      class="absolute inset-0 flex items-center justify-center cursor-pointer"
                    >
                      <img src="/psg.svg" alt="" class="w-16 h-16" />
                    </div>
                    <div
                      class="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded"
                    >
                      {{ match.time }} / {{ match.date }}
                    </div>
                  </div>
                  <div class="p-4">
                    <h3 class="text-lg font-semibold mb-2">{{ match.title }}</h3>
                    <p class="text-gray-600 text-sm line-clamp-2">
                      {{ match.description }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Video Modal -->
            <div
              v-if="selectedMatch"
              class="container fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <div class="bg-white p-4 rounded-lg max-w-3xl w-full">
                <div class="flex justify-between items-center mb-4">
                  <h2 class="text-xl font-bold">{{ selectedMatch.title }}</h2>
                  <button @click="closeVideo" class="text-gray-500 hover:text-gray-700">
                    <svg
                      class="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </div>
                <!-- <video ref="videoPlayer" controls class="w-full">
          <source :src="selectedMatch.videoUrl" type="video/mp4">
          Your browser does not support the video tag.
        </video> -->

                <div v-if="selectedMatch?.hasVideo" class="aspect-w-16 aspect-h-9">
                  <iframe
                    :src="selectedMatch?.videoUrl"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                    class="w-full h-[25rem]"
                  >
                  </iframe>
                </div>
                <p v-else>No video available for this match.</p>
              </div>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'photos'" class="container flex flex-col gap-8">
          <div class="mt-5">
            <div class="w-full mx-auto">
              <!-- Image Grid -->
              <div class="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div
                  v-for="(image, index) in data?.media?.filter((item:any) => item.media_type === 'image' && item.is_profile_photo === false)"
                  :key="index"
                  class="relative group overflow-hidden rounded-lg"
                >
                  <img
                    :src="`${image.file}`"
                    :alt="image.media_type"
                    class="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'files'" class="container flex flex-col gap-8">
          <div class="mt-5">
            <div class="w-full">
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div
                  v-if="data?.media?.some((item: any) => item.media_type === 'pdf')"
                  v-for="(doc, index) in data?.media?.filter((item: any) => item.media_type === 'pdf')"
                  :key="index"
                  class="bg-white rounded-lg border hover:shadow-md transition-shadow duration-200 p-4"
                >
                  <div v-if="doc.media_type === 'pdf'">
                    <a :href="`${doc.file}`" download target="_blank">
                      <img src="/pdf.svg" alt="" />
                      <h3 class="text-sm text-gray-900 font-medium my-2">
                        {{ doc.file.split("/").pop() }}
                      </h3>
                    </a>
                  </div>
                </div>
                <div
                  v-else
                  class="bg-white rounded-lg border hover:shadow-md transition-shadow duration-200 p-4"
                >
                  <img src="/pdf.svg" alt="" />
                  <h3 class="text-sm text-gray-900 font-medium my-2">PDF Not Found</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container flex flex-col gap-8 pb-8">
        <div class="mt-5">
          <h2 class="text-2xl font-medium text-white">Достижения</h2>
        </div>
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
      </div>

      <!-- <Associated/> -->
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ChevronLeftIcon } from "lucide-vue-next";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
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
    const res = await axios.get(
      `https://api.7srating.uz/api/user/profile/trainer/${route.params.id}/`
    );
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
    const res = await axios.get(
      `
      https://api.7srating.uz/api/sport/tournament/`
    );
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
  // { id: 'videos', name: 'Видео материалы' },
  { id: "photos", name: "Фотографии" },
  { id: "files", name: "Загруженные файлы" },
];

const statistics = ref([
  { label: "Number of Games", value: "93" },
  { label: "Total Points", value: "1025" },
  { label: "Season Games", value: "13" },
  { label: "Average per Game", value: "12" },
  { label: "Games Played", value: "16" },
  { label: "Special Games", value: "3" },
]);
const statis = ref([
  { label: "2021-2022", value: "Бронзовый призер чемпионатаУзбекистана" },
  { label: "2021", value: "Обладатель кубка России" },
  { label: "2020-2021", value: "Бронзовый призер чемпионата России" },
  { label: "2019", value: "Обладатель кубка Европы" },
  { label: "2018", value: "Футболист года по версии РУз" },
  { label: "2018-2019", value: "Серебряный призер чемпионата Узбекистан" },
  { label: "2012-2013", value: "Лучший бомбардир Кубка Узбекистана" },
  { label: "2019", value: "Обладатель супер кубка России" },
  { label: "2016-2017", value: "Футболист года по версии УФА" },
]);

const leftStats = [
  { label: "Количество игр", value: "93" },
  { label: "Количество минут на поле", value: "1025" },
  { label: "В старте", value: "13" },
  { label: "На замену", value: "12" },
];

const rightStats = [
  { label: "Количество передач", value: "16" },
  { label: "Количество голевых передач", value: "3" },
  { label: "Желтая карточка (ЖК)", value: "2" },
  { label: "Красная карточка (КК)", value: "-" },
];

const tableData = ref(
  Array(10).fill({
    teamLogo: "/psg.svg",
    team: "Paris Saint Germain",
    season: "2007",
    coach: "Насимов Григорий",
    championship: "3",
    cup: "3",
    euroCup: "0",
  })
);

const selectedMatch = ref(null);
const videoPlayer = ref(null);

const matches = [
  {
    id: 1,
    title: "Обзор матча Пахтакор - Ал-айн",
    description:
      "«Город невест» принимает у себя полуфиналов. Организаторам выступает проект «Битвы по Золотому кольцу». «Город невест» принимает у себя полуфиналов.",
    image: "/psg.svg",
    hasVideo: true,
    videoUrl: "https://www.youtube.com/embed/AfpItQBKl04",
    time: "19:32",
    date: "28.01.2023",
  },
  {
    id: 2,
    title: "Обзор матча Пахтакор - Ал-айн",
    description:
      "«Город невест» принимает у себя полуфиналов. Организаторам выступает проект «Битвы по Золотому кольцу». «Город невест» принимает у себя полуфиналов.",
    image: "/psg.svg",
    hasVideo: false,
    time: "19:32",
    date: "28.01.2023",
  },
  {
    id: 3,
    title: "Обзор матча Пахтакор - Ал-айн",
    description:
      "«Город невест» принимает у себя полуфиналов. Организаторам выступает проект «Битвы по Золотому кольцу». «Город невест» принимает у себя полуфиналов.",
    image: "/psg.svg",
    hasVideo: true,
    videoUrl: "https://www.youtube.com/embed/AfpItQBKl04",
    time: "19:32",
    date: "28.01.2023",
  },
  {
    id: 4,
    title: "Обзор матча Пахтакор - Ал-айн",
    description:
      "«Город невест» принимает у себя полуфиналов. Организаторам выступает проект «Битвы по Золотому кольцу». «Город невест» принимает у себя полуфиналов.",
    image: "/psg.svg",
    hasVideo: false,
    time: "19:32",
    date: "28.01.2023",
  },
];

const images = ref([
  {
    url: "/boy.svg",
    time: "19:32 / 20.01.2023",
    description: "Match highlights against Zenit",
  },
  {
    url: "/boy.svg",
    time: "19:32 / 20.01.2023",
    description: "Action shot from the game",
  },
  {
    url: "/boy.svg",
    time: "19:32 / 20.01.2023",
    description: "Key moment during play",
  },
  {
    url: "/boy.svg",
    time: "19:32 / 20.01.2023",
    description: "Match photography highlights",
  },
]);

const documents = ref([
  {
    title: "Единый государственный реестр судебных решений за 2020 год",
    url: "#",
  },
  {
    title: "Единый государственный реестр судебных решений за 2020 год",
    url: "#",
  },
  {
    title: "Единый государственный реестр судебных решений за 2020 год",
    url: "#",
  },
  {
    title: "Единый государственный реестр судебных решений за 2020 год",
    url: "#",
  },
]);

const openVideo = (match) => {
  selectedMatch.value = match;
};

const closeVideo = () => {
  if (videoPlayer.value) {
    videoPlayer.value.pause();
  }
  selectedMatch.value = null;
};

const handleAction = (project) => {
  // console.log('Action clicked for project:', project.id)
  router.push(project);
};
</script>

<style>
.no-scrollbar::-webkit-scrollbar-thumb {
  background-color: #e1e1e1;
  border: 4px solid transparent;
  border-radius: 8px;
  background-clip: padding-box;
}

.no-scrollbar::-webkit-scrollbar {
  width: 16px;
}

.no-scrollbar {
  -ms-overflow-style: none;
  /* scrollbar-width: thin; */
  /* margin: inherit; */
  scroll-margin-block-start: 0;
}
</style>
