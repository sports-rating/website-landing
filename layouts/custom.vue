<script setup>
import AppHeader from "../components/home/AppHeader";
import Footer from "../components/home/Footer";
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();

onMounted(async () => {
  await authStore.userProfile;
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
