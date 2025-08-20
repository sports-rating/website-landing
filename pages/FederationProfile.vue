<template>
  <NuxtLayout name="custom">
    <div
      v-if="authStore.userProfile?.data?.federation"
      class="min-h-screen bg-[#11101B] p-6 text-white"
    >
      <!-- Header -->
      <header class="bg-transparent px-12 py-4 flex justify-between items-center">
        <h1 class="text-5xl font-bold">
          {{ authStore.userProfile?.data?.federation?.name }}
        </h1>
        <img
          :src="authStore.userProfile?.data?.federation?.logo"
          class="!w-24 !h-24 rounded-full"
        />
      </header>

      <!-- Tabs -->
      <nav class="bg-gray-800 px-4 py-3 w-[97%] mx-auto">
        <div class="flex space-x-6 text-sm">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            @click="activeTab = tab.key"
            :class="[
              'transition-colors',
              activeTab === tab.key
                ? 'text-blue-400 font-bold'
                : 'text-gray-300 hover:text-white',
            ]"
          >
            {{ tab.label }}
          </button>
        </div>
      </nav>

      <!-- Tab Content -->
      <div class="p-6" v-if="activeTab">
        <Applications
          v-if="activeTab === 'applications'"
          :data="requests"
          v-model:search="searchQuery"
          v-model:status="selectedStatus"
          v-model:type="selectedType"
          v-model:date="selectedDate"
          v-model:page="currentPage"
          :total-pages="totalPages"
          @refresh="getRequest"
        />
        <TrainerList
          v-if="activeTab === 'trainers'"
          v-model:search="search"
          v-model:region="selectedRegion"
          v-model:sport="selectedSport"
          v-model:gender="selectedGender"
          v-model:page="currentTrainer"
          :total-pages="totalPages"
          :data="data"
        />

        <SportsmanList
          v-if="activeTab === 'athletes'"
          v-model:search="search"
          v-model:region="selectedRegion"
          v-model:sport="selectedSport"
          v-model:gender="selectedGender"
          v-model:page="currentTrainer"
          :total-pages="totalPages"
          :data="data"
        />
        <StatsList v-if="activeTab === 'statistics'" />
      </div>

      <div
        v-else
        class="min-h-[50vh] flex flex-col items-center justify-center bg-[#11101B] text-white text-center p-8"
      >
        <el-empty :image-size="200" />
      </div>
    </div>

    <div
      v-else
      class="min-h-[50vh] flex flex-col items-center justify-center bg-[#11101B] text-white text-center p-8"
    >
      <h1 class="text-2xl font-bold mb-4">Нет разрешения</h1>
      <p class="text-gray-400 max-w-md">
        У вас пока нет разрешения на доступ к странице Федерации. Обратитесь к системному
        администратору.
      </p>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useAuthStore } from "~/stores/auth";
import Applications from "~/components/tabs/Applications.vue";
import TrainerList from "~/components/tabs/TrainerList.vue";
import SportsmanList from "~/components/tabs/SportsmanList.vue";
import StatsList from "~/components/tabs/StatsList.vue";

const authStore = useAuthStore();
const { $api } = useNuxtApp();

const activeTab = ref("applications");
const data = ref([]);
const requests = ref([]);
const currentPage = ref(1);
const currentTrainer = ref(1);
const limit = ref(10);
const totalPages = ref(0);
const searchQuery = ref("");
const search = ref("");
const selectedStatus = ref("");
const selectedType = ref("");
const selectedDate = ref("");
const selectedRegion = ref("");
const selectedSport = ref("");
const selectedGender = ref("");

const tabs = [
  { key: "federation", label: "Федерации", user_role: "federation" },
  { key: "athletes", label: "Спортсмены", user_role: "sportsman" },
  { key: "trainers", label: "Тренеры", user_role: "trainer" },
  { key: "judges", label: "Судялар", user_role: null },
  { key: "applications", label: "Заявки", user_role: null },
  { key: "competition", label: "Соревнование", user_role: null },
  { key: "statistics", label: "Статистика", user_role: null },
];

const getData = async () => {
  const role = tabs.find((t) => t.key === activeTab.value)?.user_role || "";
  if (!authStore.userProfile?.data?.federation) return;
  const res = await $api.get(
    `/federation/${authStore.userProfile.data.federation.id}/users/`,
    {
      params: {
        user_role: role || undefined,
        page_size: limit.value,
        page: currentTrainer.value,
        search: search.value || undefined,
        region: selectedRegion.value || undefined,
        sport: selectedSport.value || undefined,
        gender: selectedGender.value || undefined,
      },
    }
  );
  data.value = res.data.data.data;
  totalPages.value = Math.ceil(res.data.data.count / limit.value);
};

const getRequest = async () => {
  const res = await $api.get(
    `/federation/${authStore.userProfile.data.federation.id}/requests/`,
    {
      params: {
        page_size: limit.value,
        page: currentPage.value,
        search: searchQuery.value || undefined,
        status: selectedStatus.value || undefined,
        type: selectedType.value || undefined,
        date: selectedDate.value || undefined,
      },
    }
  );

  requests.value = res.data.data.data;
  totalPages.value = Math.ceil(res.data.data.count / limit.value);
};

watch([searchQuery, selectedStatus, selectedType, selectedDate, currentPage], () => {
  getRequest();
});

watch([search, selectedRegion, selectedSport, selectedGender, currentTrainer], () => {
  getData();
});

onMounted(getData);

watch(activeTab, (newTab) => {
  if (newTab !== "applications" && authStore.userProfile?.data?.federation) {
    getData();
  } else {
    getRequest();
  }
});
</script>
