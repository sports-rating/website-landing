<template>
  <div class="relative z-20 bg-[#11101B]">
    <nav class="z-10 py-8 px-4 sm:container mx-auto flex items-center justify-between">
      <!-- Logo -->
      <nuxt-link to="/" class="text-white font-bold text-2xl">
        <img src="/saber-logos.svg" alt="Logo" class="md:w-32 w-24 h-auto object-cover" />
      </nuxt-link>

      <!-- Navbar Links -->
      <div class="hidden md:flex space-x-8 text-white">
        <nuxt-link to="/about" class="nav-link" active-class="active-link">
          {{ t("about") }}
        </nuxt-link>
        <nuxt-link to="/userList" class="nav-link" active-class="active-link">
          {{ t("athletes") }}
        </nuxt-link>
        <nuxt-link to="/trainerList" class="nav-link" active-class="active-link">
          {{ t("trainers") }}
        </nuxt-link>
      </div>

      <!-- Profile Dropdown -->
      <div v-if="authStore.userProfile?.data" class="relative flex items-center gap-4">
        <!-- <el-dropdown trigger="click" @command="changeLang">
          <span class="el-dropdown-link flex items-center justify-center cursor-pointer">
            <img src="/public/lang.svg" alt="lang" class="w-10 h-10 flex dark:hidden" />
            <img src="/dark-lang.svg" alt="lang" class="w-10 h-10 hidden dark:flex" />
          </span>

          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="lang in languages"
                :key="lang.code"
                :command="lang.code"
              >
                <span class="flex items-center justify-center gap-2">
                  <img :src="lang.icon" :alt="lang.label" class="w-6 h-6" />
                </span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown> -->
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
              <el-dropdown-item @click="goToProfile">{{ t("profile") }}</el-dropdown-item>
              <el-dropdown-item divided @click="handleLogout">{{
                t("logout")
              }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>

      <!-- Auth Buttons -->
      <div v-else class="flex items-center space-x-4">
        <!-- <el-dropdown trigger="click" @command="changeLang">
          <span class="el-dropdown-link flex items-center justify-center cursor-pointer">
            <img src="/public/lang.svg" alt="lang" class="w-10 h-10 flex dark:hidden" />
            <img src="/dark-lang.svg" alt="lang" class="w-10 h-10 hidden dark:flex" />
          </span>

          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="lang in languages"
                :key="lang.code"
                :command="lang.code"
              >
                <span class="flex items-center justify-center gap-2">
                  <img :src="lang.icon" :alt="lang.label" class="w-6 h-6" />
                </span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown> -->
        <NuxtLink to="/login">
          <button class="text-white hover:text-gray-300 transition">
            {{ t("login") }}
          </button>
        </NuxtLink>
        <NuxtLink to="/register">
          <button
            class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            {{ t("register") }}
          </button>
        </NuxtLink>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/stores/auth";
import { useRouter } from "vue-router";
import { computed, onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
const authStore = useAuthStore();
const router = useRouter();

const { locale, t } = useI18n();

const languages = [
  { code: "uz", label: t("uz"), icon: "/uz.png" },
  { code: "ru", label: t("ru"), icon: "/ru.png" },
  { code: "en", label: t("en"), icon: "/en.png" },
];

const changeLang = (lang) => {
  locale.value = lang;
  localStorage.setItem("lang", lang);
};

onMounted(() => {
  const acToken = localStorage.getItem("access_token");
  if (acToken) {
    authStore.fetchUserProfile();
  }
});

const userRoleText = computed(() => {
  const role = authStore.userProfile?.data?.user_role;
  if (role === "sportsman") return t("sportsman");
  if (role === "trainer") return t("trainer");
  if (role === "federation") return t("federation");
  if (role === "sport_institution_admin") return t("institution");
  if (role === "ordinary") return t("ordinary");
  if (role === "admin") return t("admin");
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
  color: #d1d5db !important; /* Gray-300 */
  border-bottom: 1px solid red;
}

.active-link {
  border-bottom: 2px solid red;
}
</style>
