<template>
  <div class="bg-gray-900 text-white p-4 md:p-6">
    <h1 class="text-lg md:text-xl font-semibold mb-4 md:mb-6">Федерации</h1>

    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <div class="relative w-full md:w-auto">
        <input
          :value="search"
          @input="emit('update:search', $event.target.value)"
          type="text"
          placeholder="Поиск федерации"
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

        <button
          @click="showAddBranchDialog = true"
          class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs md:text-sm transition-colors"
        >
          Добавить филиал
        </button>
      </div>
    </div>

    <div class="bg-gray-800 rounded-lg overflow-hidden overflow-x-auto">
      <table class="w-full min-w-[900px]">
        <thead class="bg-gray-700 text-xs md:text-sm">
          <tr>
            <th class="px-4 py-3 text-left font-medium">№</th>
            <th class="px-4 py-3 text-left font-medium">Лидер</th>
            <th class="px-4 py-3 text-left font-medium">Регион</th>
            <th class="px-4 py-3 text-left font-medium">Вид спорта</th>
            <th class="px-4 py-3 text-left font-medium">Номер телефона</th>
            <th class="px-4 py-3 text-left font-medium">Действие</th>
          </tr>
        </thead>
        <tbody class="text-xs md:text-sm">
          <tr
            v-for="(coach, index) in props.data"
            :key="coach.id"
            class="border-t border-gray-700 hover:bg-gray-750 transition-colors"
          >
            <td class="px-4 py-3">{{ page - 1 + index + 1 }}</td>
            <td class="px-4 py-3">
              <div class="font-medium">{{ coach.full_name }}</div>
            </td>
            <td class="px-4 py-3">{{ coach.birth_date || "-" }}</td>
            <td class="px-4 py-3">{{ coach.region?.name || "-" }}</td>
            <td class="px-4 py-3">{{ coach.gender }}</td>
            <td class="px-4 py-3">{{ coach.phone_number }}</td>
            <td class="px-4 py-3">{{ coach.sport?.name }}</td>
            <td class="px-4 py-3">
              <button
                class="bg-[#7CBF0F] hover:bg-green-700 text-white px-3 py-1 rounded text-xs md:text-sm transition-colors"
              >
                <img src="/editt.svg" alt="edit" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div
        v-if="totalPages"
        class="flex flex-wrap justify-center items-center gap-2 my-6"
      >
        <button
          @click="emit('update:page', page - 1)"
          :disabled="page === 1"
          class="px-3 py-2 rounded bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          Prev
        </button>

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

    <el-dialog
      v-model="showAddBranchDialog"
      title="Добавить новый филиал"
      width="500px"
      align-center=""
      :before-close="handleDialogClose"
    >
      <div class="space-y-4">
        <p class="text-gray-600 text-sm mb-6">
          Заполните все поля чтобы добавить новый филиал
        </p>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            ФИО руководителя
          </label>
          <el-select
            v-model="branchForm.managerId"
            placeholder="Введите ФИО руководителя"
            class="w-full"
            filterable
          >
            <el-option
              v-for="manager in managers"
              :key="manager.id"
              :label="manager.full_name"
              :value="manager.id"
            />
          </el-select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Номер телефона
          </label>
          <el-input v-model="branchForm.phoneNumber" placeholder="+998" class="w-full" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"> Регион </label>
          <el-select
            v-model="branchForm.regionId"
            placeholder="Выберите регион"
            class="w-full"
          >
            <el-option
              v-for="region in regions"
              :key="region.id"
              :label="region.name"
              :value="region.id"
            />
          </el-select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Выберите вид спорта
          </label>
          <el-select
            v-model="branchForm.sportId"
            placeholder="Выберите регион"
            class="w-full"
          >
            <el-option
              v-for="sport in sports"
              :key="sport.id"
              :label="sport.name"
              :value="sport.id"
            />
          </el-select>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end">
          <el-button
            type="primary"
            @click="handleAddBranch"
            :loading="isSubmitting"
            class="!bg-red-600 hover:!bg-red-700 !border-red-600 hover:!border-red-700 w-full"
          >
            Добавить
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useNuxtApp } from "#app";

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
  "branch-added",
]);

const regions = ref([]);
const sports = ref([]);
const managers = ref([]);
const showAddBranchDialog = ref(false);
const isSubmitting = ref(false);
const currentPage = ref(1);
const itemsPerPage = 10;

const branchForm = ref({
  managerId: "",
  phoneNumber: "+998",
  regionId: "",
  sportId: "",
});

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
    regions.value = res.data.data;
  } catch (err) {
    console.error("Regions yuklashda xatolik:", err);
  }
};

const getManagers = async () => {
  try {
    const res = await $api.get("/managers/");
    managers.value = res.data.data;
  } catch (err) {
    console.error("Managers yuklashda xatolik:", err);
  }
};

const handleDialogClose = (done) => {
  branchForm.value = {
    managerId: "",
    phoneNumber: "+998",
    regionId: "",
    sportId: "",
  };
  done();
};

const handleAddBranch = async () => {
  try {
    isSubmitting.value = true;

    const payload = {
      manager_id: branchForm.value.managerId,
      phone_number: branchForm.value.phoneNumber,
      region_id: branchForm.value.regionId,
      sport_id: branchForm.value.sportId,
    };

    await $api.post("/branches/", payload);

    showAddBranchDialog.value = false;
    branchForm.value = {
      managerId: "",
      phoneNumber: "+998",
      regionId: "",
      sportId: "",
    };

    emit("branch-added");
  } catch (err) {
    if (err.response?.data) {
      const data = err.response.data;

      if (typeof data === "object" && !Array.isArray(data)) {
        if (data.message && typeof data.message === "string") {
          ElMessage.error(data.message);
        } else {
          Object.keys(data).forEach((field) => {
            if (Array.isArray(data[field])) {
              data[field].forEach((msg) => {
                ElMessage.error(msg);
              });
            }
          });
        }
      } else if (typeof data === "string") {
        ElMessage.error(data);
      }
    } else {
      ElMessage.error("Ошибка при создании!");
    }
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(() => {
  getRegions();
  getSports();
  getManagers();
});
</script>

<style scoped>
.bg-gray-750 {
  background-color: #374151;
}

:deep(.el-dialog) {
  border-radius: 12px;
}
:deep(.el-dialog__title) {
  color: black !important;
}

:deep(.el-dialog__header) {
  padding: 24px 24px 0;
}

:deep(.el-dialog__body) {
  padding: 24px;
}

:deep(.el-dialog__footer) {
  padding: 0 24px 24px;
}

:deep(.el-select) {
  width: 100%;
}

:deep(.el-input) {
  width: 100%;
}
</style>
