<template>
  <NuxtLayout name="custom">
    <div class="bg-[#11101B]">
      <div class="min-h-screen bg-[#11101B] text-white container">
        <!-- Header -->
        <div class="text-center mb-8">
          <div
            class="bg-yellow-500 text-black px-10 w-fit mx-auto py-2 font-bold uppercase text-4xl skew-x-[-10deg]"
          >
            <span class="inline-block skew-x-[10deg]">Спортивные комплексы</span>
          </div>
          <p class="mt-4 text-white sm:text-lg sm:w-[60%] mx-auto">
            Фан-клуб – это не просто группа единомышленников, но и семья, где люди находят
            поддержку и вдохновение в своих общих интересах.
          </p>
        </div>

        <!-- Categories -->
        <div class="container mx-auto px-4 py-6 flex items-center gap-3 w-full">
          <button
            v-for="category in categories"
            :key="category"
            @click="activeCategory = category"
            :class="[
              'px-4 py-2 rounded-lg font-medium transition-all duration-200',
              activeCategory === category
                ? 'bg-red-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-red-500 hover:text-white',
            ]"
          >
            {{ category }}
          </button>

          <el-select
            v-model="activeRegion"
            placeholder="Все регионы"
            class="ml-auto"
            style="width: 10rem !important"
          >
            <el-option
              v-for="region in regions"
              :key="region"
              :label="region"
              :value="region"
            />
          </el-select>

          <button class="font-medium !bg-red-600 !text-white !py-1 px-2 rounded-md">
            Показать на карте
          </button>
        </div>

        <!-- Main Grid -->
        <main class="container mx-auto px-4 py-8">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <nuxt-link
              v-for="complex in paginatedComplexes"
              :key="complex.id"
              :to="`/complexs/${complex.id}`"
              class="bg-[#11101B] rounded-xl overflow-hidden border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
            >
              <!-- Image -->
              <div class="relative h-40 overflow-hidden">
                <img
                  :src="complex.image"
                  :alt="complex.title"
                  class="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                ></div>
              </div>

              <!-- Content -->
              <div class="p-4">
                <h3 class="text-md font-bold text-white mb-2 line-clamp-2 leading-tight">
                  {{ complex.title }}
                </h3>
                <p class="text-gray-400 text-xs mb-3 line-clamp-3 leading-relaxed">
                  {{ complex.description }}
                </p>

                <!-- Buttons -->
                <div class="flex items-center justify-between text-sm">
                  <div class="flex space-x-2">
                    <button
                      class="flex items-center space-x-1 text-blue-400 hover:text-blue-300"
                    >
                      <el-icon><Location /></el-icon>
                      <span>Адрес</span>
                    </button>
                    <button
                      class="flex items-center space-x-1 text-green-400 hover:text-green-300"
                    >
                      <el-icon><Phone /></el-icon>
                      <span>Телефон</span>
                    </button>
                  </div>
                  <button
                    class="flex items-center space-x-1 text-yellow-400 hover:text-yellow-300"
                  >
                    <span>Подробнее</span>
                    <el-icon><ArrowRight /></el-icon>
                  </button>
                </div>
              </div>
            </nuxt-link>
          </div>

          <!-- Pagination -->
          <div class="flex justify-center">
            <el-pagination
              v-model:current-page="currentPage"
              :page-size="itemsPerPage"
              :total="sportsComplexes.length"
              layout="prev, pager, next"
              background
            />
          </div>
        </main>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref, computed } from "vue";
import { Location, Phone, ArrowRight } from "@element-plus/icons-vue";

const currentPage = ref(1);
const itemsPerPage = 8;
const activeCategory = ref("Все");
const activeRegion = ref("Все регионы");

const categories = [
  "Все",
  "Футбол",
  "Баскетбол",
  "Бассейн",
  "Борьба вольная",
  "Волейбол",
  "Бокс",
  "Еще...",
];

const regions = ["Все регионы", "Москва", "Казань", "Екатеринбург"];

const sportsComplexes = ref([
  {
    id: 1,
    title: "Многофункциональный ледовый комплекс Тюмень Арена",
    description: "Современный ледовый комплекс...",
    image: "/boks.svg",
  },
  {
    id: 2,
    title: "Многофункциональный ледовый комплекс Нефтехим Арена",
    description: "Крупнейший спортивный комплекс региона...",
    image: "/boks.svg",
  },
  {
    id: 3,
    title: "Спортивный комплекс Олимпийский",
    description: "Многофункциональный спортивный центр с бассейном...",
    image: "/boks.svg",
  },
  {
    id: 4,
    title: "Спортивный комплекс Олимпийский",
    description: "Многофункциональный спортивный центр с бассейном...",
    image: "/boks.svg",
  },
  {
    id: 5,
    title: "Спортивный комплекс Олимпийский",
    description: "Многофункциональный спортивный центр с бассейном...",
    image: "/boks.svg",
  },
  {
    id: 6,
    title: "Спортивный комплекс Олимпийский",
    description: "Многофункциональный спортивный центр с бассейном...",
    image: "/boks.svg",
  },
  {
    id: 7,
    title: "Спортивный комплекс Олимпийский",
    description: "Многофункциональный спортивный центр с бассейном...",
    image: "/boks.svg",
  },
  {
    id: 8,
    title: "Спортивный комплекс Олимпийский",
    description: "Многофункциональный спортивный центр с бассейном...",
    image: "/boks.svg",
  },
  {
    id: 9,
    title: "Спортивный комплекс Олимпийский",
    description: "Многофункциональный спортивный центр с бассейном...",
    image: "/boks.svg",
  },
  {
    id: 10,
    title: "Спортивный комплекс Олимпийский",
    description: "Многофункциональный спортивный центр с бассейном...",
    image: "/boks.svg",
  },
  {
    id: 11,
    title: "Спортивный комплекс Олимпийский",
    description: "Многофункциональный спортивный центр с бассейном...",
    image: "/boks.svg",
  },
]);

const paginatedComplexes = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return sportsComplexes.value.slice(start, end);
});
</script>

<style>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.el-pagination.is-background .btn-next.is-active,
.el-pagination.is-background .btn-prev.is-active,
.el-pagination.is-background .el-pager li.is-active {
  background-color: red !important;
}
</style>
