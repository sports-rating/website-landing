<template>
  <div>
    <p class="p-4 pb-2">
      <el-switch
        v-model="colorMode.preference"
        size="large"
        active-value="light"
        inactive-value="dark"
        inactive-color="bg-gray-900"
      />
    </p>
  </div>
</template>

<script setup>
const colorMode = useColorMode();
</script>

<style lang="postcss">
body {
  @apply min-h-screen bg-white dark:bg-gray-800 dark:text-gray-200;
}
</style>
