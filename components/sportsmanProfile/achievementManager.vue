<template>
  <div class="text-white">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <div class="flex space-x-8">
        <button class="text-gray-400 hover:text-white transition-colors">Карьера</button>
        <button class="text-white border-b-2 border-red-500 pb-1">Достижение</button>
      </div>
    </div>

    <!-- Data Table -->
    <div class="bg-gray-800 rounded-lg overflow-hidden">
      <!-- Table Header -->
      <div
        class="grid grid-cols-12 gap-4 p-4 bg-gray-700 text-sm font-medium text-gray-300"
      >
        <div class="col-span-3">Команда</div>
        <div class="col-span-4">Наименование достижении</div>
        <div class="col-span-2">Дата получение</div>
        <div class="col-span-2">Действие</div>
      </div>

      <!-- Table Rows -->
      <div
        v-for="achievement in achievements"
        :key="achievement.id"
        class="grid grid-cols-12 gap-4 p-4 border-b border-gray-700 hover:bg-gray-750 transition-colors"
      >
        <div class="col-span-3 flex items-center space-x-3">
          <img
            :src="achievement.teamLogo"
            :alt="achievement.teamName"
            class="w-8 h-8 rounded-full"
          />
          <span>{{ achievement.teamName }}</span>
        </div>
        <div class="col-span-4">{{ achievement.achievementName }}</div>
        <div class="col-span-2 text-gray-400">{{ achievement.dateRange }}</div>
        <div class="col-span-2 flex space-x-2">
          <button class="p-2 bg-gray-600 hover:bg-gray-500 rounded transition-colors">
            <img src="/Eye.svg" alt="eyes" class="w-4" />
          </button>
          <button class="p-2 bg-red-600 hover:bg-red-500 rounded transition-colors">
            <img src="/x.svg" alt="x" class="w-4" />
          </button>
          <button class="p-2 bg-green-600 hover:bg-green-500 rounded transition-colors">
            <img src="/done.png" alt="done" class="w-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- Bottom Buttons -->
    <div class="flex justify-end mt-6">
      <button
        @click="showModal = true"
        class="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors"
      >
        Добавить новую карьеру
      </button>
    </div>

    <!-- Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
        <!-- Modal Header -->
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-semibold">Добавить достижение</h2>
          <button @click="showModal = false" class="text-gray-400 hover:text-white">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Form -->
        <form @submit.prevent="submitForm" class="space-y-4">
          <!-- Team Selection -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Команда</label>
            <select
              v-model="form.team"
              class="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="">Выберите команду</option>
              <option value="psg">Paris Saint Germain</option>
              <option value="real">Real Madrid</option>
              <option value="barcelona">Barcelona</option>
            </select>
          </div>

          <!-- Achievement Name -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2"
              >Наименование достижении</label
            >
            <input
              v-model="form.achievementName"
              type="text"
              placeholder="Введите название достижении"
              class="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          <!-- Time Period -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2"
              >Период времени</label
            >
            <div class="grid grid-cols-2 gap-4">
              <div class="relative">
                <input
                  v-model="form.startYear"
                  type="text"
                  placeholder="Выберите год"
                  class="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <svg
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div class="relative">
                <input
                  v-model="form.endYear"
                  type="text"
                  placeholder="Выберите год"
                  class="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <svg
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full mt-6 px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors font-medium"
          >
            Отправить на подтверждение
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
const { $api } = useNuxtApp();

const showModal = ref(false);
const data = ref([]);
const getData = async () => {
  try {
    const res = await $api.get("/user/profile/results/");
    data.value = res.data.data;
  } catch (e) {
    console.error("res error:", e);
  }
};

getData();
const form = reactive({
  team: "",
  achievementName: "",
  startYear: "",
  endYear: "",
});

const achievements = ref([
  {
    id: "00001",
    teamName: "Paris Saint Germain",
    teamLogo: "/placeholder.svg?height=32&width=32",
    achievementName: "Бронзовый призер чемпионата Узбекистана",
    dateRange: "2018 - 2020",
  },
  {
    id: "00001",
    teamName: "Paris Saint Germain",
    teamLogo: "/placeholder.svg?height=32&width=32",
    achievementName: "Бронзовый призер чемпионата Узбекистана",
    dateRange: "2018 - 2020",
  },
  {
    id: "00001",
    teamName: "Paris Saint Germain",
    teamLogo: "/placeholder.svg?height=32&width=32",
    achievementName: "Бронзовый призер чемпионата Узбекистана",
    dateRange: "2018 - 2020",
  },
  {
    id: "00001",
    teamName: "Paris Saint Germain",
    teamLogo: "/placeholder.svg?height=32&width=32",
    achievementName: "Бронзовый призер чемпионата Узбекистана",
    dateRange: "2018 - 2020",
  },
  {
    id: "00001",
    teamName: "Paris Saint Germain",
    teamLogo: "/placeholder.svg?height=32&width=32",
    achievementName: "Бронзовый призер чемпионата Узбекистана",
    dateRange: "2018 - 2020",
  },
]);

const submitForm = () => {
  console.log("Form submitted:", form);
  // Add form submission logic here
  showModal.value = false;

  // Reset form
  Object.assign(form, {
    team: "",
    achievementName: "",
    startYear: "",
    endYear: "",
  });
};
</script>
