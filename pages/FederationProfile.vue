<template>
  <NuxtLayout name="custom">
    <div class="min-h-screen bg-[#11101B] p-6 text-white">
      <!-- Header -->
      <header class="bg-transparent px-12 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-start space-x-4">
            <div>
              <h1 class="text-5xl font-bold w-[70%]">Узбекистон жиу-житсу федерацияси</h1>
              <p class="text-sm mt-5">
                Ўзбекистон Федерацияси Жиу-житсу Спорт федерацияси
              </p>
            </div>
          </div>
          <div class="rounded-full flex items-center justify-center">
            <img src="/federation.svg" alt="federation" />
          </div>
        </div>
      </header>

      <!-- Navigation -->
      <nav class="bg-gray-800 px-6 py-3 w-[95%] mx-auto">
        <div class="flex space-x-6 text-sm">
          <a href="#" class="text-blue-400 hover:text-blue-300">Спортсмены</a>
          <a href="#" class="text-gray-300 hover:text-white">Спортивные школы и клубы</a>
          <a href="#" class="text-gray-300 hover:text-white">Спортивные соревнования</a>
          <a href="#" class="text-gray-300 hover:text-white">Статистика</a>
          <a href="#" class="text-gray-300 hover:text-white">Тренеры</a>
          <a href="#" class="text-gray-300 hover:text-white">Заявки</a>
          <a href="#" class="text-gray-300 hover:text-white">Архивные</a>
        </div>
      </nav>

      <!-- Content -->
      <div class="p-6">
        <h2 class="text-xl font-semibold mb-6">Список спортсменов</h2>

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
                <th class="px-4 py-3 text-left text-sm font-medium">ФИО игрока</th>
                <th class="px-4 py-3 text-left text-sm font-medium">Тип игрока</th>
                <th class="px-4 py-3 text-left text-sm font-medium">
                  Дата подачи заявки
                </th>
                <th class="px-4 py-3 text-left text-sm font-medium">Статус заявки</th>
                <th class="px-4 py-3 text-left text-sm font-medium">Действия</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(athlete, index) in paginatedAthletes"
                :key="index"
                class="border-t border-gray-700 hover:bg-gray-750"
              >
                <td class="px-4 py-3 text-sm">
                  {{ (currentPage - 1) * itemsPerPage + index + 1 }}
                </td>
                <td class="px-4 py-3 text-sm">{{ athlete.name }}</td>
                <td class="px-4 py-3">
                  <span
                    :class="getStatusClass(athlete.type)"
                    class="px-2 py-1 rounded text-xs font-medium"
                  >
                    {{ athlete.type }}
                  </span>
                </td>
                <td class="px-4 py-3 text-sm">{{ athlete.date }}</td>
                <td class="px-4 py-3">
                  <span
                    :class="getApplicationStatusClass(athlete.status)"
                    class="px-2 py-1 rounded text-xs font-medium"
                  >
                    {{ athlete.status }}
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
  </NuxtLayout>
</template>

<script setup>
import { ref, computed } from "vue";
import { Eye, Edit, Trash2 } from "lucide-vue-next";

// Pagination logic
const currentPage = ref(1);
const itemsPerPage = 5;

const athletes = ref([
  {
    name: "Гафуров Максимбек Мухаммадович",
    type: "Спортсмен",
    date: "02.04.2024, 16:30",
    status: "В обработке",
  },
  {
    name: "Гафуров Максимбек Мухаммадович",
    type: "Игрок в команде",
    date: "02.04.2024, 16:30",
    status: "Завершено",
  },
  {
    name: "Гафуров Максимбек Мухаммадович",
    type: "Спортсмен",
    date: "02.04.2024, 16:30",
    status: "В обработке",
  },
  {
    name: "Гафуров Максимбек Мухаммадович",
    type: "Игрок в команде",
    date: "02.04.2024, 16:30",
    status: "Завершено",
  },
  {
    name: "Гафуров Максимбек Мухаммадович",
    type: "Спортсмен",
    date: "02.04.2024, 16:30",
    status: "В обработке",
  },
  {
    name: "Гафуров Максимбек Мухаммадович",
    type: "Спортсмен",
    date: "02.04.2024, 16:30",
    status: "В обработке",
  },
  {
    name: "Гафуров Максимбек Мухаммадович",
    type: "Спортсмен",
    date: "02.04.2024, 16:30",
    status: "Завершено",
  },
  {
    name: "Гафуров Максимбек Мухаммадович",
    type: "Игрок в команде",
    date: "02.04.2024, 16:30",
    status: "Завершено",
  },
  {
    name: "Гафуров Максимбек Мухаммадович",
    type: "Игрок в команде",
    date: "02.04.2024, 16:30",
    status: "Завершено",
  },
  {
    name: "Гафуров Максимбек Мухаммадович",
    type: "Игрок в команде",
    date: "02.04.2024, 16:30",
    status: "Завершено",
  },
]);

const totalPages = computed(() => Math.ceil(athletes.value.length / itemsPerPage));

const paginatedAthletes = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return athletes.value.slice(start, start + itemsPerPage);
});

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const getStatusClass = (type) => {
  return type === "Спортсмен"
    ? "bg-yellow-600 text-yellow-100"
    : "bg-orange-600 text-orange-100";
};

const getApplicationStatusClass = (status) => {
  return status === "В обработке"
    ? "bg-blue-600 text-blue-100"
    : "bg-green-600 text-green-100";
};
</script>

<style scoped>
.hover\:bg-gray-750:hover {
  background-color: rgb(55, 65, 81);
}
</style>
