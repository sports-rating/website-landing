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
          <div class="w-full max-w-[360px] bg-white rounded-2xl p-8">
            <div class="flex justify-center mb-4">
              <img src="@/assets/img/login/logo.svg" alt="Sport Rating" class="h-7" />
            </div>

            <h1 class="text-center font-medium mb-1.5">Подтверждение личности</h1>

            <p class="text-gray-500 text-xs text-center mb-4">
              Ваш номер телефона будет использоваться для регистрации
            </p>

            <form @submit.prevent="handleSubmit" class="space-y-3">
              <div>
                <label class="block text-sm mb-1.5">Смс код</label>
                <OtpInput v-model="data" :fields="6" />
                <p v-if="errorMessage" class="text-red-500 text-xs mt-2">
                  {{ errorMessage }}
                </p>
              </div>

              <div class="w-full flex justify-end items-center my-2">
                <button
                  v-if="resendAvailable"
                  @click="handleResend"
                  class="text-blue-500 hover:underline"
                >
                  Отправить снова
                </button>
                <span class="text-gray-500">{{
                  timer > 0 ? `0:${timer.toString().padStart(2, "0")}` : ""
                }}</span>
              </div>

              <button
                @click="handleOtp"
                :disabled="isLoading"
                type="submit"
                class="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition-colors duration-200 text-sm"
              >
                {{ isLoading ? "Вход..." : "Продолжить" }}
              </button>
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

import OtpInput from "../components/OtpInput.vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

const isLoading = ref(false);
const errorMessage = ref("");
const router = useRouter();
const authStore = useAuthStore();
const data = ref("");
const timer = ref(60);
const resendAvailable = ref(false);
const registerData = ref(null);

watch(data, (newVal) => {
  data.value = String(newVal).padStart(6, "0");
  if (data.value.length < 6) {
    errorMessage.value = "Please enter the complete OTP.";
  } else {
    errorMessage.value = "";
  }
});

watch(registerData, (newVal) => {
  console.log("registerData changed:", newVal);
});

const handleOtp = async () => {
  if (data.value.length < 6) {
    errorMessage.value = "OTP is invalid or incomplete!";
  } else {
    const formattedOtp = String(data.value).padStart(6, "0");
    try {
      isLoading.value = true;
      await authStore.verify({ code: formattedOtp });
      if (registerData.value) {
        await authStore.register(registerData.value);
      }
      const role = authStore.userProfile?.data?.user_role;
      if (role) {
        if (role === "sportsman") return router.push("/SportsmanProfile");
        if (role === "trainer") return router.push("/TrainerProfile");
        if (role === "federation") return router.push("/FederationProfile");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        return (window.location.href = "https://admin.7srating.uz/");
      }
    } catch (error) {
      errorMessage.value = "Verification failed. Please try again.";
    } finally {
      isLoading.value = false;
      resetOtp();
    }
  }
};

const resetOtp = () => {
  data.value = "";
  errorMessage.value = "";
};

const startTimer = () => {
  timer.value = 60;
  resendAvailable.value = false;
  const countdown = setInterval(() => {
    if (timer.value > 0) {
      timer.value--;
    } else {
      resendAvailable.value = true;
      clearInterval(countdown);
    }
  }, 1000);
};

const handleResend = () => {
  resetOtp();
  startTimer();
  authStore.resetVerify();
};

onMounted(async () => {
  startTimer();

  const dataRe = localStorage.getItem("registerData");
  if (dataRe) {
    registerData.value = JSON.parse(dataRe);
  }
  const token = localStorage.getItem("access_token");
  if (token) {
    return navigateTo("/");
  }
});
</script>
