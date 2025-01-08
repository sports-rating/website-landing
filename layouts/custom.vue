<script setup>
import AppHeader from "../components/home/AppHeader"
import Footer from "../components/home/Footer"

</script>

<template>
  <div>
    <AppHeader />
    <main >
      <slot />
    </main>
    <Footer/>
  </div>
</template>

<style lang="postcss">

</style>
