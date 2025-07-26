<template>
  <div class="relative z-20 bg-[#11101B]">
    <nav class="z-10 py-8 container mx-auto flex items-center justify-between">
      <!-- Logo -->
      <nuxt-link to="/" class="text-white font-bold text-2xl">
        <img src="/saber-logos.svg" alt="Logo" class="w-32 h-auto object-cover" />
      </nuxt-link>

      <!-- Navbar Links -->
      <div class="hidden md:flex space-x-8 text-white">
        <nuxt-link to="/userList" class="nav-link" active-class="active-link">
          Рейтинг спортсменов
        </nuxt-link>
        <nuxt-link to="/trainerList" class="nav-link" active-class="active-link">
          Рейтинг тренеров
        </nuxt-link>
        <a class="nav-link">Контакты</a>
      </div>

      <!-- Profile Dropdown -->
      <div v-if="authStore.userProfile?.data" class="relative">
        <el-dropdown trigger="click">
          <span
            class="el-dropdown-link cursor-pointer flex items-center space-x-3 text-white"
          >
            <el-avatar
              :size="40"
              :src="
                authStore.userProfile.data.image ||
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
      <div v-else class="flex items-center space-x-4">
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
    </nav>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/stores/auth";
import { useRouter } from "vue-router";
import { computed, onMounted } from "vue";

const authStore = useAuthStore();
const router = useRouter();

const isProfileLoaded = computed(() => !authStore.userProfile?.data);

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
  if (role === "trainer") return router.push("/TrainerList");
  return "";
}
</script>

<style scoped>
.nav-link {
  color: white;
  transition: color 0.3s ease-in-out;
}

.nav-link:hover {
  color: #d1d5db !important; /* Gray-300 */
  border-bottom: 1px solid red;
}

.active-link {
  border-bottom: 2px solid red;
}
</style>
