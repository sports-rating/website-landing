<template>
  <div class="bg-[#2C2C4A] rounded-lg p-4 sm:p-6">
    <!-- Tabs -->
    <div class="flex gap-4 mb-6 border-b border-[#444]">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        @click="
          () => {
            activeTab = tab.key;
            fetchRequests();
          }
        "
        class="px-4 py-2 text-white font-medium"
        :class="
          activeTab === tab.key
            ? 'border-b-2 border-pink-500 text-pink-400'
            : 'text-gray-400 hover:text-white'
        "
      >
        {{ tab.label }}
      </button>
    </div>

    <div>
      <div class="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="text"
          v-model="search"
          placeholder="Поиск игрока"
          class="bg-[#3A3A5A] border border-[#4A4A6A] w-full rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#E91E63]"
        />

        <select
          v-model="selectedStatus"
          class="bg-[#3A3A5A] border !h-9.5 border-[#4A4A6A] rounded-md p-3 w-full text-white focus:outline-none focus:ring-2 focus:ring-[#E91E63]"
        >
          <option value="">Все статусы</option>
          <option value="pending">В обработке</option>
          <option value="accepted">Принято</option>
          <option value="rejected">Отклонено</option>
          <option value="cancelled">Отменено</option>
        </select>

        <el-input
          type="date"
          v-model="selectedDate"
          class="!bg-[#3A3A5A] !border !border-[#4A4A6A] !rounded-md text-white !w-full !h-[50px] focus:outline-none focus:ring-2 focus:ring-[#E91E63]"
        />

        <button
          class="px-3 py-1 rounded bg-[#919090] hover:bg-[#555] disabled:opacity-50 w-full md:w-[8rem] !h-12"
          @click="reset"
        >
          Перезагрузить
        </button>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full text-left text-sm text-white border-collapse">
          <thead>
            <tr class="bg-[#1C1B29]">
              <th class="py-3 px-4 whitespace-nowrap">№</th>
              <th class="py-3 px-4 whitespace-nowrap">ФИО игрока</th>
              <th class="py-3 px-4 whitespace-nowrap">Номер телефона</th>
              <th class="py-3 px-4 whitespace-nowrap">Дата подачи заявки</th>
              <th class="py-3 px-4 whitespace-nowrap">Статус заявки</th>
              <th class="py-3 px-4 whitespace-nowrap">Действие</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in requests"
              :key="item.id"
              class="border-t border-[#4A4A6A] hover:bg-[#383862]"
            >
              <td class="py-3 px-4">{{ index + 1 }}</td>
              <td class="py-3 px-4">{{ item.sender.full_name }}</td>
              <td class="py-3 px-4">{{ item.sender.phone_number }}</td>
              <td class="py-3 px-4">{{ item.created_time }}</td>
              <td class="py-3 px-4">
                <span
                  class="px-2 py-1 rounded text-xs font-medium"
                  :class="{
                    'bg-blue-500 text-white': item.status === 'pending',
                    'bg-green-500 text-white': item.status === 'accepted',
                    'bg-red-500 text-white': item.status === 'rejected',
                    'bg-gray-500 text-white': item.status === 'cancelled',
                  }"
                >
                  {{
                    item.status === "pending"
                      ? "В обработке"
                      : item.status === "accepted"
                      ? "Принято"
                      : item.status === "rejected"
                      ? "Отклонено"
                      : item.status === "cancelled"
                      ? "Отменено"
                      : "Неизвестно"
                  }}
                </span>
              </td>
              <td
                class="py-3 px-4 md:space-x-2 whitespace-nowrap md:flex mx-auto md:space-y-0 space-y-2"
              >
                <button
                  class="text-white bg-[#2E2F3E] p-2 rounded hover:bg-[#5A5A7A] flex items-center justify-center"
                  @click="viewRequest(item.id)"
                >
                  <img src="/Eye.svg" alt="eyes" class="w-4" />
                </button>
                <button
                  v-if="item.status === 'pending'"
                  class="bg-[#7CBF0F] p-2 rounded hover:bg-green-700 flex items-center justify-center"
                  @click="approveRequest(item.id)"
                >
                  <img src="/done.png" alt="done" class="w-4" />
                </button>
                <button
                  v-if="item.status === 'pending'"
                  class="bg-[#E7273D] p-2 rounded hover:bg-red-700 flex items-center justify-center"
                  @click="deleteRequest(item.id)"
                >
                  <img src="/x.svg" alt="x" class="w-4" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div
        class="flex flex-row justify-center items-center mt-6 gap-3 text-white text-sm"
      >
        <button
          @click="changePage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-3 py-1 rounded bg-[#444] hover:bg-[#555] disabled:opacity-50"
        >
          ◀
        </button>

        <span>Страница {{ currentPage }} из {{ totalPages }}</span>

        <button
          @click="changePage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 rounded bg-[#444] hover:bg-[#555] disabled:opacity-50"
        >
          ▶
        </button>
      </div>

      <!-- Dialog -->
      <el-dialog
        v-model="dialogVisible"
        title="Детали заявки"
        :before-close="() => (dialogVisible = false)"
        class="!bg-[#1f1f1f] !text-white rounded-xl sm:max-w-lg md:max-w-xl !w-[90%]"
      >
        <div
          v-if="selectedRequest"
          class="text-white space-y-4 max-h-[70vh] overflow-y-auto px-2 sm:px-4 text-sm md:text-base"
        >
          <!-- ID & Date -->
          <div class="grid grid-cols-1 gap-1.5 md:gap-2.5">
            <p>
              <span class="text-gray-400">📅 Дата подачи:</span>
              {{ selectedRequest.created_time }}
            </p>
          </div>

          <!-- Receiver -->
          <div class="pt-2 border-t border-gray-700">
            <h3 class="font-semibold text-green-400 text-base mb-1">📥 Получатель</h3>
            <p>
              <span class="text-gray-400">👤 ФИО:</span>
              {{ selectedRequest.receiver.full_name }}
            </p>
            <p>
              <span class="text-gray-400">📞 Телефон:</span>
              {{ selectedRequest.receiver.phone_number }}
            </p>
            <p>
              <span class="text-gray-400">🎯 Роль:</span>
              {{ selectedRequest.receiver.user_role }}
            </p>
          </div>

          <!-- Sender -->
          <div class="pt-2 border-t border-gray-700">
            <h3 class="font-semibold text-blue-400 text-base mb-1">📤 Отправитель</h3>
            <p>
              <span class="text-gray-400">👤 ФИО:</span>
              {{ selectedRequest.sender.full_name }}
            </p>
            <p>
              <span class="text-gray-400">📞 Телефон:</span>
              {{ selectedRequest.sender.phone_number }}
            </p>
            <p>
              <span class="text-gray-400">🎯 Роль:</span>
              {{ selectedRequest.sender.user_role }}
            </p>
          </div>

          <div v-if="selectedResult" class="pt-2 border-t border-gray-700">
            <h3 class="font-semibold text-yellow-400 text-base mb-1">📊 Результат</h3>

            <div>
              <p>
                <span class="text-gray-400">🏆 Название:</span>
                {{ selectedResult?.tournament?.name }}
              </p>
              <p>
                <span class="text-gray-400">📍 Место:</span> {{ selectedResult?.country }}
              </p>
              <p>
                <span class="text-gray-400">📅 Дата:</span> {{ selectedResult?.year }}
              </p>
              <p>
                <span class="text-gray-400">🎯 Рейтинг:</span>
                {{ selectedResult.rating }}
              </p>
            </div>
          </div>

          <div
            v-if="currentTabb.request_type === 'sportsman_trainer'"
            class="flex w-full justify-between"
          >
            <!-- Старые данные -->
            <div
              v-if="
                selectedRequest?.old_data && Object.keys(selectedRequest.old_data).length
              "
              class="pt-2 border-t border-gray-700"
            >
              <h3 class="font-semibold text-red-400 text-base mb-1">📜 Старые данные</h3>

              <p>
                <span class="text-gray-400">⚽ Спорт:</span>
                {{
                  selectedRequest.old_data.sport?.name
                    ? selectedRequest.old_data.sport?.name
                    : "не имя"
                }}
              </p>
              <p>
                <span class="text-gray-400">📏 Рост:</span>
                {{
                  selectedRequest.old_data.height ? selectedRequest.old_data.height : 0
                }}
              </p>
              <p>
                <span class="text-gray-400">⚖️ Вес:</span>
                {{
                  selectedRequest.old_data.weight ? selectedRequest.old_data.weight : 0
                }}
              </p>
              <p>
                <span class="text-gray-400">🥋 Ранг:</span>
                {{
                  selectedRequest.old_data.sport_rank
                    ? selectedRequest.old_data.sport_rank
                    : "нет данных"
                }}
              </p>
            </div>

            <!-- Новые данные -->
            <div v-if="selectedRequest?.new_data" class="pt-2 border-t border-gray-700">
              <h3 class="font-semibold text-purple-400 text-base mb-1">
                📋 Новые данные
              </h3>

              <p>
                <span class="text-gray-400">⚽ Спорт:</span>
                {{
                  selectedRequest.new_data.sport?.name
                    ? selectedRequest.new_data.sport?.name
                    : "не имя"
                }}
              </p>
              <p>
                <span class="text-gray-400">📏 Рост:</span>
                {{
                  selectedRequest.new_data.height ? selectedRequest.new_data.height : 0
                }}
              </p>
              <p>
                <span class="text-gray-400">⚖️ Вес:</span>
                {{
                  selectedRequest.new_data.weight ? selectedRequest.new_data.weight : 0
                }}
              </p>
              <p>
                <span class="text-gray-400">🥋 Ранг:</span>
                {{
                  selectedRequest.new_data.sport_rank
                    ? selectedRequest.new_data.sport_rank
                    : "нет данных"
                }}
              </p>
            </div>
          </div>

          <div v-if="currentTabb.request_type === 'sportsman_result'">
            <div v-if="selectedRequest?.new_data" class="pt-2 border-t border-gray-700">
              <h3 class="font-semibold text-purple-400 text-base mb-1">
                📋 Новые результат
              </h3>

              <p v-if="selectedRequest.new_data.country">
                <span class="text-gray-400">⚽ Страна:</span>
                {{ selectedRequest.new_data.country }}
              </p>
              <p v-if="selectedRequest.new_data.tournament">
                <span class="text-gray-400">📏 Турнир:</span>
                {{ selectedRequest.new_data.tournament.name }}
              </p>
              <p v-if="selectedRequest.new_data.year">
                <span class="text-gray-400">⚖️ Год:</span>
                {{ selectedRequest.new_data.year }}
              </p>
              <p v-if="selectedRequest.new_data.rating">
                <span class="text-gray-400">🥋 Рейтинг:</span>
                {{ selectedRequest.new_data.rating }}
              </p>
              <p v-if="selectedRequest.new_data.score">
                <span class="text-gray-400">🥋 Счет:</span>
                {{ selectedRequest.new_data.score }}
              </p>
            </div>
          </div>

          <p>
            <span class="text-gray-400">📍 Статус:</span>
            <span
              class="inline-block px-3 py-1 rounded-full shadow text-xs md:text-sm font-semibold ml-2"
              :class="{
                'bg-blue-600': selectedRequest.status === 'pending',
                'bg-green-600': selectedRequest.status === 'accepted',
                'bg-red-600': selectedRequest.status === 'rejected',
                'bg-gray-600': selectedRequest.status === 'cancelled',
              }"
            >
              {{
                selectedRequest.status === "pending"
                  ? "В обработке"
                  : selectedRequest.status === "accepted"
                  ? "Принято"
                  : selectedRequest.status === "rejected"
                  ? "Отклонено"
                  : selectedRequest.status === "cancelled"
                  ? "Отменено"
                  : "Неизвестно"
              }}
            </span>
          </p>
        </div>

        <!-- Loading -->
        <div v-else class="text-center py-8 text-gray-300 text-sm">⏳ Загрузка...</div>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
const { $api } = useNuxtApp();

const tabs = [
  { key: "sportsman", label: "Список спортсменов", request_type: "sportsman_trainer" },
  { key: "result", label: "Список rезультат", request_type: "sportsman_result" },
];

const activeTab = ref("sportsman");
const search = ref("");
const selectedStatus = ref("");
const selectedDate = ref("");
const requests = ref([]);
const totalCount = ref(0);
const loading = ref(false);
const currentPage = ref(1);
const itemsPerPage = ref(10);
const totalPages = computed(() => Math.ceil(totalCount.value / itemsPerPage.value));
const currentTabb = ref(null);
const fetchRequests = async () => {
  try {
    loading.value = true;
    const currentTab = tabs.find((t) => t.key === activeTab.value);
    currentTabb.value = tabs.find((t) => t.key === activeTab.value);
    const params = {
      page: currentPage.value,
      page_size: itemsPerPage.value,
      search: search.value || undefined,
      status: selectedStatus.value || undefined,
      date: selectedDate.value || undefined,
      request_type: currentTab?.request_type,
    };

    const res = await $api.get("user/requests/?type=received", { params });
    requests.value = res.data.data.data;
    totalCount.value = res.data.data.count;
  } catch (err) {
    console.error("Ошибка при получении заявок:", err);
  } finally {
    loading.value = false;
  }
};
const reset = () => {
  ElMessage.success("Страница обновлена ✅");
  fetchRequests();

  search = "";
  selectedStatus = "";
  selectedDate = "";
};

watch([currentPage, search, selectedStatus, selectedDate], fetchRequests);

onMounted(fetchRequests);

const dialogVisible = ref(false);
const selectedRequest = ref(null);

const selectedResult = ref(null);

const viewRequest = async (id) => {
  try {
    dialogVisible.value = true;
    selectedRequest.value = null;
    selectedResult.value = null;

    const res = await $api.get(`user/requests/${id}/`);
    selectedRequest.value = res.data.data;

    if (selectedRequest.value.result_id) {
      try {
        const resultRes = await $api.get(
          `user/profile/results/${selectedRequest.value.result_id}/`
        );
        selectedResult.value = resultRes.data.data;
      } catch (err) {
        console.error("Ошибка при загрузке результата:", err);
      }
    }
  } catch (err) {
    console.error("Ошибка при просмотре:", err);
  }
};

const approveRequest = async (id) => {
  try {
    await ElMessageBox.confirm(
      "Вы уверены, что хотите подтвердить эту заявку?",
      "Подтверждение",
      {
        confirmButtonText: "Подтвердить",
        cancelButtonText: "Отмена",
        type: "success",
      }
    );

    await $api.patch(`user/requests/${id}/`, {
      status: "accepted",
    });

    ElMessage.success("Заявка успешно подтверждена ✅");
    await fetchRequests();
  } catch (err) {
    if (err === "cancel") {
      ElMessage.info("Подтверждение отменено");
    } else {
      console.error("Ошибка при подтверждении:", err);
      ElMessage.error("Ошибка при подтверждении заявки ❌");
    }
  }
};

const deleteRequest = async (id) => {
  try {
    await ElMessageBox.confirm(
      "Вы уверены, что хотите Отменить эту заявку?",
      "Подтверждение Отменить",
      {
        confirmButtonText: "Отменить",
        cancelButtonText: "Отмена",
        type: "warning",
      }
    );

    await $api.patch(`user/requests/${id}/`, {
      status: "rejected",
    });
    ElMessage.success("Заявка успешно Отменить 🗑️");
    await fetchRequests();
  } catch (err) {
    if (err === "cancel") {
      ElMessage.info("Удаление Отменить");
    } else {
      console.error("Ошибка при Отменить:", err);
      ElMessage.error("Ошибка при Отменить заявки ❌");
    }
  }
};

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    window.scrollTo(0, 0);
  }
};
</script>

<style>
.el-dialog__title {
  color: white !important;
}

.el-input__wrapper {
  background-color: #3a3a5a !important;
  box-shadow: none !important;
}

.el-input__inner {
  color: white !important;
}
</style>
