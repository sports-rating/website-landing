<template>
  <div class="bg-[#11101B] py-8">
    <div class="container mx-auto px-4">
      <div
        class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-3 sm:gap-0"
      >
        <div class="flex flex-wrap items-center gap-3">
          <h2 class="text-xl sm:text-2xl font-bold text-white uppercase">
            {{ t("institutionSport") }}
          </h2>
          <el-button
            class="!h-8 !rounded-lg !bg-red-500 !text-white hover:!bg-red-600 !border-none"
            @click="openDialog"
          >
            {{ t("request") }}
          </el-button>
        </div>
        <button
          @click="goToRatings"
          class="text-gray-400 hover:text-white flex items-center gap-2 text-sm sm:text-base whitespace-nowrap"
        >
          {{ t("allFound") }}
          <ChevronRight class="w-4 h-4" />
        </button>
      </div>

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
            <div class="relative aspect-[16/6] overflow-hidden">
              <div class="rounded-xl overflow-hidden">
                <swiper
                  :modules="[Autoplay, Pagination, Navigation]"
                  :slides-per-view="1"
                  :space-between="10"
                  :loop="true"
                  :autoplay="{ delay: 3000, disableOnInteraction: false }"
                  pagination
                  navigation
                  class="rounded-xl"
                >
                  <swiper-slide
                    v-for="(img, index) in getImageMedia(complex.media)"
                    :key="index"
                    class="flex justify-center"
                  >
                    <img
                      :src="img.file"
                      :alt="complex?.name"
                      class="rounded-xl w-full object-cover shadow-lg"
                    />
                  </swiper-slide>
                </swiper>
              </div>
            </div>

            <!-- Complex Content -->
            <div class="p-4 flex flex-col flex-1">
              <div class="flex justify-between w-full gap-2 mb-4 items-center">
                <h3
                  class="text-white whitespace-nowrap font-medium text-lg mb-2 line-clamp-2"
                >
                  {{ complex.name }}
                </h3>

                <div class="flex items-center gap-1 mb-3">
                  <span
                    v-for="star in 5"
                    :key="star"
                    class="cursor-pointer text-2xl transition"
                    :class="{
                      'text-yellow-400': star <= complex.rating,
                      'text-gray-500': star > complex.rating,
                    }"
                  >
                    ★
                  </span>
                </div>
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
                        ? t("sportClub")
                        : complex.type === "school"
                        ? t("sportSchool")
                        : complex.type === "complex"
                        ? t("complex")
                        : t("establishment")
                    }}
                  </div>
                </div>

                <div class="flex flex-wrap gap-2 mt-3">
                  <div
                    v-for="sport in complex.sports"
                    :key="sport.id"
                    class="px-3 py-1 bg-gray-700 text-gray-200 text-sm rounded-full hover:bg-indigo-600 transition-colors cursor-default"
                  >
                    {{ sport.name }}
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
                <div class="flex justify-between w-full gap-2 mb-6 items-center">
                  <h3
                    class="text-white whitespace-nowrap font-medium text-lg line-clamp-2"
                  >
                    {{ complex.name }}
                  </h3>

                  <div class="flex items-center gap-1">
                    <span
                      v-for="star in 5"
                      :key="star"
                      class="cursor-pointer text-2xl transition"
                      :class="{
                        'text-yellow-400': star <= complex.rating,
                        'text-gray-500': star > complex.rating,
                      }"
                    >
                      ★
                    </span>
                  </div>
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
                          ? t("sportClub")
                          : complex.type === "school"
                          ? t("sportSchool")
                          : complex.type === "complex"
                          ? t("complex")
                          : t("establishment")
                      }}
                    </div>
                  </div>

                  <div class="flex flex-wrap gap-2 mt-3">
                    <div
                      v-for="sport in complex.sports"
                      :key="sport.id"
                      class="px-3 py-1 bg-gray-700 text-gray-200 text-sm rounded-full hover:bg-indigo-600 transition-colors cursor-default"
                    >
                      {{ sport.name }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nuxt-link>
        </SwiperSlide>
      </Swiper>

      <el-dialog
        v-model="dialogVisible"
        :title="t('form')"
        width="950px"
        class="!bg-[#2E2F3E] !text-white max-w-[95vw] sm:max-w-[750px] md:max-w-[900px]"
      >
        <el-form
          ref="formRef"
          :model="formData"
          :rules="rules"
          label-width="160px"
          label-position="top"
          class="w-full"
        >
          <!-- 1-qator -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full gap-4">
            <el-form-item :label="t('manager_first_name')" prop="manager_first_name">
              <el-input
                v-model="formData.manager_first_name"
                clearable
                :placeholder="t('firstManager')"
              />
            </el-form-item>
            <el-form-item :label="t('manager_last_name')" prop="manager_last_name">
              <el-input
                v-model="formData.manager_last_name"
                clearable
                :placeholder="t('lastManager')"
              />
            </el-form-item>
            <el-form-item :label="t('manager_phone_number')" prop="manager_phone_number">
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
            <el-form-item :label="t('school_name')" prop="school_name">
              <el-input
                v-model="formData.school_name"
                clearable
                :placeholder="t('school_name')"
              />
            </el-form-item>
          </div>

          <!-- 2-qator -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full gap-4">
            <el-form-item :label="t('school_phone_number')" prop="school_phone_number">
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
                class="!bg-[#11101B] !h-8 w-full rounded-md shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
              />
            </el-form-item>
            <el-form-item :label="t('school_director')" prop="school_director">
              <el-input
                v-model="formData.school_director"
                clearable
                :placeholder="t('school_director')"
              />
            </el-form-item>
            <el-form-item :label="t('school_type')" prop="school_type">
              <el-select v-model="formData.school_type" :placeholder="t('select')">
                <el-option :label="t('sport_school')" value="sport_school" />
                <el-option :label="t('sport_club')" value="sport_club" />
                <el-option :label="t('sport_complex')" value="sport_complex" />
              </el-select>
            </el-form-item>
            <el-form-item :label="t('school_address')" prop="school_address">
              <el-input
                v-model="formData.school_address"
                clearable
                :placeholder="t('school_address')"
              />
            </el-form-item>
          </div>

          <!-- 3-qator -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-4">
            <el-form-item :label="t('school_region')" prop="school_region">
              <el-select
                v-model="formData.school_region"
                :placeholder="t('school_region')"
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

            <el-form-item :label="t('school_district')" prop="school_district">
              <el-select
                v-model="formData.school_district"
                :placeholder="t('school_district')"
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

            <el-form-item :label="t('school_sports')" prop="school_sports">
              <el-select
                v-model="formData.school_sports"
                :placeholder="t('school_sports')"
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

          <!-- Karta -->
          <div class="mt-6">
            <label class="block text-sm font-medium text-white">{{
              t("location")
            }}</label>
            <div
              class="h-[300px] sm:h-[400px] w-full mt-2 border rounded-lg overflow-hidden"
            >
              <MapboxMap
                access-token="pk.eyJ1IjoibXVraGFtbWFkaXJtYXRvdiIsImEiOiJjbHoxNHhmZnkyaXRoMmlxc2ExbWJpYTc1In0.CE43UNvdFFRSiDbgPDNoZQ"
                style="height: 100%"
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
              {{ t("lat") }}: {{ formData.school_latitude }} | {{ t("lon") }}:
              {{ formData.school_longitude }}
            </p>
          </div>
        </el-form>

        <template #footer>
          <el-button
            class="w-full sm:w-auto !bg-[#E7273D] !border-none !text-white"
            @click="submitForm"
          >
            {{ t("sent") }}
          </el-button>
        </template>
      </el-dialog>

      <el-dialog
        v-model="verificationDialogVisible"
        :title="t('sendPhone')"
        width="400px"
        class="!bg-[#2E2F3E] !text-white"
        align-center
      >
        <div class="flex flex-col gap-4">
          <p class="text-gray-300 text-sm">
            {{ t("pendingPhone") }}
            <span class="font-semibold text-white">{{ pendingPhone }}</span>
          </p>

          <el-input
            v-model="verificationCode"
            :placeholder="t('code')"
            maxlength="6"
            class="!bg-gray-200 rounded-md"
          />
        </div>

        <template #footer>
          <el-button @click="verificationDialogVisible = false">
            {{ t("close") }}</el-button
          >
          <el-button type="success" @click="verifyCodeAndSubmit">
            {{ t("confirm") }}</el-button
          >
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronRight, MapPin, Star } from "lucide-vue-next";
import { ElMessage } from "element-plus";
import { MapboxMap, MapboxMarker } from "@studiometa/vue-mapbox-gl";
import { useRouter } from "vue-router";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

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

const verificationDialogVisible = ref(false);
const verificationCode = ref("");
const isCodeSent = ref(false);
const pendingPhone = ref("");

const getImageMedia = (media: any) => {
  return (media || []).filter((m: any) => m.media_type === "image");
};

const filteredComplexes = computed(() => {
  if (!complexes.value) return [];

  return complexes.value
    .sort(
      (a, b) => new Date(b.created_time).getTime() - new Date(a.created_time).getTime()
    )
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
    { required: true, message: t("required_manager_first_name"), trigger: "blur" },
  ],
  manager_last_name: [
    { required: true, message: t("required_manager_last_name"), trigger: "blur" },
  ],
  manager_phone_number: [
    { required: true, message: t("required_manager_phone_number"), trigger: "blur" },
  ],
  school_name: [{ required: true, message: t("required_school_name"), trigger: "blur" }],
  school_phone_number: [
    { required: true, message: t("required_school_phone_number"), trigger: "blur" },
  ],
  school_director: [
    { required: true, message: t("required_school_director"), trigger: "blur" },
  ],
  school_type: [
    { required: true, message: t("required_school_type"), trigger: "change" },
  ],
  school_address: [
    { required: true, message: t("required_school_address"), trigger: "blur" },
  ],
  school_region: [
    { required: true, message: t("required_school_region"), trigger: "change" },
  ],
  school_district: [
    { required: true, message: t("required_school_district"), trigger: "change" },
  ],
  school_sports: [
    { required: true, message: t("required_school_sports"), trigger: "change" },
  ],
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

const getSportsAbout = async () => {
  try {
    const sportRes = await $api.get("/sport/sport-institutions/");
    complexes.value = sportRes.data.data.data as any;
  } catch (e) {
    console.error("Sport error:", e);
  }
};

async function sendVerificationCode() {
  try {
    const phone = formData.value.manager_phone_number.replaceAll(" ", "");
    if (!phone || phone.length < 9) {
      ElMessage.error("Введите корректный номер телефона");
      return;
    }

    await $api.post("/user/auth/send-code/", {
      phone_number: phone,
      action: "sport_institution_verify",
    });

    pendingPhone.value = phone;
    verificationDialogVisible.value = true;
    ElMessage.success("Код отправлен на ваш номер телефона");
  } catch (err) {
    console.error(err);
    ElMessage.error(err.response.data.message);
  }
}

async function verifyCodeAndSubmit() {
  try {
    if (!verificationCode.value) {
      ElMessage.error("Введите код подтверждения");
      return;
    }

    await $api.post("/user/auth/verify-code/", {
      code: verificationCode.value,
      phone_number: pendingPhone.value,
      action: "sport_institution_verify",
    });

    verificationDialogVisible.value = false;
    await createSportInstitutionRequest();
  } catch (err) {
    console.error(err);
    ElMessage.error(err.response.data.message);
  }
}

async function createSportInstitutionRequest() {
  try {
    await $api.post("/sport/sport-institution-request/", {
      ...formData.value,
      manager_phone_number: formData.value.manager_phone_number.replaceAll(" ", ""),
      school_phone_number: formData.value.school_phone_number.replaceAll(" ", ""),
    });
    ElMessage.success("Заявка успешно создана!");
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
}

async function submitForm() {
  try {
    await formRef.value.validate();
    await sendVerificationCode();
  } catch (err) {
    console.error(err);
    ElMessage.error("Заполните форму правильно");
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

  getDistricts(selectedRegionId);

  if (
    !filteredDistricts.value.find(
      (district) => district.id === formData.value.school_district?.id
    )
  ) {
    formData.value.school_district = "";
  }

  const selectedRegion = regions.value.find((region) => region.id === selectedRegionId);

  if (selectedRegion) {
    formData.value.school_latitude = selectedRegion.latitude;
    formData.value.school_longitude = selectedRegion.longitude;

    center.value = [selectedRegion.longitude, selectedRegion.latitude];

    if (map.value) {
      map.value.flyTo({
        center: [selectedRegion.longitude, selectedRegion.latitude],
        zoom: 10,
        essential: true,
      });
    }
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
  () => formData.value.school_region,
  (newRegionId) => {
    if (newRegionId) {
      getDistricts(newRegionId);
    } else {
      filteredDistricts.value = [];
      formData.value.school_district = null;
    }
  }
);

watch(() => formData.value.school_region, onRegionChange);
onMounted(() => {
  getSportsAbout();
  getSports();
  getRegions();
});
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
  color: white !important;
  background-color: #11101b !important;
  box-shadow: none !important;
}
:deep(.el-input__inner) {
  color: white !important;
}
:deep(.el-select__wrapper) {
  background-color: #11101b !important;
  box-shadow: none !important;
  color: white !important;
}
:deep(.el-select__selected-item .el-select__placeholder) {
  color: white !important;
}
:deep(.el-select__selected-item) {
  color: white !important;
}
:deep(.vti__input) {
  background-color: #11101b !important;
  box-shadow: none !important;
  color: white !important;
  border: none !important;
}
:deep(.vue-tel-input) {
  background-color: #11101b !important;
  box-shadow: none !important;
  border: none !important;
}
:deep(.vti__dropdown-item.highlighted) {
  background-color: #11101b !important;
  color: white !important;
}
:deep(.vti__dropdown) {
  background-color: #11101b !important;
  box-shadow: none !important;
  color: white !important;
}
/* Add any component-specific styles here */
</style>

<style>
.el-message {
  z-index: 9999 !important;
}
</style>
