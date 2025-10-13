<template>
  <div></div>
  <div class="bg-[#1E1E2E] text-white rounded-xl">
    <!-- Jadval -->
    <el-table :data="data" style="width: 100%" class="rounded-lg bg-transparent">
      <!-- № -->
      <el-table-column label="№" width="60" align="center">
        <template #default="scope">
          {{ (currentPage - 1) * pageSize + scope.$index + 1 }}
        </template>
      </el-table-column>

      <!-- Foto -->
      <el-table-column label="Фото" width="90" align="center">
        <template #default="scope">
          <img
            :src="scope.row.profile_photo || '/default-avatar.png'"
            alt="logo"
            class="w-10 h-10 rounded-full object-cover border border-gray-600"
          />
        </template>
      </el-table-column>

      <!-- ФИО -->
      <el-table-column label="ФИО" min-width="200">
        <template #default="scope">
          {{ scope.row.last_name }} {{ scope.row.first_name }}
        </template>
      </el-table-column>

      <!-- Вид спорта -->
      <el-table-column label="Вид спорта" prop="sport" min-width="160">
        <template #default="scope">
          {{ scope.row.sport ? scope.row.sport : "-" }}
        </template>
      </el-table-column>

      <!-- Результаты -->
      <el-table-column label="Результаты" min-width="220">
        <template #default="scope">
          <div class="flex gap-3 text-sm">
            <span class="text-yellow-400 font-semibold">
              🥇 {{ scope.row.statistics?.total_gold || 0 }}
            </span>
            <span class="text-gray-300">
              🥈 {{ scope.row.statistics?.total_silver || 0 }}
            </span>
            <span class="text-orange-400">
              🥉 {{ scope.row.statistics?.total_bronze || 0 }}
            </span>
            <span class="text-blue-400">
              🏆 {{ scope.row.statistics?.total_competitions || 0 }}
            </span>
          </div>
        </template>
      </el-table-column>

      <!-- Очки -->
      <el-table-column label="Очки" min-width="120" align="center">
        <template #default="scope">
          <span class="font-semibold text-emerald-400">{{ scope.row.points }}</span>
        </template>
      </el-table-column>

      <!-- Оплата -->
      <el-table-column label="Оплата" min-width="140" align="center">
        <template #default="scope">
          <span
            v-if="scope.row.is_result_paid === true"
            class="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium"
          >
            Оплачено
          </span>
          <span
            v-else-if="scope.row.is_result_paid === false"
            class="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-medium"
          >
            Не оплачено
          </span>
          <span v-else class="text-gray-400">-</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <!-- Pagination -->
  <div class="flex justify-center mt-6">
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      v-model:current-page="currentPage"
      @current-change="getData"
      class="text-white"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "~/stores/auth";

const { $api } = useNuxtApp();
const data = ref([]);
const total = ref(0);
const loading = ref(false);
const currentPage = ref(1);
const pageSize = ref(10);
const authStore = useAuthStore();

const getData = async (page = 1) => {
  loading.value = true;
  try {
    const res = await $api.get(
      `/user/sportsmen/?page=${page}&page_size=${pageSize.value}&trainer=${authStore.userProfile?.data?.id}`
    );
    data.value = res.data.data || res.data.data.data || [];
    total.value = res.data.count || 0;
  } catch (e) {
    console.error("Sport error:", e);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getData(currentPage.value);
});
</script>

<style scoped>
:deep(.el-table th) {
  background-color: #2e2f3e !important;
  color: #fff !important;
}

:deep(.el-table tr) {
  background-color: #2e2f3e !important;
  color: #fff !important;
}

:deep(.el-table__body tr:hover > td) {
  background-color: #53556b !important;
}
</style>
