<template>
  <div class="h-screen relative z-20">
    <div class="absolute inset-0 z-0">
      <img src="/ee.png" alt="Sports fans cheering" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-black/70"></div>
    </div>

    <div class="relative z-20">
      <nav class="z-10 py-8 px-4 sm:container">
        <div class="mx-auto flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <nuxt-link to="/" class="text-white font-bold text-2xl">
              <img
                src="/saber-logos.svg"
                alt="Sports fans cheering"
                class="md:w-32 w-24 h-auto object-cover"
              />
            </nuxt-link>
          </div>

          <div class="flex items-center">
            <div class="hidden md:flex space-x-8">
              <nuxt-link to="/about" class="nav-link" active-class="active-link">
                О нас
              </nuxt-link>
              <nuxt-link to="/userList" class="nav-link" active-class="active-link">
                Рейтинг спортсменов
              </nuxt-link>
              <nuxt-link to="/trainerList" class="nav-link" active-class="active-link">
                Рейтинг тренеров
              </nuxt-link>
              <!-- <a
              class="text-white"
            >
              База тренировок
            </a>
            <a
              class="text-white"
            >
              Новости
            </a> -->
            </div>
          </div>

          <!-- Profile Dropdown -->
          <div v-if="authStore.userProfile?.data" class="relative">
            <el-dropdown trigger="click">
              <span
                class="el-dropdown-link cursor-pointer flex items-center space-x-3 text-white"
              >
                <el-avatar
                  class="md:!w-[40px] md:!h-[40px] !w-[30px] !h-[30px] object-cover"
                  :src="
                    authStore.userProfile.data.profile_photo ||
                    'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
                  "
                />
                <div class="text-left">
                  <p class="text-sm font-semibold leading-4">
                    {{ authStore.userProfile.data.first_name }}
                    {{ authStore.userProfile.data.last_name }}
                  </p>
                  <p class="text-xs text-gray-400">
                    {{ userRoleText }}
                  </p>
                </div>
                <i class="el-icon-arrow-down text-white"></i>
              </span>

              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="goToProfile">Профиль</el-dropdown-item>
                  <el-dropdown-item divided @click="handleLogout">Выйти</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>

          <!-- Auth Buttons -->
          <div v-else class="flex items-center space-x-4 md:text-base text-xs">
            <NuxtLink to="/login">
              <button class="text-white hover:text-gray-300 transition">Войти</button>
            </NuxtLink>
            <NuxtLink to="/register">
              <button
                class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Зарегистрироваться
              </button>
            </NuxtLink>
          </div>
        </div>
      </nav>
    </div>

    <div class="relative z-20 flex items-center mt-32 container">
      <h1 class="text-4xl md:text-[60px] font-bold text-white max-w-xl leading-[68px]">
        ГЛАВНЫЙ РЕЙТИНГ СПОРТСМЕНОВ В ОДНОМ МЕСТЕ!
      </h1>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/stores/auth";
import { useRouter } from "vue-router";
import { computed, onMounted } from "vue";

const authStore = useAuthStore();
const router = useRouter();

onMounted(() => {
  const acToken = localStorage.getItem("access_token");
  if (acToken) {
    authStore.fetchUserProfile();
  }
});

const userRoleText = computed(() => {
  const role = authStore.userProfile?.data?.user_role;
  if (role === "sportsman") return "Спортсмен";
  if (role === "trainer") return "Тренер";
  if (role === "federation") return "Федерация";
  if (role === "sport_institution_admin") return "Администратор спортивного учреждения";
  if (role === "ordinary") return "Oбычный";
  if (role === "admin") return "Aдминистратор";
  return "";
});

function handleLogout() {
  authStore.logout();
}

function goToProfile() {
  const role = authStore.userProfile?.data?.user_role;
  if (role === "sportsman") return router.push("/SportsmanProfile");
  if (role === "trainer") return router.push("/TrainerProfile");
  if (role === "federation") return router.push("/FederationProfile");
  if (role === "sport_institution_admin") return router.push("/SchoolProfile");
  return "";
}
</script>

<style scoped>
.nav-link {
  color: white;
  transition: color 0.3s ease-in-out;
}

.nav-link:hover {
  color: #d1d5db !important;
  border-bottom: 1px solid red;
}

.active-link {
  border-bottom: 2px solid red;
}
</style>
