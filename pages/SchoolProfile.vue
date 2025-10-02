<template>
  <NuxtLayout name="custom">
    <div
      v-if="authStore.userProfile?.data?.sport_institution"
      class="min-h-screen bg-[#11101B] p-6 text-white"
    >
      <!-- Header -->
      <header
        class="bg-transparent px-6 md:px-8 py-4 flex flex-col md:flex-row md:justify-between md:items-center gap-6"
      >
        <!-- Matn -->
        <div class="flex flex-col gap-2 text-center md:text-left order-2 md:order-1">
          <h1 class="text-3xl md:text-5xl font-bold">
            {{ authStore.userProfile?.data?.sport_institution?.name }}
          </h1>

          <p class="text-lg md:text-2xl font-bold">
            Управляющий федереции:
            {{ authStore.userProfile?.data?.first_name }}
            {{ authStore.userProfile?.data?.last_name }}
          </p>
        </div>
      </header>

      <!-- Tabs -->
      <nav
        class="bg-gray-800 px-4 py-3 w-full md:w-[97%] mx-auto overflow-x-auto rounded-lg my-4"
      >
        <div class="flex space-x-6 text-sm whitespace-nowrap">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            @click="
              activeTab = tab.key;
              loadUsers();
            "
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

      <!-- Tab Content -->
      <div class="p-4 md:p-6 rounded-lg" v-if="activeTab">
        <div v-if="activeTab === 'institution'">
          <el-form
            ref="formRef"
            :model="formData"
            :rules="rules"
            label-width="160px"
            label-position="top"
          >
            <!-- Birinchi qator -->
            <div
              class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-4"
            >
              <el-form-item label="Название школы" prop="name">
                <el-input
                  v-model="formData.name"
                  :disabled="!uData"
                  placeholder="Название школы"
                />
              </el-form-item>
              <el-form-item label="Телефон школы" prop="phone_number">
                <vue-tel-input
                  v-model="formData.phone_number"
                  :autoFormat="true"
                  :inputOptions="{
                    showDialCode: true,
                    maxlength: 17,
                    valid: false,
                    required: true,
                    type: 'tel',
                    autocomplete: 'on',
                    autofocus: true,
                  }"
                  :disabled="!uData"
                  :dropdownOptions="{ showFlags: true }"
                  :onlyCountries="['UZ']"
                  :defaultCountry="'UZ'"
                  class="!bg-gray-200 !h-8 w-full rounded-md shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
                />
              </el-form-item>
              <el-form-item label="Директор школы" prop="director">
                <el-input
                  v-model="formData.director"
                  :disabled="!uData"
                  placeholder="Директор школы"
                />
              </el-form-item>
              <el-form-item label="Тип школы" prop="type">
                <el-select
                  v-model="formData.type"
                  :disabled="!uData"
                  placeholder="Выберите"
                >
                  <el-option label="Спортивная школа" value="sport_school" />
                  <el-option label="Спортивный клуб" value="sport_club" />
                  <el-option label="Спорткомплекс" value="sport_complex" />
                </el-select>
              </el-form-item>
            </div>

            <!-- Ikkinchi qator -->
            <div
              class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-4 mt-4"
            >
              <el-form-item label="Адрес школы" prop="address">
                <el-input
                  v-model="formData.address"
                  :disabled="!uData"
                  placeholder="Адрес школы"
                />
              </el-form-item>
              <el-form-item label="Регион" :disabled="!uData" prop="region">
                <el-select
                  v-model="formData.region"
                  placeholder="Регион"
                  filterable
                  :disabled="!uData"
                  clearable
                  @change="onRegionChange"
                >
                  <el-option
                    v-for="item in regions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="Район" prop="district">
                <el-select
                  v-model="formData.district"
                  placeholder="Район"
                  filterable
                  :disabled="!uData"
                  clearable
                >
                  <el-option
                    v-for="item in filteredDistricts"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="Виды спорта" prop="sports">
                <el-select
                  v-model="formData.sports"
                  placeholder="Выберите"
                  multiple
                  :disabled="!uData"
                  filterable
                >
                  <el-option
                    v-for="item in sports"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </div>

            <!-- Map qismi -->
            <div class="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 mt-6">
              <label class="block text-sm font-medium text-white">Локация на карте</label>
              <div class="h-[400px] w-full mt-2 border rounded-lg overflow-hidden">
                <MapboxMap
                  access-token="pk.eyJ1IjoibXVraGFtbWFkaXJtYXRvdiIsImEiOiJjbHoxNHhmZnkyaXRoMmlxc2ExbWJpYTc1In0.CE43UNvdFFRSiDbgPDNoZQ"
                  style="height: 400px"
                  map-style="mapbox://styles/mapbox/streets-v11"
                  :center="center"
                  :zoom="10"
                  @mb-created="onMapClick"
                >
                  <MapboxMarker :lng-lat="[formData.longitude, formData.latitude]" />
                </MapboxMap>
              </div>
              <p class="text-sm text-white mt-1">
                Latitude: {{ formData.latitude }} | Longitude: {{ formData.longitude }}
              </p>
            </div>

            <!-- Tugmalar -->
            <div class="w-full flex justify-end mt-6">
              <el-button v-if="!uData" type="danger" @click="updateData" class="w-fit">
                Хотите изменить uchrejdeniye?
              </el-button>
              <el-button v-else type="primary" @click="updateForm" class="w-fit">
                Uchrejdeniye Обновлять
              </el-button>
            </div>
          </el-form>
        </div>

        <div v-if="activeTab === 'athletes'">
          <h2 class="text-xl font-bold mb-4">Спортсмены</h2>
          <div class="hidden md:block">
            <el-table
              :data="athletes"
              stripe
              style="width: 100%"
              class="!bg-transparent !text-white !border !rounded-lg"
            >
              <el-table-column prop="first_name" label="Имя" />
              <el-table-column prop="last_name" label="Фамилия" />
              <el-table-column prop="phone_number" label="Телефон" />
              <el-table-column prop="birth_date" label="Дата рождения" />
              <el-table-column prop="gender" label="Пол" />
              <el-table-column prop="created_time" label="Создан" />
            </el-table>
          </div>

          <div class="grid grid-cols-1 gap-4 md:hidden">
            <div
              v-for="(athlete, idx) in athletes"
              :key="idx"
              class="border rounded-lg p-4 bg-[#1c1b29] text-white shadow-md"
            >
              <p><span class="font-semibold">Имя:</span> {{ athlete.first_name }}</p>
              <p><span class="font-semibold">Фамилия:</span> {{ athlete.last_name }}</p>
              <p>
                <span class="font-semibold">Телефон:</span> {{ athlete.phone_number }}
              </p>
              <p>
                <span class="font-semibold">Дата рождения:</span> {{ athlete.birth_date }}
              </p>
              <p><span class="font-semibold">Пол:</span> {{ athlete.gender }}</p>
              <p><span class="font-semibold">Создан:</span> {{ athlete.created_time }}</p>
            </div>
          </div>

          <div class="flex justify-center mt-4">
            <el-pagination
              background
              layout="prev, pager, next"
              :page-size="pageSize"
              :current-page="currentPage"
              :total="totalCount"
              @current-change="handlePageChange"
            />
          </div>
        </div>

        <div v-if="activeTab === 'trainers'">
          <h2 class="text-xl font-bold mb-4">Тренеры</h2>

          <div class="hidden md:block">
            <el-table
              :data="trainers"
              stripe
              style="width: 100%"
              class="!bg-transparent !text-white !border !rounded-lg"
            >
              <el-table-column prop="first_name" label="Имя" />
              <el-table-column prop="last_name" label="Фамилия" />
              <el-table-column prop="phone_number" label="Телефон" />
              <el-table-column prop="birth_date" label="Дата рождения" />
              <el-table-column prop="gender" label="Пол" />
              <el-table-column prop="created_time" label="Создан" />
            </el-table>
          </div>

          <div class="grid grid-cols-1 gap-4 md:hidden">
            <div
              v-for="(trainer, idx) in trainers"
              :key="idx"
              class="border rounded-lg p-4 bg-[#1c1b29] text-white shadow-md"
            >
              <p><span class="font-semibold">Имя:</span> {{ trainer.first_name }}</p>
              <p><span class="font-semibold">Фамилия:</span> {{ trainer.last_name }}</p>
              <p>
                <span class="font-semibold">Телефон:</span> {{ trainer.phone_number }}
              </p>
              <p>
                <span class="font-semibold">Дата рождения:</span> {{ trainer.birth_date }}
              </p>
              <p><span class="font-semibold">Пол:</span> {{ trainer.gender }}</p>
              <p><span class="font-semibold">Создан:</span> {{ trainer.created_time }}</p>
            </div>
          </div>

          <div class="flex justify-center mt-4">
            <el-pagination
              background
              layout="prev, pager, next"
              :page-size="pageSize"
              :current-page="currentPage"
              :total="totalCount"
              @current-change="handlePageChange"
            />
          </div>
        </div>

        <div v-if="activeTab === 'media'">
          <SchoolMedia />
        </div>
      </div>

      <div
        v-else
        class="min-h-[50vh] flex flex-col items-center justify-center bg-[#11101B] text-white text-center p-8"
      >
        <el-empty :image-size="200" />
      </div>
    </div>

    <div
      v-else
      class="min-h-[50vh] flex flex-col items-center justify-center bg-[#11101B] text-white text-center p-8"
    >
      <h1 class="text-2xl font-bold mb-4">Нет разрешения</h1>
      <p class="text-gray-400 max-w-md">
        У вас пока нет разрешения на доступ к странице Школа. Обратитесь к системному
        администратору.
      </p>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useAuthStore } from "~/stores/auth";
import { MapboxMap, MapboxMarker } from "@studiometa/vue-mapbox-gl";
import SchoolMedia from "~/components/SchoolMedia.vue";
const authStore = useAuthStore();
const { $api } = useNuxtApp();

const activeTab = ref("institution");
const center = ref([69.279737, 41.311151]);
const sports = ref([]);
const regions = ref([]);
const filteredDistricts = ref([]);
const formRef = ref();
const map = ref();
const athletes = ref([]);
const trainers = ref([]);
const totalCount = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const uData = ref(false);

const updateData = () => {
  uData.value = true;
};
const loadUsers = async () => {
  try {
    const role = activeTab.value === "athletes" ? "sportsman" : "trainer";

    const res = await $api.get(
      `/sport/sport-institution/${authStore.userProfile?.data?.sport_institution?.id}/users/`,
      {
        params: {
          page: currentPage.value,
          page_size: pageSize.value,
          user_role: role,
        },
      }
    );
    const users = res.data.data.data;
    totalCount.value = res.data.data.count;

    if (role === "sportsman") {
      athletes.value = users;
    } else {
      trainers.value = users;
    }
  } catch (e) {
    console.error("Users yuklashda xatolik:", e);
  }
};

const handlePageChange = (page) => {
  currentPage.value = page;
  loadUsers();
};

function mapApiDataToForm(data) {
  return {
    name: data?.name,
    phone_number: data?.phone_number,
    director: data?.director,
    type: data?.type,
    address: data?.address,
    latitude: data?.latitude,
    longitude: data?.longitude,
    region: data?.region?.id,
    district: data?.district?.id,
    sports: data?.sports?.map((s) => s.id),
  };
}

const onMapClick = (mapboxInstance) => {
  map.value = mapboxInstance;
  map.value.on("click", (event) => {
    const { lngLat } = event;

    formData.value.latitude = lngLat.lat.toFixed(4);
    formData.value.longitude = lngLat.lng.toFixed(4);
  });
};

const tabs = [
  {
    key: "institution",
    label: "Detali Uchrejdeniye",
  },
  { key: "athletes", label: "Спортсмены" },
  { key: "trainers", label: "Тренеры" },
  { key: "media", label: "Media" },
];

const formData = ref(mapApiDataToForm());

const getData = async () => {
  try {
    const res = await $api.get(
      `/sport/sport-institutions/${authStore.userProfile?.data?.sport_institution?.id}/`
    );
    const apiData = res.data.data;
    console.log(apiData);

    formData.value = mapApiDataToForm(apiData);
  } catch (err) {
    console.error(err);
  }
};

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

const getDistricts = async (regionId) => {
  if (!regionId) {
    filteredDistricts.value = [];
    return;
  }
  try {
    const res = await $api.get(`/user/districts/?region=${regionId}`);
    filteredDistricts.value = res.data.data;
  } catch (err) {
    console.error("Districts yuklashda xatolik:", err);
  }
};

const onRegionChange = () => {
  const selectedRegionId = formData.value.region;
  getDistricts(selectedRegionId);
  if (
    !filteredDistricts.value.find(
      (district) => district.id === formData.value.district?.id
    )
  ) {
    formData.value.district;
  }
};

watch(
  () => formData.value.region,
  (newRegion) => {
    if (newRegion) {
      getDistricts(newRegion);
    } else {
      filteredDistricts.value = [];
      formData.value.district = null;
    }
  }
);

watch(() => formData.value.region, onRegionChange);

watch(
  () => authStore.userProfile?.data?.sport_institution?.id,
  (newId) => {
    if (newId) {
      getData();
      loadUsers();
    }
  },
  { immediate: true }
);

onMounted(() => {
  //   getData();
  //   loadUsers();
  getSports();
  getRegions();
});

const rules = ref({
  name: [{ required: true, message: "Введите название школы", trigger: "blur" }],
  phone_number: [{ required: true, message: "Введите телефон школы", trigger: "blur" }],
  director: [{ required: true, message: "Введите директора школы", trigger: "blur" }],
  type: [{ required: true, message: "Выберите тип школы", trigger: "change" }],
  address: [{ required: true, message: "Введите адрес школы", trigger: "blur" }],
  region: [{ required: true, message: "Выберите регион", trigger: "change" }],
  district: [{ required: true, message: "Выберите район", trigger: "change" }],
  sports: [{ required: true, message: "Выберите виды спорта", trigger: "change" }],
});

async function updateForm() {
  try {
    await formRef.value.validate();

    await $api.patch(
      `/sport/sport-institutions/${authStore.userProfile?.data?.sport_institution?.id}/`,
      {
        ...formData.value,
        phone_number: formData.value.phone_number.replaceAll(" ", ""),
      }
    );
    ElMessage.success("Успешно Обновлять!");
    await getData();
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
      } else if (data === "string") {
        ElMessage.error(data);
      }
    } else {
      ElMessage.error("Ошибка при Обновлять!");
    }
  }
}
</script>

<style scoped>
:deep(.el-table th.el-table__cell) {
  background-color: #2e2f3e !important;
  color: white !important;
}

:deep(.el-table__row) {
  background-color: transparent !important;
  color: white !important;
}
:deep(.el-table__body tr:hover > td) {
  background-color: transparent !important;
  color: inherit !important;
}

:deep(.el-form-item__label) {
  color: white !important;
}
:deep(.el-input__wrapper) {
  background-color: #2e2f3e !important;
  color: white !important;
}
:deep(.el-input__inner) {
  color: white !important;
}
:deep(.el-select__wrapper) {
  background-color: #2e2f3e !important;
  color: white !important;
}
:deep(.el-select__selected-item .el-select__placeholder) {
  color: white !important;
}
:deep(.el-select__selected-item) {
  color: white !important;
}
:deep(.vti__input) {
  background-color: #2e2f3e !important;
  color: white !important;
}
:deep(.vti__dropdown) {
  background-color: #2e2f3e !important;
  color: white !important;
}
</style>
