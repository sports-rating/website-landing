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
          class="min-h-screen absolute top-50 2xl:right-1/4 right-[15rem] bg-black flex items-center justify-center p-4"
        >
          <div class="w-full max-w-[380px] bg-white rounded-2xl p-8">
            <div class="flex justify-center mb-8">
              <img
                src="@/assets/img/login/logo.svg"
                alt="Sport Rating"
                class="h-10"
              />
            </div>

            <h1 class="text-center text-gray-700 mb-3">
              Войдите в свою учетную запись s-rating
            </h1>

            <form @submit.prevent="handleSubmit" class="space-y-4">
              <div>
                <label class="block text-sm text-gray-500 font-light mb-1">Логин</label>
                <input
                  v-model="formData.login"
                  type="text"
                  placeholder="Введите логин"
                  :class="[
                    'w-full px-4 py-2 bg-gray-50 font-light text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent',
                    errors.login ? 'border-red-500' : 'border-gray-200',
                  ]"
                />
                <p
                  v-if="errors.login"
                  class="mt-1 text-xs text-red-500"
                  role="alert"
                >
                  {{ errors.login }}
                </p>
              </div>

              <div>
                <label class="block text-sm text-gray-500 font-light mb-1">Пароль</label>
                <input
                  v-model="formData.password"
                  type="password"
                  placeholder="Введите пароль"
                  :class="[
                    'w-full px-4 py-2 bg-gray-50 border font-light text-sm  rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent',
                    errors.password ? 'border-red-500' : 'border-gray-200',
                  ]"
                />
                <p
                  v-if="errors.password"
                  class="mt-1 text-xs text-red-500"
                  role="alert"
                >
                  {{ errors.password }}
                </p>
              </div>

              <div class="flex items-center">
                <input
                  v-model="formData.remember"
                  type="checkbox"
                  id="remember"
                  class="h-4 w-4 text-red-500 focus:ring-red-500 border-gray-300 rounded"
                />
                <label for="remember" class="ml-2 text-sm text-gray-600">
                  Запомнить меня
                </label>
              </div>

              <div
                v-if="errors.general"
                class="p-3 bg-red-50 border border-red-200 rounded-lg"
              >
                <p class="text-sm text-red-500 text-center" role="alert">
                  {{ errors.general }}
                </p>
              </div>

              <button
                type="submit"
                :disabled="isLoading"
                class="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors duration-200 disabled:opacity-50"
              >
                {{ isLoading ? "Вход..." : "Войти" }}
              </button>
            </form>

            <div class="mt-4 text-center">
              <a href="#" class="text-sm text-gray-600 hover:text-red-500">
                Забыли свой логин или пароль?
              </a>
            </div>

            <NuxtLink to="/register">
              <button
                @click="handleCreateAccount"
                class="w-full mt-4 bg-indigo-900 text-white py-2 rounded-lg hover:bg-indigo-800 transition-colors duration-200"
              >
                Создать новый аккаунт
              </button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();
const isLoading = ref(false);


const formData = reactive({
  login: "",
  password: "",
  remember: false,
});

const errors = reactive({
  login: "",
  password: "",
  general: "",
});

const validateForm = () => {
  let isValid = true;

  Object.keys(errors).forEach((key) => {
    errors[key as keyof typeof errors] = "";
  });

  if (!formData.login.trim()) {
    errors.login = "Пожалуйста, введите логин";
    isValid = false;
  }

  if (!formData.password) {
    errors.password = "Пожалуйста, введите пароль";
    isValid = false;
  }

  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  try {
    isLoading.value = true;
    errors.general = "Проверьте логин или пароль.";
  } catch (error) {
    errors.general = "Произошла ошибка при входе.";
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

const handleCreateAccount = () => {
  console.log("Navigate to create account");
};
</script>

<style scoped></style>
