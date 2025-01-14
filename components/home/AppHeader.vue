<template>
  <div class="relative z-20 bg-[#11101B] ">
    <nav class="z-10 py-8 container">
      <div class="mx-auto flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center space-x-2">
          <nuxt-link to="/" class="text-white font-bold text-2xl">
            <img
              src="/home-logo.svg"
              alt="Sports fans cheering"
              class="w-full h-full object-cover"
            />
          </nuxt-link>
        </div>

        <!-- Navbar Links -->
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

        <!-- Auth Buttons -->
        <div class="flex items-center space-x-4">
          <button class="text-white hover:text-gray-300 transition">Войти</button>
          <button class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
            Зарегистрироваться
          </button>
        </div>
      </div>
    </nav>
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
  color: #d1d5db !important; /* Gray-300 */
  border-bottom:1px solid red
}

.active-link {
  border-bottom: 2px solid red;
}
</style>
