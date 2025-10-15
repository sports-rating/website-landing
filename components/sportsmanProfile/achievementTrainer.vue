<template>
  <div class="text-white">
    <div
      class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 w-full"
    >
      <!-- Tabs -->
      <div class="flex flex-col sm:flex-row sm:space-x-8 w-full sm:w-auto text-center">
        <button
          @click="activeTab = 'pending'"
          :class="[
            'transition-colors w-full sm:w-auto py-2',
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
            'transition-colors w-full sm:w-auto py-2',
            activeTab === 'verified'
              ? 'text-white border-b-2 border-red-500 pb-1'
              : 'text-gray-400 hover:text-white',
          ]"
        >
          Подтвержденные pабочее место
        </button>
      </div>

      <!-- Filter -->
      <div
        v-if="activeTab === 'pending'"
        class="w-full sm:w-auto flex justify-start sm:justify-end"
      >
        <select
          v-model="statusFilter"
          class="bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600 w-full sm:w-auto"
        >
          <option value="">Вce</option>
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
          <div class="col-span-3">Спортивное учреждение</div>
          <div :class="activeTab === 'pending' ? 'col-span-2' : 'col-span-3'">Спорт</div>
          <div :class="activeTab === 'pending' ? 'col-span-2' : 'col-span-4'">
            Время обработки
          </div>
          <div v-if="activeTab === 'pending'" class="col-span-2">Статус</div>
          <div class="col-span-2">Действие</div>
        </div>

        <div
          v-if="activeTab === 'verified'"
          v-for="achievement in data"
          :key="achievement.id"
          class="grid grid-cols-12 gap-4 p-4 border-b items-center border-gray-700 hover:bg-gray-750 transition-colors"
        >
          <div class="col-span-3 flex items-center space-x-3">
            <span>{{ achievement.sport_institution?.name }}</span>
          </div>
          <div :class="activeTab === 'pending' ? 'col-span-2' : 'col-span-3'">
            {{ achievement.sport?.name }}
          </div>
          <div
            :class="activeTab === 'pending' ? 'col-span-2' : 'col-span-4'"
            class="text-gray-400"
          >
            {{ achievement?.processed_time }}
          </div>
          <div
            v-if="activeTab === 'pending'"
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
              <img src="/Eye.svg" alt="eyes" class="sm:!w-4 w-6" />
            </button>
            <button
              @click="deleteItem(achievement.id)"
              class="p-2 bg-red-600 hover:bg-red-500 rounded transition-colors w-8 h-8 flex justify-center items-center"
            >
              <img src="/delete.svg" alt="x" class="sm:!w-4 w-6" />
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
            <span>{{ achievement?.new_data?.sport_institution?.name }}</span>
          </div>
          <div class="col-span-2">{{ achievement?.new_data?.sport?.name }}</div>
          <div class="col-span-2 text-gray-400">
            {{ achievement?.processed_time }}
          </div>
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
              <img src="/Eye.svg" alt="eyes" class="sm:!w-4 w-6" />
            </button>
            <button
              @click="cancelRequest(achievement.id)"
              class="p-2 bg-red-600 hover:bg-red-500 rounded transition-colors w-8 h-8 flex justify-center items-center"
            >
              <img src="/e-clos.png" alt="x" class="sm:!w-4 w-6" />
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
        Добавить новую pабочее место
      </button>
    </div>

    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4"
    >
      <div
        class="bg-gray-800 rounded-xl p-4 sm:p-6 w-full max-w-lg mx-auto overflow-y-auto max-h-[95vh]"
      >
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
          <h2
            class="text-lg sm:text-xl font-semibold text-white text-center sm:text-left"
          >
            {{ isEditing ? "Редактировать pабочее место" : "Добавить pабочее место" }}
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

        <!-- Form -->
        <form class="space-y-4">
          <!-- 1-qator -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-1"
                >Название Спорт</label
              >
              <el-select
                v-model="form.sport"
                placeholder="Выберите Спорт"
                filterable
                clearable
                class="w-full bg-gray-700 border border-gray-600 rounded-lg text-white"
              >
                <el-option
                  v-for="item in sports"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </div>

            <div>
              <label for="region" class="text-sm text-gray-300 mb-1"
                >Область / Город</label
              >
              <el-select
                v-model="form.region"
                filterable
                clearable
                placeholder="Выберите город"
                @change="onRegionChange"
                class="w-full bg-gray-700 border border-gray-600 rounded-lg text-white"
              >
                <el-option
                  v-for="region in regions"
                  :key="region.id"
                  :label="region.name"
                  :value="region.id"
                />
              </el-select>
            </div>
          </div>

          <!-- 2-qator -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label for="district" class="text-sm text-gray-300 mb-1">Улица</label>
              <el-select
                v-model="form.district"
                filterable
                clearable
                placeholder="Выберите Улица"
                class="w-full bg-gray-700 border border-gray-600 rounded-lg text-white"
              >
                <el-option
                  v-for="district in filteredDistricts"
                  :key="district.id"
                  :label="district.name"
                  :value="district.id"
                />
              </el-select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-1"
                >Название Schools</label
              >
              <el-select
                v-model="form.sport_institution"
                placeholder="Выберите Schools"
                filterable
                clearable
                class="w-full bg-gray-700 border border-gray-600 rounded-lg text-white"
              >
                <el-option
                  v-for="item in schools"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </div>
          </div>

          <!-- 3-qator -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">Ставка</label>
            <el-select
              v-model="form.workload"
              placeholder="Выберите ставку"
              clearable
              class="w-full bg-gray-700 border border-gray-600 rounded-lg text-white"
            >
              <el-option label="0.25" :value="0.25" />
              <el-option label="0.5" :value="0.5" />
              <el-option label="1" :value="1" />
            </el-select>
          </div>

          <!-- 4-qator (start dates) -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-1"
                >Год начала</label
              >
              <el-date-picker
                v-model="form.start_year"
                type="year"
                placeholder="Выберите год"
                class="sm:!w-full !w-[21rem] bg-gray-700 border border-gray-600 rounded-lg text-white"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-1"
                >Месяц начала</label
              >
              <el-date-picker
                v-model="form.start_month"
                type="month"
                placeholder="Выберите месяц"
                class="sm:!w-full !w-[21rem] bg-gray-700 border border-gray-600 rounded-lg text-white"
              />
            </div>
          </div>

          <!-- 5-qator (end dates) -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-1"
                >Год окончания</label
              >
              <el-date-picker
                v-model="form.end_year"
                type="year"
                placeholder="Выберите год"
                class="sm:!w-full !w-[21rem] bg-gray-700 border border-gray-600 rounded-lg text-white"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-1"
                >Месяц окончания</label
              >
              <el-date-picker
                v-model="form.end_month"
                type="month"
                placeholder="Выберите месяц"
                class="sm:!w-full !w-[21rem] bg-gray-700 border border-gray-600 rounded-lg text-white"
              />
            </div>
          </div>

          <!-- Submit button -->
          <el-button
            type="submit"
            @click="submitForm"
            :class="
              isChanged
                ? '!bg-red-600 hover:!bg-red-500 !text-white '
                : '!bg-gray-400 !cursor-not-allowed !text-black'
            "
            :disabled="!isChanged"
            class="w-full mt-6 py-3 rounded-lg !border-none"
          >
            {{ isEditing ? "Сохранить изменения" : "Отправить на подтверждение" }}
          </el-button>
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
          <h2 class="text-lg font-semibold text-black flex items-center gap-2">
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
            Просмотр pабочее место
          </h2>
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
          <!-- Institution -->
          <div class="flex items-start gap-3">
            <span class="text-gray-500">🏫 Учреждение:</span>
            <p class="font-medium">{{ viewData.sport_institution?.name }}</p>
          </div>
          <!-- Sport -->
          <div class="flex items-start gap-3">
            <span class="text-gray-500">🏅 Спорт:</span>
            <p class="font-medium">{{ viewData.sport?.name }}</p>
          </div>
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
          <h2 class="text-lg font-semibold text-black flex items-center gap-2">
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
            Просмотр pабочее место
          </h2>
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
          <!-- Sport -->
          <div class="flex items-start gap-3">
            <span class="text-gray-500">🏅 Спорт:</span>
            <p class="font-medium">{{ viewDataa.new_data?.sport?.name }}</p>
          </div>

          <!-- Institution -->
          <div class="flex items-start gap-3">
            <span class="text-gray-500">🏫 Учреждение:</span>
            <p class="font-medium">{{ viewDataa.new_data?.sport_institution?.name }}</p>
          </div>

          <!-- Sender (Trainer) -->
          <div class="flex items-start gap-3">
            <span class="text-gray-500">👤 Отправитель:</span>
            <p class="font-medium">{{ viewDataa.sender?.full_name }}</p>
          </div>

          <!-- Receiver (Federation) -->
          <div class="flex items-start gap-3">
            <span class="text-gray-500">🏛 Федерация:</span>
            <p class="font-medium">{{ viewDataa.receiver?.federation?.name }}</p>
          </div>

          <!-- Status -->
          <div class="flex items-start gap-3">
            <span class="text-gray-500">📌 Статус:</span>
            <p class="font-medium capitalize">{{ viewDataa.status }}</p>
          </div>

          <!-- Created Time -->
          <div class="flex items-start gap-3">
            <span class="text-gray-500">⏰ Дата:</span>
            <p class="font-medium">{{ viewDataa.created_time }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useAuthStore } from "~/stores/auth";
import omit from "lodash/omit.js";

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
const regions = ref([]);
const filteredDistricts = ref([]);
const schools = ref([]);
const form = ref({
  sport: "",
  region: "",
  district: "",
  sport_institution: "",
  workload: "",
  start_year: "",
  start_month: "",
  end_year: "",
  end_month: "",
});

const originalForm = ref({ ...form.value });

const isChanged = computed(() => {
  return (
    form.value.sport !== originalForm.value.sport ||
    form.value.region !== originalForm.value.region ||
    form.value.district !== originalForm.value.district ||
    form.value.sport_institution !== originalForm.value.sport_institution ||
    form.value.workload !== originalForm.value.workload ||
    form.value.start_year !== originalForm.value.start_year ||
    form.value.start_month !== originalForm.value.start_month ||
    form.value.end_year !== originalForm.value.end_year ||
    form.value.end_month !== originalForm.value.end_month
  );
});

const getSchools = async () => {
  if (!form.value.sport || !form.value.region || !form.value.district) {
    schools.value = [];
    return;
  }

  try {
    const res = await $api.get("/sport/sport-institutions/", {
      params: {
        page: 1,
        page_size: 1000,
        sports: form.value.sport,
        region: form.value.region,
        district: form.value.district,
      },
    });
    schools.value = res.data.data.data;
  } catch (err) {
    console.error("Schools yuklashda xatolik:", err);
  }
};

watch(
  () => [form.value.sport, form.value.region, form.value.district],
  async ([sport, region, district]) => {
    if (sport && region && district) {
      await getSchools();
    } else {
      schools.value = [];
    }
  }
);
const getRegions = async () => {
  try {
    const res = await $api.get("/user/regions/");
    regions.value = res.data.data;
  } catch (err) {
    console.error("Regions yuklashda xatolik:", err);
  }
};

const getDistricts = async (regionId) => {
  if (!regionId) {
    filteredDistricts.value = [];
    return;
  }
  try {
    const res = await $api.get(`/user/districts/?region=${regionId}`);
    filteredDistricts.value = res.data.data.map((item) => omit(item, ["region"]));
  } catch (err) {
    console.error("Districts yuklashda xatolik:", err);
  }
};

const onRegionChange = () => {
  const selectedRegionId = form.value.region;
  getDistricts(selectedRegionId);

  if (!filteredDistricts.value.find((district) => district.id === form.value.district)) {
    form.value.district = null;
  }
};

const statusFilter = ref("");

const filteredRequests = computed(() => {
  if (statusFilter.value === "") {
    return dataRequest.value;
  }
  return dataRequest.value.filter((item) => item.status === statusFilter.value);
});

const getDataRequest = async () => {
  try {
    const res = await $api.get(
      "/user/requests/?type=sent&request_type=trainer_workplace"
    );
    dataRequest.value = res.data.data.data;
  } catch (e) {
    console.error("res error:", e);
  }
};

const getData = async () => {
  try {
    const res = await $api.get("/career/work-place/");
    data.value = res.data.data.data;
  } catch (e) {
    console.error("res error:", e);
  }
};

const sports = ref([]);
const getTournament = async () => {
  try {
    const res = await $api.get(`/sport/`);
    sports.value = res.data.data;
  } catch (e) {
    console.log(e);
  }
};

const submitForm = async () => {
  try {
    const payload = {
      sport: form.value.sport,
      sport_institution: form.value.sport_institution,
      workload: form.value.workload,
      start_year: form.value.start_year
        ? new Date(form.value.start_year).getFullYear()
        : null,
      start_month: form.value.start_month
        ? new Date(form.value.start_month).getMonth() + 1
        : null,
      end_year: form.value.end_year ? new Date(form.value.end_year).getFullYear() : null,
      end_month: form.value.end_month
        ? new Date(form.value.end_month).getMonth() + 1
        : null,
    };

    if (isEditing.value) {
      await $api.patch(`/career/work-place/${editingId.value}/`, payload);
    } else {
      await $api.post("/career/work-place/", payload);
    }

    await getData();
    await getDataRequest();
    originalForm.value = { ...form.value };
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
    const res = await $api.get(`/career/work-place/${id}/`);
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

const deleteItem = async (id) => {
  try {
    await $api.delete(`/career/work-place/${id}/`);
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
  Object.assign(form.value, {
    sport: "",
    region: "",
    district: "",
    sport_institution: "",
    workload: "",
    start_year: "",
    start_month: "",
    end_year: "",
    end_month: "",
  });
  originalForm.value = { ...form.value };
};

getSchools();
getRegions();
getDataRequest();
getData();
getTournament();
</script>

<style scoped>
:deep(.el-form-item__label) {
  color: white !important;
}
:deep(.el-input__wrapper) {
  background-color: rgb(55 65 81 / var(--tw-bg-opacity, 1)) !important;
  color: white !important;
  box-shadow: none !important;
  border: none !important;
  border-radius: 0.4rem !important;
}
:deep(.el-input__inner) {
  color: white !important;
}
:deep(.el-select__wrapper) {
  background-color: rgb(55 65 81 / var(--tw-bg-opacity, 1)) !important;
  color: white !important;
  box-shadow: none !important;
  border: none !important;
  border-radius: 0.4rem !important;
}
:deep(.el-select__selected-item .el-select__placeholder) {
  color: white !important;
}
:deep(.el-select__selected-item) {
  color: white !important;
}
</style>
