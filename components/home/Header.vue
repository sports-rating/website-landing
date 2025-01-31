<template>
  <div class=" h-screen relative z-20">
    <div class="absolute inset-0 z-0">
      <img
        src="/public/home.png"
        alt="Sports fans cheering"
        class="w-full h-full object-cover"
      />
      <div class="absolute  bg-black/30"></div>
    </div>

    <div class="relative z-20 ">
    <nav class="z-10 py-8 container">
      <div class="mx-auto flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <nuxt-link to="/" class="text-white font-bold text-2xl">
            <img
              src="/saber-logos.svg"
              alt="Sports fans cheering"
              class="w-full h-full object-cover"
            />
          </nuxt-link>
        </div>

        <div class="flex items-center">
          <div class="hidden md:flex space-x-8">
            <nuxt-link
              to="/userList"
              class="nav-link"
              active-class="active-link"
            >
              Рейтинг спортсменов
            </nuxt-link>
            <nuxt-link
              to="/trainerList"
              class="nav-link"
              active-class="active-link"
            >
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
            <a
              class="text-white"
            >
              Контакты
            </a>
          </div>
        </div>

        <div class="flex items-center space-x-4">
          <button class="text-white hover:text-gray-300 transition">Войти</button>
          <button class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
            Зарегистрироваться
          </button>
        </div>
      </div>
    </nav>
    </div>

    <div class="relative z-20  flex items-center mt-32 container">
        <h1 class="text-4xl md:text-[60px] font-bold text-white  max-w-xl leading-[68px]">
          ГЛАВНЫЙ РЕЙТИНГ СПОРТСМЕНОВ В ОДНОМ МЕСТЕ!
        </h1>
        
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.nav-link {
  color: white;
  transition: color 0.3s ease-in-out;
}

.nav-link:hover {
  color: #d1d5db !important; 
  border-bottom:1px solid red
}

.active-link {
  border-bottom: 2px solid red;
}
</style>