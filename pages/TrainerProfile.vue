<template>
  <NuxtLayout name="custom">
    <div class="min-h-screen bg-[#11101B] text-white p-4 md:p-6 font-sans">
      <div class="sm:container mx-auto">
        <header
          class="rounded-lg border !border-[#11101B] p-4 md:p-6 mb-6 flex flex-col md:flex-row items-center justify-between w-full md:w-[90%] mx-auto"
        >
          <div class="flex flex-col md:flex-row items-start md:items-center w-full">
            <div class="flex flex-col md:mr-6 w-full">
              <div class="flex flex-wrap items-center text-sm text-gray-400 mb-2 gap-2">
                <span class="bg-[#4A4A6A] px-2 py-1 rounded-md">№1</span>
                <span class="bg-[#4A4A6A] px-2 py-1 rounded-md">ОБЩ 95</span>
                <span>Обладатель титула</span>
              </div>
              <h1
                class="text-2xl md:text-5xl font-bold mb-2 flex flex-wrap items-center relative"
              >
                <div class="flex">
                  {{ authStore.userProfile?.data?.first_name }}
                  {{ authStore.userProfile?.data?.last_name }}
                </div>
                <img
                  class="flex w-6 h-6 mb-4"
                  :src="
                    authStore.userProfile?.data?.trainer_profile?.is_trainer_verified
                      ? 'verified.png'
                      : 'cancel.png'
                  "
                  alt="verify"
                />
              </h1>
              <div class="flex space-x-2">
                <span
                  class="bg-[#A0E727] uppercase text-white text-sm px-3 py-1 rounded-full flex items-center"
                >
                  {{ authStore.userProfile?.data?.user_role }}
                </span>
              </div>
            </div>
          </div>
          <div
            class="relative w-36 h-36 md:w-60 md:h-60 flex-shrink-0 cursor-pointer mt-4 md:mt-0 group"
          >
            <img
              @click.stop="clickImg"
              :src="uploadedImageUrl"
              alt="Profile Picture"
              class="rounded-full object-cover w-full h-full"
            />

            <div
              class="absolute -bottom-5 left-1/2 transform -translate-x-1/2 bg-white text-blue-600 border border-blue-600 rounded-full w-10 h-10 flex items-center justify-center shadow-md group-hover:scale-110 transition duration-200 ease-in-out"
              @click.stop="clickImg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 7h2l2-3h10l2 3h2a1 1 0 011 1v11a1 1 0 01-1 1H3a1 1 0 01-1-1V8a1 1 0 011-1zm9 11a4 4 0 100-8 4 4 0 000 8z"
                />
              </svg>
              <input
                type="file"
                ref="fileInput"
                accept="image/*"
                class="hidden"
                @change="uploadImage"
              />
            </div>
          </div>
        </header>

        <nav class="flex flex-row gap-2 md:gap-6 border-b border-[#3A3A5A] mb-6">
          <button
            :class="[
              'py-3 px-4 text-lg font-semibold border-b-2',
              activeTab === 'main'
                ? 'border-[#E91E63] text-[#E91E63]'
                : 'text-gray-400 hover:text-white border-transparent',
            ]"
            @click="activeTab = 'main'"
          >
            Основные
          </button>

          <button
            :class="[
              'py-3 px-4 text-lg font-semibold border-b-2',
              activeTab === 'requests'
                ? 'border-[#E91E63] text-[#E91E63]'
                : 'text-gray-400 hover:text-white border-transparent',
            ]"
            @click="activeTab = 'requests'"
          >
            Заявки от спортсменов
          </button>

          <button
            v-if="authStore.userProfile?.data?.trainer_profile?.is_trainer_verified"
            :class="[
              'py-3 px-4 text-lg font-semibold border-b-2',
              activeTab === 'fund'
                ? 'border-[#E91E63] text-[#E91E63]'
                : 'text-gray-400 hover:text-white border-transparent',
            ]"
            @click="activeTab = 'fund'"
          >
            Фонд "Бирлик"
          </button>
        </nav>

        <div v-if="activeTab === 'main'" class="flex flex-col lg:flex-row gap-6">
          <aside class="w-full h-fit lg:w-64 bg-[#2C2C4A] rounded-lg p-4">
            <h2 class="text-xl font-semibold mb-4 text-gray-300">Информация</h2>
            <nav class="space-y-2">
              <button
                class="w-full text-left py-3 px-4 rounded-md bg-[#E91E63] text-white font-medium"
              >
                Личные данные
              </button>
              <template
                v-if="authStore.userProfile?.data?.trainer_profile?.is_trainer_verified"
              >
                <button
                  class="w-full text-left py-3 px-4 rounded-md text-gray-300 hover:bg-[#3A3A5A]"
                >
                  Образование
                </button>
                <button
                  class="w-full text-left py-3 px-4 rounded-md text-gray-300 hover:bg-[#3A3A5A]"
                >
                  Карьера и достижения
                </button>
              </template>
            </nav>
          </aside>

          <main class="flex-1 rounded-lg p-4 md:p-6">
            <form class="space-y-8" @submit.prevent="handleSubmit">
              <div>
                <h2 class="text-xl font-semibold mb-4">Информация</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="flex flex-col">
                    <label for="name" class="text-sm text-gray-400 mb-1">Имя</label>
                    <input
                      type="text"
                      id="name"
                      v-model="formData.firstName"
                      placeholder="Имя"
                      class="bg-[#3A3A5A] border border-[#4A4A6A] rounded-md p-3 md:w-full w-[95%] text-white focus:outline-none focus:ring-2 focus:ring-[#E91E63]"
                    />
                  </div>
                  <div class="flex flex-col">
                    <label for="surname" class="text-sm text-gray-400 mb-1"
                      >Фамилия</label
                    >
                    <input
                      type="text"
                      id="surname"
                      v-model="formData.lastName"
                      placeholder="Фамилия"
                      class="bg-[#3A3A5A] border border-[#4A4A6A] rounded-md p-3 md:w-full w-[95%] text-white focus:outline-none focus:ring-2 focus:ring-[#E91E63]"
                    />
                  </div>
                  <div class="flex flex-col">
                    <label for="patronymic" class="text-sm text-gray-400 mb-1"
                      >Отчество</label
                    >
                    <input
                      type="text"
                      id="patronymic"
                      v-model="formData.middleName"
                      placeholder="Отчество"
                      class="bg-[#3A3A5A] border border-[#4A4A6A] rounded-md p-3 md:w-full w-[95%] text-white focus:outline-none focus:ring-2 focus:ring-[#E91E63]"
                    />
                  </div>
                  <div class="flex flex-col">
                    <label for="dob" class="text-sm text-gray-400 mb-1"
                      >Дата рождения</label
                    >
                    <div class="relative w-full">
                      <el-input
                        type="date"
                        id="dob"
                        v-model="formData.birthDate"
                        class="!bg-[#3A3A5A] !border !border-[#4A4A6A] !rounded-md text-white md:!w-full !h-[50px] !w-[95%] focus:outline-none focus:ring-2 focus:ring-[#E91E63]"
                      />
                    </div>
                  </div>

                  <div class="flex flex-col">
                    <label for="athleteType" class="text-sm text-gray-400 mb-1"
                      >Вид спортсмена</label
                    >
                    <select
                      id="athleteType"
                      v-model="formData.sport"
                      class="bg-[#3A3A5A] !h-9.5 border border-[#4A4A6A] rounded-md p-3 md:w-full w-[95%] text-white focus:outline-none focus:ring-2 focus:ring-[#E91E63]"
                    >
                      <option value="">Выберите Вид спортсмена</option>
                      <option v-for="item in data" :value="item.id">
                        {{ item.name }}
                      </option>
                    </select>
                  </div>

                  <div class="flex flex-col">
                    <label for="height" class="text-sm text-gray-400 mb-1"
                      >Рост (см)</label
                    >
                    <input
                      type="number"
                      id="height"
                      v-model="formData.height"
                      placeholder="Рост (см)"
                      class="bg-[#3A3A5A] border border-[#4A4A6A] rounded-md p-3 md:w-full w-[95%] text-white focus:outline-none focus:ring-2 focus:ring-[#E91E63]"
                    />
                  </div>
                  <div class="flex flex-col">
                    <label for="weight" class="text-sm text-gray-400 mb-1"
                      >Вес (кг)</label
                    >
                    <input
                      type="number"
                      id="weight"
                      v-model="formData.weight"
                      placeholder="Вес (кг)"
                      class="bg-[#3A3A5A] border border-[#4A4A6A] rounded-md p-3 md:w-full w-[95%] text-white focus:outline-none focus:ring-2 focus:ring-[#E91E63]"
                    />
                  </div>

                  <div class="flex items-end gap-2 w-full">
                    <div class="flex flex-col md:w-[90%] w-[80%]">
                      <label for="trainer" class="text-sm text-gray-400 mb-1"
                        >Федерация</label
                      >
                      <select
                        id="federation"
                        :disabled="!formData.sport"
                        v-model="formData.federation"
                        class="bg-[#3A3A5A] border !h-9.5 border-[#4A4A6A] rounded-md p-3 md:w-full w-[95%] text-white focus:outline-none focus:ring-2 focus:ring-[#E91E63]"
                      >
                        <option value="">Выберите federation</option>
                        <option
                          v-for="item in dataFederation"
                          :key="item.id"
                          :value="item.id"
                        >
                          {{ item.name }}
                        </option>
                      </select>
                    </div>

                    <div class="w-12 cursor-pointer" @click="openDialog">
                      <img
                        src="/history.png"
                        class="w-8 h-8 object-cover"
                        alt="history"
                      />
                    </div>

                    <el-dialog
                      v-model="dialogVisible"
                      title="Отправленные запросы"
                      class="md:!w-[500px] !w-[350px] !text-black"
                    >
                      <div v-if="isLoading" class="text-center py-4">
                        <Loading class="w-4 h-4" />
                      </div>
                      <div v-else>
                        <el-empty
                          v-if="requests.length === 0"
                          description="So‘rovlar topilmadi"
                        />
                        <div v-else class="max-h-[400px] overflow-y-auto pr-2">
                          <ul class="space-y-4">
                            <li
                              v-for="item in requests"
                              :key="item.id"
                              class="p-4 border rounded-lg shadow-sm bg-white flex justify-between items-start"
                            >
                              <div>
                                <p class="text-sm text-gray-700 mb-1">
                                  <strong>Trainer Name:</strong>
                                  {{ item.receiver?.full_name }}
                                </p>
                                <p
                                  class="text-sm text-gray-700 mb-1 flex items-center gap-2"
                                >
                                  <strong>Status:</strong>
                                  <el-tag
                                    :type="item.status === 'pending' ? 'warning' : 'info'"
                                    size="small"
                                    effect="light"
                                  >
                                    {{ item.status }}
                                  </el-tag>
                                </p>
                                <p class="text-sm text-gray-700">
                                  <strong>Yaratilgan:</strong>
                                  {{ formatDate(item.created_time) }}
                                </p>
                              </div>
                              <div v-if="item.status === 'pending'">
                                <el-button
                                  type="danger"
                                  size="small"
                                  @click="cancelRequest(item.id)"
                                >
                                  Bekor qilish
                                </el-button>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </el-dialog>
                  </div>

                  <div class="flex items-center col-span-1 md:col-span-2">
                    <label class="text-sm text-gray-400 mr-4">Пол</label>
                    <div class="flex items-center mr-6">
                      <input
                        type="radio"
                        id="male"
                        value="male"
                        v-model="formData.gender"
                        class="form-radio h-5 w-5 text-[#E91E63] bg-[#3A3A5A] border-[#4A4A6A] focus:ring-[#E91E63]"
                      />
                      <label for="male" class="ml-2 text-white">Мужчина</label>
                    </div>
                    <div class="flex items-center">
                      <input
                        type="radio"
                        id="female"
                        value="female"
                        v-model="formData.gender"
                        class="form-radio h-5 w-5 text-[#E91E63] bg-[#3A3A5A] border-[#4A4A6A] focus:ring-[#E91E63]"
                      />
                      <label for="female" class="ml-2 text-white">Женщина</label>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 class="text-xl font-semibold mb-4">Фактический адрес</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="flex flex-col">
                    <label for="region" class="text-sm text-gray-400 mb-1"
                      >Область / Город</label
                    >
                    <select
                      id="region"
                      v-model="formData.region"
                      @change="onRegionChange"
                      class="bg-[#3A3A5A] !h-9.5 border border-[#4A4A6A] rounded-md p-3 md:w-full w-[95%] text-white focus:outline-none focus:ring-2 focus:ring-[#E91E63]"
                    >
                      <option value="">Выберите город</option>
                      <option v-for="region in regions" :key="region.id" :value="region">
                        {{ region.name }}
                      </option>
                    </select>
                  </div>

                  <div class="flex flex-col">
                    <label for="district" class="text-sm text-gray-400 mb-1"
                      >Улица
                    </label>
                    <select
                      id="district"
                      v-model="formData.district"
                      class="bg-[#3A3A5A] !h-9.5 border border-[#4A4A6A] rounded-md p-3 md:w-full w-[95%] text-white focus:outline-none focus:ring-2 focus:ring-[#E91E63]"
                    >
                      <option value="">Выберите Улица</option>
                      <option
                        v-for="district in filteredDistricts"
                        :key="district.id"
                        :value="district"
                      >
                        {{ district.name }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="flex md:justify-end justify-center pt-4">
                <button
                  type="submit"
                  class="bg-[#E91E63] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#C2185B] transition-colors"
                >
                  Сохранить данные
                </button>
              </div>
            </form>
          </main>
        </div>

        <RequestsFromAthletes v-if="activeTab === 'requests'" />
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useAuthStore } from "~/stores/auth";
import { ElMessage } from "element-plus";
import RequestsFromAthletes from "~/components/RequestsFromAthletes.vue";
import { omit } from "lodash";
import { Loading } from "@element-plus/icons-vue";

const authStore = useAuthStore();
const { $api } = useNuxtApp();

const data = ref([]);
const dataFederation = ref([]);
const activeTab = ref("main");

const formData = ref({
  firstName: authStore.userProfile?.data?.first_name,
  lastName: authStore.userProfile?.data?.last_name,
  middleName: authStore.userProfile?.data?.middle_name,
  birthDate: authStore.userProfile?.data?.birth_date,
  sport: authStore.userProfile?.data?.trainer_profile?.sport?.id || "",
  height: authStore.userProfile?.data?.trainer_profile?.user_metrics?.height,
  weight: authStore.userProfile?.data?.trainer_profile?.user_metrics?.weight,
  gender: authStore.userProfile?.data?.gender || "",
  district: authStore.userProfile?.data?.district || "",
  region: authStore.userProfile?.data?.region || "",

  federation: authStore.userProfile?.data?.trainer_profile?.federation?.id || "",
});

const getData = async () => {
  try {
    const sportRes = await $api.get("/sport/");
    data.value = sportRes.data.data;
  } catch (e) {
    console.error("Sport error:", e);
  }
};

const getFederation = async (sportId) => {
  try {
    const res = await $api.get(`/federation/?sport=${sportId}`);
    dataFederation.value = res.data.data.data;
  } catch (e) {
    console.error("Trainer error:", e);
    dataFederation.value = [];
  }
};

await getData();
if (formData.value.sport) {
  await getFederation(formData.value.sport);
}

watch(
  () => formData.value.sport,
  async (newVal) => {
    if (newVal) {
      formData.value.federation = "";
      await getFederation(newVal);
    } else {
      dataFederation.value = [];
      formData.value.federation = "";
    }
  }
);

const regions = ref([]);
const filteredDistricts = ref([]);

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
    filteredDistricts.value = res.data.data.map((item) => omit(item, "region"));
  } catch (err) {
    console.error("Districts yuklashda xatolik:", err);
  }
};

const onRegionChange = () => {
  const selectedRegionId = formData.value.region.id;
  getDistricts(selectedRegionId);

  if (
    !filteredDistricts.value.find(
      (district) => district.id === formData.value.district.id
    )
  ) {
    formData.value.district.id;
  }
};

watch(
  () => formData.value.region,
  (newRegion) => {
    if (newRegion?.id) {
      getDistricts(newRegion.id);
    }
  }
);

onMounted(() => {
  getRegions();
});
watch(() => formData.value.region, onRegionChange);

const handleSubmit = async () => {
  try {
    const payload = {
      first_name: formData.value.firstName,
      last_name: formData.value.lastName,
      middle_name: formData.value.middleName,
      birth_date: formData.value.birthDate,
      gender: formData.value.gender,
      region: formData.value.region?.id || null,
      district: formData.value.district?.id || null,
      trainer_profile: {
        sport_id: formData.value.sport,
        federation: formData.value.federation,
        user_metrics: {
          height: formData.value.height,
          weight: formData.value.weight,
        },
        send_request: true,
      },
    };

    if (uploadedImageId.value) {
      payload.media_ids = [uploadedImageId.value];
    } else {
      payload.media_ids = [authStore.userProfile?.data?.media[0]?.id];
    }

    const response = await $api.patch("/user/profile/", payload);
    console.log("Profile updated:", response.data);

    await authStore.fetchUserProfile();

    ElMessage({
      message: "Профиль успешно обновлен",
      type: "success",
      duration: 3000,
    });
  } catch (error) {
    console.error("Ошибка при обновлении профиля:", error);

    let message = "Произошла ошибка при обновлении профиля.";

    if (error.response?.data) {
      const errors = error.response.data;

      if (typeof errors.message === "string") {
        message = errors.message;
      } else {
        const allErrors = [];

        for (const key in errors) {
          const value = errors[key];
          if (Array.isArray(value)) {
            allErrors.push(...value);
          } else if (typeof value === "object" && value !== null) {
            for (const nestedKey in value) {
              const nestedVal = value[nestedKey];
              if (Array.isArray(nestedVal)) {
                allErrors.push(...nestedVal);
              }
            }
          }
        }

        if (allErrors.length) {
          message = allErrors.join("\n");
        }
      }
    }

    ElMessage({
      message,
      type: "error",
      duration: 4000,
    });
  }
};
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleString();
};

const fileInput = ref(null);
const uploadedImageId = ref(null);

let isDialogOpen = false;

const clickImg = () => {
  if (isDialogOpen) return;
  isDialogOpen = true;

  ElMessageBox.confirm(
    "Пожалуйста, загружайте только фотографию в формате спортсмена!",
    "Загрузить изображение",
    {
      confirmButtonText: "Понятно",
      cancelButtonText: "Отмена",
      type: "warning",
    }
  )
    .then(() => {
      fileInput.value?.click();
    })
    .catch(() => {
      ElMessage.info("Не удалось загрузить изображение.");
    })
    .finally(() => {
      isDialogOpen = false;
    });
};

const uploadedImageUrl = ref(authStore.userProfile?.data?.profile_photo);

const uploadImage = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", "user");
  formData.append("is_profile_photo", "true");

  try {
    const res = await $api.post("/user/media-upload/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    uploadedImageId.value = res.data.data.id;
    uploadedImageUrl.value = res.data.data.file;

    ElMessage({
      message: "Изображение успешно загружено",
      type: "success",
    });
  } catch (error) {
    ElMessage({
      message: "Ошибка загрузки изображения",
      type: "error",
    });
  }
};

const dialogVisible = ref(false);
const requests = ref([]);
const isLoading = ref(false);

const openDialog = async () => {
  dialogVisible.value = true;
  await fetchRequests();
};

const fetchRequests = async () => {
  isLoading.value = true;
  try {
    const res = await $api.get("/user/requests/?type=sent");
    requests.value = res.data.data.data || [];
  } catch (error) {
    ElMessage.error("So‘rovlarni olishda xatolik yuz berdi.");
  } finally {
    isLoading.value = false;
  }
};

const cancelRequest = async (id) => {
  try {
    await $api.patch(`/user/requests/${id}/`, { status: "cancelled" });
    ElMessage.success("So‘rov bekor qilindi.");
    await fetchRequests();
    formData.value.trainer = "";
  } catch (error) {
    ElMessage.error("Bekor qilishda xatolik yuz berdi.");
  }
};

watch(
  () => authStore.userProfile,
  (newProfile) => {
    if (newProfile?.data) {
      formData.value = {
        firstName: newProfile.data.first_name || "",
        lastName: newProfile.data.last_name || "",
        middleName: newProfile.data.middle_name || "",
        birthDate: newProfile.data.birth_date || "",
        sport: newProfile.data.trainer_profile?.sport?.id || "",
        height: newProfile.data.trainer_profile?.user_metrics?.height || "",
        weight: newProfile.data.trainer_profile?.user_metrics?.weight || "",
        gender: newProfile.data.gender || "",
        district: newProfile.data.district || "",
        region: newProfile.data.region || "",
        federation: newProfile?.data?.trainer_profile?.federation?.id || "",
      };

      uploadedImageUrl.value = newProfile.data.profile_photo || null;
    }
  },
  { immediate: true }
);
</script>

<style scoped>
input[type="date"]::-webkit-calendar-picker-indicator {
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  cursor: pointer;
}
.el-dialog__title {
  color: black !important;
}
</style>

<style>
.el-dialog__title {
  color: black !important;
}
</style>
