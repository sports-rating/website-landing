<script setup>
import AppHeader from "../components/home/AppHeader";
import Footer from "../components/home/Footer";
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();

const isProfileLoaded = computed(() => !authStore.userProfile);

onMounted(() => {
  const acToken = localStorage.getItem("access_token");
  if (acToken) {
    authStore.fetchUserProfile();
  }
});
</script>

<template>
  <div>
    <AppHeader />
    <main>
      <slot />
    </main>
    <Footer />
  </div>
</template>

<style lang="postcss"></style>
