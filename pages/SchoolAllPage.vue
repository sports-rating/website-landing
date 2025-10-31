<template>
  <NuxtLayout name="custom">
    <div class="bg-[#11101B] min-h-screen text-white">
      <div class="container mx-auto px-6 py-8">
        <div class="text-center mb-8">
          <div
            class="bg-[#F4E868] text-black px-10 w-fit mx-auto py-2 font-bold uppercase text-4xl skew-x-[-10deg]"
          >
            <span class="inline-block skew-x-[10deg]">Спортивные комплексы</span>
          </div>
          <p class="mt-4 text-gray-400 sm:text-lg sm:w-[60%] mx-auto">
            Фан-клуб – это не просто группа единомышленников, но и семья, где люди находят
            поддержку и вдохновение в своих общих интересах.
          </p>
        </div>

        <div class="rounded-lg flex flex-wrap items-center justify-end mb-5 gap-4">
          <div class="flex overflow-x-auto no-scrollbar gap-2 py-2 scroll-smooth">
            <el-select
              v-model="selectedSport"
              placeholder="Выберите sport"
              filterable
              clearable
            >
              <el-option
                v-for="sport in sports"
                :key="sport.id"
                :label="sport.name"
                :value="sport.id"
              />
            </el-select>

            <el-select v-model="selectedRegion" placeholder="Регион" filterable clearable>
              <el-option
                v-for="item in regions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>

            <el-button
              class="!bg-[#E7273D] !text-white !border-none hover:!bg-[#bd1f32] !w-full"
              @click="map"
            >
              {{ showMap ? "Показать списком" : "Показать на карте" }}
            </el-button>
          </div>
        </div>

        <div v-if="showMap" class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          <!-- Left side: Complex list -->
          <div class="space-y-4 overflow-y-auto max-h-[600px] no-scrollbar pr-0 sm:pr-2">
            <nuxt-link
              v-for="complex in complexes"
              :key="complex.id"
              :to="`/complexs/${complex.id}`"
              class="group bg-[#2A2B31] rounded-lg flex flex-col sm:flex-row items-start sm:items-center overflow-hidden hover:bg-[#3A3B41] transition-colors cursor-pointer"
              @mouseenter="focusOnComplex(complex)"
              @mouseleave="mapZoom = 12"
            >
              <!-- Image -->
              <div class="relative overflow-hidden p-3 sm:p-4 flex-shrink-0">
                <img
                  :src="complex.media[0]?.file"
                  :alt="complex.name"
                  class="w-full sm:w-[104px] h-[180px] sm:h-[104px] rounded-lg object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <!-- Info -->
              <div class="p-3 sm:p-4 w-full">
                <h3 class="text-white font-medium text-base sm:text-lg mb-2 line-clamp-2">
                  {{ complex.name }}
                </h3>

                <div
                  class="flex items-center gap-2 text-gray-400 text-xs sm:text-sm truncate"
                >
                  <MapPin class="w-4 h-4" />
                  <span class="truncate max-w-[200px] sm:max-w-[250px]">
                    {{ complex.region?.name }}, {{ complex.district?.name }}
                  </span>
                </div>

                <div
                  class="mt-2 sm:mt-3 flex flex-col sm:flex-row sm:justify-between text-xs sm:text-sm gap-1 sm:gap-0"
                >
                  <span class="text-gray-300 break-all">
                    📞 {{ complex.phone_number }}
                  </span>
                  <span class="text-gray-400 capitalize">
                    {{
                      complex.type === "club"
                        ? "Спортивный клуб"
                        : complex.type === "school"
                        ? "Спортивная школа"
                        : complex.type === "complex"
                        ? "Спорткомплекс"
                        : "Учреждение"
                    }}
                  </span>
                </div>

                <div class="flex flex-wrap gap-2 mt-2 sm:mt-3">
                  <div
                    v-for="sport in complex.sports"
                    :key="sport.id"
                    class="px-3 py-1 bg-gray-700 text-gray-200 text-xs sm:text-sm rounded-full hover:bg-indigo-600 transition-colors cursor-default"
                  >
                    {{ sport.name }}
                  </div>
                </div>
              </div>
            </nuxt-link>
          </div>

          <!-- Right side: Map -->
          <div class="h-[300px] sm:h-[400px] lg:h-[600px] mt-4 lg:mt-0">
            <MapboxMap
              access-token="pk.eyJ1IjoibXVraGFtbWFkaXJtYXRvdiIsImEiOiJjbHoxNHhmZnkyaXRoMmlxc2ExbWJpYTc1In0.CE43UNvdFFRSiDbgPDNoZQ"
              map-style="mapbox://styles/mapbox/streets-v11"
              :center="mapCenter"
              :zoom="mapZoom"
              style="height: 100%; width: 100%"
            >
              <MapboxMarker
                v-for="complex in complexes"
                :key="complex.id"
                :lng-lat="[complex.longitude, complex.latitude]"
              >
                <template #default>
                  <div class="flex items-center space-x-1">
                    <div
                      class="w-6 h-6 bg-white rounded-full border-2 border-white shadow overflow-hidden"
                    >
                      <img src="/gantel.png" alt="" />
                    </div>
                    <span
                      class="text-[10px] sm:text-xs bg-white text-black px-1 rounded shadow"
                    >
                      {{ complex.name }}
                    </span>
                  </div>
                </template>
              </MapboxMarker>
            </MapboxMap>
          </div>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <nuxt-link
            v-for="(complex) in complexes as any"
            :key="complex.id"
            :to="`/complexs/${complex.id}`"
            class="group bg-[#2A2B31] rounded-lg overflow-hidden hover:bg-[#3A3B41] transition-colors"
          >
            <div
              class="bg-[#2A2B31] rounded-lg overflow-hidden group hover:bg-[#3A3B41] transition-colors flex flex-col h-full"
            >
              <div class="relative aspect-[16/8] overflow-hidden">
                <img
                  :src="complex.media[0]?.file"
                  :alt="complex.name"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                ></div>
              </div>

              <div class="p-4 flex flex-col flex-1">
                <div class="flex justify-between w-full gap-2 mb-4">
                  <h3
                    class="text-white whitespace-nowrap font-medium text-lg mb-2 line-clamp-2"
                  >
                    {{ complex.name }}
                  </h3>
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
        <div v-if="!showMap" class="flex justify-center p-3 mt-4">
          <el-pagination
            v-model:current-page="currentPage"
            :page-size="pageSize"
            layout="prev, pager, next"
            :total="count"
            background
          />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { ChevronRight, MapPin, Star } from "lucide-vue-next";
import { ArrowDown } from "@element-plus/icons-vue";
import { useSportStore } from "@/stores/sport";
import { MapboxMap, MapboxMarker } from "@studiometa/vue-mapbox-gl";

const { $api } = useNuxtApp();
const sportStore = useSportStore();
const complexes = ref([]);
const count = ref(0);
const sports = ref<any[]>([]);
const selectedSport = ref("");
const currentPage = ref(1);
const pageSize = ref(10);
const selectedRegion = ref([]);
const regions = ref([]);
const showMap = ref(false);

const mapZoom = ref(12);
const mapCenter = ref([69.2797, 41.3111]);
const focusOnComplex = (complex: any) => {
  console.log(complex, "cass");

  if (complex.longitude && complex.latitude) {
    mapCenter.value = [complex.longitude, complex.latitude];
    mapZoom.value = 13;
  }
};

const map = () => {
  showMap.value = !showMap.value;
};

const getSportsAbout = async () => {
  try {
    const params: any = {
      page: currentPage.value,
      page_size: pageSize.value,
    };

    if (selectedSport.value) {
      params.sports = selectedSport.value;
    }
    if (selectedRegion.value) {
      params.region = selectedRegion.value;
    }

    const sportRes = await $api.get("/sport/sport-institutions/", { params });
    complexes.value = sportRes.data.data.data;
    count.value = sportRes.data.data.count;
  } catch (e) {
    console.error("Sport error:", e);
  }
};

const getSport = async () => {
  try {
    const res = await $api.get(`/sport/`);
    sports.value = res.data.data;

    if (!sportStore.activeCategory && sports.value.length > 0) {
      sportStore.activeCategory = sports.value[0].id;
    }
  } catch (e) {
    console.log(e);
  }
};

const getRegions = async () => {
  try {
    const res = await $api.get("/user/regions/");
    regions.value = res.data.data.map(({ id, name }) => ({ id, name }));
  } catch (err) {
    console.error("Regions yuklashda xatolik:", err);
  }
};

watch([selectedSport, selectedRegion, currentPage], () => {
  getSportsAbout();
});

onMounted(() => {
  getSport();
  getRegions();
  getSportsAbout();
});
</script>

<style>
.el-pagination.is-background .btn-next.is-active,
.el-pagination.is-background .btn-prev.is-active,
.el-pagination.is-background .el-pager li.is-active {
  background-color: red !important;
}
</style>

<style scoped>
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
</style>
