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
      <div class="flex  overflow-x-auto pb-4 mb-6 hide-scrollbar justify-between ">
      <div class="flex gap-2">
        

        <button 
          v-for="(sport) in sports" 
          :key="sport.id"
          @click="toggle(sport.id, sport.name)"
          :class="[
            'px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors',
            activeCategory === sport.id 
              ? 'bg-red-600 text-white' 
              : 'bg-[#2A2B31] text-gray-400 hover:bg-[#3A3B41]'
          ]"
        >
          {{ sport.name }}
        </button>
      </div>
        
      </div>

      <!-- Tables Grid -->
      <div  class="grid lg:grid-cols-2 gap-6">
        <!-- Players Table -->
        <div class="bg-[#2A2B31] rounded-lg overflow-hidden">
          <div class="bg-[#212226] px-4 py-3 grid grid-cols-12 gap-4">
            <div class="col-span-1 text-gray-400 text-xs  flex items-center">РТГ</div>
            <div class="col-span-3 text-gray-400 text-xs  flex items-center">ИГРОК</div>
            <div class="col-span-1  text-gray-400 text-xs  flex items-center">СТР</div>
            <div class="col-span-1  text-gray-400 text-xs flex items-center">КМ</div>
            <div class="col-span-2 text-center items-center text-gray-400 text-xs flex">
            <img src="/gold.png" class="w-6" alt="">
            Золото</div>
            <div class="col-span-2 text-center items-center text-gray-400 text-xs flex">
            <img src="/silver.png" class="w-6" alt="">Серебро</div>
            <div class="col-span-2 text-center items-center text-gray-400 text-xs flex">
            <img src="/bronza.png" class="w-6" alt="">
            Бронза</div>
          </div>
          
          <TransitionGroup 
            name="list" 
            tag="div" 
            class="divide-y divide-gray-700"
          >
            <nuxt-link  
              v-for="(player, index) in data" 
              :key="player.id"
              :to="`/users/${player.id}`" 
              class="px-4 py-3 grid grid-cols-12 gap-4 items-center hover:bg-[#3A3B41] transition-colors"
            >
              <div class="col-span-1 text-gray-400">{{ index + 1 }}</div>
              <div class="col-span-3 flex items-center gap-3">
                <span class="text-white text-sm truncate">{{ player.first_name }} {{ player.last_name }} </span>
              </div>
              <div class="col-span-1 text-center">
              <img 
                  src="/public/UZ.svg"
                  :alt="player.country"
                  class="w-6 h-4 object-cover rounded"
                />
              </div>
              <div class="col-span-1 text-center">
              <img 
                  :src="`${player?.logo[0]?.file}`" 
                  :alt="player.team"
                  class="w-6 h-6 rounded-full"
                />
              </div>

              
              <div class="col-span-2 ml-7">
              <span  class="bg-[#1A1B1F] text-white px-2 py-1 rounded text-sm">
                {{ player.statistics.total_gold }}

              </span>
              </div>
              <div class="col-span-2 ml-7">
              <span  class="bg-[#1A1B1F] text-white px-2 py-1 rounded text-sm">
                {{ player.statistics.total_silver }}

              </span>
              </div>
              <div class="col-span-2 ml-7">
              <span  class="bg-[#1A1B1F] text-white px-2 py-1 rounded text-sm">
                {{ player.statistics.total_bronze }}
              </span>
              </div>
              
            </nuxt-link>
          </TransitionGroup>
        </div>

        <!-- Trainers Table -->
        <div class="bg-[#2A2B31] rounded-lg overflow-hidden">
          <div>
  <!-- Table Header -->
  <div class="bg-[#212226] px-4 py-3 grid grid-cols-12 gap-4 items-center">
    <div class="col-span-1 text-gray-400 text-xs flex items-center">РТГ</div>
    <div class="col-span-2 text-gray-400 text-xs flex items-center">ТРЕНЕР</div>
    <div class="col-span-1 text-gray-400 text-xs text-center flex items-center">СТР</div>
    <div class="col-span-1 text-gray-400 text-xs text-center flex items-center">КМ</div>
    <div class="col-span-1 text-gray-400 text-xs text-center flex items-center ">
    <img src="/gold.png" class="w-6" alt="">
    Золото</div>
    <div class="col-span-2 text-gray-400 text-xs text-center flex items-center">
    <img src="/silver.png" class="w-6 ml-5" alt="">Серебро</div>
    <div class="col-span-2 text-gray-400 text-xs text-center flex items-center ">
    <img src="/bronza.png" class="w-6" alt="">Бронза</div>
    <div class="col-span-1 whitespace-nowrap text-xs text-gray-400">
    <el-dropdown @command="handleSelect">
      <el-button type="text" size="small" class=" !text-gray-400">
        {{ selectedView === "1" ? "Личное " : " Учащихся" }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
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

  <!-- Table Body -->
  <TransitionGroup
    name="list"
    tag="div"
    class="divide-y divide-gray-700"
  >
    <nuxt-link
      v-for="(trainer, index) in data1"
      :key="trainer.id"
      :to="`/trainer/${trainer.id}`"
      class="px-4 py-3 grid grid-cols-12 gap-4 items-center hover:bg-[#3A3B41] transition-colors"
    >
      <!-- Index -->
      <div class="col-span-1 text-gray-400">{{ index + 1 }}</div>

      <!-- Trainer Name -->
      <div class="col-span-2 flex items-center gap-3">
        <span class="text-white text-sm truncate">{{ trainer.first_name }} {{ trainer.last_name }}</span>
      </div>

      <!-- Country Flag -->
      <div class="col-span-1 text-center">
        <img
          src="/public/UZ.svg"
          :alt="trainer.country"
          class="w-6 h-4 object-cover rounded"
        />
      </div>

      <!-- Team Logo -->
      <div class="col-span-1 text-center">
        <img
          :src="`${trainer?.logo[0]?.file}`"
          :alt="trainer.team"
          class="w-6 h-6 rounded-full"
        />
      </div>

      <!-- Medals -->
      <div class="col-span-4 grid grid-cols-3 gap-4">
        <!-- Gold -->
        <div class="text-center">
          <span class="bg-[#1A1B1F] text-white px-3 py-1 rounded text-sm">
            {{ selectedView === '1' ? trainer.statistics.own_statistics.gold : trainer.statistics.students_statistics.gold }}
          </span>
        </div>

        <!-- Silver -->
        <div class="text-center">
          <span class="bg-[#1A1B1F] text-white px-3 py-1 rounded text-sm">
            {{ selectedView === '1' ? trainer.statistics.own_statistics.silver : trainer.statistics.students_statistics.silver }}
          </span>
        </div>

        <!-- Bronze -->
        <div class="text-center">
          <span class="bg-[#1A1B1F] text-white px-3 py-1 rounded text-sm">
            {{ selectedView === '1' ? trainer.statistics.own_statistics.bronze : trainer.statistics.students_statistics.bronze }}
          </span>
        </div>
      </div>
    </nuxt-link>
  </TransitionGroup>
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
import { ref, computed } from 'vue'
import { ChevronRight } from 'lucide-vue-next'
import axios from 'axios';
import { useRouter } from 'vue-router';
import { ArrowDown } from '@element-plus/icons-vue'
const router = useRouter();



const data = ref<any>([])
const data1 = ref<any>([])
const activeCategory = ref<any>(null)
const sports = ref<any[]>([])
const selectedView = ref("1"); 
function handleSelect(command:any) {
  selectedView.value = command;
}



const getData = async (name: string = 'Football') => {
  try {
    const res = await axios.get(
      `https://api.7srating.uz/api/user/profile/sportsman/?sport=${name}`
    );
    data.value = res.data.data;
  } catch (e) {
    console.log(e);
  }
};

const getTrainer = async (name: string = 'Football') => {
  try {
    const res = await axios.get(
      `https://api.7srating.uz/api/user/profile/trainer/?sport=${name}`
    );
    data1.value = res.data.data;
  } catch (e) {
    console.log(e);
  }
};

const toggle = (id: number, name:string) => {
  activeCategory.value = id;
  getData(name);
  getTrainer(name)
};


const getSport = async() => {
  try {
    const res = await axios.get(
    `https://api.7srating.uz/api/dashboard/sport/`);

    sports.value = res.data.data

    const defaultSport = sports.value.find(sport => sport.name === 'Football');
  if (defaultSport) {
        activeCategory.value = defaultSport.id; 
        toggle(defaultSport.id, defaultSport.name);
      }
      
  } catch (e) {
    console.log(e);
    
  }
}




onMounted(() => {
  getData()
  getSport()
  getTrainer()
})


interface Player {
  id: number
  name: string
  country: string
  flag: string
  team: string
  teamLogo: string
  str: number
  km: number
  nap:string
  total: number
  categoryId: number
}





</script>

<style scoped>

</style>