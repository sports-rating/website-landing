<template>
  <NuxtLayout name="custom">
    <div class="min-h-screen bg-[#11101B] text-white p-6 font-sans">
      <!-- Header Section -->
      <header
        class="rounded-lg border !border-[#11101B] p-6 mb-6 flex flex-col md:flex-row items-center justify-between relative w-[90%]"
      >
        <div class="flex items-start md:items-center mb-4 md:mb-0">
          <div class="flex flex-col mr-6">
            <div class="flex items-center text-sm text-gray-400 mb-2">
              <span class="bg-[#4A4A6A] px-2 py-1 rounded-md mr-2">№1</span>
              <span class="bg-[#4A4A6A] px-2 py-1 rounded-md mr-2">ОБЩ 95</span>
              <span>Обладатель титула</span>
            </div>
            <h1 class="text-4xl font-bold mb-2">Пулатов Мавлонбек</h1>
            <h1 class="text-4xl font-bold mb-4">Мухтаржанович Trainer</h1>
            <div class="flex space-x-2">
              <span
                class="bg-[#A0E727] text-white text-sm px-3 py-1 rounded-full flex items-center"
              >
                Футболист
              </span>
              <span class="bg-[#FFFFFF29]/20 text-white text-sm px-3 py-1 rounded-full"
                >Нападающий</span
              >
            </div>
          </div>
        </div>
        <div class="relative w-48 h-48 md:w-60 md:h-60 flex-shrink-0">
          <img
            src="/boy.svg"
            alt="Profile Picture"
            class="rounded-full object-cover w-full h-full"
          />
        </div>
      </header>

      <!-- Main Navigation Tabs -->
      <nav class="flex space-x-6 border-b border-[#3A3A5A] mb-6">
        <button
          class="py-3 px-4 text-lg font-semibold border-b-2 border-[#E91E63] text-[#E91E63]"
        >
          Основные
        </button>
        <button class="py-3 px-4 text-lg font-semibold text-gray-400 hover:text-white">
          Фонд "Бирлик"
        </button>
        <button class="py-3 px-4 text-lg font-semibold text-gray-400 hover:text-white">
          Тренировки
        </button>
        <button class="py-3 px-4 text-lg font-semibold text-gray-400 hover:text-white">
          Питание
        </button>
      </nav>

      <!-- Content Area: Sidebar and Form -->
      <div class="flex flex-col md:flex-row gap-6">
        <!-- Sidebar -->
        <aside class="w-full md:w-64 h-fit bg-[#2C2C4A] rounded-lg p-4 flex-shrink-0">
          <h2 class="text-xl font-semibold mb-4 text-gray-300">Информация</h2>
          <nav class="space-y-2">
            <button
              class="w-full text-left py-3 px-4 rounded-md bg-[#E91E63] text-white font-medium"
            >
              Личные данные
            </button>
            <button
              class="w-full text-left py-3 px-4 rounded-md text-gray-300 hover:bg-[#3A3A5A]"
            >
              Образование
            </button>
            <button
              class="w-full text-left py-3 px-4 rounded-md text-gray-300 hover:bg-[#3A3A5A]"
            >
              Карьера и достижения
            </button>
          </nav>
        </aside>

        <!-- Form Content -->
        <main class="flex-1 rounded-lg p-6">
          <form class="space-y-8">
            <!-- Информация (Information) Section -->
            <div>
              <h2 class="text-xl font-semibold mb-4">Информация</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="flex flex-col">
                  <label for="name" class="text-sm text-gray-400 mb-1">Имя</label>
                  <input
                    type="text"
                    id="name"
                    v-model="formData.name"
                    placeholder="Имя"
                    class="bg-[#3A3A5A] border border-[#4A4A6A] rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#E91E63]"
                  />
                </div>
                <div class="flex flex-col">
                  <label for="surname" class="text-sm text-gray-400 mb-1">Фамилия</label>
                  <input
                    type="text"
                    id="surname"
                    v-model="formData.surname"
                    placeholder="Фамилия"
                    class="bg-[#3A3A5A] border border-[#4A4A6A] rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#E91E63]"
                  />
                </div>
                <div class="flex flex-col">
                  <label for="patronymic" class="text-sm text-gray-400 mb-1"
                    >Отчество</label
                  >
                  <input
                    type="text"
                    id="patronymic"
                    v-model="formData.patronymic"
                    placeholder="Отчество"
                    class="bg-[#3A3A5A] border border-[#4A4A6A] rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#E91E63]"
                  />
                </div>
                <div class="flex flex-col">
                  <label for="dob" class="text-sm text-gray-400 mb-1"
                    >Дата рождения</label
                  >
                  <div class="relative">
                    <input
                      type="date"
                      id="dob"
                      v-model="formData.dob"
                      class="bg-[#3A3A5A] border border-[#4A4A6A] rounded-md p-3 pr-10 text-white w-full focus:outline-none focus:ring-2 focus:ring-[#E91E63]"
                    />
                    <!-- <CalendarIcon
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  /> -->
                  </div>
                </div>
                <div class="flex flex-col">
                  <label for="userType" class="text-sm text-gray-400 mb-1"
                    >Тип пользователя</label
                  >
                  <select
                    id="userType"
                    v-model="formData.userType"
                    class="bg-[#3A3A5A] border border-[#4A4A6A] rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#E91E63]"
                  >
                    <option value="">Выберите тип пользователя</option>
                    <option value="player">Игрок</option>
                    <option value="coach">Тренер</option>
                  </select>
                </div>
                <div class="flex flex-col">
                  <label for="athleteType" class="text-sm text-gray-400 mb-1"
                    >Тип спортсмена</label
                  >
                  <select
                    id="athleteType"
                    v-model="formData.athleteType"
                    class="bg-[#3A3A5A] border border-[#4A4A6A] rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#E91E63]"
                  >
                    <option value="">Выберите тип спортсмена</option>
                    <option value="football">Футболист</option>
                    <option value="basketball">Баскетболист</option>
                  </select>
                </div>

                <div class="flex flex-col">
                  <label for="height" class="text-sm text-gray-400 mb-1">Рост (см)</label>
                  <input
                    type="number"
                    id="height"
                    v-model="formData.height"
                    placeholder="Рост (см)"
                    class="bg-[#3A3A5A] border border-[#4A4A6A] rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#E91E63]"
                  />
                </div>
                <div class="flex flex-col">
                  <label for="weight" class="text-sm text-gray-400 mb-1">Вес (кг)</label>
                  <input
                    type="number"
                    id="weight"
                    v-model="formData.weight"
                    placeholder="Вес (кг)"
                    class="bg-[#3A3A5A] border border-[#4A4A6A] rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#E91E63]"
                  />
                </div>
                <div class="flex flex-col">
                  <label for="division" class="text-sm text-gray-400 mb-1"
                    >Выберите дивизион</label
                  >
                  <select
                    id="division"
                    v-model="formData.division"
                    class="bg-[#3A3A5A] border border-[#4A4A6A] rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#E91E63]"
                  >
                    <option value="">Выберите дивизион</option>
                    <option value="div1">Дивизион 1</option>
                    <option value="div2">Дивизион 2</option>
                  </select>
                </div>
                <div class="flex items-center col-span-1 md:col-span-2">
                  <label class="text-sm text-gray-400 mr-4">Пол</label>
                  <div class="flex items-center mr-6">
                    <input
                      type="radio"
                      id="male"
                      value="male"
                      v-model="formData.gender"
                      class="form-radio h-5 w-5 text-[#E91E63] bg-[#3A3A5A] border-[#4A4A6A] focus:ring-[#E91E63]"
                    />
                    <label for="male" class="ml-2 text-white">Мужчина</label>
                  </div>
                  <div class="flex items-center">
                    <input
                      type="radio"
                      id="female"
                      value="female"
                      v-model="formData.gender"
                      class="form-radio h-5 w-5 text-[#E91E63] bg-[#3A3A5A] border-[#4A4A6A] focus:ring-[#E91E63]"
                    />
                    <label for="female" class="ml-2 text-white">Женщина</label>
                  </div>
                </div>
              </div>
            </div>

            <!-- Фактический адрес (Actual Address) Section -->
            <div>
              <h2 class="text-xl font-semibold mb-4">Фактический адрес</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="flex flex-col">
                  <label for="city" class="text-sm text-gray-400 mb-1">Город</label>
                  <select
                    id="city"
                    v-model="formData.city"
                    class="bg-[#3A3A5A] border border-[#4A4A6A] rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#E91E63]"
                  >
                    <option value="">Выберите город</option>
                    <option value="tashkent">Ташкент</option>
                    <option value="samarkand">Самарканд</option>
                  </select>
                </div>
                <div class="flex flex-col">
                  <label for="houseNumber" class="text-sm text-gray-400 mb-1"
                    >Номера дома</label
                  >
                  <select
                    id="houseNumber"
                    v-model="formData.houseNumber"
                    class="bg-[#3A3A5A] border border-[#4A4A6A] rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#E91E63]"
                  >
                    <option value="">Выберите номер дома</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </select>
                </div>
                <div class="flex flex-col">
                  <label for="street" class="text-sm text-gray-400 mb-1">Улица</label>
                  <input
                    type="text"
                    id="street"
                    v-model="formData.street"
                    placeholder="Улица"
                    class="bg-[#3A3A5A] border border-[#4A4A6A] rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#E91E63]"
                  />
                </div>
              </div>
            </div>

            <!-- Контактные данные (Contact Information) Section -->
            <div>
              <h2 class="text-xl font-semibold mb-4">Контактные данные</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="flex flex-col">
                  <label for="phone" class="text-sm text-gray-400 mb-1"
                    >Номер телефона</label
                  >
                  <input
                    type="text"
                    id="phone"
                    v-model="formData.phone"
                    placeholder="+99 90 000 00 00"
                    class="bg-[#3A3A5A] border border-[#4A4A6A] rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#E91E63]"
                  />
                </div>
                <div class="flex flex-col">
                  <label for="email" class="text-sm text-gray-400 mb-1"
                    >Электронный адрес</label
                  >
                  <input
                    type="email"
                    id="email"
                    v-model="formData.email"
                    placeholder="Электронный адрес"
                    class="bg-[#3A3A5A] border border-[#4A4A6A] rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#E91E63]"
                  />
                </div>
                <div class="flex flex-col">
                  <label for="citizenship" class="text-sm text-gray-400 mb-1"
                    >Гражданство</label
                  >
                  <select
                    id="citizenship"
                    v-model="formData.citizenship"
                    class="bg-[#3A3A5A] border border-[#4A4A6A] rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#E91E63]"
                  >
                    <option value="">Выберите гражданство</option>
                    <option value="uzbek">Узбекское</option>
                  </select>
                </div>
                <div class="flex flex-col">
                  <label for="birthPlace" class="text-sm text-gray-400 mb-1"
                    >Место рождения</label
                  >
                  <select
                    id="birthPlace"
                    v-model="formData.birthPlace"
                    class="bg-[#3A3A5A] border border-[#4A4A6A] rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#E91E63]"
                  >
                    <option value="">Выберите место рождения</option>
                    <option value="tashkent">Ташкент</option>
                  </select>
                </div>
                <div class="flex flex-col">
                  <label for="telegram" class="text-sm text-gray-400 mb-1"
                    >Телеграм</label
                  >
                  <input
                    type="text"
                    id="telegram"
                    v-model="formData.telegram"
                    placeholder="Введите линк в телеграм"
                    class="bg-[#3A3A5A] border border-[#4A4A6A] rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#E91E63]"
                  />
                </div>

                <div class="flex flex-col">
                  <label for="instagram" class="text-sm text-gray-400 mb-1"
                    >Инстаграм</label
                  >
                  <input
                    type="text"
                    id="instagram"
                    v-model="formData.instagram"
                    placeholder="Введите  линк в инстаграм"
                    class="bg-[#3A3A5A] border border-[#4A4A6A] rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#E91E63]"
                  />
                </div>
                <!-- <div class="flex flex-col">
                  <label for="photos" class="text-sm text-gray-400 mb-1"
                    >Фотографии</label
                  >
                  <div
                    class="bg-[#3A3A5A] border border-[#4A4A6A] rounded-md p-3 text-gray-400 flex items-center justify-center h-12"
                  >
                    Загрузить фото
                  </div>
                </div> -->
              </div>
            </div>

            <!-- Save Button -->
            <div class="flex justify-end pt-4">
              <button
                type="submit"
                class="bg-[#E91E63] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#C2185B] transition-colors"
              >
                Сохранить данные
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
// import { CalendarIcon, FootballIcon, EyeIcon } from "lucide-vue-next";

// Reactive form data (for demonstration, not actual submission logic)
const formData = ref({
  name: "",
  surname: "",
  patronymic: "",
  dob: "",
  userType: "",
  athleteType: "",
  sportPosition: "",
  height: null,
  weight: null,
  division: "",
  gender: "male", // Default to male as per image
  city: "",
  houseNumber: "",
  street: "",
  apartment: "",
  postalCode: "",
  region: "",
  country: "",
  phone: "",
  email: "",
  citizenship: "",
  birthPlace: "",
  languages: "",
  login: "",
  password: "",
});
</script>

<style scoped>
input[type="date"]::-webkit-calendar-picker-indicator {
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  cursor: pointer;
}
</style>
