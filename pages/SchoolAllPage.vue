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

        <div v-if="showMap" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="space-y-4 overflow-y-auto max-h-[600px] no-scrollbar pr-2">
            <nuxt-link
              v-for="complex in complexes"
              :key="complex.id"
              :to="`/complexs/${complex.id}`"
              class="group bg-[#2A2B31] rounded-lg flex overflow-hidden hover:bg-[#3A3B41] transition-colors cursor-pointer"
            >
              <!-- @click="focusOnComplex(complex)" -->
              <div class="relative overflow-hidden p-4 rounded-lg">
                <img
                  :src="complex.media[0]?.file"
                  :alt="complex.name"
                  class="w-[104px] h-[104px] rounded-lg object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div class="p-4">
                <h3 class="text-white font-medium text-lg mb-2 line-clamp-2">
                  {{ complex.name }}
                </h3>
                <div class="flex items-center gap-2 text-gray-400 text-sm truncate">
                  <MapPin class="w-4 h-4" />
                  <span>{{ complex.region?.name }}, {{ complex.district?.name }}</span>
                </div>
                <div class="mt-3 flex justify-between text-sm">
                  <span class="text-gray-300">📞 {{ complex.phone_number }}</span>
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
              </div>
            </nuxt-link>
          </div>

          <div class="h-[600px]">
            <MapboxMap
              access-token="pk.eyJ1IjoibXVraGFtbWFkaXJtYXRvdiIsImEiOiJjbHoxNHhmZnkyaXRoMmlxc2ExbWJpYTc1In0.CE43UNvdFFRSiDbgPDNoZQ"
              map-style="mapbox://styles/mapbox/streets-v11"
              :center="[69.2797, 41.3111]"
              :zoom="12"
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
                      class="w-6 h-6 bg-white rounded-full border-2 border-white shadow"
                    >
                      <img src="/gantel.png" alt="" />
                    </div>
                    <span class="text-xs bg-white text-black px-1 rounded shadow">
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

// const focusOnComplex = (complex: any) => {
//   if (complex.longitude && complex.latitude) {
//     mapCenter.value = [complex.longitude, complex.latitude];
//     mapZoom.value = 14;
//   }
// };

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
    regions.value = res.data.data;
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
