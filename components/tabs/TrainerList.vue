<template>
  <div class="bg-gray-900 text-white p-4 md:p-6">
    <!-- Header -->
    <h1 class="text-lg md:text-xl font-semibold mb-4 md:mb-6">Список тренеров</h1>

    <!-- Filters -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <!-- Search -->
      <div class="relative w-full md:w-auto">
        <input
          :value="search"
          @input="emit('update:search', $event.target.value)"
          type="text"
          placeholder="Поиск тренер"
          class="w-full md:w-64 bg-gray-800 border border-gray-700 rounded px-3 py-2 pr-10 text-sm focus:outline-none focus:border-gray-600"
        />
        <svg
          class="absolute right-3 top-2.5 w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <!-- Dropdowns -->
      <div class="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
        <select
          :value="region"
          @change="emit('update:region', $event.target.value)"
          class="w-full sm:w-60 bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-600"
        >
          <option value="">Все регионы</option>
          <option v-for="region in regions" :key="region.id" :value="region.id">
            {{ region.name }}
          </option>
        </select>

        <select
          :value="sport"
          @change="emit('update:sport', $event.target.value)"
          class="w-full sm:w-60 bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-600"
        >
          <option value="">Все виды спорта</option>
          <option v-for="item in sports" :key="item.id" :value="item.id">
            {{ item.name }}
          </option>
        </select>

        <select
          :value="gender"
          @change="emit('update:gender', $event.target.value)"
          class="w-full sm:w-60 bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-600"
        >
          <option value="">Все полы</option>
          <option value="male">Мужской</option>
          <option value="female">Женский</option>
        </select>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-gray-800 rounded-lg overflow-hidden overflow-x-auto">
      <table class="w-full min-w-[900px]">
        <thead class="bg-gray-700 text-xs md:text-sm">
          <tr>
            <th class="px-4 py-3 text-left font-medium">№</th>
            <th class="px-4 py-3 text-left font-medium">Ф.И.О</th>
            <th class="px-4 py-3 text-left font-medium">Дата рождения</th>
            <th class="px-4 py-3 text-left font-medium">Регион</th>
            <th class="px-4 py-3 text-left font-medium">Пол</th>
            <th class="px-4 py-3 text-left font-medium">Номер телефона</th>
            <th class="px-4 py-3 text-left font-medium">Вид спорта</th>
            <th class="px-4 py-3 text-left font-medium">Действие</th>
          </tr>
        </thead>
        <tbody class="text-xs md:text-sm">
          <tr
            v-for="(coach, index) in props.data"
            :key="coach.id"
            class="border-t border-gray-700 hover:bg-gray-750 transition-colors"
          >
            <td class="px-4 py-3 text-sm">{{ (page - 1) * 10 + index + 1 }}</td>
            <td class="px-4 py-3">
              <div class="font-medium">{{ coach.full_name }}</div>
            </td>
            <td class="px-4 py-3">{{ coach.birth_date || "-" }}</td>
            <td class="px-4 py-3">{{ coach.region?.name || "-" }}</td>
            <td class="px-4 py-3 text-sm">
              {{
                coach.gender === "male"
                  ? "Мужчина"
                  : coach.gender === "female"
                  ? "Женщина"
                  : "-"
              }}
            </td>

            <td class="px-4 py-3">{{ coach.phone_number }}</td>
            <td class="px-4 py-3">{{ coach.sport?.name }}</td>
            <td class="px-4 py-3">
              <button
                class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs md:text-sm transition-colors"
              >
                Удалить
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div
        v-if="totalPages"
        class="flex flex-wrap justify-center items-center gap-2 my-6"
      >
        <!-- Prev -->
        <button
          @click="emit('update:page', page - 1)"
          :disabled="page === 1"
          class="px-3 py-2 rounded bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          Prev
        </button>

        <!-- Page numbers -->
        <button
          v-for="p in totalPages"
          :key="p"
          @click="emit('update:page', p)"
          :class="[
            'px-3 py-2 rounded text-sm transition-colors',
            p === page
              ? 'bg-red-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600',
          ]"
        >
          {{ p }}
        </button>

        <!-- Next -->
        <button
          @click="emit('update:page', page + 1)"
          :disabled="page === totalPages"
          class="px-3 py-2 rounded bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          Next
        </button>
      </div>

      <el-empty v-else :image-size="200" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
const { $api } = useNuxtApp();

const props = defineProps({
  data: { type: Array, default: () => [] },
  search: String,
  region: String,
  sport: String,
  gender: String,
  page: Number,
  totalPages: Number,
});

const emit = defineEmits([
  "update:search",
  "update:region",
  "update:sport",
  "update:gender",
]);

const regions = ref([]);
const sports = ref([]);

const getSports = async () => {
  try {
    const sportRes = await $api.get("sport/");
    sports.value = sportRes.data.data;
  } catch (e) {
    console.error("Sport error:", e);
  }
};

const getRegions = async () => {
  try {
    const res = await $api.get("/user/regions/");
    regions.value = res.data.data.map(({ id, name }) => ({ id, name }));
  } catch (err) {
    console.error("Regions yuklashda xatolik:", err);
  }
};

getRegions();
getSports();

const currentPage = ref(1);
const itemsPerPage = 10;
</script>

<style scoped>
.bg-gray-750 {
  background-color: #374151;
}
</style>
