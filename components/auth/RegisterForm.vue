<template>
  <div>
    <div
      class="bg-[radial-gradient(circle,_#1F1F1F_0%,_#000000_0%)] w-full h-screen"
    >
      <div class="flex items-center relative">
        <img
          src="@/assets/img/login/login-boy.png"
          alt="Login img ball boy"
          class="h-screen"
        />
        <div
          class="min-h-screen absolute top-50 2xl:right-1/4 right-[15rem] bg-black flex items-center justify-center p-2"
        >
          <div
            class="w-full max-w-[380px] bg-white rounded-2xl xl:p-8 p-4 px-8"
          >
            <div class="flex justify-center mb-3">
              <img
                src="@/assets/img/login/logo.svg"
                alt="Sport Rating"
                class="2xl:h-10 h-7"
              />
            </div>

            <h1 class="text-center  text-base font-medium mb-1.5">
              Создайте свой учетный запись s-rating
            </h1>

            <p class="text-gray-500 text-xs text-center mb-3">
              Выполните несколько шагов, чтобы завершить свою учетную запись
              s-rating (это быстро, мы обещаем)
            </p>

            <form @submit.prevent="handleSubmit" class="space-y-2.5">
              <div>
                <label class="block font-light text-gray-700 text-sm  mb-1">Как вам обращаться</label>
                <input
                  v-model="formData.name"
                  type="text"
                  placeholder="Введите имя и фамилию"
                  :class="[
                    'w-full px-3 py-2 font-light text-sm  bg-white border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500',
                    errors.name ? 'border-red-500' : 'border-gray-200',
                  ]"
                />
                <p v-if="errors.name" class="text-red-500 text-xs mt-0.5">
                  {{ errors.name }}
                </p>
              </div>

              <div>
                <label class="block font-light text-gray-700 text-sm mb-1">День рождения</label>
                <div class="grid grid-cols-3 gap-2">
                  <select
                    v-model="formData.day"
                    :class="[
                      'w-full cursor-pointer px-3 py-2 font-light text-gray-700 text-sm bg-white border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-red-500 focus:border-red-500',
                      errors.birthday ? 'border-red-500' : 'border-gray-300',
                    ]"
                  >
                    <option value="" disabled selected>День</option>
                    <option v-for="day in 31" :key="day" :value="day">
                      {{ day }}
                    </option>
                  </select>

                  <select
                    v-model="formData.month"
                    :class="[
                      'w-full cursor-pointer px-3 py-2 font-light text-gray-700 text-sm bg-white border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-red-500 focus:border-red-500',
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
                      'w-full cursor-pointer px-3 py-2 font-light text-gray-700 text-sm bg-white border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-red-500 focus:border-red-500',
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

              <div>
                <label class="block font-light text-gray-700 text-sm mb-1">Электронный адрес</label>
                <input
                  v-model="formData.email"
                  type="email"
                  placeholder="Введите электронную почту"
                  :class="[
                    'w-full px-3 py-2 font-light text-sm  bg-white border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500',
                    errors.email ? 'border-red-500' : 'border-gray-200',
                  ]"
                />
                <p v-if="errors.email" class="text-red-500 text-xs mt-0.5">
                  {{ errors.email }}
                </p>
              </div>

              <div>
                <label class="block font-light text-gray-700 text-sm mb-1">Тип пользователя</label>
                <select
                  v-model="formData.userType"
                  :class="[
                    'w-full cursor-pointer px-3 py-2 font-light text-gray-700 text-sm bg-white border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-red-500 ',
                    errors.userType ? 'border-red-500' : 'border-gray-200',
                  ]"
                >
                  <option value="" disabled selected>Выберите тип</option>
                  <option value="player">Игрок</option>
                  <option value="coach">Тренер</option>
                  <option value="club">Клуб</option>
                </select>
                <p v-if="errors.userType" class="text-red-500 text-xs mt-0.5">
                  {{ errors.userType }}
                </p>
              </div>

              <button
                type="submit"
                class="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition-colors duration-200 text-sm mt-2"
              >
                Продолжить
              </button>

              <div class="text-center text-sm mt-2">
                <span class="text-gray-600">У вас уже есть аккаунт? </span>
                <NuxtLink to="/login">
                  <span
                    class="text-black hover:text-red-500 transition-colors duration-200"
                  >
                    Войти
                  </span>
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
  name: "",
  day: "",
  month: "",
  year: "",
  email: "",
  userType: "",
});

const errors = reactive({
  name: "",
  birthday: "",
  email: "",
  userType: "",
});

const validateForm = () => {
  let isValid = true;

  // Reset errors
  Object.keys(errors).forEach((key) => (errors[key] = ""));

  if (!formData.name.trim()) {
    errors.name = "Пожалуйста, введите имя и фамилию";
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

  return isValid;
};

const handleSubmit = () => {
  if (validateForm()) {
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your backend
  }
};
</script>

<style scoped></style>
