<template>
  <div class="bg-[radial-gradient(circle,_#1F1F1F_0%,_#000000_0%)] w-full min-h-screen">
    <div
      class="flex md:flex-row flex-col md:items-start md:justify-start justify-center items-center relative min-h-screen"
    >
      <!-- Left Image - Only visible on md+ screens -->
      <img
        src="@/assets/img/login/login-boy.png"
        alt="Login img ball boy"
        class="h-screen md:flex hidden"
      />

      <!-- Form Container -->
      <div
        class="w-full md:w-auto md:absolute md:top-1/2 md:-translate-y-1/2 md:2xl:right-1/4 md:right-[15rem] p-4 flex justify-center"
      >
        <div class="w-full max-w-[380px] bg-white rounded-2xl p-8">
          <div class="flex justify-center mb-8">
            <img src="@/assets/img/login/logo.svg" alt="Sport Rating" class="h-10" />
          </div>

          <h1 class="text-center text-gray-700 mb-3">
            Войдите в свою учетную запись s-rating
          </h1>

          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div>
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
                :dropdownOptions="{ showFlags: true }"
                :onlyCountries="['UZ']"
                :defaultCountry="'UZ'"
                class="!bg-gray-200 w-full rounded-md shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
              />
              <p
                v-if="errors.phone_number"
                class="mt-1 text-xs text-red-500"
                role="alert"
              >
                {{ errors.phone_number }}
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

          <NuxtLink to="/register">
            <button
              class="w-full mt-4 bg-indigo-900 text-white py-2 rounded-lg hover:bg-indigo-800 transition-colors duration-200"
            >
              Создать новый аккаунт
            </button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useAuthStore } from "~/stores/auth";
import { useRouter } from "vue-router";

definePageMeta({
  middleware: ["guestOnly"],
});

const authStore = useAuthStore();
const router = useRouter();
const isLoading = ref(false);

const formData = reactive({
  phone_number: "",
  action: "login",
});

const errors = reactive({
  phone_number: "",
});

const validateForm = () => {
  let isValid = true;

  formData.phone_number = formData.phone_number.replaceAll(" ", "");

  if (!formData.phone_number.trim() || formData.phone_number.length !== 13) {
    errors.phone_number = "Пожалуйста, введите корректный номер телефона";
    isValid = false;
  } else {
    errors.phone_number = "";
  }

  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  try {
    isLoading.value = true;
    await authStore.login(formData);
    localStorage.removeItem("registerData");
    router.push("/phoneVerification");
  } catch (error) {
    console.error("Login error:", error);
  } finally {
    isLoading.value = false;
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
