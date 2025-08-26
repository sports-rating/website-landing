<template>
  <NuxtLayout name="custom">
    <div
      v-if="authStore.userProfile?.data?.federation"
      class="min-h-screen bg-[#11101B] p-6 text-white"
    >
      <!-- Header -->
      <header
        class="bg-transparent px-6 md:px-12 py-4 flex flex-col md:flex-row md:justify-between md:items-center gap-6"
      >
        <!-- Matn -->
        <div class="flex flex-col gap-2 text-center md:text-left order-2 md:order-1">
          <h1 class="text-3xl md:text-5xl font-bold">
            {{ authStore.userProfile?.data?.federation?.name }}
          </h1>

          <p class="text-lg md:text-2xl font-bold">
            Управляющий федереции:
            {{ authStore.userProfile?.data?.first_name }}
            {{ authStore.userProfile?.data?.last_name }}
          </p>
        </div>

        <!-- Rasm -->
        <img
          :src="authStore.userProfile?.data?.federation?.logo"
          class="w-[200px] h-[200px] md:w-[350px] md:h-[350px] rounded-full mx-auto md:mx-0 order-1 md:order-2"
        />
      </header>

      <!-- Tabs -->
      <nav
        class="bg-gray-800 px-4 py-3 w-full md:w-[97%] mx-auto overflow-x-auto rounded-lg"
      >
        <div class="flex space-x-6 text-sm whitespace-nowrap">
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
      <div class="p-4 md:p-6 rounded-lg" v-if="activeTab">
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

        <FederationList
          v-if="activeTab === 'federation'"
          v-model:search="search"
          v-model:region="selectedRegion"
          v-model:sport="selectedSport"
          v-model:gender="selectedGender"
          v-model:page="currentTrainer"
          :total-pages="totalPages"
          :data="dataFederation"
        />

        <Judges
          v-if="activeTab === 'judges'"
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
import FederationList from "~/components/tabs/FederationList.vue";
import Judges from "~/components/tabs/Judges.vue";

const authStore = useAuthStore();
const { $api } = useNuxtApp();

const activeTab = ref("applications");
const data = ref([]);
const dataFederation = ref([]);
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
  { key: "judges", label: "Судялар", user_role: "" },
  { key: "applications", label: "Заявки", user_role: null },
  { key: "competition", label: "Соревнование", user_role: null },
  { key: "statistics", label: "Статистика", user_role: null },
];

const getData = async () => {
  const role = tabs.find((t) => t.key === activeTab.value)?.user_role || "";
  if (!authStore.userProfile?.data?.federation) return;
  const res = await $api.get(
    `/federation/${authStore.userProfile?.data?.federation?.id}/users/`,
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
  if (!authStore.userProfile?.data?.federation?.id) return;

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

onMounted(async () => {
  await authStore.fetchUserProfile();

  if (authStore.userProfile?.data?.federation?.id) {
    if (activeTab.value === "applications") {
      getRequest();
    } else {
      getData();
    }
  }
});

watch(activeTab, (newTab) => {
  if (!authStore.userProfile?.data?.federation?.id) return;
  if (newTab !== "applications") {
    getData();
  } else {
    getRequest();
  }
});
</script>
