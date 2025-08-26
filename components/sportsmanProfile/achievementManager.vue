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
        <div class="col-span-3">Турнир</div>
        <div class="col-span-2">Тренер</div>
        <div class="col-span-2">Дата получение</div>
        <div class="col-span-2">Статус</div>
        <div class="col-span-2">Действие</div>
      </div>

      <div
        v-for="achievement in data"
        :key="achievement.id"
        class="grid grid-cols-12 gap-4 p-4 border-b border-gray-700 hover:bg-gray-750 transition-colors"
      >
        <div class="col-span-3 flex items-center space-x-3">
          <img
            :src="achievement.tournament?.logo"
            :alt="achievement.tournament?.name"
            class="w-8 h-8 rounded-full"
          />
          <span>{{ achievement.tournament?.name }}</span>
        </div>
        <div class="col-span-2">{{ achievement.trainer?.full_name }}</div>
        <div class="col-span-2 text-gray-400">{{ achievement?.year }}</div>
        <div
          class="col-span-2 px-2 py-1 rounded text-sm font-medium"
          :class="{
            'text-blue-400': achievement?.status === 'pending',
            'text-green-400': achievement?.status === 'verified',
            'text-red-400': achievement?.status === 'rejected',
          }"
        >
          {{
            achievement?.status === "pending"
              ? "В обработке"
              : achievement?.status === "verified"
              ? "Подтверждено"
              : achievement?.status === "rejected"
              ? "Отклонено"
              : "Неизвестно"
          }}
        </div>

        <div class="col-span-2 flex space-x-2">
          <button
            @click="viewItem(achievement.id)"
            class="p-2 bg-gray-600 hover:bg-gray-500 rounded transition-colors"
          >
            <img src="/Eye.svg" alt="eyes" class="w-4" />
          </button>
          <!-- @click="deleteItem(achievement.id)" -->
          <button class="p-2 bg-red-600 hover:bg-red-500 rounded transition-colors">
            <img src="/delete.svg" alt="x" class="w-4" />
          </button>
          <button
            @click="editItem(achievement)"
            class="p-2 bg-green-600 hover:bg-green-500 rounded transition-colors"
          >
            <img src="/edit.svg" alt="done" class="w-4" />
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
        Добавить новую Достижение
      </button>
    </div>

    <!-- Add/Edit Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
        <!-- Modal Header -->
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-semibold">
            {{ isEditing ? "Редактировать достижение" : "Добавить достижение" }}
          </h2>
          <button @click="resetForm" class="text-gray-400 hover:text-white">
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
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2"
              >Название турнира</label
            >
            <select
              v-model="form.tournament"
              class="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
            >
              <option value="">Выберите турнира</option>
              <option v-for="item in tournamentData" :key="item.id" :value="item.id">
                {{ item.name }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2"
              >Название тренер</label
            >
            <select
              v-model="form.trainer"
              class="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
            >
              <option value="">Выберите тренер</option>
              <option v-for="item in trainerData" :key="item.id" :value="item.id">
                {{ item.full_name }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Рейтинг</label>
            <input
              v-model="form.rating"
              type="number"
              placeholder="Введите Рейтинг"
              class="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Country</label>
            <input
              v-model="form.country"
              type="text"
              placeholder="Введите Country"
              class="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Год</label>
            <input
              v-model="form.year"
              type="text"
              placeholder="Выберите год"
              class="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
            />
          </div>

          <button
            type="submit"
            class="w-full mt-6 px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg"
          >
            {{ isEditing ? "Сохранить изменения" : "Отправить на подтверждение" }}
          </button>
        </form>
      </div>
    </div>

    <!-- View Modal -->
    <div
      v-if="viewModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-semibold">Просмотр достижения</h2>
          <button @click="viewModal = false" class="text-gray-400 hover:text-white">
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

        <div class="space-y-4">
          <p>
            <span class="font-semibold">Турнир:</span> {{ viewData.tournament?.name }}
          </p>
          <p>
            <span class="font-semibold">Тренер:</span> {{ viewData.trainer?.full_name }}
          </p>
          <p><span class="font-semibold">Рейтинг:</span> {{ viewData.rating }}</p>
          <p><span class="font-semibold">Country:</span> {{ viewData.country }}</p>
          <p><span class="font-semibold">Год:</span> {{ viewData.year }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();
const { $api } = useNuxtApp();

const showModal = ref(false);
const viewModal = ref(false);
const isEditing = ref(false);
const editingId = ref(null);

const data = ref([]);
const viewData = ref({});

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
  country: "",
  tournament: "",
  trainer: "",
  year: "",
  rating: 0,
});

const tournamentData = ref([]);
const getTournament = async () => {
  try {
    const res = await $api.get(
      `/sport/tournament/?federation=${authStore.userProfile?.data?.sportsman_profile?.federation?.id}`
    );
    tournamentData.value = res.data.data;
  } catch (e) {
    console.log(e);
  }
};
getTournament();

const trainerData = ref([]);
const getTrainer = async () => {
  try {
    const res = await $api.get(
      `/federation/${authStore.userProfile?.data?.sportsman_profile?.federation?.id}/users/?user_role=trainer`
    );
    trainerData.value = res.data.data.data;
  } catch (e) {
    console.log(e);
  }
};
getTrainer();

// 🔹 Create or Edit
const submitForm = async () => {
  try {
    if (isEditing.value) {
      await $api.patch(`/user/profile/results/${editingId.value}/`, { ...form });
    } else {
      await $api.post("/user/profile/results/", { ...form });
    }
    await getData();
    resetForm();
  } catch (e) {
    console.error("submitForm error:", e);
  }
};

const viewItem = async (id) => {
  try {
    const res = await $api.get(`/user/profile/results/${id}/`);
    viewData.value = res.data.data;
    viewModal.value = true;
  } catch (e) {
    console.error("view error:", e);
  }
};

const editItem = (item) => {
  isEditing.value = true;
  editingId.value = item.id;
  Object.assign(form, {
    country: item.country,
    tournament: item.tournament?.id || "",
    trainer: item.trainer?.id || "",
    year: item.year,
    rating: item.rating,
  });
  showModal.value = true;
};

const deleteItem = async (id) => {
  try {
    await $api.delete(`/user/profile/results/${id}/`);
    await getData();
  } catch (e) {
    console.error("delete error:", e);
  }
};

const resetForm = () => {
  showModal.value = false;
  isEditing.value = false;
  editingId.value = null;
  Object.assign(form, {
    country: "",
    tournament: "",
    trainer: "",
    year: "",
    rating: 0,
  });
};
</script>
