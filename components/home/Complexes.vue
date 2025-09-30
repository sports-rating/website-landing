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
            В создании учреждения
          </el-button>
        </div>
        <button
          class="text-gray-400 hover:text-white flex items-center gap-2 text-sm sm:text-base whitespace-nowrap"
        >
          Посмотреть все
          <ChevronRight class="w-4 h-4" />
        </button>
      </div>

      <el-dialog v-model="dialogVisible" title="Создать учреждение" width="950px">
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
            <label class="block text-sm font-medium text-gray-700"
              >Локация на карте</label
            >
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
            <p class="text-sm text-gray-500 mt-1">
              Latitude: {{ formData.school_latitude }} | Longitude:
              {{ formData.school_longitude }}
            </p>
          </div>
        </el-form>

        <template #footer>
          <el-button @click="handleCancel">Отмена</el-button>
          <el-button type="primary" @click="submitForm">Сохранить</el-button>
        </template>
      </el-dialog>

      <div class="md:grid grid-cols-1 md:grid-cols-2 gap-6 hidden">
        <div
          v-for="complex in complexes"
          :key="complex.id"
          class="group bg-[#2A2B31] rounded-lg overflow-hidden hover:bg-[#3A3B41] transition-colors"
        >
          <div class="relative aspect-[16/7] overflow-hidden">
            <img
              :src="complex.image"
              :alt="complex.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
            ></div>
          </div>

          <div class="p-4">
            <h3 class="text-white font-medium text-lg mb-2 line-clamp-2">
              {{ complex.name }}
            </h3>

            <p class="text-gray-400 text-sm mb-4 line-clamp-3">
              {{ complex.description }}
            </p>

            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="facility in complex.facilities"
                :key="facility"
                class="text-xs bg-[#1A1B1F] text-gray-400 px-2 py-1 rounded"
              >
                {{ facility }}
              </span>
            </div>

            <div
              class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0"
            >
              <div class="flex items-center gap-2 text-gray-400 text-sm truncate">
                <MapPin class="w-4 h-4" />
                <span class="truncate">{{ complex.location }}</span>
              </div>

              <div
                class="flex items-center gap-2 text-gray-400 text-sm whitespace-nowrap"
              >
                <div class="flex">
                  <Star
                    v-for="i in 5"
                    :key="i"
                    :class="[
                      'w-4 h-4',
                      i <= complex.rating ? 'text-yellow-400' : 'text-gray-600',
                    ]"
                    :fill="i <= complex.rating ? 'currentColor' : 'none'"
                  />
                </div>
                <span>{{ complex.reviewCount }} отзывов</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Swiper
        :slides-per-view="'auto'"
        space-between="16"
        class="!pb-4 md:!hidden !block"
      >
        <SwiperSlide
          v-for="complex in complexes"
          :key="complex.id"
          class="!w-[280px] sm:!w-[320px]"
        >
          <div
            class="bg-[#2A2B31] rounded-lg overflow-hidden group hover:bg-[#3A3B41] transition-colors"
          >
            <!-- Complex Image -->
            <div class="relative aspect-[16/7] overflow-hidden">
              <img
                :src="complex.image"
                :alt="complex.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
              ></div>
            </div>

            <!-- Complex Content -->
            <div class="p-4">
              <h3 class="text-white font-medium text-lg mb-2 line-clamp-2">
                {{ complex.name }}
              </h3>

              <p class="text-gray-400 text-sm mb-4 line-clamp-3">
                {{ complex.description }}
              </p>

              <!-- Facilities -->
              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="facility in complex.facilities"
                  :key="facility"
                  class="text-xs bg-[#1A1B1F] text-gray-400 px-2 py-1 rounded"
                >
                  {{ facility }}
                </span>
              </div>

              <!-- Footer -->
              <div
                class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0"
              >
                <!-- Location -->
                <div class="flex items-center gap-2 text-gray-400 text-sm truncate">
                  <MapPin class="w-4 h-4" />
                  <span class="truncate">{{ complex.location }}</span>
                </div>

                <!-- Rating -->
                <div
                  class="flex items-center gap-2 text-gray-400 text-sm whitespace-nowrap"
                >
                  <div class="flex">
                    <Star
                      v-for="i in 5"
                      :key="i"
                      :class="[
                        'w-4 h-4',
                        i <= complex.rating ? 'text-yellow-400' : 'text-gray-600',
                      ]"
                      :fill="i <= complex.rating ? 'currentColor' : 'none'"
                    />
                  </div>
                  <span>{{ complex.reviewCount }} отзывов</span>
                </div>
              </div>
            </div>
          </div>
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

const { $api } = useNuxtApp();

const dialogVisible = ref(false);
const sports = ref([]);
const regions = ref([]);
const filteredDistricts = ref([]);
const formRef = ref();
const center = ref([69.279737, 41.311151]);
const map = ref();

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

interface SportComplex {
  id: number;
  image: string;
  name: string;
  description: string;
  facilities: string[];
  location: string;
  rating: number;
  reviewCount: number;
}

const complexes: SportComplex[] = [
  {
    id: 1,
    image: "/complexes.svg",
    name: " Humo Arena",
    description:
      "Спортивный комплекс включает в себя ледовую арену, тренажерный зал, бассейн и другие спортивные объекты.",
    facilities: ["Ледовая арена", "Тренажерный зал", "Бассейн", "Фитнес-центр"],
    location: "Ташкент, Мирзо Улугбекский район",
    rating: 5,
    reviewCount: 128,
  },
  {
    id: 2,
    image: "/barsa.jpg",
    name: "Centre Camp Nou",
    description:
      "Современный фитнес-центр с новейшим оборудованием, спа-зоной и профессиональными тренерами.",
    facilities: ["Тренажерный зал", "СПА", "Групповые занятия", "Бассейн"],
    location: "Ташкент, Мирзо Улугбекский район",
    rating: 4,
    reviewCount: 85,
  },
];
</script>

<style scoped>
:deep(.el-dialog) {
  margin-top: 3rem !important;
}
/* Add any component-specific styles here */
</style>

<style>
.el-message {
  z-index: 9999 !important;
}
</style>
