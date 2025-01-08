<template>
  <div>
    <div
      class="bg-[radial-gradient(circle,_#1F1F1F_0%,_#000000_0%)] w-full h-screen"
    >
      <div class="flex items-center relative">
        <img
          src="@/assets/img/login/login-boy.png"
          alt="Login img ball boy"
          class="h-screen"
        />
        <div class="min-h-screen absolute top-50 2xl:right-1/4 right-[15rem] bg-black flex items-center justify-center p-2">
    <div class="w-full max-w-[360px] bg-white rounded-2xl p-8">
      <div class="flex justify-center mb-4">
        <img src="@/assets/img/login/logo.svg" alt="Sport Rating" class="h-7" />
      </div>
      
      <h1 class="text-center font-medium mb-1.5">
        Установить пароль
      </h1>
      
      <p class="text-gray-500 text-xs text-center mb-4">
        Придумайте пароль для входа в ваш аккаунт
      </p>

      <form @submit.prevent="handleSubmit" class="space-y-3">
        <div>
          <label class="block text-sm mb-1.5">Пароль</label>
          <input
            v-model="password"
            type="password"
            placeholder="Введите пароль"
            :class="['w-full px-3 py-2 text-sm bg-gray-50 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500',
                     errors.password ? 'border-red-500' : 'border-gray-200']"
          />
          <p v-if="errors.password" class="text-red-500 text-xs mt-1">{{ errors.password }}</p>
        </div>

        <div>
          <label class="block text-sm mb-1.5">Подтвердите пароль</label>
          <input
            v-model="confirmPassword"
            type="password"
            placeholder="Введите пароль"
            :class="['w-full px-3 py-2 text-sm bg-gray-50 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500',
                     errors.confirmPassword ? 'border-red-500' : 'border-gray-200']"
          />
          <p v-if="errors.confirmPassword" class="text-red-500 text-xs mt-1">{{ errors.confirmPassword }}</p>
        </div>

        <button
          type="submit"
          class="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition-colors duration-200 text-sm"
        >
          Подтвердить
        </button>
      </form>
    </div>
  </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const password = ref('')
const confirmPassword = ref('')
const errors = reactive({
  password: '',
  confirmPassword: ''
})

const validateForm = () => {
  let isValid = true
  errors.password = ''
  errors.confirmPassword = ''

  if (!password.value) {
    errors.password = 'Пожалуйста, введите пароль'
    isValid = false
  }

  if (!confirmPassword.value) {
    errors.confirmPassword = 'Пожалуйста, подтвердите пароль'
    isValid = false
  } else if (password.value !== confirmPassword.value) {
    errors.confirmPassword = 'Пароли не совпадают'
    isValid = false
  }

  return isValid
}

const handleSubmit = () => {
  if (validateForm()) {
    console.log('Password set successfully')
  }
}
</script>
