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
            <div class="flex justify-center">
              <img
                src="@/assets/img/login/sab.png"
                alt="Sport Rating"
                class="2xl:h-20 h-12"
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
                  <el-input
                    v-model="formData.firstName"
                    type="text"
                    placeholder="Введите имя"
                    :class="[
                      'w-full  cursor-pointer font-light text-sm  ',
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
                  <el-input
                    v-model="formData.lastName"
                    type="text"
                    placeholder="Введите фамилию"
                    :class="[
                      'w-full  cursor-pointer font-light text-sm  ',
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
                  <el-select
                    v-model="formData.day"
                    placeholder="Выберите День"
                    :class="[
                      'w-full  cursor-pointer font-light text-sm  ',
                      errors.birthday ? 'border-red-500' : 'border-gray-200',
                    ]"
                  >
                    <el-option v-for="day in 31" :key="day" :value="day">{{
                      day
                    }}</el-option>
                  </el-select>

                  <el-select
                    v-model="formData.month"
                    placeholder="Выберите Месяц"
                    :class="[
                      'w-full  cursor-pointer font-light text-sm  ',
                      errors.birthday ? 'border-red-500' : 'border-gray-200',
                    ]"
                  >
                    <el-option
                      v-for="(month, index) in months"
                      :key="index"
                      :value="index + 1"
                    >
                      {{ month }}
                    </el-option>
                  </el-select>

                  <el-select
                    v-model="formData.year"
                    placeholder="Выберите Год"
                    :class="[
                      'w-full  cursor-pointer font-light text-sm  ',
                      errors.birthday ? 'border-red-500' : 'border-gray-200',
                    ]"
                  >
                    <el-option v-for="year in years" :key="year" :value="year">
                      {{ year }}
                    </el-option>
                  </el-select>
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
                  <el-input
                    v-model="formData.email"
                    type="email"
                    placeholder="Введите электронную почту"
                    :class="[
                      'w-full  cursor-pointer font-light text-sm  ',
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
                  <el-select
                    v-model="formData.userType"
                    placeholder="Выберите тип"
                    :class="[
                      'w-full  cursor-pointer font-light text-sm  ',
                      errors.userType ? 'border-red-500' : 'border-gray-200',
                    ]"
                  >
                    <el-option value="sportsman">Игрок</el-option>
                    <el-option value="trainer">Тренер</el-option>
                  </el-select>
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

              <!-- Submit tugmasidan oldin -->
              <div class="flex items-start gap-2">
                <el-checkbox v-model="formData.accepted">
                  <span class="text-sm text-gray-600">
                    Я принимаю условия
                    <a
                      v-if="
                        formData.userType === 'sportsman' ||
                        formData.userType === 'trainer'
                      "
                      href="https://telegra.ph/Polzovatelskoe-soglashenie-09-15-14"
                      target="_blank"
                      class="text-red-500 underline"
                    >
                      пользовательского соглашения
                    </a>
                  </span>
                </el-checkbox>
              </div>
              <p v-if="errors.accepted" class="text-red-500 text-xs !m-0">
                {{ errors.accepted }}
              </p>

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
const { $api } = useNuxtApp();

const data = ref([]);
const auth = useAuthStore();
const router = useRouter();

const getData = async () => {
  try {
    const res = await $api.get("federation/");
    data.value = res.data.data.data;
  } catch (e) {
    console.error("Sport error:", e);
  }
};

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
  federation: "",
  accepted: false,
});

const errors = reactive({
  firstName: "",
  lastName: "",
  birthday: "",
  email: "",
  phone_number: "",
  userType: "",
  accepted: "",
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

  if (!formData.userType) {
    errors.userType = "Пожалуйста, выберите тип пользователя";
    isValid = false;
  }

  if (!formData.accepted) {
    errors.accepted = "Вы должны принять условия соглашения";
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

    if (formData.userType === "federation") {
      payload.federation = formData.federation;
    }

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
  getData();
});
</script>

<style scoped></style>
