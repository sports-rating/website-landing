<template>
  <NuxtLayout name="custom">
    <div
      v-if="authStore.userProfile?.data?.federation"
      class="min-h-screen bg-[#11101B] p-6 text-white"
    >
      <!-- Header -->
      <header class="bg-transparent px-12 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-5xl font-bold">
              {{ authStore.userProfile?.data?.federation?.name }}
            </h1>
          </div>
          <img
            :src="authStore.userProfile?.data?.federation?.logo"
            alt="federation"
            class="!w-24 !h-24 rounded-full"
          />
        </div>
      </header>

      <!-- Navigation Tabs -->
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

      <!-- Content -->
      <div class="p-6">
        <h2 class="text-xl font-semibold mb-6">{{ getActiveTabLabel }}</h2>

        <!-- Filters -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label class="block text-sm font-medium mb-2">Выбор группы</label>
            <select
              class="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm"
            >
              <option>Все группы</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">Квалификация</label>
            <select
              class="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm"
            >
              <option>Все</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">Категория</label>
            <select
              class="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm"
            >
              <option>Все категории</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">Действия</label>
            <button
              class="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
            >
              Поиск
            </button>
          </div>
        </div>

        <!-- Table -->
        <div class="bg-gray-800 rounded-lg overflow-hidden">
          <table class="w-full">
            <thead class="bg-gray-700">
              <tr>
                <th class="px-4 py-3 text-left text-sm font-medium">№</th>
                <th class="px-4 py-3 text-left text-sm font-medium">ФИО</th>
                <th class="px-4 py-3 text-left text-sm font-medium">Тип</th>
                <th class="px-4 py-3 text-left text-sm font-medium">Дата</th>
                <th class="px-4 py-3 text-left text-sm font-medium">Статус</th>
                <th class="px-4 py-3 text-left text-sm font-medium">Действия</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in paginatedData"
                :key="index"
                class="border-t border-gray-700 hover:bg-gray-750"
              >
                <td class="px-4 py-3 text-sm">
                  {{ (currentPage - 1) * itemsPerPage + index + 1 }}
                </td>
                <td class="px-4 py-3 text-sm">{{ item.name }}</td>
                <td class="px-4 py-3">
                  <span
                    :class="getStatusClass(item.type)"
                    class="px-2 py-1 rounded text-xs font-medium"
                  >
                    {{ item.type }}
                  </span>
                </td>
                <td class="px-4 py-3 text-sm">{{ item.date }}</td>
                <td class="px-4 py-3">
                  <span
                    :class="getApplicationStatusClass(item.status)"
                    class="px-2 py-1 rounded text-xs font-medium"
                  >
                    {{ item.status }}
                  </span>
                </td>
                <td class="px-4 py-3">
                  <div class="flex space-x-2">
                    <button class="p-1 text-blue-400 hover:text-blue-300">
                      <Eye class="w-4 h-4" />
                    </button>
                    <button class="p-1 text-green-400 hover:text-green-300">
                      <Edit class="w-4 h-4" />
                    </button>
                    <button class="p-1 text-red-400 hover:text-red-300">
                      <Trash2 class="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="flex items-center justify-center mt-6 space-x-2">
          <button
            @click="changePage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded disabled:opacity-50"
          >
            ←
          </button>

          <button
            v-for="page in totalPages"
            :key="page"
            @click="changePage(page)"
            :class="[
              'w-8 h-8 rounded flex items-center justify-center text-sm',
              currentPage === page
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 hover:bg-gray-600 text-white',
            ]"
          >
            {{ page }}
          </button>

          <button
            @click="changePage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded disabled:opacity-50"
          >
            →
          </button>
        </div>
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
import { ref, computed } from "vue";
import { Eye, Edit, Trash2 } from "lucide-vue-next";
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();

// Tabs list
const tabs = [
  { key: "federation", label: "Федерации" },
  { key: "athletes", label: "Спортсмены" },
  { key: "trainers", label: "Тренеры" },
  { key: "judges", label: "Судялар" },
  { key: "applications", label: "Заявки" },
  { key: "competition", label: "Соревнование" },
  { key: "statistics", label: "Статистика" },
];

const activeTab = ref("athletes");

const dataMap = {
  athletes: [
    { name: "Иванов Иван", type: "Спортсмен", date: "02.04.2024", status: "В обработке" },
    {
      name: "Петров Петр",
      type: "Игрок в команде",
      date: "05.04.2024",
      status: "Завершено",
    },
  ],
  trainers: [
    {
      name: "Сидоров Алексей",
      type: "Тренер",
      date: "12.04.2024",
      status: "В обработке",
    },
  ],
  judges: [
    { name: "Мирзаев Бахтиёр", type: "Судья", date: "15.04.2024", status: "Завершено" },
  ],
  applications: [
    { name: "Заявка №1", type: "Документ", date: "20.04.2024", status: "В обработке" },
  ],
};

// Pagination
const currentPage = ref(1);
const itemsPerPage = 5;

const activeData = computed(() => dataMap[activeTab.value] || []);

const totalPages = computed(() => Math.ceil(activeData.value.length / itemsPerPage));

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return activeData.value.slice(start, start + itemsPerPage);
});

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const getActiveTabLabel = computed(() => {
  const tab = tabs.find((t) => t.key === activeTab.value);
  return tab ? tab.label : "";
});

// Styles
const getStatusClass = (type) =>
  type === "Спортсмен"
    ? "bg-yellow-600 text-yellow-100"
    : "bg-orange-600 text-orange-100";

const getApplicationStatusClass = (status) =>
  status === "В обработке" ? "bg-blue-600 text-blue-100" : "bg-green-600 text-green-100";
</script>

<style scoped>
.hover\:bg-gray-750:hover {
  background-color: rgb(55, 65, 81);
}
</style>
