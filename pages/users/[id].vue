<template>
  <NuxtLayout name="custom">
    <div class="min-h-screen  bg-[#11101B] ">
    <!-- Player Info Section -->
    <div class="py-8 container">
      <div class="flex justify-between">
        <div class="flex-1">
          <!-- Player Number and Title -->
          <!-- <div class="flex items-center gap-4 mb-2">
            <span class="text-white border px-4 py-1 bg-[#2E2F3E] text-sm">№1</span>
            <span class="text-white border px-4 py-1 bg-[#2E2F3E] text-sm">ОБЩ. 96</span>
            <span class="text-white border px-4 py-1 bg-[#2E2F3E] text-sm">Обладатель титула</span>
          </div> -->

          <!-- Player Name -->
          <h1 class="text-4xl font-bold mb-4 py-4 text-white">
            {{ data?.first_name }} {{  data?.last_name }} {{data?.middle_name}}
          </h1>

          <!-- Position Tags -->
          <div class="flex gap-2 mb-6">
            <span class="bg-[#A0E727] text-black px-3 py-1 rounded-md text-sm">
              {{data?.sportsman_profile?.sport?.name}}
            </span>
            <span class="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-sm">
              {{data?.sportsman_profile?.sport_type}}
            </span>
          </div>

          <!-- Player Details -->
          <div class="grid grid-cols-1 gap-y-4 text-sm mb-6">
            <div class="flex justify-between w-[60%] border-b pb-1">
              <p class="text-[#8B8992]">Место рождения</p>
              <p class="text-white">{{data?.sportsman_profile?.place_of_birth}}</p>
            </div>
            <div class="flex justify-between w-[60%] border-b pb-1">
              <p class="text-[#8B8992]">Гражданство</p>
              <p class="text-white">{{data?.sportsman_profile?.citizenship}}</p>
            </div >
            <div class="flex justify-between w-[60%] border-b pb-1">
              <p class="text-[#8B8992]">День рождения</p>
              <p class="text-white">{{data?.birth_date}}</p>
            </div>
            <div class="flex justify-between w-[60%] border-b pb-1">
              <p class="text-[#8B8992]">Рост</p>
              <p class="text-white">{{ Number(data?.sportsman_profile?.height).toFixed(0) }} см</p>
            </div>
            <div class="flex justify-between w-[60%] border-b pb-1"> 
              <p class="text-[#8B8992]">Вес</p>
              <p class="text-white">{{ Number(data?.sportsman_profile?.weight).toFixed(0) }} кг</p>
            </div>
            <div class="flex justify-between w-[60%] ">
              <p class="text-[#8B8992]">Воспитанник</p>
              <p class="text-white">{{data?.sportsman_profile?.educations[0]?.school_name}}</p>
            </div>
          </div>
        </div>

        <!-- Profile Image -->
        <div class="py-20 pr-28">
          <img 
            :src="data.photo?.[0].file" 
            alt="Player Profile"
            class=" w-[40vh] h-[40vh] p-2 object-cover rounded-full border"
          />
        </div>
      </div>

      <!-- <div class="flex w-full justify-between">
      
      <div class="bg-[#1A1B1F] border border-gray-800 w-[60%]">
      <div class=" mx-auto">
        <div class="flex items-center h-[52px]">
          <div class="bg-red-600 h-full flex items-center px-6 text-white font-medium">
            10 000 000 сум
          </div>
          <div class="flex-1 relative h-full flex items-center bg-[#0F1115] px-24">
            <span class="relative text-white z-10 ">24%</span>
          </div>
          <div class="bg-[#0F1115] h-full flex items-center px-6 text-white">
            24 000 000 сум
          </div>

          
        </div>
      </div>
      </div>
      <div class=" gap-4 border-gray-800 flex ml-5">
      
          <div class="bg-[#0F1115]   border h-full flex items-center px-6 text-white border-l border-gray-800 ">
            Осталось: 24 дней
          </div>

          <button class="h-full bg-red-600 text-white px-8 font-medium hover:bg-red-700 transition-colors">
            Пожертвовать
          </button>
      </div>
      </div> -->

      <!-- <div v-if="activeTab === 'statistics'" class="my-5">
        <div class="container bg-white rounded-lg shadow-sm border border-gray-200">
          <div class="p-6">
            <h2 class="text-2xl font-semibold mb-6">Статистика по играм</h2>
            
            <div class="space-y-4">
              <div class="flex justify-between items-center border-b pb-4">
                <div class="space-y-1">
                  <p class="text-sm text-gray-500">ТУРНИР</p>
                  <div class="flex items-center space-x-2">
                    <span class="font-medium">Мир Узбекская Премьер-Лига</span>
                  </div>
                </div>
                
                <div class="space-y-1">
                  <p class="text-sm text-gray-500">СЕЗОН</p>
                  <div class="flex items-center space-x-2">
                    <span class="font-medium">2023/2024</span>
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-6">
                <div class="space-y-4">
                  <div v-for="stat in leftStats" :key="stat.label" 
                      class="flex justify-between items-center py-2">
                    <span class="text-gray-600">{{ stat.label }}</span>
                    <span class="font-semibold">{{ stat.value }}</span>
                  </div>
                </div>

                <div class="space-y-4">
                  <div v-for="stat in rightStats" :key="stat.label" 
                      class="flex justify-between items-center py-2">
                    <span class="text-gray-600">{{ stat.label }}</span>
                    <span class="font-semibold">{{ stat.value }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> -->
    </div>

    <!-- <div class="bg-[#11101B] container pb-8  overflow-hidden w-full">
        <div class="">
          <dl class="grid grid-cols-2">
            <div v-for="(stat, index) in statistics" :key="index" class="px-4 py-5 border  overflow-hidden sm:p-6">
              <dt class="text-sm font-medium text-[#8B8992] truncate">
                {{ stat.label }}
              </dt>
              <dd class="mt-1 text-3xl font-semibold text-white">
                {{ stat.value }}
              </dd>
            </div>
          </dl>
        </div>
      </div> -->

    <div class=" mb-6 container">
      <div class="flex gap-2 ">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'px-4 py-2 text-sm font-medium',
            activeTab === tab.id 
              ? 'text-white border-b-2 border-red-500 bg-red-500 rounded-md' 
              : 'text-white bg-gray-500 rounded-md'
          ]"
        >
          {{ tab.name }}
        </button>
      </div>
    </div>


    

    

    <!-- Content -->
    <div class=" py-8 container">
      <!-- <div v-if="activeTab === 'overview'" class=" flex gap-8 py-8">
      <div class="flex flex-col gap-4 w-[50%] ">
        

        <p class="text-sm text-white">{{data?.sportsman_profile?.about_me}}</p>
        
      </div>
        
        <div class="mt-6">
          <img 
            src="/public/messi.svg" 
            alt="Game Action"
            class="w-[530px]  rounded-lg object-cover"
          />
        </div>
      </div> -->

      <div v-if="activeTab === 'statistics'" class=" flex flex-col gap-8">
        <Statistic/>
      </div>
        

      <div v-if="activeTab === 'career'" class=" flex flex-col gap-8">
        <div class="w-full mx-auto mt-5">
    <div  class="container bg-gray-800 text-white grid grid-cols-7 text-sm font-medium">
      <div class="p-3 col-span-2">ЧЕМПИОНАТ</div>
      <div class="p-3">Изображение</div>
      <div class="p-3">СЕЗОН</div>
      <div class="p-3">Место</div>
      <div class="p-3">ТРЕНЕР</div>
      <div class="p-3">Рейтинг</div>
    </div>

    <div class="container bg-[#11101B] divide-y divide-gray-200">
      <div v-for="(row, index) in data?.sportsman_profile?.results" 
           :key="index"
           class="grid grid-cols-7  text-white  cursor-pointer">
        <!-- <div class="p-3 flex items-center ">
          <span>{{ row.country }}</span>
        </div> -->
        <div class="p-3 col-span-2 ">{{ row.tournament.name }}</div>
        <div class="p-3"><img class="w-12 h-12" :src="`https://api.7srating.uz/${row.tournament.logo[0].file}`" alt=""></div>
        <div class="p-3 ">{{ row.year?.split('-')[0] }}</div>
        <div class="p-3 ">{{ row.country }}</div>
        <div class="p-3 ">{{ data?.sportsman_profile?.trainer_name }}</div>
        <div class="p-3">{{ row.rating }}</div>
      </div>
    </div>
  </div>
      </div>

      <div v-if="activeTab === 'videos'" class="container flex flex-col gap-8">
          <div class="mt-5">
    <div class="container mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Match Review Cards -->
        <div v-for="match in matches" :key="match.id" class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
          <div class="relative">
            <img :src="match.image" :alt="match.title" class="w-full h-48 object-cover" />
            <div v-if="match.hasVideo" @click="openVideo(match)" class="absolute inset-0 flex items-center justify-center cursor-pointer">
                        <img src="/psg.svg" alt="" class="w-16 h-16 ">
            </div>
            <div class="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
              {{ match.time }} / {{ match.date }}
            </div>
          </div>
          <div class="p-4">
            <h3 class="text-lg font-semibold mb-2">{{ match.title }}</h3>
            <p class="text-gray-600 text-sm line-clamp-2">{{ match.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Video Modal -->
    <div v-if="selectedMatch" class="container fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-4 rounded-lg max-w-3xl w-full">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold">{{ selectedMatch.title }}</h2>
          <button @click="closeVideo" class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <!-- <video ref="videoPlayer" controls class="w-full">
          <source :src="selectedMatch.videoUrl" type="video/mp4">
          Your browser does not support the video tag.
        </video> -->


        <div v-if="selectedMatch.hasVideo" class="aspect-w-16 aspect-h-9 ">
      <iframe
        :src="selectedMatch.videoUrl"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        class="w-full h-[25rem]">
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
        <div v-for="(image, index) in data?.sportsman_profile?.media?.filter((item:any) => item.media_type === 'image')" 
             :key="index" 
             class="relative group overflow-hidden rounded-lg">
          <img 
            :src="`https://api.7srating.uz/${image.file}`"
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
      
      <div class=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="(doc, index) in data?.sportsman_profile?.media?.filter((item:any) => item.media_type === 'pdf')" 
          :key="index"
          class="bg-white rounded-lg border hover:shadow-md transition-shadow duration-200 p-4"
        >
          <div v-if="doc.media_type === 'pdf'">
          <a :href="`http://api.7srating.uz/${doc.file}`" download target="_blank">
          
            <img src="/pdf.svg" alt="">
          
          <h3 class="text-sm text-gray-900  font-medium my-2">
            {{ doc.file.split('/').pop() }}
          </h3>
          </a>
          </div>
        </div>

        <!-- <div v-for="(doc, index) in data?.sportsman_profile?.media?.filter((item:any) => item.media_type !== 'pdf')" 
          :key="index"
          class="bg-white col-span-1  rounded-lg border hover:shadow-md transition-shadow duration-200 p-4"
        >
          
            <img src="/pdf.svg" alt="">
          
          <h3 class="text-sm text-gray-900  font-medium my-2">
            PDF Not Found
          </h3>
        </div> -->
      </div>
    </div>
  </div>
      </div>
    </div>

    <div  class=" container flex flex-col gap-8 pb-8">
        <div class="mt-5">
          <h2 class="text-2xl font-medium text-white">Достижения</h2>
        </div>
         <div class="bg-[#11101B]   overflow-hidden w-full">
        <div class="">
          <dl class="grid grid-cols-3">
            <div v-for="(stat, index) in data?.sportsman_profile?.results" :key="index" class="px-4 py-5 border  overflow-hidden sm:p-6">
              <dt class="text-2xl font-medium text-white truncate">
                {{ stat.tournament.name }}
              </dt>
              <dd class="mt-1 text-sm font-semibold text-[#8B8992]">
              {{ stat.tournament.start_time.split('-')[0] }}
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
import { ref, onMounted } from 'vue'
import { ChevronLeftIcon } from 'lucide-vue-next'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios';
import Associated from '~/components/home/Associated.vue';
import Statistic from "~/components/home/Statistic.vue"


const route = useRoute()
const router = useRouter()
const activeTab = ref('career')
const playerImage = '/boy.svg'




const data = ref<any>([])
const dataTournament = ref<any>([])

const getData = async () => {
  try {
    const res = await axios.get(
      `https://api.7srating.uz/api/user/profile/sportsman/${route.params.id}/`
    );
    data.value = res.data.data;
  } catch (e) {
    console.log(e);
  }
};

const getTournament = async () => {
  try {
    const res = await axios.get(
      `
      https://api.7srating.uz/api/dashboard/tournament/`
    );
    dataTournament.value = res.data.data;
  } catch (e) {
    console.log(e);
  }
};

onMounted(() => {
  getData()
  getTournament()
})

const tabs = [
  // { id: 'overview', name: 'Заявка игрока' },
  // { id: 'statistics', name: 'Статистика' },
  { id: 'career', name: 'Карьера' },
  // { id: 'videos', name: 'Видео материалы' },
  { id: 'photos', name: 'Фотографии' },
  { id: 'files', name: 'Загруженные файлы' }
]

const statistics = ref([
  { label: 'Number of Games', value: '93' },
  { label: 'Total Points', value: '1025' },
  { label: 'Season Games', value: '13' },
  { label: 'Average per Game', value: '12' },
  { label: 'Games Played', value: '16' },
  { label: 'Special Games', value: '3' }
])
const statis = ref([
  { label: '2021-2022', value: 'Бронзовый призер чемпионатаУзбекистана' },
  { label: '2021', value: 'Обладатель кубка России' },
  { label: '2020-2021', value: 'Бронзовый призер чемпионата России' },
  { label: '2019', value: 'Обладатель кубка Европы' },
  { label: '2018', value: 'Футболист года по версии РУз' },
  { label: '2018-2019', value: 'Серебряный призер чемпионата Узбекистан' },
  { label: '2012-2013', value: 'Лучший бомбардир Кубка Узбекистана' },
  { label: '2019', value: 'Обладатель супер кубка России' },
  { label: '2016-2017', value: 'Футболист года по версии УФА' },
])

const leftStats = [
  { label: 'Количество игр', value: '93' },
  { label: 'Количество минут на поле', value: '1025' },
  { label: 'В старте', value: '13' },
  { label: 'На замену', value: '12' }
]

const rightStats = [
  { label: 'Количество передач', value: '16' },
  { label: 'Количество голевых передач', value: '3' },
  { label: 'Желтая карточка (ЖК)', value: '2' },
  { label: 'Красная карточка (КК)', value: '-' }
]


const tableData = ref(Array(10).fill({
  teamLogo: '/psg.svg',
  team: 'Paris Saint Germain',
  season: '2007',
  coach: 'Насимов Григорий',
  championship: '3',
  cup: '3',
  euroCup: '0'
}))

const selectedMatch = ref(null);
const videoPlayer = ref(null);

const matches = [
  {
    id: 1,
    title: 'Обзор матча Пахтакор - Ал-айн',
    description: '«Город невест» принимает у себя полуфиналов. Организаторам выступает проект «Битвы по Золотому кольцу». «Город невест» принимает у себя полуфиналов.',
    image: '/psg.svg',
    hasVideo: true,
    videoUrl: 'https://www.youtube.com/embed/AfpItQBKl04',
    time: '19:32',
    date: '28.01.2023'
  },
  {
    id: 2,
    title: 'Обзор матча Пахтакор - Ал-айн',
    description: '«Город невест» принимает у себя полуфиналов. Организаторам выступает проект «Битвы по Золотому кольцу». «Город невест» принимает у себя полуфиналов.',
    image: '/psg.svg',
    hasVideo: false,
    time: '19:32',
    date: '28.01.2023'
  },
  {
    id: 3,
    title: 'Обзор матча Пахтакор - Ал-айн',
    description: '«Город невест» принимает у себя полуфиналов. Организаторам выступает проект «Битвы по Золотому кольцу». «Город невест» принимает у себя полуфиналов.',
    image: '/psg.svg',
    hasVideo: true,
    videoUrl: 'https://www.youtube.com/embed/AfpItQBKl04',
    time: '19:32',
    date: '28.01.2023'
  },
  {
    id: 4,
    title: 'Обзор матча Пахтакор - Ал-айн',
    description: '«Город невест» принимает у себя полуфиналов. Организаторам выступает проект «Битвы по Золотому кольцу». «Город невест» принимает у себя полуфиналов.',
    image: '/psg.svg',
    hasVideo: false,
    time: '19:32',
    date: '28.01.2023'
  }
];

const images = ref([
  {
    url: '/boy.svg',
    time: '19:32 / 20.01.2023',
    description: 'Match highlights against Zenit'
  },
  {
    url: '/boy.svg',
    time: '19:32 / 20.01.2023',
    description: 'Action shot from the game'
  },
  {
    url: '/boy.svg',
    time: '19:32 / 20.01.2023',
    description: 'Key moment during play'
  },
  {
    url: '/boy.svg',
    time: '19:32 / 20.01.2023',
    description: 'Match photography highlights'
  }
])


const documents = ref([
  {
    title: 'Единый государственный реестр судебных решений за 2020 год',
    url: '#'
  },
  {
    title: 'Единый государственный реестр судебных решений за 2020 год',
    url: '#'
  },
  {
    title: 'Единый государственный реестр судебных решений за 2020 год',
    url: '#'
  },
  {
    title: 'Единый государственный реестр судебных решений за 2020 год',
    url: '#'
  }
])

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
  router.push(project)
}
</script>


<style >
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