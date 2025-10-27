<template>
  <NuxtLayout name="custom">
    <div class="bg-[#11101B]">
      <div class="min-h-screen bg-[#11101B] text-white container">
        <!-- Header -->
        <h1 class="text-3xl font-bold mb-4">
          <span class="text-red-500">{{ complex?.name }}</span>
        </h1>

        <div v-if="filteredImages.length" class="rounded-xl overflow-hidden">
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
              v-for="(img, index) in filteredImages"
              :key="index"
              class="flex justify-center"
            >
              <img
                :src="img.file"
                :alt="complex?.name"
                class="rounded-xl w-full h-[431px] object-cover shadow-lg"
              />
            </swiper-slide>
          </swiper>
        </div>

        <div v-else class="text-gray-400 text-center py-10">Изображение недоступно</div>

        <!-- Info section -->
        <div class="bg-gray-900 rounded-xl mt-4 overflow-hidden">
          <!-- Har bir satr -->
          <div
            class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0 px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-700"
          >
            <span class="font-semibold text-sm sm:text-base">Название комплекса</span>
            <span class="text-gray-300 text-sm sm:text-base break-words">
              {{ complex?.name }}
            </span>
          </div>

          <div
            class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0 px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-700"
          >
            <span class="font-semibold text-sm sm:text-base">Режим работы</span>
            <span
              class="bg-red-600 text-white px-3 py-1 rounded-full text-xs sm:text-sm w-fit sm:w-auto"
            >
              {{ complex?.work_time || "24/7" }}
            </span>
          </div>

          <div
            class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0 px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-700"
          >
            <span class="font-semibold text-sm sm:text-base">Адрес</span>
            <span class="text-gray-300 text-sm sm:text-base break-words">
              {{ complex?.region?.name }}, {{ complex?.district?.name }}
            </span>
          </div>

          <div
            class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0 px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-700"
          >
            <span class="font-semibold text-sm sm:text-base">Ориентир</span>
            <span class="text-gray-300 text-sm sm:text-base break-words">
              {{ complex?.address || "Не указано" }}
            </span>
          </div>

          <div
            class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0 px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-700"
          >
            <span class="font-semibold text-sm sm:text-base">Телефон</span>
            <span class="text-gray-300 text-sm sm:text-base break-words">
              {{ complex?.phone_number || "Не указано" }}
            </span>
          </div>

          <div
            class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 px-4 sm:px-6 py-3 sm:py-4"
          >
            <span class="font-semibold text-sm sm:text-base">Спорт</span>
            <div class="flex flex-wrap gap-2 mt-1 sm:mt-0 justify-start sm:justify-end">
              <div
                v-for="sport in complex?.sports"
                :key="sport.id"
                class="px-3 py-1 bg-gray-700 text-gray-200 text-xs sm:text-sm rounded-full hover:bg-indigo-600 transition-colors cursor-default"
              >
                {{ sport.name }}
              </div>
            </div>
          </div>
        </div>

        <!-- Map -->
        <section class="container mx-auto px-4 mt-12">
          <h3 class="text-xl font-bold mb-4">На карте</h3>
          <div class="rounded-xl overflow-hidden border border-gray-700">
            <div class="h-[500px] w-full border rounded-lg overflow-hidden">
              <MapboxMap
                access-token="pk.eyJ1IjoibXVraGFtbWFkaXJtYXRvdiIsImEiOiJjbHoxNHhmZnkyaXRoMmlxc2ExbWJpYTc1In0.CE43UNvdFFRSiDbgPDNoZQ"
                style="height: 500px"
                map-style="mapbox://styles/mapbox/streets-v11"
                :center="[complex?.longitude ?? 69.2401, complex?.latitude ?? 41.2995]"
                :zoom="9"
              >
                <MapboxMarker :lng-lat="[complex?.longitude, complex?.latitude]" />
              </MapboxMap>
            </div>
          </div>
        </section>

        <!-- Media -->
        <section class="container mx-auto px-4 mt-12">
          <div v-if="videoMedia.length" class="mt-6">
            <h3 class="text-lg font-semibold text-white mb-3">🎥 Видео</h3>

            <div
              class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-h-[700px] overflow-y-auto pr-2 custom-scroll"
            >
              <div
                v-for="(video, index) in videoMedia"
                :key="index"
                class="relative bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
              >
                <video
                  :src="video.file"
                  controls
                  class="w-full aspect-video object-contain"
                ></video>
              </div>
            </div>
          </div>

          <div
            v-else
            class="text-gray-400 text-center border border-gray-700 rounded-xl py-10"
          >
            Нет доступного видео
          </div>
        </section>

        <!-- Other Complexes -->
        <section class="container mx-auto px-4 mt-16">
          <h2 class="text-2xl font-bold mb-6">Другое спортивное учреждение</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <nuxt-link
              v-for="complex in filteredComplexes"
              :key="complex.id"
              :to="`/complexs/${complex.id}`"
              class="group bg-[#2A2B31] rounded-lg overflow-hidden hover:bg-[#3A3B41] transition-colors"
            >
              <!-- Complex Card -->
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
        </section>

        <!-- Comments Section -->
        <section class="container mx-auto px-4 mt-12">
          <div class="bg-[#11101B] min-h-screen text-white py-10">
            <div class="bg-gray-800 p-5 rounded-2xl border border-gray-700 mb-6">
              <div class="flex items-center justify-between">
                <h2 class="text-xl font-semibold mb-3">Оставить комментарий</h2>

                <div class="flex items-center gap-1 mb-3">
                  <span
                    v-for="star in 5"
                    :key="star"
                    class="cursor-pointer text-2xl transition"
                    :class="{
                      'text-yellow-400': star <= rating,
                      'text-gray-500 hover:text-yellow-300': star > rating,
                    }"
                    @click="rating = star"
                  >
                    ★
                  </span>
                  <span class="ml-2 text-sm text-gray-400"> {{ rating }} / 5 </span>
                </div>
              </div>

              <textarea
                v-model="newComment"
                rows="3"
                placeholder="Напишите комментарий..."
                class="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-red-500 outline-none"
              ></textarea>
              <button
                @click="postComment"
                :disabled="loading"
                class="mt-3 bg-red-600 hover:bg-red-700 transition px-5 py-2 rounded-lg font-medium"
              >
                {{ loading ? "Отправка..." : "Отправить комментарий" }}
              </button>
            </div>

            <div v-if="comments.length">
              <div
                v-for="(comment, index) in comments"
                :key="index"
                class="bg-gray-800 rounded-xl p-4 mb-3 border border-gray-700"
              >
                <div class="flex justify-between items-center mb-2">
                  <span class="font-semibold text-white flex gap-4 items-center">
                    <img
                      :src="
                        comment.user?.profile_picture ||
                        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
                      "
                      class="w-8 h-8 rounded-full"
                      alt="comment.user?.first_name"
                    />
                    {{
                      comment.user?.first_name || comment.user?.last_name
                        ? `${comment.user.first_name || ""} ${
                            comment.user.last_name || ""
                          }`.trim()
                        : "Анонимный"
                    }}
                  </span>

                  <span class="text-gray-400 text-sm">
                    {{ new Date(comment.created_time).toLocaleString() }}
                  </span>
                </div>

                <div class="flex mb-2">
                  <span
                    v-for="star in 5"
                    :key="star"
                    class="text-lg"
                    :class="star <= comment.rating ? 'text-yellow-400' : 'text-gray-600'"
                  >
                    ★
                  </span>
                </div>

                <p class="text-gray-300 text-sm leading-relaxed">
                  {{ comment.text }}
                </p>
              </div>
            </div>
            <div v-else class="text-gray-400 text-center py-10">
              Комментариев пока нет.
            </div>
          </div>
        </section>

        <footer
          class="mt-16 py-8 text-center text-gray-500 text-sm border-t border-gray-800"
        >
          © 2025 Все права защищены.
        </footer>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { MapboxMap, MapboxMarker } from "@studiometa/vue-mapbox-gl";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { ChevronRight, MapPin, Star } from "lucide-vue-next";
import { ElMessage } from "element-plus";

const route = useRoute();
const id = route.params.id;
const complex = ref(null);
const complexes = ref([]);

const filteredImages = computed(() =>
  (complex.value?.media || []).filter((m) => m.media_type === "image")
);

const videoMedia = computed(() =>
  (complex.value?.media || []).filter((m) => m.media_type === "video")
);

const filteredComplexes = computed(() => {
  if (!complexes.value) return [];

  return complexes.value
    .filter((c) => c.id !== route.params.id)
    .sort((a, b) => new Date(b.created_time) - new Date(a.created_time))
    .slice(0, 4);
});
const fetchComplex = async () => {
  try {
    const { $api } = useNuxtApp();
    const res = await $api.get(`/sport/sport-institutions/${id}/`);
    complex.value = res.data.data;
  } catch (e) {
    console.error("Complexni yuklashda xatolik:", e);
  }
};

const getSportsAbout = async () => {
  try {
    const { $api } = useNuxtApp();
    const sportRes = await $api.get("/sport/sport-institutions/");
    complexes.value = sportRes.data.data.data;
  } catch (e) {
    console.error("Sport error:", e);
  }
};

const comments = ref([]);
const newComment = ref("");
const rating = ref(0);
const loading = ref(false);

const fetchComments = async () => {
  try {
    const { $api } = useNuxtApp();
    const res = await $api.get(`/review/comment/`);
    comments.value = res.data.data.data || [];
  } catch (e) {
    console.error("Kommentlarni yuklashda xatolik:", e);
  }
};

const postComment = async () => {
  if (!newComment.value.trim()) return;

  try {
    loading.value = true;
    const { $api } = useNuxtApp();

    const res = await $api.post(`/review/comment/`, {
      sport_institution: id,
      text: newComment.value,
      rating: rating.value,
    });

    comments.value.unshift(res.data.data);

    newComment.value = "";
    rating.value = 0;
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
    }
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getSportsAbout();
  fetchComplex();
  fetchComments();
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.swiper {
  width: 100%;
  height: 431px;
}
</style>
