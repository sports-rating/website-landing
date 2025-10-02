<template>
  <div class="bg-[#11101B] py-8">
    <div class="container mx-auto px-4">
      <div
        class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-3 sm:gap-0"
      >
        <div class="flex flex-wrap items-center gap-3">
          <h2 class="text-xl sm:text-2xl font-bold text-white uppercase">
            Спортивное учреждение
          </h2>
          <el-button type="default" class="!h-6 !rounded-lg" @click="openDialog">
            Оставить заявку
          </el-button>
        </div>
        <button
          @click="goToRatings"
          class="text-gray-400 hover:text-white flex items-center gap-2 text-sm sm:text-base whitespace-nowrap"
        >
          Посмотреть все
          <ChevronRight class="w-4 h-4" />
        </button>
      </div>

      <el-dialog
        v-model="dialogVisible"
        title="Форма заявки"
        width="950px"
        class="!bg-[#2E2F3E] !text-white"
      >
        <el-form
          ref="formRef"
          :model="formData"
          :rules="rules"
          label-width="160px"
          label-position="top"
        >
          <div class="grid grid-cols-4 w-full gap-4">
            <el-form-item label="Имя менеджера" prop="manager_first_name">
              <el-input v-model="formData.manager_first_name" placeholder="Имя" />
            </el-form-item>
            <el-form-item label="Фамилия менеджера" prop="manager_last_name">
              <el-input v-model="formData.manager_last_name" placeholder="Фамилия" />
            </el-form-item>
            <el-form-item label="Телефон менеджера" prop="manager_phone_number">
              <vue-tel-input
                v-model="formData.manager_phone_number"
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
                :dropdownOptions="{ showFlags: true }"
                :onlyCountries="['UZ']"
                :defaultCountry="'UZ'"
                class="!bg-gray-200 !h-8 w-full rounded-md shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
              />
            </el-form-item>
            <el-form-item label="Название школы" prop="school_name">
              <el-input v-model="formData.school_name" placeholder="Название школы" />
            </el-form-item>
          </div>
          <div class="grid grid-cols-4 w-full gap-4">
            <el-form-item label="Телефон школы" prop="school_phone_number">
              <vue-tel-input
                v-model="formData.school_phone_number"
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
                :dropdownOptions="{ showFlags: true }"
                :onlyCountries="['UZ']"
                :defaultCountry="'UZ'"
                class="!bg-gray-200 !h-8 w-full rounded-md shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
              />
            </el-form-item>
            <el-form-item label="Директор школы" prop="school_director">
              <el-input v-model="formData.school_director" placeholder="Директор школы" />
            </el-form-item>
            <el-form-item label="Тип школы" prop="school_type">
              <el-select v-model="formData.school_type" placeholder="Выберите">
                <el-option label="Спортивная школа" value="sport_school" />
                <el-option label="Спортивный клуб" value="sport_club" />
                <el-option label="Спорткомплекс" value="sport_complex" />
              </el-select>
            </el-form-item>
            <el-form-item label="Адрес школы" prop="school_address">
              <el-input v-model="formData.school_address" placeholder="Адрес школы" />
            </el-form-item>
          </div>
          <div class="grid grid-cols-3 w-full gap-4">
            <el-form-item label="Регион" prop="school_region">
              <el-select
                v-model="formData.school_region"
                placeholder="Регион"
                filterable
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
            <el-form-item label="Район" prop="school_district">
              <el-select
                v-model="formData.school_district"
                placeholder="Район"
                filterable
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
            <el-form-item label="Виды спорта" prop="school_sports">
              <el-select
                v-model="formData.school_sports"
                placeholder="Выберите"
                multiple
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

          <div class="col-span-3">
            <label class="block text-sm font-medium text-white">Локация на карте</label>
            <div class="h-[200px] w-full mt-2 border rounded-lg overflow-hidden">
              <MapboxMap
                access-token="pk.eyJ1IjoibXVraGFtbWFkaXJtYXRvdiIsImEiOiJjbHoxNHhmZnkyaXRoMmlxc2ExbWJpYTc1In0.CE43UNvdFFRSiDbgPDNoZQ"
                style="height: 200px"
                map-style="mapbox://styles/mapbox/streets-v11"
                :center="center"
                :zoom="10"
                @mb-created="onMapClick"
              >
                <MapboxMarker
                  :lng-lat="[formData.school_longitude, formData.school_latitude]"
                />
              </MapboxMap>
            </div>
            <p class="text-sm text-white mt-1">
              Latitude: {{ formData.school_latitude }} | Longitude:
              {{ formData.school_longitude }}
            </p>
          </div>
        </el-form>

        <template #footer>
          <el-button @click="handleCancel">Отмена</el-button>
          <el-button type="primary" @click="submitForm"> Отправить </el-button>
        </template>
      </el-dialog>

      <div class="md:grid grid-cols-1 md:grid-cols-2 gap-6 hidden">
        <nuxt-link
          v-for="complex in filteredComplexes"
          :key="complex.id"
          :to="`/complexs/${complex.id}`"
          class="group bg-[#2A2B31] rounded-lg overflow-hidden hover:bg-[#3A3B41] transition-colors"
        >
          <div
            class="bg-[#2A2B31] rounded-lg overflow-hidden group hover:bg-[#3A3B41] transition-colors flex flex-col h-full"
          >
            <!-- Complex Image -->
            <div class="relative aspect-[16/5] overflow-hidden">
              <img
                :src="complex.media[0]?.file || '/default.jpg'"
                :alt="complex.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
              ></div>
            </div>

            <!-- Complex Content -->
            <div class="p-4 flex flex-col flex-1">
              <div class="flex justify-between w-full gap-2 mb-4">
                <h3
                  class="text-white whitespace-nowrap font-medium text-lg mb-2 line-clamp-2"
                >
                  {{ complex.name }}
                </h3>
                <!-- <span
                  v-for="sport in complex.sports"
                  :key="sport.id"
                  class="text-xs bg-[#1A1B1F] text-gray-400 px-2 py-1 rounded"
                >
                  {{ sport.name }}
                </span> -->
              </div>

              <div class="mt-auto">
                <div
                  class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0"
                >
                  <div class="flex items-center gap-2 text-gray-400 text-sm truncate">
                    <MapPin class="w-4 h-4" />
                    <span class="truncate">
                      {{ complex.region?.name }}, {{ complex.district?.name }}
                    </span>
                  </div>
                </div>

                <div class="flex w-full justify-between">
                  <div class="mt-3 text-gray-300 text-sm">
                    📞 {{ complex.phone_number }}
                  </div>
                  <div class="mt-3 text-gray-400 text-sm capitalize">
                    {{
                      complex.type === "club"
                        ? "Спортивный клуб"
                        : complex.type === "school"
                        ? "Спортивная школа"
                        : complex.type === "complex"
                        ? "Спорткомплекс"
                        : "Учреждение"
                    }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nuxt-link>
      </div>

      <Swiper
        :slides-per-view="'auto'"
        space-between="16"
        class="!pb-4 md:!hidden !block"
      >
        <SwiperSlide
          v-for="complex in filteredComplexes"
          :key="complex.id"
          class="!w-[280px] sm:!w-[360px] !h-full"
        >
          <nuxt-link :to="`/complexs/${complex.id}`">
            <div
              class="bg-[#2A2B31] rounded-lg overflow-hidden group hover:bg-[#3A3B41] transition-colors flex flex-col h-full"
            >
              <!-- Complex Image -->
              <div class="relative aspect-[16/10] overflow-hidden">
                <img
                  :src="complex.media[0]?.file || '/default.jpg'"
                  :alt="complex.name"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                ></div>
              </div>

              <!-- Complex Content -->
              <div class="p-4 flex flex-col flex-1">
                <div class="flex justify-between w-full gap-2 mb-4">
                  <h3
                    class="text-white whitespace-nowrap font-medium text-lg mb-2 line-clamp-2"
                  >
                    {{ complex.name }}
                  </h3>
                  <!-- <span
                  v-for="sport in complex.sports"
                  :key="sport.id"
                  class="text-xs bg-[#1A1B1F] text-gray-400 px-2 py-1 rounded"
                >
                  {{ sport.name }}
                </span> -->
                </div>

                <div class="mt-auto">
                  <div
                    class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0"
                  >
                    <div class="flex items-center gap-2 text-gray-400 text-sm truncate">
                      <MapPin class="w-4 h-4" />
                      <span class="truncate">
                        {{ complex.region?.name }}, {{ complex.district?.name }}
                      </span>
                    </div>
                  </div>

                  <div class="flex w-full justify-between">
                    <div class="mt-3 text-gray-300 text-sm">
                      📞 {{ complex.phone_number }}
                    </div>
                    <div class="mt-3 text-gray-400 text-sm capitalize">
                      {{
                        complex.type === "club"
                          ? "Спортивный клуб"
                          : complex.type === "school"
                          ? "Спортивная школа"
                          : complex.type === "complex"
                          ? "Спорткомплекс"
                          : "Учреждение"
                      }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nuxt-link>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronRight, MapPin, Star } from "lucide-vue-next";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import { ElMessage } from "element-plus";
import { MapboxMap, MapboxMarker } from "@studiometa/vue-mapbox-gl";
import { useRouter } from "vue-router";

const { $api } = useNuxtApp();
const router = useRouter();
const dialogVisible = ref(false);
const sports = ref([]);
const regions = ref([]);
const filteredDistricts = ref([]);
const formRef = ref();
const center = ref([69.279737, 41.311151]);
const map = ref();
const complexes = ref([]);

const filteredComplexes = computed(() => {
  if (!complexes.value) return [];

  return complexes.value
    .sort((a, b) => new Date(b.created_time) - new Date(a.created_time))
    .slice(0, 2);
});

function getDefaultFormData() {
  return {
    manager_first_name: "",
    manager_last_name: "",
    manager_phone_number: "+998",
    school_name: "",
    school_phone_number: "+998",
    school_director: "",
    school_type: "sport_school",
    school_address: "",
    school_latitude: 41.311151,
    school_longitude: 69.279737,
    school_region: "",
    school_district: "",
    school_sports: [],
  };
}

const goToRatings = () => {
  router.push("/SchoolAllPage");
};

const formData = ref(getDefaultFormData());

const rules = ref({
  manager_first_name: [
    { required: true, message: "Введите имя менеджера", trigger: "blur" },
  ],
  manager_last_name: [
    { required: true, message: "Введите фамилию менеджера", trigger: "blur" },
  ],
  manager_phone_number: [
    { required: true, message: "Введите телефон менеджера", trigger: "blur" },
  ],
  school_name: [{ required: true, message: "Введите название школы", trigger: "blur" }],
  school_phone_number: [
    { required: true, message: "Введите телефон школы", trigger: "blur" },
  ],
  school_director: [
    { required: true, message: "Введите директора школы", trigger: "blur" },
  ],
  school_type: [{ required: true, message: "Выберите тип школы", trigger: "change" }],
  school_address: [{ required: true, message: "Введите адрес школы", trigger: "blur" }],
  school_region: [{ required: true, message: "Выберите регион", trigger: "change" }],
  school_district: [{ required: true, message: "Выберите район", trigger: "change" }],
  school_sports: [{ required: true, message: "Выберите виды спорта", trigger: "change" }],
});

const onMapClick = (mapboxInstance: any) => {
  map.value = mapboxInstance;
  map.value.on("click", (event: any) => {
    const { lngLat } = event;

    formData.value.school_latitude = lngLat.lat.toFixed(4);
    formData.value.school_longitude = lngLat.lng.toFixed(4);
  });
};

function openDialog() {
  dialogVisible.value = true;
}

const getSports = async () => {
  try {
    const sportRes = await $api.get("sport/");
    sports.value = sportRes.data.data;
  } catch (e) {
    console.error("Sport error:", e);
  }
};

getSports();

const getSportsAbout = async () => {
  try {
    const sportRes = await $api.get("/sport/sport-institutions/");
    complexes.value = sportRes.data.data.data as any;
  } catch (e) {
    console.error("Sport error:", e);
  }
};

onMounted(() => {
  getSportsAbout();
});

async function submitForm() {
  try {
    await formRef.value.validate();

    await $api.post("/sport/sport-institution-request/", {
      ...formData.value,
      manager_phone_number: formData.value.manager_phone_number.replaceAll(" ", ""),
      school_phone_number: formData.value.school_phone_number.replaceAll(" ", ""),
    });
    ElMessage.success("Успешно создано!");
    formRef.value.resetFields();
    formData.value = getDefaultFormData();
    dialogVisible.value = false;
  } catch (err: any) {
    if (err.response?.data) {
      const data = err.response.data;

      if (typeof data === "object" && !Array.isArray(data)) {
        if (data.message && typeof data.message === "string") {
          ElMessage.error(data.message);
        } else {
          Object.keys(data).forEach((field) => {
            if (Array.isArray(data[field])) {
              data[field].forEach((msg: string) => {
                ElMessage.error(msg);
              });
            }
          });
        }
      } else if (typeof data === "string") {
        ElMessage.error(data);
      } else {
        ElMessage.error("Ошибка при создании!");
      }
    } else {
      ElMessage.error("Ошибка при создании!");
    }
  }
}

const getRegions = async () => {
  try {
    const res = await $api.get("/user/regions/");
    regions.value = res.data.data;
  } catch (err) {
    console.error("Regions yuklashda xatolik:", err);
  }
};

const getDistricts = async (regionId: any) => {
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
  const selectedRegionId = formData.value.school_region;
  console.log(selectedRegionId);

  getDistricts(selectedRegionId);

  if (
    !filteredDistricts.value.find(
      (district) => district.id === formData.value.school_district?.id
    )
  ) {
    formData.value.school_district.id;
  }
};

function handleCancel() {
  dialogVisible.value = false;
  resetForm();
}

function resetForm() {
  formRef.value?.resetFields();
  formData.value = {
    manager_first_name: "",
    manager_last_name: "",
    manager_phone_number: "+998",
    school_name: "",
    school_phone_number: "+998",
    school_director: "",
    school_type: "sport_school",
    school_address: "",
    school_latitude: 41.311151,
    school_longitude: 69.279737,
    school_region: "",
    school_district: "",
    school_sports: [],
  };
}

watch(
  () => formData.value.school_region.region,
  (newRegion) => {
    if (newRegion?.id) {
      getDistricts(newRegion.id);
    } else {
      filteredDistricts.value = [];
      formData.value.school_district = null;
    }
  }
);
onMounted(() => {
  getRegions();
});

watch(() => formData.value.school_region, onRegionChange);
</script>

<style scoped>
:deep(.el-dialog) {
  margin-top: 3rem !important;
}
:deep(.el-dialog__title) {
  color: white !important;
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
/* Add any component-specific styles here */
</style>

<style>
.el-message {
  z-index: 9999 !important;
}
</style>
