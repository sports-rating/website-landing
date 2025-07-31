<template>
  <div>
    <div class="bg-[radial-gradient(circle,_#1F1F1F_0%,_#000000_0%)] w-full h-screen">
      <div
        class="flex md:flex-row flex-col md:items-start md:justify-start justify-center items-center relative min-h-screen"
      >
        <img
          src="@/assets/img/login/login-boy.png"
          alt="Login img ball boy"
          class="h-screen md:flex hidden"
        />
        <div
          class="w-full md:w-auto md:absolute md:top-1/2 md:-translate-y-1/2 md:2xl:right-1/4 md:right-[15rem] p-4 flex justify-center"
        >
          <div class="w-full max-w-[450px] bg-white rounded-2xl xl:p-8 p-4 px-6">
            <div class="flex justify-center mb-3">
              <img
                src="@/assets/img/login/logo.svg"
                alt="Sport Rating"
                class="2xl:h-10 h-7"
              />
            </div>
            <h1 class="text-center text-base font-medium mb-1.5">
              Создайте свой учетный запись s-rating
            </h1>
            <p class="text-gray-500 text-xs text-center mb-3">
              Выполните несколько шагов, чтобы завершить свою учетную запись s-rating (это
              быстро, мы обещаем)
            </p>

            <form @submit.prevent="handleSubmit" class="space-y-2.5">
              <div class="flex gap-4">
                <!-- First Name -->
                <div>
                  <label class="block font-light text-gray-700 text-sm mb-1">Имя</label>
                  <input
                    v-model="formData.firstName"
                    type="text"
                    placeholder="Введите имя"
                    :class="[
                      'w-full  px-3 py-2 font-light text-sm bg-white border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500',
                      errors.firstName ? 'border-red-500' : 'border-gray-200',
                    ]"
                  />
                  <p v-if="errors.firstName" class="text-red-500 text-xs mt-0.5">
                    {{ errors.firstName }}
                  </p>
                </div>

                <!-- Last Name -->
                <div>
                  <label class="block font-light text-gray-700 text-sm mb-1"
                    >Фамилия</label
                  >
                  <input
                    v-model="formData.lastName"
                    type="text"
                    placeholder="Введите фамилию"
                    :class="[
                      'w-full px-3 py-2 font-light text-sm bg-white border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500',
                      errors.lastName ? 'border-red-500' : 'border-gray-200',
                    ]"
                  />
                  <p v-if="errors.lastName" class="text-red-500 text-xs mt-0.5">
                    {{ errors.lastName }}
                  </p>
                </div>
              </div>

              <!-- Birthday -->
              <div>
                <label class="block font-light text-gray-700 text-sm mb-1"
                  >День рождения</label
                >
                <div class="grid grid-cols-3 gap-2">
                  <select
                    v-model="formData.day"
                    :class="[
                      'w-full !h-9.5 cursor-pointer px-3 py-2 font-light text-sm bg-white border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-red-500',
                      errors.birthday ? 'border-red-500' : 'border-gray-200',
                    ]"
                  >
                    <option value="" disabled selected>День</option>
                    <option v-for="day in 31" :key="day" :value="day">{{ day }}</option>
                  </select>

                  <select
                    v-model="formData.month"
                    :class="[
                      'w-full !h-9.5 cursor-pointer px-3 py-2 font-light text-sm bg-white border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-red-500',
                      errors.birthday ? 'border-red-500' : 'border-gray-200',
                    ]"
                  >
                    <option value="" disabled selected>Месяц</option>
                    <option
                      v-for="(month, index) in months"
                      :key="index"
                      :value="index + 1"
                    >
                      {{ month }}
                    </option>
                  </select>

                  <select
                    v-model="formData.year"
                    :class="[
                      'w-full !h-9.5 cursor-pointer px-3 py-2 font-light text-sm bg-white border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-red-500',
                      errors.birthday ? 'border-red-500' : 'border-gray-200',
                    ]"
                  >
                    <option value="" disabled selected>Год</option>
                    <option v-for="year in years" :key="year" :value="year">
                      {{ year }}
                    </option>
                  </select>
                </div>
                <p v-if="errors.birthday" class="text-red-500 text-xs mt-0.5">
                  {{ errors.birthday }}
                </p>
              </div>

              <div class="flex gap-4 w-full">
                <!-- Email -->
                <div class="w-full">
                  <label class="block font-light text-gray-700 text-sm mb-1"
                    >Электронный адрес</label
                  >
                  <input
                    v-model="formData.email"
                    type="email"
                    placeholder="Введите электронную почту"
                    :class="[
                      'w-full px-3 py-2 font-light text-sm bg-white border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500',
                      errors.email ? 'border-red-500' : 'border-gray-200',
                    ]"
                  />
                  <p v-if="errors.email" class="text-red-500 text-xs mt-0.5">
                    {{ errors.email }}
                  </p>
                </div>

                <!-- User Type -->
                <div class="w-full">
                  <label class="block font-light text-gray-700 text-sm mb-1"
                    >Тип пользователя</label
                  >
                  <select
                    v-model="formData.userType"
                    :class="[
                      'w-full !h-9.5 cursor-pointer px-3 py-2 font-light text-sm bg-white border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-red-500',
                      errors.userType ? 'border-red-500' : 'border-gray-200',
                    ]"
                  >
                    <option value="" disabled selected>Выберите тип</option>
                    <option value="sportsman">Игрок</option>
                    <option value="trainer">Тренер</option>
                    <option value="federation">Федерация</option>
                  </select>
                  <p v-if="errors.userType" class="text-red-500 text-xs mt-0.5">
                    {{ errors.userType }}
                  </p>
                </div>
              </div>

              <!-- Phone -->

              <div class="mb-4">
                <label class="block text-sm text-gray-500 font-light mb-1"
                  >Номер телефона</label
                >
                <vue-tel-input
                  v-model="formData.phone_number"
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
                  :dropdownOptions="{
                    showFlags: true,
                  }"
                  :onlyCountries="['UZ']"
                  :defaultCountry="'UZ'"
                  class="!bg-gray-200 w-full rounded-md shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
                ></vue-tel-input>
                <p
                  v-if="errors.phone_number"
                  class="mt-1 text-xs text-red-500"
                  role="alert"
                >
                  {{ errors.phone_number }}
                </p>
              </div>

              <!-- Submit -->
              <button
                type="submit"
                class="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition-colors duration-200 text-sm"
              >
                {{ isLoading ? "Вход..." : "Продолжить" }}
              </button>

              <!-- Login link -->
              <div class="text-center text-sm mt-2">
                <span class="text-gray-600">У вас уже есть аккаунт? </span>
                <NuxtLink to="/login">
                  <span
                    class="text-black hover:text-red-500 transition-colors duration-200"
                    >Войти</span
                  >
                </NuxtLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["guestOnly"],
});

import { useAuthStore } from "~/stores/auth";
import { useRouter } from "vue-router";
import { reactive } from "vue";

const auth = useAuthStore();
const router = useRouter();

const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

const formData = reactive({
  firstName: "",
  lastName: "",
  phone_number: "",
  day: "",
  month: "",
  year: "",
  email: "",
  userType: "",
});

const errors = reactive({
  firstName: "",
  lastName: "",
  birthday: "",
  email: "",
  phone_number: "",
  userType: "",
});

const validateForm = () => {
  let isValid = true;

  Object.keys(errors).forEach((key) => (errors[key] = ""));

  if (!formData.firstName.trim()) {
    errors.firstName = "Пожалуйста, введите имя";
    isValid = false;
  }

  if (!formData.lastName.trim()) {
    errors.lastName = "Пожалуйста, введите фамилию";
    isValid = false;
  }

  if (!formData.day || !formData.month || !formData.year) {
    errors.birthday = "Пожалуйста, укажите полную дату рождения";
    isValid = false;
  }

  if (!formData.email.trim()) {
    errors.email = "Пожалуйста, введите электронную почту";
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Пожалуйста, введите корректный адрес электронной почты";
    isValid = false;
  }

  formData.phone_number = formData.phone_number.replaceAll(" ", "");

  if (!formData.phone_number.trim() || formData.phone_number.length !== 13) {
    errors.phone_number = "Пожалуйста, введите корректный номер телефона";
    isValid = false;
  } else {
    errors.phone_number = "";
  }

  if (!formData.userType) {
    errors.userType = "Пожалуйста, выберите тип пользователя";
    isValid = false;
  }

  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  try {
    const birthDate = `${formData.year}-${String(formData.month).padStart(
      2,
      "0"
    )}-${String(formData.day).padStart(2, "0")}`;

    const payload = {
      phone_number: formData.phone_number,
      first_name: formData.firstName,
      last_name: formData.lastName,
      birth_date: birthDate,
      email: formData.email,
      user_role: formData.userType,
    };

    localStorage.setItem("registerData", JSON.stringify(payload));
    await auth.login({ phone_number: formData.phone_number, action: "signup" });
    router.push("/phoneVerification");
  } catch (error) {
    console.error("Registration error:", error);
  }
};

onMounted(async () => {
  const token = localStorage.getItem("access_token");
  if (token) {
    return navigateTo("/");
  }
});
</script>

<style scoped></style>
