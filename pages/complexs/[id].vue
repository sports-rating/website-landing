<template>
  <NuxtLayout name="custom">
    <div class="bg-[#11101B]">
      <div class="min-h-screen bg-[#11101B] text-white container">
        <!-- Header -->
        <h1 class="text-3xl font-bold mb-4">
          Многофункциональный комплекс
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
        <div class="bg-gray-900 rounded-xl mt-4">
          <div class="flex justify-between px-6 py-4 border-b border-gray-700">
            <span class="font-semibold">Название комплекса</span>
            <span class="text-gray-300">{{ complex?.name }}</span>
          </div>
          <div class="flex justify-between px-6 py-4 border-b border-gray-700">
            <span class="font-semibold">Режим работы</span>
            <span class="bg-red-600 text-white px-3 py-1 rounded-full text-sm">
              {{ complex?.work_time || "24/7" }}
            </span>
          </div>
          <div class="flex justify-between px-6 py-4 border-b border-gray-700">
            <span class="font-semibold">Адрес</span>
            <span class="text-gray-300">
              {{ complex?.region?.name }}, {{ complex?.district?.name }}
            </span>
          </div>
          <div class="flex justify-between px-6 py-4 border-b border-gray-700">
            <span class="font-semibold">Ориентир</span>
            <span class="text-gray-300">
              {{ complex?.address || "Не указано" }}
            </span>
          </div>

          <div class="flex justify-between px-6 py-4">
            <span class="font-semibold">Спорт</span>
            <div class="flex gap-2">
              <div
                v-for="sport in complex?.sports"
                :key="sport.id"
                class="px-3 py-1 bg-gray-700 text-gray-200 text-sm rounded-full hover:bg-indigo-600 transition-colors cursor-default"
              >
                {{ sport.name }}
              </div>
            </div>
          </div>
        </div>

        <!-- <div class="flex w-full">
          <section class="container mx-auto px-4 mt-12 w-full">
            <h3 class="text-xl font-bold mb-4">О компании</h3>
            <p class="text-gray-300 leading-relaxed">
              Все началось в начале 2013 года, когда Пулатов Мавлонбек решил встретиться с
              группой пахтакористов с целью посмотреть матчи и, возможно, создать новую
              группу болельщиков в ближайшем будущем. В то же время и в том же городе
              колумбийец Маджин Хемер Сьерра встречался с другой группой мадридистов с той
              же целью. По совпадению, они нашли друг друга в твиттере и решили
              встретиться и объединить свои группы, чтобы создать одну большую группу
              сторонников в городе.В августе того же года у них состоялась первая
              официальная встреча недавно созданного клуба болельщиков, они подписали
              учредительное документы, устав, членов совета директоров и постоянное место
              встречи. Г-н Андрес Лопес, Хулио Морено и Томас А. Бейкер также участвовал в
              этой встрече и считается основателями Пеньи. С момента своего основания,Peña
              Madridista Atlanta была зарегистрирована под названием "Madridistas Atlanta
              Inc" в качестве некоммерческой организации в своем родном штате Джорджия, а
              также в соответствии с федеральными законами Соединенных Штатов для работы в
              качестве таковой. В настоящее время в клубе 78 членов, которые собираются в
              своем официальном домашнем ирландском пабе Olde Blind Dog в Брукхейвене,
              чтобы посмотреть все матчи, и их целью с момента его создания было
              объединить мадридистов в Атланте и ее столичном регионе, чтобы сделать еще
              больше наш легендарный клуб.
            </p>
          </section>

          <aside
            class="container mx-auto px-4 py-4 mt-12 w-[40%] bg-[#2E2F3E] rounded-xl border border-gray-700"
          >
            <h3 class="text-xl font-bold">Основные деятельности компании:</h3>
            <ul class="max-w-sm p-4 px-0">
              <li class="py-2 flex gap-1 items-center">
                <div class="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                Оздоровительные учреждения
              </li>
              <li class="py-2 flex gap-1 items-center">
                <div class="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                Клиники, санатории
              </li>
              <li class="py-2 flex gap-1 items-center">
                <div class="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                Фитнес-центры
              </li>
              <li class="py-2 flex gap-1 items-center">
                <div class="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                Залы, сцены
              </li>
              <li class="py-2 flex gap-1 items-center">
                <div class="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                Торговые комплексы
              </li>
              <li class="py-2 flex gap-1 items-center">
                <div class="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                Лаборатории, бассейны, сауны
              </li>
            </ul>
          </aside>
        </div> -->

        <!-- Map -->
        <section class="container mx-auto px-4 mt-12">
          <h3 class="text-xl font-bold mb-4">На карте</h3>
          <div class="rounded-xl overflow-hidden border border-gray-700">
            <div class="h-[300px] w-full mt-2 border rounded-lg overflow-hidden">
              <MapboxMap
                access-token="pk.eyJ1IjoibXVraGFtbWFkaXJtYXRvdiIsImEiOiJjbHoxNHhmZnkyaXRoMmlxc2ExbWJpYTc1In0.CE43UNvdFFRSiDbgPDNoZQ"
                style="height: 300px"
                map-style="mapbox://styles/mapbox/streets-v11"
                :center="center"
                :zoom="9"
              >
                <MapboxMarker :lng-lat="[complex?.longitude, complex?.latitude]" />
              </MapboxMap>
            </div>
          </div>
        </section>

        <!-- Media -->
        <section class="container mx-auto px-4 mt-12">
          <h3 class="text-xl font-bold mb-4">Видео</h3>

          <div
            v-if="videoMedia.length"
            class="rounded-xl overflow-hidden border border-gray-700"
          >
            <div
              v-for="(video, index) in videoMedia"
              :key="index"
              class="h-[300px] w-full mt-2 border rounded-lg overflow-hidden"
            >
              <video
                :src="video.file"
                controls
                class="w-full h-full object-cover"
              ></video>
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
          <h2 class="text-2xl font-bold mb-6">ДРУГИЕ Спортивное учреждение</h2>
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

const route = useRoute();
const id = route.params.id;
const complex = ref(null);
const center = ref([69.279737, 41.311151]);
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

onMounted(() => {
  getSportsAbout();
  fetchComplex();
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
