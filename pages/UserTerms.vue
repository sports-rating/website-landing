<template>
  <div class="container p-8">
  
    <div v-for="item in data" :key="item.id">
      <h1 class="text-2xl mb-5">{{ item.title }}</h1>

      <p v-html="item.text"></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import axios from 'axios';

const data = ref<any>([])

const getData = async () => {
  try {
    const res = await axios.get(
      `https://api.7srating.uz/api/dashboard/terms-of-condition/`
    );
    data.value = res.data.data;
  } catch (e) {
    console.log(e);
  }
};



onMounted(() => {
  getData()
  
})



</script>


<style >
.no-scrollbar::-webkit-scrollbar-thumb {
  background-color: #e1e1e1;
  border: 4px solid transparent;
  border-radius: 8px;
  background-clip: padding-box;
}

.no-scrollbar::-webkit-scrollbar {
  width: 16px;
}

.no-scrollbar {
  -ms-overflow-style: none;
  /* scrollbar-width: thin; */
  /* margin: inherit; */
  scroll-margin-block-start: 0;
}
</style>