<template>
  <div class="container p-8">
    <div v-for="item in data" :key="item.id">
      <h1 class="text-2xl mb-5">{{ item.title }}</h1>

      <p v-html="item.text"></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
const { $api } = useNuxtApp();

const data = ref<any>([]);

const getData = async () => {
  try {
    const res = await $api.get(`/dashboard/privacy-policy`);
    data.value = res.data.data;
  } catch (e) {
    console.log(e);
  }
};

onMounted(() => {
  getData();
});
</script>

<style></style>
