<script setup>
const { $api } = useNuxtApp();
const props = defineProps({
  data: { type: Array, default: () => [] },
  search: String,
  status: String,
  type: String,
  date: String,
  page: Number,
  totalPages: Number,
});

const emit = defineEmits([
  "update:search",
  "update:status",
  "update:type",
  "update:date",
  "update:page",
  "refresh",
]);

const getStatusBadgeClass = (topic) => {
  if (topic === "trainer_federation_request") {
    return "bg-yellow-600 text-yellow-100";
  } else if (topic === "achievement") {
    return "bg-teal-600 text-teal-100";
  }
  return "bg-gray-600 text-gray-100";
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
    emit("refresh");
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
      "Вы уверены, что хотите удалить эту заявку?",
      "Подтверждение удаления",
      {
        confirmButtonText: "Удалить",
        cancelButtonText: "Отмена",
        type: "warning",
      }
    );

    await $api.patch(`user/requests/${id}/`, {
      status: "rejected",
    });
    ElMessage.success("Заявка успешно удалена 🗑️");
    emit("refresh");
  } catch (err) {
    if (err === "cancel") {
      ElMessage.info("Удаление отменено");
    } else {
      console.error("Ошибка при удалении:", err);
      ElMessage.error("Ошибка при удалении заявки ❌");
    }
  }
};

const dialogVisible = ref(false);
const selectedRequest = ref(null);

const viewRequest = async (id) => {
  try {
    dialogVisible.value = true;
    selectedRequest.value = null;
    const res = await $api.get(`user/requests/${id}/`);
    selectedRequest.value = res.data.data;
  } catch (err) {
    console.error("Ошибка при просмотре:", err);
  }
};
</script>

<template>
  <div class="min-h-screen bg-gray-900 text-white p-6">
    <!-- Header -->
    <h1 class="text-2xl font-bold mb-6">Заявки</h1>

    <!-- Filters -->
    <div class="flex items-center justify-between w-full gap-4 mb-6">
      <div class="relative">
        <input
          :value="search"
          @input="emit('update:search', $event.target.value)"
          type="text"
          placeholder="Поиск заявки"
          class="bg-gray-800 border border-gray-700 rounded px-3 py-2 pr-10 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
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
          ></path>
        </svg>
      </div>

      <div class="flex gap-4">
        <select
          :value="type"
          @change="emit('update:type', $event.target.value)"
          class="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
        >
          <option value="">Все типы заявки</option>
          <option value="trainer">Вступить в членство</option>
          <option value="admin">Присоединяйтесь к администратору</option>
          <!-- <option value="achievement">Утверждение достижений</option> -->
        </select>

        <select
          :value="status"
          @change="emit('update:status', $event.target.value)"
          class="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
        >
          <option value="">Все статусы</option>
          <option value="pending">В ожидании</option>
          <option value="accepted">Принял</option>
          <option value="rejected">Отклонено</option>
          <option value="cancelled">Отменено</option>
        </select>

        <input
          type="date"
          :value="date"
          @input="emit('update:date', $event.target.value)"
          class="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
        />
      </div>
    </div>

    <!-- Table -->
    <div class="bg-gray-800 rounded-lg overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-700">
          <tr>
            <th class="px-4 py-3 text-left">№</th>
            <th class="px-4 py-3 text-left">Наименование</th>
            <th class="px-4 py-3 text-left">Тема заявки</th>
            <th class="px-4 py-3 text-left">Вид спорта</th>
            <th class="px-4 py-3 text-left">Должность</th>
            <th class="px-4 py-3 text-left">Дата заявки</th>
            <th class="px-4 py-3 text-left">Действие</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(application, index) in data"
            :key="application.id"
            class="border-b border-gray-700 hover:bg-gray-750"
          >
            <td class="px-4 py-3">{{ page - 1 + index + 1 }}</td>
            <td class="px-4 py-3">{{ application.sender?.full_name }}</td>
            <td class="px-4 py-3">
              <span
                :class="getStatusBadgeClass(application.request_type)"
                class="px-2 py-1 rounded text-sm font-medium"
              >
                {{ application.request_theme }}
              </span>
            </td>
            <td class="px-4 py-3">{{ application.sport?.name }}</td>
            <td class="px-4 py-3">{{ application.sender?.user_role }}</td>
            <td class="px-4 py-3">{{ application.created_time }}</td>
            <td class="px-4 py-3">
              <div class="flex gap-2">
                <button
                  class="text-white bg-[#2E2F3E] p-2 rounded hover:bg-[#5A5A7A] flex items-center justify-center"
                  @click="viewRequest(application.id)"
                >
                  <img src="/Eye.svg" alt="eyes" class="w-4" />
                </button>
                <button
                  v-if="application.status === 'pending'"
                  @click="deleteRequest(application.id)"
                  class="bg-red-600 hover:bg-red-700 text-white p-2 rounded"
                >
                  <img src="/x.svg" alt="x" class="w-4" />
                </button>
                <button
                  v-if="application.status === 'pending'"
                  @click="approveRequest(application.id)"
                  class="bg-green-600 hover:bg-green-700 text-white p-2 rounded"
                >
                  <img src="/done.png" alt="done" class="w-4" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center items-center gap-2 mt-6">
      <!-- Prev button -->
      <button
        @click="emit('update:page', page - 1)"
        :disabled="page === 1"
        class="px-3 py-2 rounded transition-colors bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>

      <!-- Page numbers -->
      <button
        v-for="p in totalPages"
        :key="p"
        @click="emit('update:page', p)"
        :class="[
          'px-3 py-2 rounded transition-colors',
          p === page
            ? 'bg-red-600 text-white'
            : 'bg-gray-700 text-gray-300 hover:bg-gray-600',
        ]"
      >
        {{ p }}
      </button>

      <!-- Next button -->
      <button
        @click="emit('update:page', page + 1)"
        :disabled="page === totalPages"
        class="px-3 py-2 rounded transition-colors bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
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
</template>

<style>
.el-dialog__title {
  color: white !important;
}
</style>
