<template>
  <div class="text-white">
    <div class="flex justify-between items-center mb-6">
      <div class="flex space-x-8">
        <button
          @click="activeTab = 'pending'"
          :class="[
            'transition-colors',
            activeTab === 'pending'
              ? 'text-white border-b-2 border-red-500 pb-1'
              : 'text-gray-400 hover:text-white',
          ]"
        >
          Ожидающие запросы
        </button>
        <button
          @click="activeTab = 'verified'"
          :class="[
            'transition-colors',
            activeTab === 'verified'
              ? 'text-white border-b-2 border-red-500 pb-1'
              : 'text-gray-400 hover:text-white',
          ]"
        >
          Подтвержденные результаты
        </button>
      </div>
      <div v-if="activeTab === 'pending'">
        <select
          v-model="statusFilter"
          class="bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600"
        >
          <option value="pending">В обработке</option>
          <option value="accepted">Одобрено</option>
          <option value="rejected">Отклонено</option>
          <option value="cancelled">Отменено</option>
        </select>
      </div>
    </div>

    <div class="bg-gray-800 rounded-lg overflow-hidden overflow-x-auto">
      <div class="min-w-[800px]">
        <div
          class="grid grid-cols-12 gap-4 p-4 bg-gray-700 text-sm font-medium text-gray-300"
        >
          <div class="col-span-3">Турнир</div>
          <div class="col-span-2">Тренер</div>
          <div class="col-span-2">Дата получение</div>
          <div class="col-span-2">Статус</div>
          <div class="col-span-2">Действие</div>
        </div>

        <div
          v-if="activeTab === 'verified'"
          v-for="achievement in data"
          :key="achievement.id"
          class="grid grid-cols-12 gap-4 p-4 border-b items-center border-gray-700 hover:bg-gray-750 transition-colors"
        >
          <div class="col-span-3 flex items-center space-x-3">
            <img
              :src="achievement.tournament?.logo"
              :alt="achievement.tournament?.name"
              class="w-8 h-8 rounded-full"
            />
            <span>{{ achievement.tournament?.name }}</span>
          </div>
          <div class="col-span-2">{{ achievement.trainer?.full_name }}</div>
          <div class="col-span-2 text-gray-400">{{ achievement?.year }}</div>
          <div
            class="col-span-2 px-2 py-1 rounded text-sm font-medium"
            :class="{
              'text-blue-400': achievement?.status === 'pending',
              'text-green-400': achievement?.status === 'verified',
              'text-red-400': achievement?.status === 'rejected',
            }"
          >
            {{
              achievement?.status === "pending"
                ? "В обработке"
                : achievement?.status === "verified"
                ? "Подтверждено"
                : achievement?.status === "rejected"
                ? "Отклонено"
                : "Неизвестно"
            }}
          </div>

          <div class="col-span-2 flex space-x-2">
            <button
              @click="viewItem(achievement.id)"
              class="p-2 bg-gray-600 hover:bg-gray-500 rounded transition-colors w-8 h-8 flex justify-center items-center"
            >
              <img src="/Eye.svg" alt="eyes" class="w-4" />
            </button>
            <button
              @click="deleteItem(achievement.id)"
              class="p-2 bg-red-600 hover:bg-red-500 rounded transition-colors w-8 h-8 flex justify-center items-center"
            >
              <img src="/delete.svg" alt="x" class="w-4" />
            </button>
          </div>
        </div>

        <div
          v-if="activeTab === 'pending'"
          v-for="achievement in filteredRequests"
          :key="achievement.id"
          class="grid grid-cols-12 gap-4 p-4 border-b items-center border-gray-700 hover:bg-gray-750 transition-colors"
        >
          <div class="col-span-3 flex items-center space-x-3">
            <span>{{ achievement?.new_data?.tournament?.name }}</span>
          </div>
          <div class="col-span-2">{{ achievement?.receiver?.full_name }}</div>
          <div class="col-span-2 text-gray-400">{{ achievement?.new_data?.year }}</div>
          <div
            class="col-span-2 px-2 py-1 rounded text-sm font-medium"
            :class="{
              'text-blue-400': achievement?.status === 'pending',
              'text-green-400': achievement?.status === 'accepted',
              'text-red-400': achievement?.status === 'rejected',
              'text-red-400': achievement?.status === 'cancelled',
            }"
          >
            {{
              achievement?.status === "pending"
                ? "В обработке"
                : achievement?.status === "accepted"
                ? "Одобрено"
                : achievement?.status === "rejected"
                ? "Отклонено"
                : achievement?.status === "cancelled"
                ? "Отменено"
                : "Неизвестно"
            }}
          </div>

          <div class="col-span-2 flex space-x-2">
            <button
              @click="viewItemm(achievement.id)"
              class="p-2 bg-gray-600 hover:bg-gray-500 rounded transition-colors w-8 h-8 flex justify-center items-center"
            >
              <img src="/Eye.svg" alt="eyes" class="w-4" />
            </button>
            <button
              @click="cancelRequest(achievement.id)"
              class="p-2 bg-red-600 hover:bg-red-500 rounded transition-colors w-8 h-8 flex justify-center items-center"
            >
              <img src="/e-clos.png" alt="x" class="w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-end mt-6" v-if="activeTab === 'pending'">
      <button
        @click="showModal = true"
        class="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors"
      >
        Добавить новую Достижение
      </button>
    </div>

    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-semibold">
            {{ isEditing ? "Редактировать достижение" : "Добавить достижение" }}
          </h2>
          <button @click="resetForm" class="text-gray-400 hover:text-white">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form @submit.prevent="submitForm" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2"
              >Название турнира</label
            >
            <select
              v-model="form.tournament"
              class="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
            >
              <option value="">Выберите турнира</option>
              <option v-for="item in tournamentData" :key="item.id" :value="item.id">
                {{ item.name }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2"
              >Название тренер</label
            >
            <select
              v-model="form.trainer"
              class="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
            >
              <option value="">Выберите тренер</option>
              <option v-for="item in trainerData" :key="item.id" :value="item.id">
                {{ item.full_name }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Рейтинг</label>
            <input
              v-model="form.rating"
              type="number"
              placeholder="Введите Рейтинг"
              class="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Город</label>
            <input
              v-model="form.country"
              type="text"
              placeholder="Введите Город"
              class="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Год</label>
            <input
              v-model="form.year"
              type="text"
              placeholder="Выберите год"
              class="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
            />
          </div>

          <button
            type="submit"
            class="w-full mt-6 px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg"
          >
            {{ isEditing ? "Сохранить изменения" : "Отправить на подтверждение" }}
          </button>
        </form>
      </div>
    </div>

    <div
      v-if="viewModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-2xl shadow-lg w-full max-w-md mx-4 overflow-hidden">
        <!-- Header -->
        <div class="flex items-center justify-between px-5 py-4 border-b">
          <div class="flex items-center gap-2">
            <div class="bg-red-500 p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-yellow-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 21h8m-4-4v4m0-4a7 7 0 007-7V5H5v5a7 7 0 007 7zM5 5V3h14v2"
                />
              </svg>
            </div>
            <h2 class="text-lg font-semibold text-black">Просмотр достижения</h2>
          </div>
          <button @click="viewModal = false" class="text-gray-500 hover:text-black">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Body -->
        <div class="p-6 space-y-4 text-gray-800">
          <!-- Tournament -->
          <div class="flex items-start gap-3">
            <span class="text-gray-500">🏆 Турнир:</span>
            <p class="font-medium">{{ viewData.tournament?.name }}</p>
          </div>

          <!-- Trainer -->
          <div class="flex items-start gap-3">
            <span class="text-gray-500">👤 Тренер:</span>
            <p class="font-medium">{{ viewData.trainer?.full_name }}</p>
          </div>

          <!-- Rating -->
          <div class="flex items-start gap-3">
            <span class="text-gray-500">⭐ Рейтинг:</span>
            <span
              class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-sm font-semibold"
            >
              {{ viewData.rating }}
            </span>
          </div>

          <!-- Country -->
          <div class="flex items-start gap-3">
            <span class="text-gray-500">📍 Город:</span>
            <p class="font-medium">{{ viewData.country }}</p>
          </div>

          <!-- Year -->
          <div class="flex items-start gap-3">
            <span class="text-gray-500">📅 Год:</span>
            <p class="font-medium">{{ viewData.year }}</p>
          </div>
        </div>

        <!-- Score -->
        <div class="bg-red-100 px-6 py-4 flex items-center justify-between">
          <span class="text-gray-700 font-medium">Баллы</span>
          <p class="text-2xl font-bold text-red-600">
            {{ viewData.score }}
          </p>
        </div>
      </div>
    </div>

    <div
      v-if="viewModall"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-2xl shadow-lg w-full max-w-md mx-4 overflow-hidden">
        <!-- Header -->
        <div class="flex items-center justify-between px-5 py-4 border-b">
          <div class="flex items-center gap-2">
            <div class="bg-red-500 p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6l4 2"
                />
              </svg>
            </div>
            <h2 class="text-lg font-semibold text-black">Просмотр достижения</h2>
          </div>
          <button @click="viewModall = false" class="text-gray-500 hover:text-black">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Body -->
        <div class="p-6 space-y-4 text-gray-800">
          <!-- Tournament -->
          <div class="flex items-start gap-3">
            <span class="text-gray-500">🏆 Турнир:</span>
            <p class="font-medium">{{ viewDataa?.new_data?.tournament?.name }}</p>
          </div>

          <!-- Trainer -->
          <div class="flex items-start gap-3">
            <span class="text-gray-500">👤 Тренер:</span>
            <p class="font-medium">{{ viewDataa.receiver?.full_name }}</p>
          </div>

          <!-- Rating -->
          <div class="flex items-start gap-3">
            <span class="text-gray-500">⭐ Рейтинг:</span>
            <span
              class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-sm font-semibold"
            >
              {{ viewDataa.new_data?.rating }}
            </span>
          </div>

          <!-- Country -->
          <div class="flex items-start gap-3">
            <span class="text-gray-500">📍 Страна:</span>
            <p class="font-medium">{{ viewDataa.new_data?.country }}</p>
          </div>

          <!-- Year -->
          <div class="flex items-start gap-3">
            <span class="text-gray-500">📅 Год:</span>
            <p class="font-medium">{{ viewDataa.new_data?.year }}</p>
          </div>
        </div>

        <!-- Score -->
        <div class="bg-red-100 px-6 py-4 flex items-center justify-between">
          <span class="text-gray-700 font-medium">Баллы</span>
          <p class="text-2xl font-bold text-red-600">
            {{ viewDataa.new_data?.score }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();
const { $api } = useNuxtApp();

const showModal = ref(false);
const viewModal = ref(false);
const viewModall = ref(false);
const isEditing = ref(false);
const editingId = ref(null);
const data = ref([]);
const viewData = ref({});
const viewDataa = ref({});
const activeTab = ref("pending");
const dataRequest = ref([]);

const statusFilter = ref("pending");

const filteredRequests = computed(() => {
  return dataRequest.value.filter((item) => item.status === statusFilter.value);
});

const getDataRequest = async () => {
  try {
    const res = await $api.get("/user/requests/?type=sent&request_type=sportsman_result");
    dataRequest.value = res.data.data.data;
  } catch (e) {
    console.error("res error:", e);
  }
};

const getData = async () => {
  try {
    const res = await $api.get("/user/profile/results/");
    data.value = res.data.data;
  } catch (e) {
    console.error("res error:", e);
  }
};

const form = reactive({
  country: "",
  tournament: "",
  trainer: "",
  year: "",
  rating: 0,
});

const tournamentData = ref([]);
const getTournament = async () => {
  try {
    const federationId = authStore.userProfile?.data?.sportsman_profile?.federation?.id;
    const res = await $api.get(`/sport/tournament/?federation=${federationId}`);
    tournamentData.value = res.data.data;
  } catch (e) {
    console.log(e);
  }
};

const trainerData = ref([]);
const getTrainer = async () => {
  try {
    const federationId = authStore.userProfile?.data?.sportsman_profile?.federation?.id;
    const res = await $api.get(`/federation/${federationId}/users/?user_role=trainer`);
    trainerData.value = res.data.data.data;
  } catch (e) {
    console.log(e);
  }
};

const submitForm = async () => {
  try {
    if (isEditing.value) {
      await $api.patch(`/user/profile/results/${editingId.value}/`, { ...form });
    } else {
      await $api.post("/user/profile/results/", { ...form });
    }
    await getData();
    resetForm();
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
  }
};

const viewItem = async (id) => {
  try {
    const res = await $api.get(`/user/profile/results/${id}/`);
    viewData.value = res.data.data;
    viewModal.value = true;
  } catch (e) {
    console.error("view error:", e);
  }
};

const viewItemm = async (id) => {
  try {
    const res = await $api.get(`/user/requests/${id}/`);
    viewDataa.value = res.data.data;
    viewModall.value = true;
  } catch (e) {
    console.error("view error:", e);
  }
};

const editItem = (item) => {
  isEditing.value = true;
  editingId.value = item.id;
  Object.assign(form, {
    country: item.country,
    tournament: item.tournament?.id || "",
    trainer: item.trainer?.id || "",
    year: item.year,
    rating: item.rating,
  });
  showModal.value = true;
};

const deleteItem = async (id) => {
  try {
    await $api.delete(`/user/profile/results/${id}/`);
    await getData();
  } catch (e) {
    console.error("delete error:", e);
  }
};

const cancelRequest = async (id) => {
  try {
    await $api.patch(`/user/requests/${id}/`, { status: "cancelled" });
    await getDataRequest();
    ElMessage.success("So‘rov bekor qilindi.");
    formData.value.trainer = "";
  } catch (error) {
    ElMessage.error("Bekor qilishda xatolik yuz berdi.");
  } finally {
    await getDataRequest();
  }
};

const resetForm = () => {
  showModal.value = false;
  isEditing.value = false;
  editingId.value = null;
  Object.assign(form, {
    country: "",
    tournament: "",
    trainer: "",
    year: "",
    rating: 0,
  });
};

getDataRequest();
getData();
getTournament();
getTrainer();
</script>
