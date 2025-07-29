<template>
  <div>
    <div class="bg-[radial-gradient(circle,_#1F1F1F_0%,_#000000_0%)] w-full h-screen">
      <div class="flex items-center relative">
        <img
          src="@/assets/img/login/login-boy.png"
          alt="Login img ball boy"
          class="h-screen"
        />
        <div
          class="min-h-screen absolute top-50 2xl:right-1/4 right-[15rem] bg-black flex items-center justify-center p-2"
        >
          <div class="w-full max-w-[360px] bg-white rounded-2xl p-8">
            <div class="flex justify-center mb-4">
              <img src="@/assets/img/login/logo.svg" alt="Sport Rating" class="h-10" />
            </div>

            <h1 class="text-center font-medium mb-1.5">Подтверждение личности</h1>

            <p class="text-gray-500 text-xs text-center mb-4">
              Ваш номер телефона будет использоваться для регистрации
            </p>

            <form @submit.prevent="handleSubmit" class="space-y-3">
              <div>
                <label class="block text-sm mb-1.5">Номер телефона</label>
                <div class="relative">
                  <input
                    v-model="phoneNumber"
                    type="tel"
                    placeholder="+998"
                    :class="[
                      'w-full pl-3 pr-3 py-2 text-sm bg-gray-50 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500',
                      error ? 'border-red-500' : 'border-gray-200',
                    ]"
                    maxlength="13"
                    @input="formatPhoneNumber"
                  />
                </div>
                <p v-if="error" class="text-red-500 text-xs mt-1">
                  {{ error }}
                </p>
              </div>

              <button
                type="submit"
                class="w-full mt-4 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition-colors duration-200 text-sm"
              >
                Получить смс код
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const phoneNumber = ref("");
const error = ref("");

const formatPhoneNumber = () => {
  // Remove all non-digit characters
  let cleaned = phoneNumber.value.replace(/\D/g, "");

  // Ensure it starts with 998
  if (!cleaned.startsWith("998")) {
    cleaned = "998" + cleaned;
  }

  // Format the number
  if (cleaned.length > 0) {
    cleaned = "+" + cleaned;
  }

  phoneNumber.value = cleaned;
};

const validatePhone = () => {
  const phoneRegex = /^\+998\d{9}$/;
  if (!phoneNumber.value) {
    error.value = "Пожалуйста, введите номер телефона";
    return false;
  }
  if (!phoneRegex.test(phoneNumber.value)) {
    error.value = "Пожалуйста, введите корректный номер телефона";
    return false;
  }
  error.value = "";
  return true;
};
</script>
