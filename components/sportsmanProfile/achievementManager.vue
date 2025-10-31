<template>
  <div class="text-white">
    <div
      class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 sm:gap-0 mb-6"
    >
      <!-- Tabs -->
      <div
        class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8 text-center sm:text-left"
      >
        <button
          @click="activeTab = 'pending'"
          :class="[
            'transition-colors duration-200 text-sm sm:text-base',
            activeTab === 'pending'
              ? 'text-white border-b-2 border-red-500 pb-1'
              : 'text-gray-400 hover:text-white',
          ]"
        >
          Ожидающие запросы
        </button>
        <button
          @click="activeTab = 'verified'"
          :class="[
            'transition-colors duration-200 text-sm sm:text-base',
            activeTab === 'verified'
              ? 'text-white border-b-2 border-red-500 pb-1'
              : 'text-gray-400 hover:text-white',
          ]"
        >
          Подтвержденные результаты
        </button>
      </div>

      <!-- Filter -->
      <div v-if="activeTab === 'pending'" class="w-full sm:w-auto">
        <select
          v-model="statusFilter"
          class="w-full sm:w-auto bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
        >
          <option value="">Вce</option>
          <option value="pending">В обработке</option>
          <option value="accepted">Одобрено</option>
          <option value="rejected">Отклонено</option>
          <option value="cancelled">Отменено</option>
        </select>
      </div>
    </div>

    <div class="bg-gray-800 rounded-lg overflow-hidden overflow-x-auto no-scrollbar">
      <div class="min-w-[800px] h-[23rem] overflow-y-auto no-scrollbar">
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
          v-if="activeTab === 'verified'"
          v-for="achievement in data"
          :key="achievement.id"
          class="grid grid-cols-12 gap-4 p-4 border-b items-center border-gray-700 hover:bg-gray-750 transition-colors"
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
              'text-red-400': achievement?.status === 'cancelled',
            }"
          >
            {{
              achievement?.status === "pending"
                ? "В обработке"
                : achievement?.status === "verified"
                ? "Подтверждено"
                : achievement?.status === "rejected"
                ? "Отклонено"
                : achievement?.status === "cancelled"
                ? "Отменено"
                : "Неизвестно"
            }}
          </div>

          <div class="col-span-2 flex space-x-2">
            <button
              @click="viewItem(achievement.id)"
              class="p-2 bg-gray-600 hover:bg-gray-500 rounded transition-colors w-8 h-8 flex justify-center items-center"
            >
              <img src="/Eye.svg" alt="eyes" class="sm:!w-4 w-6" />
            </button>
            <button
              @click="deleteItem(achievement.id)"
              class="p-2 bg-red-600 hover:bg-red-500 rounded transition-colors w-8 h-8 flex justify-center items-center"
            >
              <img src="/delete.svg" alt="x" class="sm:!w-4 w-6" />
            </button>

            <button
              @click="updateItem(achievement.id)"
              class="p-2 bg-gray-200 hover:bg-gray-400 rounded transition-colors w-8 h-8 flex justify-center items-center"
            >
              <img src="/pen.png" alt="x" class="sm:!w-4 w-6" />
            </button>
          </div>
        </div>

        <div
          v-if="activeTab === 'pending'"
          v-for="achievement in filteredRequests"
          :key="achievement.id"
          class="grid grid-cols-12 gap-4 p-4 border-b items-center border-gray-700 hover:bg-gray-750 transition-colors"
        >
          <div class="col-span-3 flex items-center space-x-3">
            <span>{{ achievement?.new_data?.tournament?.name }}</span>
          </div>
          <div class="col-span-2">{{ achievement?.receiver?.full_name }}</div>
          <div class="col-span-2 text-gray-400">{{ achievement?.new_data?.year }}</div>
          <div
            class="col-span-2 px-2 py-1 rounded text-sm font-medium"
            :class="{
              'text-blue-400': achievement?.status === 'pending',
              'text-green-400': achievement?.status === 'accepted',
              'text-red-400': achievement?.status === 'rejected',
              'text-red-400': achievement?.status === 'cancelled',
            }"
          >
            {{
              achievement?.status === "pending"
                ? "В обработке"
                : achievement?.status === "accepted"
                ? "Одобрено"
                : achievement?.status === "rejected"
                ? "Отклонено"
                : achievement?.status === "cancelled"
                ? "Отменено"
                : "Неизвестно"
            }}
          </div>

          <div class="col-span-2 flex space-x-2">
            <button
              @click="viewItemm(achievement.id)"
              class="p-2 bg-gray-600 hover:bg-gray-500 rounded transition-colors w-8 h-8 flex justify-center items-center"
            >
              <img src="/Eye.svg" alt="eyes" class="sm:!w-4 w-6" />
            </button>
            <button
              v-if="achievement?.status === 'pending'"
              @click="cancelRequest(achievement.id)"
              class="p-2 bg-red-600 hover:bg-red-500 rounded transition-colors w-8 h-8 flex justify-center items-center"
            >
              <img src="/e-clos.png" alt="x" class="sm:!w-4 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-end mt-6" v-if="activeTab === 'pending'">
      <button
        @click="
          () => {
            showModal = true;
          }
        "
        class="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors"
      >
        Добавить новую Достижение
      </button>
    </div>

    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-2 sm:px-4"
    >
      <div
        class="bg-gray-800 rounded-lg p-4 sm:p-6 w-full max-w-md sm:max-w-2xl mx-auto overflow-y-auto max-h-[90vh]"
      >
        <!-- Header -->
        <div class="flex justify-between items-center mb-4 sm:mb-6">
          <h2 class="text-lg sm:text-xl font-semibold text-white">
            {{ isEditing ? "Редактировать достижение" : "Добавить достижение" }}
          </h2>
          <button @click="resetForm" class="text-gray-400 hover:text-white">
            <svg
              class="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
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
        <form class="space-y-4">
          <!-- Tournament & Trainer -->
          <div class="flex flex-col sm:flex-row gap-3 w-full">
            <div class="flex-1">
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Название турнира
              </label>
              <el-select
                v-model="form.tournament"
                placeholder="Выберите турнира"
                filterable
                clearable
                :disabled="isEditing"
                class="w-full bg-gray-700 border border-gray-600 rounded-lg !text-white"
              >
                <el-option
                  v-for="item in tournamentData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </div>

            <div class="flex-1">
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Название тренер
              </label>
              <el-select
                v-model="form.trainer"
                filterable
                clearable
                :disabled="isEditing"
                placeholder="Выберите тренер"
                class="w-full bg-gray-700 border border-gray-600 rounded-lg !text-white"
              >
                <el-option
                  v-for="item in trainerData"
                  :key="item.id"
                  :label="item.first_name + ' ' + item.last_name"
                  :value="item.id"
                />
              </el-select>
            </div>
          </div>

          <!-- Age Group & Weight -->
          <div class="flex flex-col sm:flex-row gap-3 w-full">
            <!-- 1. Sport Type -->
            <div class="flex-1">
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Тип спорта
              </label>
              <el-select
                v-model="form.sport_type"
                placeholder="Выберите вид спорта"
                filterable
                clearable
                @change="handleSportTypeChange"
                class="w-full bg-gray-700 border border-gray-600 rounded-lg !text-white"
              >
                <el-option
                  v-for="item in sportType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </div>

            <!-- 2. Age Group -->
            <div class="flex-1">
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Возрастная группа
              </label>
              <el-select
                v-model="form.age_group"
                placeholder="Выберите возрастную группу"
                filterable
                clearable
                :disabled="!ageGroups.length"
                @change="handleAgeGroupChange"
                class="w-full bg-gray-700 border border-gray-600 rounded-lg !text-white"
              >
                <el-option
                  v-for="age in ageGroups"
                  :key="age.id"
                  :label="age.age_group.name"
                  :value="age.id"
                />
              </el-select>
            </div>

            <!-- 3. Weight -->
            <div class="flex-1">
              <label class="block text-sm font-medium text-gray-300 mb-2">Bес</label>
              <el-select
                v-model="form.weight"
                placeholder="Выберите вес"
                filterable
                clearable
                :disabled="!weights.length"
                class="w-full bg-gray-700 border border-gray-600 rounded-lg !text-white"
              >
                <el-option
                  v-for="(w, index) in weights"
                  :key="index"
                  :label="w"
                  :value="w"
                />
              </el-select>
            </div>
          </div>

          <!-- Rating & City -->
          <div class="flex flex-col sm:flex-row gap-3 w-full">
            <div class="flex-1">
              <label class="block text-sm font-medium text-gray-300 mb-2">Рейтинг</label>
              <el-input
                v-model="form.rating"
                type="number"
                placeholder="Введите Рейтинг"
                class="w-full bg-gray-700 border border-gray-600 rounded-lg text-white"
              />
            </div>

            <div class="flex-1">
              <label class="block text-sm font-medium text-gray-300 mb-2">Город</label>
              <el-input
                v-model="form.country"
                type="text"
                placeholder="Введите Город"
                class="w-full bg-gray-700 border border-gray-600 rounded-lg text-white"
              />
            </div>
          </div>

          <!-- Year -->
          <div class="flex-1">
            <label class="block text-sm font-medium text-gray-300 mb-2">Год</label>
            <el-date-picker
              v-model="form.year"
              type="year"
              value-format="YYYY"
              placeholder="Выберите год"
              class="w-full bg-gray-700 border border-gray-600 rounded-lg text-white"
            />
          </div>
          <div class="flex flex-col sm:flex-row gap-3 w-full">
            <div class="flex-1">
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Загрузите изображение или файл
              </label>

              <!-- Upload qismi -->
              <el-upload
                v-if="!previewUrl"
                class="upload-demo w-full"
                action="#"
                :auto-upload="false"
                :limit="1"
                :on-change="handleFileChange"
                :file-list="fileList"
                :on-remove="handleRemove"
                accept="image/*"
                drag
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text text-gray-300">
                  Перетащите файл сюда или <em>выбирать</em>
                </div>
              </el-upload>

              <!-- Preview qismi -->
              <div v-if="previewUrl" class="mt-3 relative inline-block">
                <img
                  :src="previewUrl"
                  alt="Preview"
                  class="w-40 h-40 object-cover rounded-lg border border-gray-600"
                />
                <!-- Remove tugmasi -->
                <button
                  @click="handleRemove"
                  type="button"
                  class="absolute top-1 right-1 bg-black/50 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-black/70"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>

          <div class="w-full mx-auto flex justify-center">
            <el-button
              type="submit"
              @click="submitForm"
              class="w-full sm:w-fit px-6 py-3 !bg-red-600 hover:!bg-red-500 !text-white !rounded-lg !border-red-500"
            >
              {{ isEditing ? "Сохранить изменения" : "Отправить на подтверждение" }}
            </el-button>
          </div>
        </form>
      </div>
    </div>

    <div
      v-if="viewModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-2xl shadow-lg w-full max-w-md mx-4 overflow-hidden">
        <!-- Header -->
        <div class="flex items-center justify-between px-5 py-4 border-b">
          <div class="flex items-center gap-2">
            <div class="bg-red-500 p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-yellow-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 21h8m-4-4v4m0-4a7 7 0 007-7V5H5v5a7 7 0 007 7zM5 5V3h14v2"
                />
              </svg>
            </div>
            <h2 class="text-lg font-semibold text-black">Просмотр достижения</h2>
          </div>
          <button @click="viewModal = false" class="text-gray-500 hover:text-black">
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

        <!-- Body -->
        <div class="p-6 space-y-4 text-gray-800">
          <!-- Tournament -->
          <div class="flex items-start gap-3">
            <span class="text-gray-500">🏆 Турнир:</span>
            <p class="font-medium">{{ viewData.tournament?.name }}</p>
          </div>

          <!-- Trainer -->
          <div class="flex items-start gap-3">
            <span class="text-gray-500">👤 Тренер:</span>
            <p class="font-medium">{{ viewData.trainer?.full_name }}</p>
          </div>

          <!-- Rating -->
          <div class="flex items-start gap-3">
            <span class="text-gray-500">⭐ Рейтинг:</span>
            <span
              class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-sm font-semibold"
            >
              {{ viewData.rating }}
            </span>
          </div>

          <!-- Country -->
          <div class="flex items-start gap-3">
            <span class="text-gray-500">📍 Город:</span>
            <p class="font-medium">{{ viewData.country }}</p>
          </div>

          <p>
            👶 <span class="font-medium">Возрастная:</span>
            {{ viewData.age_group.name }}
          </p>
          <p>⚖️ <span class="font-medium">Вес:</span> {{ viewData.weight }}</p>

          <p class="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4 text-blue-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm6.32 6h-2.49A5.99 5.99 0 0 0 12 6a5.99 5.99 0 0 0-3.83 1.33L6.68 8A8 8 0 1 1 18.32 8zM12 8a4 4 0 1 1-4 4a4 4 0 0 1 4-4z"
              />
            </svg>
            <span class="text-gray-500">Тип спорта:</span>
            {{ viewData.sport_type?.name }}
          </p>

          <!-- Year -->
          <div class="flex items-start gap-3">
            <span class="text-gray-500">📅 Год:</span>
            <p class="font-medium">{{ viewData.year }}</p>
          </div>

          <!-- Image -->
          <div
            v-if="viewData.file !== null && viewData.file"
            class="flex items-center gap-3"
          >
            <span class="text-gray-500">📄 Документ:</span>

            <!-- Agar fayl rasm bo‘lsa -->
            <template v-if="isImageFile(viewData.file)">
              <img
                :src="viewData.file"
                alt="preview"
                class="w-14 h-14 object-cover rounded-lg mt-2 cursor-pointer hover:opacity-80 transition"
                @click="openImageModal(viewData.file)"
              />
            </template>

            <!-- Agar fayl PDF bo‘lsa -->
            <template v-else-if="isPdfFile(viewData.file)">
              <div
                class="flex items-center gap-2 cursor-pointer hover:text-blue-400 transition"
                @click="openPdf(viewData.file)"
              >
                <i class="el-icon-document text-red-500 text-2xl"></i>
                <span class="underline text-sm break-all">Открыть PDF</span>
              </div>
            </template>

            <!-- Boshqa formatlar uchun -->
            <template v-else>
              <a
                :href="viewData.file"
                target="_blank"
                class="underline text-sm text-blue-400 hover:text-blue-600 break-all"
              >
                Скачать файл
              </a>
            </template>
          </div>
        </div>

        <!-- Score -->
        <div class="bg-red-100 px-6 py-4 flex items-center justify-between">
          <span class="text-gray-700 font-medium">Баллы</span>
          <p class="text-2xl font-bold text-red-600">
            {{ viewData.score }}
          </p>
        </div>
      </div>
    </div>

    <div
      v-if="viewModall"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div
        class="!bg-gray-800 rounded-2xl shadow-lg w-full mx-4 overflow-hidden transition-all duration-300"
        :class="
          Object.keys(viewDataa.old_data || {}).length > 0 ? 'max-w-4xl' : 'max-w-md'
        "
      >
        <!-- Header -->
        <div class="flex items-center justify-between px-5 py-4 border-b border-gray-700">
          <h2 class="text-lg font-semibold text-white">Посмотреть запрос</h2>
          <button
            @click="viewModall = false"
            class="text-gray-400 hover:text-white transition"
          >
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

        <!-- Body -->
        <div
          class="grid gap-4 p-6 text-gray-800"
          :class="
            Object.keys(viewDataa.old_data || {}).length > 0
              ? 'md:grid-cols-2'
              : 'md:grid-cols-1'
          "
        >
          <!-- OLD DATA -->
          <div
            v-if="viewDataa.old_data && Object.keys(viewDataa.old_data).length > 0"
            class="bg-gray-900 text-white rounded-xl p-5"
          >
            <h3
              class="text-purple-400 font-semibold text-lg mb-3 flex items-center gap-2"
            >
              🧾 Старый результат
            </h3>
            <p>
              📍 <span class="font-medium">Страна:</span> {{ viewDataa.old_data.country }}
            </p>
            <p>
              🏆 <span class="font-medium">Турнир:</span>
              {{ viewDataa.old_data.tournament?.name }}
            </p>
            <p>
              👶 <span class="font-medium">Возрастная:</span>
              {{ viewDataa.old_data.age_group.name }}
            </p>
            <p>
              ⚖️ <span class="font-medium">Вес:</span> {{ viewDataa.old_data.weight }}
            </p>
            <p>📅 <span class="font-medium">Год:</span> {{ viewDataa.old_data.year }}</p>
            <p>
              ⭐ <span class="font-medium">Рейтинг:</span> {{ viewDataa.old_data.rating }}
            </p>
            <p>
              🏆 <span class="font-medium">Счёт:</span> {{ viewDataa.old_data.score }}
            </p>

            <p class="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 text-blue-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm6.32 6h-2.49A5.99 5.99 0 0 0 12 6a5.99 5.99 0 0 0-3.83 1.33L6.68 8A8 8 0 1 1 18.32 8zM12 8a4 4 0 1 1-4 4a4 4 0 0 1 4-4z"
                />
              </svg>
              <span class="text-gray-400">Тип спорта:</span>
              {{ viewDataa.old_data.sport_type?.name }}
            </p>

            <div v-if="viewDataa.old_data.file_url" class="mt-3">
              <span class="block font-medium text-gray-300 mb-1">📄 Документ:</span>
              <img
                v-if="isImageFile(viewDataa.old_data.file_url)"
                :src="viewDataa.old_data.file_url"
                class="w-24 h-24 rounded-lg object-cover cursor-pointer hover:opacity-80 transition"
                @click="openImageModal(viewDataa.old_data.file_url)"
              />
              <a
                v-else
                :href="viewDataa.old_data.file_url"
                target="_blank"
                class="underline text-sm text-blue-400 hover:text-blue-500 break-all"
                >Открыть документ</a
              >
            </div>
          </div>

          <!-- NEW DATA -->
          <div class="bg-gray-900 text-white rounded-xl p-5">
            <h3
              class="text-purple-400 font-semibold text-lg mb-3 flex items-center gap-2"
            >
              🆕 Новые результат
            </h3>
            <p>
              📍 <span class="font-medium">Страна:</span> {{ viewDataa.new_data.country }}
            </p>
            <p>
              🏆 <span class="font-medium">Турнир:</span>
              {{ viewDataa.new_data.tournament?.name }}
            </p>
            <p>
              👶 <span class="font-medium">Возрастная:</span>
              {{ viewDataa.new_data.age_group.name }}
            </p>
            <p>
              ⚖️ <span class="font-medium">Вес:</span> {{ viewDataa.new_data.weight }}
            </p>
            <p>📅 <span class="font-medium">Год:</span> {{ viewDataa.new_data.year }}</p>
            <p>
              ⭐ <span class="font-medium">Рейтинг:</span> {{ viewDataa.new_data.rating }}
            </p>
            <p>
              🏆 <span class="font-medium">Счёт:</span> {{ viewDataa.new_data.score }}
            </p>

            <p class="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 text-blue-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm6.32 6h-2.49A5.99 5.99 0 0 0 12 6a5.99 5.99 0 0 0-3.83 1.33L6.68 8A8 8 0 1 1 18.32 8zM12 8a4 4 0 1 1-4 4a4 4 0 0 1 4-4z"
                />
              </svg>
              <span class="text-gray-400">Тип спорта:</span>
              {{ viewDataa.new_data.sport_type?.name }}
            </p>

            <div v-if="viewDataa.new_data.file_url" class="mt-3">
              <span class="block font-medium text-gray-300 mb-1">📄 Документ:</span>
              <img
                v-if="isImageFile(viewDataa.new_data.file_url)"
                :src="viewDataa.new_data.file_url"
                class="w-24 h-24 rounded-lg object-cover cursor-pointer hover:opacity-80 transition"
                @click="openImageModal(viewDataa.new_data.file_url)"
              />
              <a
                v-else
                :href="viewDataa.new_data.file_url"
                target="_blank"
                class="underline text-sm text-blue-400 hover:text-blue-500 break-all"
                >Открыть документ</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      v-model="showImageModal"
      width="80vw"
      align-center
      class="flex justify-center items-center !bg-transparent"
      :show-close="false"
    >
      <div class="relative">
        <img
          :src="previewImage"
          alt="Fullscreen Image"
          class="max-h-[80vh] max-w-[80vw] object-contain rounded-lg"
        />
        <button
          @click="showImageModal = false"
          class="absolute top-2 right-2 bg-black/60 text-white px-3 py-1 rounded-lg hover:bg-black/80"
        >
          ✕
        </button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import { useAuthStore } from "~/stores/auth";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const authStore = useAuthStore();
const { $api } = useNuxtApp();

const showModal = ref(false);
const viewModal = ref(false);
const viewModall = ref(false);
const isEditing = ref(false);
const editingId = ref(null);
const data = ref([]);
const viewData = ref({});
const viewDataa = ref({});
const activeTab = ref("pending");
const dataRequest = ref([]);

const statusFilter = ref("");

const filteredRequests = computed(() => {
  if (statusFilter.value === "") {
    return dataRequest.value;
  }
  return dataRequest.value.filter((item) => item.status === statusFilter.value);
});

const getDataRequest = async () => {
  try {
    const res = await $api.get(
      "/user/requests/?page=1&page_size=1000&type=sent&request_type=sportsman_result"
    );
    dataRequest.value = res.data.data.data;
  } catch (e) {
    console.error("res error:", e);
  }
};

const getData = async () => {
  try {
    const res = await $api.get("/user/profile/results/");
    data.value = res.data.data;
  } catch (e) {
    console.error("res error:", e);
  }
};

watch(activeTab, (newVal) => {
  if (newVal === "pending") {
    getDataRequest();
  } else if (newVal === "verified") {
    getData();
  }
});

const form = ref({
  country: "",
  tournament: "",
  trainer: "",
  year: "",
  rating: 0,
  sport_type: "",
  age_group: "",
  weight: "",
  file: null,
});

const fileList = ref([]);
const previewUrl = ref(null);
const isLoading = ref(false);

function handleFileChange(file) {
  form.value.file = file.raw;
  fileList.value = [file];

  if (file.raw && file.raw.type.startsWith("image/")) {
    previewUrl.value = URL.createObjectURL(file.raw);
  } else {
    previewUrl.value = null;
  }
}

function handleRemove() {
  form.value.file = null;
  fileList.value = [];
  previewUrl.value = null;
}

const tournamentData = ref([]);
const getTournament = async () => {
  try {
    const federationId = authStore.userProfile?.data?.sportsman_profile?.federation?.id;
    const res = await $api.get(`/sport/tournament/?federation=${federationId}`);
    tournamentData.value = res.data.data;
  } catch (e) {
    console.log(e);
  }
};

const sportType = ref([]);
const ageGroups = ref([]);
const weights = ref([]);

const getSportType = async () => {
  try {
    const federationId = authStore.userProfile?.data?.sportsman_profile?.federation?.id;
    const res = await $api.get(
      `/federation/${federationId}/sport-types/?page=1&page_size=1000`
    );
    sportType.value = res.data.data || [];
  } catch (e) {
    console.error("Sport turini olishda xatolik:", e);
  }
};

const handleSportTypeChange = (sportTypeId) => {
  const selectedSport = sportType.value.find((s) => s.id === sportTypeId);

  if (selectedSport) {
    ageGroups.value = selectedSport.age_groups || [];
  } else {
    ageGroups.value = ageGroups.value.length ? ageGroups.value : [];
  }

  weights.value = [];
  form.value.age_group = "";
  form.value.weight = "";
};

const handleAgeGroupChange = (ageGroupId) => {
  const selectedAgeGroup = ageGroups.value.find((g) => g.id === ageGroupId);
  console.log(selectedAgeGroup);

  weights.value = selectedAgeGroup?.age_group?.weights || [];

  form.value.weight = "";
};

const trainerData = ref([]);
const getTrainer = async () => {
  try {
    const federationId = authStore.userProfile?.data?.sportsman_profile?.federation?.id;
    const res = await $api.get(
      `/user/trainers/?page=1&page_size=1000&federation=${federationId}`,
      {}
    );
    trainerData.value = res.data.data;
  } catch (e) {
    console.log(e);
  }
};

const submitForm = async () => {
  try {
    if (!form.value.file && !isEditing.value) {
      ElMessage.warning("Iltimos, fayl yuklang!");
      return;
    }

    isLoading.value = true;

    const formData = new FormData();

    for (const [key, value] of Object.entries(form.value)) {
      if (key === "file") {
        if (value instanceof File || value instanceof Blob) {
          formData.append("file", value);
        } else if (
          isEditing.value &&
          typeof value === "string" &&
          value.startsWith("http")
        ) {
          const response = await fetch(value);
          const blob = await response.blob();
          const filename = value.split("/").pop() || "file.jpg";
          const file = new File([blob], filename, { type: blob.type });
          formData.append("file", file);
        }
      } else {
        formData.append(key, value);
      }
    }

    if (isEditing.value) {
      await $api.patch(`/user/profile/results/${editingId.value}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } else {
      await $api.post(`/user/profile/results/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }

    ElMessage.success("Ma'lumot muvaffaqiyatli saqlandi!");
    getData();
    getDataRequest();
    resetForm();
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
    isLoading.value = false;
  }
};

const updateItem = async (id) => {
  try {
    const res = await $api.get(`/user/profile/results/${id}/`);
    const item = res.data.data;

    await getSportType();

    form.value = {
      country: item.country || "",
      tournament: item.tournament?.id || "",
      trainer: item.trainer?.id || "",
      year: item.year?.toString() || "",
      rating: item.rating || 0,
      sport_type: item.sport_type?.id || "",
      age_group: item.age_group?.id || "",
      weight: item.weight || "",
      file: item.file || null,
    };

    const selectedSport = sportType.value.find((s) => s.id === form.value.sport_type);

    if (selectedSport) {
      ageGroups.value = selectedSport.age_groups || [];
    } else {
      ageGroups.value = [
        {
          id: item.age_group?.id,
          age_group: { name: item.age_group?.name || "" },
        },
      ];
    }

    const selectedAgeGroup = ageGroups.value.find((g) => g.id === form.value.age_group);

    weights.value =
      selectedAgeGroup?.weights || selectedAgeGroup?.age_group?.weights || [];

    previewUrl.value = item.file || null;
    fileList.value = item.file ? [{ name: "Current File", url: item.file }] : [];

    isEditing.value = true;
    editingId.value = id;
    showModal.value = true;
  } catch (err) {
    console.error("updateItem error:", err);
    ElMessage.error("Ошибка при загрузке данных для редактирования!");
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

const viewItemm = async (id) => {
  try {
    const res = await $api.get(`/user/requests/${id}/`);
    viewDataa.value = res.data.data;
    viewModall.value = true;
  } catch (e) {
    console.error("view error:", e);
  }
};

const deleteItem = async (id) => {
  try {
    await $api.delete(`/user/profile/results/${id}/`);
    await getData();
  } catch (e) {
    console.error("delete error:", e);
  }
};

const cancelRequest = async (id) => {
  try {
    await $api.patch(`/user/requests/${id}/`, { status: "cancelled" });
    await getDataRequest();
    ElMessage.success("So‘rov bekor qilindi.");
    formData.value.trainer = "";
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
    await getDataRequest();
  }
};

const resetForm = () => {
  showModal.value = false;
  isEditing.value = false;
  editingId.value = null;

  form.value = {
    country: "",
    tournament: "",
    trainer: "",
    year: "",
    rating: 0,
    sport_type: "",
    age_group: "",
    weight: "",
    file: null,
  };

  fileList.value = [];
  previewUrl.value = null;
  ageGroups.value = [];
  weights.value = [];
};

const isImageFile = (fileUrl) => {
  return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(fileUrl);
};

const isPdfFile = (fileUrl) => {
  return /\.pdf$/i.test(fileUrl);
};

const openImageModal = (url) => {
  previewImage.value = url;
  showImageModal.value = true;
};

const openPdf = (url) => {
  window.open(url, "_blank");
};

onMounted(() => {
  getDataRequest();
  getData();
  getTournament();
  getTrainer();
  getSportType();
});

const showImageModal = ref(false);
const previewImage = ref(null);
</script>

<style scoped>
:deep(.el-date-editor.el-input, .el-date-editor.el-input__wrapper) {
  width: 100% !important;
}
:deep(.el-input__wrapper) {
  background-color: transparent !important;
}
:deep(.el-select__wrapper) {
  background-color: transparent !important;
  box-shadow: none !important;
}
:deep(.el-select__input) {
  color: white !important;
}
:deep(.el-select__selected-item span) {
  color: white !important;
}

:deep(.el-upload-dragger) {
  background-color: transparent !important;
}

:deep(.el-upload-dragger .el-upload__text) {
  color: white !important;
}
</style>
