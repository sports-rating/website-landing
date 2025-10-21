<template>
  <NuxtLayout name="custom">
    <div class="min-h-screen bg-[#11101B] text-white p-4 md:p-6 font-sans">
      <div class="sm:container mx-auto">
        <header
          class="rounded-lg border !border-[#11101B] bg-[#11101B]/50 p-4 md:p-6 mb-6 flex flex-col md:flex-row items-center md:items-start justify-between w-full mx-auto gap-6 md:gap-8"
        >
          <!-- Profile image -->
          <div
            class="relative w-28 h-28 sm:w-36 sm:h-36 md:w-60 md:h-60 flex-shrink-0 cursor-pointer group order-1 md:order-2 mx-auto md:mx-0"
          >
            <img
              @click.stop="clickImg"
              :src="
                uploadedImageUrl ||
                'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
              "
              alt="Profile Picture"
              class="rounded-full object-cover w-full h-full shadow-md"
            />

            <!-- Camera button -->
            <div
              @click.stop="clickImg"
              class="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-blue-600 border border-blue-600 rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center shadow-md group-hover:scale-110 transition duration-200 ease-in-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 7h2l2-3h10l2 3h2a1 1 0 011 1v11a1 1 0 01-1 1H3a1 1 0 01-1-1V8a1 1 0 011-1zm9 11a4 4 0 100-8 4 4 0 000 8z"
                />
              </svg>
              <input
                type="file"
                ref="fileInput"
                accept="image/*"
                class="hidden"
                @change="uploadImage"
              />
            </div>
          </div>

          <!-- User info -->
          <div
            class="flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1 w-full"
          >
            <div class="flex flex-col w-full">
              <!-- Name -->
              <h1
                class="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 flex flex-wrap items-center justify-center md:justify-start"
              >
                <span>
                  {{ authStore.userProfile?.data?.first_name }}
                  {{ authStore.userProfile?.data?.last_name }}
                </span>
                <img
                  class="w-5 h-5 sm:w-6 sm:h-6 ml-2"
                  :src="
                    authStore.userProfile?.data?.sportsman_profile?.is_sportsman_verified
                      ? '/verified.png'
                      : '/cancel.png'
                  "
                  alt="verify"
                />
              </h1>

              <!-- Badges -->
              <div class="flex flex-wrap justify-center md:justify-start gap-2 sm:gap-3">
                <span
                  class="bg-[#A0E727] uppercase text-white text-xs sm:text-sm px-3 py-1 rounded-full flex items-center"
                >
                  {{ authStore.userProfile?.data?.user_role }}
                </span>

                <span
                  class="bg-[#FFFFFF29]/50 uppercase text-white text-xs sm:text-sm px-3 py-1 rounded-full flex items-center"
                >
                  {{ authStore.userProfile?.data?.sportsman_profile?.sport_rank }}
                </span>

                <span
                  class="bg-[#E7273D]/50 text-white text-xs sm:text-sm px-3 py-1 rounded-full flex items-center"
                >
                  {{ authStore.userProfile?.data?.sportsman_profile?.points }} очки
                </span>
              </div>
            </div>
          </div>
        </header>

        <nav
          class="flex gap-2 md:gap-6 border-b border-[#3A3A5A] mb-6 overflow-x-auto whitespace-nowrap scrollbar-hide"
        >
          <button
            class="py-3 px-4 text-lg font-semibold border-b-2 border-[#E91E63] text-[#E91E63] flex-shrink-0"
          >
            Основные
          </button>
          <template
            v-if="authStore.userProfile?.data?.sportsman_profile?.is_sportsman_verified"
          >
            <button
              class="py-3 px-4 text-lg font-semibold text-gray-400 hover:text-white flex-shrink-0"
            >
              Фонд "Бирлик"
            </button>
            <button
              class="py-3 px-4 text-lg font-semibold text-gray-400 hover:text-white flex-shrink-0"
            >
              Тренировки
            </button>
            <button
              class="py-3 px-4 text-lg font-semibold text-gray-400 hover:text-white flex-shrink-0"
            >
              Питание
            </button>
          </template>
        </nav>

        <div class="flex flex-col lg:flex-row gap-6">
          <aside class="w-full h-fit lg:w-64 bg-[#2C2C4A] rounded-lg p-4">
            <h2 class="text-xl font-semibold mb-4 text-gray-300">Информация</h2>
            <div class="flex gap-6">
              <!-- Tabs -->
              <nav class="space-y-2 w-64">
                <button
                  @click="activeTab = 'info'"
                  :class="[
                    'w-full text-left py-3 px-4 rounded-md font-medium',
                    activeTab === 'info'
                      ? 'bg-[#E91E63] text-white'
                      : 'text-gray-300 hover:bg-[#3A3A5A]',
                  ]"
                >
                  Личные данные
                </button>

                <template
                  v-if="
                    authStore.userProfile?.data?.sportsman_profile?.is_sportsman_verified
                  "
                >
                  <button
                    :class="[
                      'w-full text-left py-3 px-4 rounded-md',
                      activeTab === 'education'
                        ? 'bg-[#E91E63] text-white'
                        : 'text-gray-300 hover:bg-[#3A3A5A]',
                    ]"
                    @click="activeTab = 'education'"
                  >
                    Образование
                  </button>

                  <button
                    v-if="authStore.userProfile?.data?.sportsman_profile?.trainer"
                    @click="activeTab = 'career'"
                    :class="[
                      'w-full text-left py-3 px-4 rounded-md',
                      activeTab === 'career'
                        ? 'bg-[#E91E63] text-white'
                        : 'text-gray-300 hover:bg-[#3A3A5A]',
                    ]"
                  >
                    Достижения
                  </button>

                  <button
                    v-if="authStore.userProfile?.data?.sportsman_profile?.trainer"
                    @click="activeTab = 'careere'"
                    :class="[
                      'w-full text-left py-3 px-4 rounded-md',
                      activeTab === 'careere'
                        ? 'bg-[#E91E63] text-white'
                        : 'text-gray-300 hover:bg-[#3A3A5A]',
                    ]"
                  >
                    Карьера
                  </button>

                  <button
                    v-if="
                      authStore.userProfile?.data?.sportsman_profile
                        ?.is_sportsman_verified
                    "
                    @click="activeTab = 'media'"
                    :class="[
                      'w-full text-left py-3 px-4 rounded-md',
                      activeTab === 'media'
                        ? 'bg-[#E91E63] text-white'
                        : 'text-gray-300 hover:bg-[#3A3A5A]',
                    ]"
                  >
                    Медиа
                  </button>
                </template>
              </nav>
            </div>
          </aside>

          <main class="flex-1 rounded-lg p-4 md:p-6">
            <form
              v-if="activeTab === 'info'"
              class="space-y-8"
              @submit.prevent="handleSubmit"
            >
              <div>
                <div
                  data-slot="card"
                  class="text-card-foreground flex flex-col gap-6 rounded-xl border shadow-sm border-green-500/20 bg-slate-800/30 p-6"
                >
                  <div class="flex items-center gap-3 mb-4">
                    <h2 class="text-2xl font-bold text-white">Личная информация</h2>
                    <div
                      class="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="lucide lucide-circle-check w-4 h-4 text-green-400"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="m9 12 2 2 4-4"></path>
                      </svg>
                      <span class="text-xs font-medium text-green-300"
                        >Автосохранение</span
                      >
                    </div>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        for="name"
                        class="block text-sm font-medium text-slate-300 mb-2"
                        >Имя</label
                      ><input
                        v-model="formData.firstName"
                        type="text"
                        id="name"
                        data-slot="input"
                        placeholder="Имя"
                        class="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-slate-700/50 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <label
                        for="surname"
                        class="block text-sm font-medium text-slate-300 mb-2"
                        >Фамилия</label
                      ><input
                        type="text"
                        id="surname"
                        v-model="formData.lastName"
                        data-slot="input"
                        placeholder="Фамилия"
                        class="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-slate-700/50 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <label
                        for="patronymic"
                        class="block text-sm font-medium text-slate-300 mb-2"
                        >Отчество</label
                      ><input
                        type="text"
                        id="patronymic"
                        v-model="formData.middleName"
                        placeholder="Отчество"
                        data-slot="input"
                        class="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-slate-700/50 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <label
                        for="dob"
                        class="block text-sm font-medium text-slate-300 mb-2"
                        >Дата рождения</label
                      >

                      <el-input
                        type="date"
                        id="dob"
                        v-model="formData.birthDate"
                        class="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive !bg-slate-700/50 border-slate-600 text-white"
                      />
                    </div>
                    <div class="flex !flex-row items-center">
                      <label class="text-sm text-gray-400 mr-4">Пол</label>
                      <div class="flex items-center mr-6">
                        <input
                          type="radio"
                          id="male"
                          value="male"
                          v-model="formData.gender"
                          class="form-radio h-5 w-5 text-[#E91E63] bg-[#3A3A5A] border-[#4A4A6A] focus:ring-[#E91E63]"
                        />
                        <label for="male" class="ml-2 text-white">Мужчина</label>
                      </div>
                      <div class="flex items-center">
                        <input
                          type="radio"
                          id="female"
                          value="female"
                          v-model="formData.gender"
                          class="form-radio h-5 w-5 text-[#E91E63] bg-[#3A3A5A] border-[#4A4A6A] focus:ring-[#E91E63]"
                        />
                        <label for="female" class="ml-2 text-white">Женщина</label>
                      </div>
                    </div>
                  </div>

                  <div class="mt-10">
                    <div class="flex items-center gap-3 mb-4">
                      <h2 class="text-2xl font-bold text-white">Фактический адрес</h2>
                      <div
                        class="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="lucide lucide-circle-check w-4 h-4 text-green-400"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="m9 12 2 2 4-4"></path>
                        </svg>
                        <span class="text-xs font-medium text-green-300"
                          >Автосохранение</span
                        >
                      </div>
                    </div>

                    <div class="grid grid-cols-1 md:!grid-cols-2 gap-6">
                      <div class="flex flex-col">
                        <label for="region" class="text-sm text-gray-400 mb-2"
                          >Область / Город</label
                        >
                        <select
                          id="region"
                          v-model="formData.region"
                          @change="onRegionChange"
                          class="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-slate-700/50 border-slate-600 text-white"
                        >
                          <option value="">Выберите город {{ formData.region }}</option>
                          <option
                            v-for="region in regions"
                            :key="region.id"
                            :value="region"
                          >
                            {{ region.name }}
                          </option>
                        </select>
                      </div>

                      <div class="flex flex-col">
                        <label for="district" class="text-sm text-gray-400 mb-2"
                          >Улица
                        </label>
                        <select
                          id="district"
                          v-model="formData.district"
                          class="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-slate-700/50 border-slate-600 text-white"
                        >
                          <option value="">Выберите Улица</option>
                          <option
                            v-for="district in filteredDistricts"
                            :key="district.id"
                            :value="district"
                          >
                            {{ district.name }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="flex md:justify-end justify-center">
                    <button
                      type="submit"
                      data-slot="button"
                      class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-9 px-4 py-2 has-[&gt;svg]:px-3 bg-red-600 hover:bg-red-700 text-white"
                    >
                      Сохранять
                    </button>
                  </div>
                </div>
              </div>
            </form>

            <form
              v-if="activeTab === 'info'"
              class="space-y-8"
              @submit.prevent="handleSubmitt"
            >
              <div class="mt-12">
                <div class="flex items-center gap-3 mb-4">
                  <h2 class="text-2xl font-bold text-white">Спортивные данные</h2>
                  <div
                    class="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-clock w-4 h-4 text-amber-400"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline></svg
                    ><span class="text-xs font-medium text-amber-300"
                      >Требует одобрения тренера</span
                    >
                  </div>
                </div>
                <div
                  data-slot="card"
                  class="text-card-foreground flex flex-col gap-6 rounded-xl border shadow-sm mb-4 border-amber-500/40 bg-amber-950/30 p-4 ring-1 ring-amber-500/20"
                >
                  <div class="flex gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-circle-alert w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" x2="12" y1="8" y2="12"></line>
                      <line x1="12" x2="12.01" y1="16" y2="16"></line>
                    </svg>
                    <div>
                      <p class="text-amber-200 font-semibold">
                        Внимание: Требуется одобрение тренера
                      </p>
                      <p class="text-amber-300/90 text-sm mt-1">
                        Все изменения в этом разделе будут отправлены вашему тренеру на
                        одобрение. Они вступят в силу только после одобрения.
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  data-slot="card"
                  class="text-card-foreground flex flex-col gap-6 rounded-xl border shadow-sm border-green-500/20 bg-slate-800/30 p-6"
                >
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="flex flex-col">
                      <label for="athleteType" class="text-sm text-gray-400 mb-1"
                        >Вид спортсмена</label
                      >
                      <select
                        id="athleteType"
                        v-model="formData.sport"
                        class="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-slate-700/50 border-slate-600 text-white"
                      >
                        <option value="">Выберите Вид спортсмена</option>
                        <option v-for="item in data" :value="item.id">
                          {{ item.name }}
                        </option>
                      </select>
                    </div>

                    <div class="flex flex-col">
                      <label for="height" class="text-sm text-gray-400 mb-1"
                        >Рост (см)</label
                      >
                      <input
                        type="number"
                        id="height"
                        v-model="formData.height"
                        step="0.1"
                        placeholder="Рост (см)"
                        class="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-slate-700/50 border-slate-600 text-white"
                      />
                    </div>
                    <div class="flex flex-col">
                      <label for="weight" class="text-sm text-gray-400 mb-1"
                        >Вес (кг)</label
                      >
                      <input
                        type="number"
                        id="weight"
                        step="0.1"
                        v-model="formData.weight"
                        placeholder="Вес (кг)"
                        class="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-slate-700/50 border-slate-600 text-white"
                      />
                    </div>
                    <div class="flex items-end gap-2 w-full">
                      <div class="flex flex-col w-[100%]">
                        <label for="trainer" class="text-sm text-gray-400 mb-1"
                          >Tренер</label
                        >
                        <select
                          id="trainer"
                          v-model="formData.trainer"
                          class="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-slate-700/50 border-slate-600 text-white"
                        >
                          <option value="">Выберите тренер</option>
                          <option
                            v-for="item in dataTrainer"
                            :key="item.id"
                            :value="item.id"
                          >
                            {{ item.full_name }}
                          </option>
                        </select>
                      </div>

                      <el-dialog
                        v-model="dialogVisible"
                        title="Отправленные запросы"
                        class="md:!w-[500px] !w-[350px] text-card-foreground flex flex-col gap-6 rounded-xl border shadow-sm max-w-2xl !border-red-500/30 !bg-slate-900 p-6 max-h-[80vh] overflow-y-auto"
                      >
                        <div v-if="isLoading" class="text-center py-4">
                          <Loading class="w-4 h-4" />
                        </div>
                        <div v-else>
                          <el-empty
                            v-if="requests.length === 0"
                            description="Запросов не найдено."
                          />
                          <div
                            v-else
                            class="max-h-[400px] overflow-y-auto no-scrollbar pr-2"
                          >
                            <ul class="space-y-4">
                              <li
                                v-for="item in requests"
                                :key="item.id"
                                class="text-card-foreground flex-col rounded-xl border shadow-sm border-slate-700/50 bg-slate-800/50 p-4 flex items-start justify-between gap-4"
                              >
                                <div>
                                  <p class="text-sm text-white mb-1">
                                    <strong>Имя Отправителя:</strong>
                                    {{ item.receiver.full_name }}
                                  </p>
                                  <p
                                    class="text-sm text-white mb-1 flex items-center gap-2"
                                  >
                                    <strong>Статус:</strong>
                                    <el-tag
                                      :type="
                                        item.status === 'pending' ? 'warning' : 'info'
                                      "
                                      size="small"
                                      effect="light"
                                    >
                                      {{ item.status }}
                                    </el-tag>
                                  </p>
                                  <p class="text-sm text-white">
                                    <strong>Созданный:</strong>
                                    {{ formatDate(item.created_time) }}
                                  </p>
                                </div>
                                <div v-if="item.status === 'pending'">
                                  <el-button
                                    type="danger"
                                    size="small"
                                    @click="cancelRequest(item.id)"
                                  >
                                    Отмена
                                  </el-button>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </el-dialog>
                    </div>

                    <div class="flex flex-col w-full">
                      <label for="trainer" class="text-sm text-gray-400 mb-1"
                        >Pазряд</label
                      >
                      <select
                        id="sport_rank"
                        v-model="formData.sport_rank"
                        class="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-slate-700/50 border-slate-600 text-white"
                      >
                        <option value="">Razzryad-ni tanlang</option>
                        <option
                          v-for="rank in sportRanks"
                          :key="rank.value"
                          :value="rank.key"
                        >
                          {{ rank.label }}
                        </option>
                      </select>
                    </div>

                    <div class="flex flex-col">
                      <label for="federation" class="text-sm text-gray-400 mb-1"
                        >Федерация</label
                      >
                      <input
                        type="text"
                        id="federation"
                        disabled
                        v-model="federation"
                        placeholder="Федерация"
                        class="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-slate-700/50 border-slate-600 text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex md:justify-end justify-center">
                <button
                  type="submit"
                  data-slot="button"
                  :disabled="authStore.userProfile?.data?.sportsman_profile?.request_status === 'pending'"
                  class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-9 px-4 py-2 has-[&gt;svg]:px-3 bg-red-600 hover:bg-red-700 text-white"
                >
                  Отправить на одобрение
                </button>

                <div
                  @click="openDialog"
                  class="inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border shadow-xs hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[&gt;svg]:px-3 border-red-500/30 text-red-300 hover:bg-red-950/20 bg-transparent ml-auto"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-history w-4 h-4 mr-2"
                  >
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                    <path d="M3 3v5h5"></path>
                    <path d="M12 7v5l4 2"></path></svg
                  >История запросов
                </div>
              </div>
            </form>

            <div v-if="activeTab === 'career'" class="mt-4">
              <achievementManager
                v-if="authStore.userProfile?.data?.sportsman_profile?.is_result_paid"
              />
              <div
                v-else
                class="bg-gradient-to-br from-[#2A2A40] to-[#1C1C2E] p-8 rounded-2xl text-center text-white shadow-xl space-y-6 relative overflow-hidden"
              >
                <!-- Glow Background -->
                <div
                  class="absolute inset-0 bg-gradient-to-tr from-green-500/10 via-blue-500/10 to-transparent blur-3xl"
                ></div>

                <!-- Title -->
                <p class="text-2xl font-semibold relative z-10">
                  🔒 Заплатите, чтобы разблокировать отправку результатов
                </p>

                <!-- Payment Options -->
                <div class="flex justify-center gap-6 flex-wrap relative z-10">
                  <!-- Payme -->
                  <button
                    @click="createCheckout('payme')"
                    class="group bg-white hover:bg-white/50 backdrop-blur-md border border-white/10 rounded-xl px-6 py-4 flex items-center gap-3 shadow-md transition-all duration-300 hover:scale-105 disabled:opacity-50"
                    :disabled="isLoading"
                  >
                    <img
                      src="/payme.png"
                      alt="payme"
                      class="h-6 w-auto group-hover:scale-110 transition-transform"
                    />
                  </button>

                  <!-- Click -->
                  <button
                    @click="createCheckout('click')"
                    class="group bg-white hover:bg-white/50 backdrop-blur-md border border-white/10 rounded-xl px-6 py-4 flex items-center gap-3 shadow-md transition-all duration-300 hover:scale-105 disabled:opacity-50"
                    :disabled="isLoading"
                  >
                    <img
                      src="/click.png"
                      alt="click"
                      class="h-6 w-auto group-hover:scale-110 transition-transform"
                    />
                  </button>
                </div>

                <!-- Note -->
                <p class="text-sm text-gray-400 relative z-10">
                  Безопасная оплата через надежных поставщиков
                </p>
              </div>
            </div>

            <div v-if="activeTab === 'media'">
              <SportsmanMedia />
            </div>
          </main>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useAuthStore } from "~/stores/auth";
import { ElMessage } from "element-plus";
import omit from "lodash/omit.js";
import { Loading } from "@element-plus/icons-vue";
import achievementManager from "~/components/sportsmanProfile/achievementManager.vue";
import SportsmanMedia from "~/components/SportsmanMedia.vue";
import { useRoute, useRouter } from "vue-router";

const authStore = useAuthStore();
const { $api } = useNuxtApp();

const data = ref([]);
const dataTrainer = ref([]);
const dialogVisible = ref(false);
const requests = ref([]);
const isLoading = ref(false);
const regions = ref([]);
const filteredDistricts = ref([]);
const uploadedImageUrl = ref(authStore.userProfile?.data?.profile_photo);
const fileInput = ref(null);
const uploadedImageId = ref(null);
let isDialogOpen = false;

const createCheckout = async (method) => {
  try {
    isLoading.value = true;

    const response = await $api.post("/payment/create-checkout/", {
      payment_method: method,
      section_type: "result",
    });

    if (response.data?.success) {
      window.location.href = response.data.data.payment_link;
    }
  } catch (err) {
    if (err.response?.data) {
      const data = err.response.data;

      if (typeof data === "object" && !Array.isArray(data)) {
        if (data.message && typeof data.message === "string") {
          ElMessage.error(data.message);
        } else {
          Object.keys(data).forEach((field) => {
            if (Array.isArray(data[field])) {
              data[field].forEach((msg) => {
                ElMessage.error(msg);
              });
            }
          });
        }
      } else if (typeof data === "string") {
        ElMessage.error(data);
      }
    } else {
      ElMessage.error("Ошибка при создании!");
    }
  } finally {
    isLoading.value = false;
  }
};

const sportRanks = ref([
  { value: "YOUTH_3", label: "Yoshlar uchinchi darajali", key: "Youth Third Rank" },
  { value: "YOUTH_2", label: "Yoshlar ikkinchi darajali", key: "Youth Second Rank" },
  { value: "YOUTH_1", label: "Yoshlar birinchi darajali", key: "Youth First Rank" },
  { value: "ADULT_3", label: "Kattalar uchun uchinchi daraja", key: "Adult Third Rank" },
  { value: "ADULT_2", label: "Kattalar uchun ikkinchi daraja", key: "Adult Second Rank" },
  { value: "ADULT_1", label: "Kattalar uchun birinchi daraja", key: "Adult First Rank" },
  {
    value: "CANDIDATE",
    label: "Sport ustasi",
    key: "Candidate for Master of Sport",
  },
  {
    value: "MASTER_OF_SPORT",
    label: "Sport ustasi",
    key: "Master of Sport",
  },
]);
const federation = computed(
  () => authStore.userProfile?.data?.sportsman_profile?.federation?.name ?? ""
);

const route = useRoute();
const router = useRouter();
const activeTab = ref(route.query.tab || "info");

const returnUrl = router.resolve({
  path: route.fullPath,
  query: { ...route.query, tab: "career" },
}).href;

const baseUrl = typeof window !== "undefined" ? window.location.origin : "";

watch(activeTab, (val) => {
  router.replace({ query: { ...route.query, tab: val } });
});

const formData = ref({
  firstName: authStore.userProfile?.data?.first_name,
  lastName: authStore.userProfile?.data?.last_name,
  middleName: authStore.userProfile?.data?.middle_name,
  birthDate: authStore.userProfile?.data?.birth_date,
  sport: authStore.userProfile?.data?.sportsman_profile?.sport?.id || "",
  trainer: authStore.userProfile?.data?.sportsman_profile?.trainer?.id || "",
  height: authStore.userProfile?.data?.sportsman_profile?.height,
  weight: authStore.userProfile?.data?.sportsman_profile?.weight,
  gender: authStore.userProfile?.data?.gender || "",
  district: authStore.userProfile?.data?.district || "",
  region: authStore.userProfile?.data?.region || "",
  sport_rank: authStore.userProfile?.data?.sportsman_profile?.sport_rank || "",
});

const getData = async () => {
  try {
    const sportRes = await $api.get("/sport/");
    data.value = sportRes.data.data;
  } catch (e) {
    console.error("Sport error:", e);
  }
};

const selectedSportName = computed(() => {
  const selected = data.value.find((item) => item.id === formData.value.sport);
  return selected ? selected.id : "";
});

const getTrainer = async () => {
  try {
    if (!formData.value.sport) {
      dataTrainer.value = [];
      return;
    }

    const res = await $api.get("/user/profile/trainer/?page=1&page_size=1000", {
      params: { sport: selectedSportName.value, verified: true },
    });

    dataTrainer.value = res.data.data.data.map((trainer) => ({
      ...trainer,
      full_name: `${trainer.first_name} ${trainer.last_name}`,
    }));
  } catch (e) {
    console.error("Trainer error:", e);
  }
};

await getData();
await getTrainer();

const getRegions = async () => {
  try {
    const res = await $api.get("/user/regions/");
    regions.value = res.data.data.map(({ id, name }) => ({ id, name }));
  } catch (err) {
    console.error("Regions yuklashda xatolik:", err);
  }
};

const getDistricts = async (regionId) => {
  if (!regionId) {
    filteredDistricts.value = [];
    return;
  }
  try {
    const res = await $api.get(`/user/districts/?region=${regionId}`);
    filteredDistricts.value = res.data.data.map((item) => omit(item, "region"));
  } catch (err) {
    console.error("Districts yuklashda xatolik:", err);
  }
};

const onRegionChange = () => {
  const selectedRegionId = formData.value.region.id;
  getDistricts(selectedRegionId);

  if (
    !filteredDistricts.value.find(
      (district) => district.id === formData.value.district.id
    )
  ) {
    formData.value.district.id;
  }
};

const handleSubmit = async () => {
  try {
    const payload = {
      first_name: formData.value.firstName,
      last_name: formData.value.lastName,
      middle_name: formData.value.middleName,
      birth_date: formData.value.birthDate,
      gender: formData.value.gender,
      region: formData.value.region?.id || null,
      district: formData.value.district?.id || null,
    };

    if (uploadedImageId.value) {
      payload.media_ids = [uploadedImageId.value];
    } else {
      payload.media_ids = [authStore.userProfile?.data?.media[0]?.id];
    }

    await $api.patch("/user/profile/", payload);

    await authStore.fetchUserProfile();

    ElMessage({
      message: "Профиль успешно обновлен",
      type: "success",
      duration: 3000,
    });
  } catch (error) {
    console.error("Ошибка при обновлении профиля:", error);

    let message = "Произошла ошибка при обновлении профиля.";

    if (error.response?.data) {
      const errors = error.response.data;

      if (typeof errors.message === "string") {
        message = errors.message;
      } else {
        const allErrors = [];

        for (const key in errors) {
          const value = errors[key];
          if (Array.isArray(value)) {
            allErrors.push(...value);
          } else if (typeof value === "object" && value !== null) {
            for (const nestedKey in value) {
              const nestedVal = value[nestedKey];
              if (Array.isArray(nestedVal)) {
                allErrors.push(...nestedVal);
              }
            }
          }
        }

        if (allErrors.length) {
          message = allErrors.join("\n");
        }
      }
    }

    ElMessage({
      message,
      type: "error",
      duration: 4000,
    });
  }
};

const handleSubmitt = async () => {
  try {
    const payload = {
      sportsman_profile: {
        sport_id: formData.value.sport,
        trainer_id: formData.value.trainer,
        sport_rank: formData.value.sport_rank,
        height: String(formData.value.height),
        weight: String(formData.value.weight),
        send_request: true,
      },
    };
    await $api.patch("/user/profile/", payload);

    await authStore.fetchUserProfile();

    ElMessage({
      message: "Профиль успешно обновлен",
      type: "success",
      duration: 3000,
    });
  } catch (error) {
    console.error("Ошибка при обновлении профиля:", error);

    let message = "Произошла ошибка при обновлении профиля.";

    if (error.response?.data) {
      const errors = error.response.data;

      if (typeof errors.message === "string") {
        message = errors.message;
      } else {
        const allErrors = [];

        for (const key in errors) {
          const value = errors[key];
          if (Array.isArray(value)) {
            allErrors.push(...value);
          } else if (typeof value === "object" && value !== null) {
            for (const nestedKey in value) {
              const nestedVal = value[nestedKey];
              if (Array.isArray(nestedVal)) {
                allErrors.push(...nestedVal);
              }
            }
          }
        }

        if (allErrors.length) {
          message = allErrors.join("\n");
        }
      }
    }

    ElMessage({
      message,
      type: "error",
      duration: 4000,
    });
  }
};
const clickImg = () => {
  if (isDialogOpen) return;
  isDialogOpen = true;

  ElMessageBox.confirm(
    "Пожалуйста, загружайте только фотографию в формате спортсмена!",
    "Загрузить изображение",
    {
      confirmButtonText: "Понятно",
      cancelButtonText: "Отмена",
      type: "warning",
    }
  )
    .then(() => {
      fileInput.value?.click();
    })
    .catch(() => {
      ElMessage.info("Не удалось загрузить изображение.");
    })
    .finally(() => {
      isDialogOpen = false;
    });
};

const uploadImage = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", "user");
  formData.append("is_profile_photo", "true");

  try {
    const res = await $api.post("/user/media-upload/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    uploadedImageId.value = res.data.data.id;
    uploadedImageUrl.value = res.data.data.file;

    ElMessage({
      message: "Изображение успешно загружено",
      type: "success",
    });
  } catch (err) {
    if (err.response?.data) {
      const data = err.response.data;

      if (typeof data === "object" && !Array.isArray(data)) {
        if (data.message && typeof data.message === "string") {
          ElMessage.error(data.message);
        } else {
          Object.keys(data).forEach((field) => {
            if (Array.isArray(data[field])) {
              data[field].forEach((msg) => {
                ElMessage.error(msg);
              });
            }
          });
        }
      } else if (typeof data === "string") {
        ElMessage.error(data);
      }
    } else {
      ElMessage.error("Ошибка при создании!");
    }
  }
};

const openDialog = async () => {
  dialogVisible.value = true;
  await fetchRequests();
};

const fetchRequests = async () => {
  isLoading.value = true;
  try {
    const res = await $api.get("/user/requests/?type=sent");
    requests.value = res.data.data.data || [];
  } catch (error) {
    ElMessage.error("So‘rovlarni olishda xatolik yuz berdi.");
  } finally {
    isLoading.value = false;
  }
};

const cancelRequest = async (id) => {
  try {
    await $api.patch(`/user/requests/${id}/`, { status: "cancelled" });
    ElMessage.success("So‘rov bekor qilindi.");
    await fetchRequests();
    formData.value.trainer = "";
  } catch (error) {
    ElMessage.error("Bekor qilishda xatolik yuz berdi.");
  }
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleString();
};

watch(
  () => formData.value.region,
  (newRegion) => {
    if (newRegion?.id) {
      getDistricts(newRegion.id);
    }
  }
);
watch(() => formData.value.region, onRegionChange);
watch(
  () => formData.value.sport,
  async (newSport) => {
    if (newSport) {
      await getTrainer();
    } else {
      dataTrainer.value = [];
      formData.value.trainer = "";
    }
  }
);

watch(
  () => authStore.userProfile,
  (newProfile) => {
    if (newProfile?.data) {
      formData.value = {
        firstName: newProfile.data.first_name || "",
        lastName: newProfile.data.last_name || "",
        middleName: newProfile.data.middle_name || "",
        birthDate: newProfile.data.birth_date || "",
        sport: newProfile.data.sportsman_profile?.sport?.id || "",
        trainer: newProfile.data.sportsman_profile?.trainer?.id || "",
        height: newProfile.data.sportsman_profile?.height || "",
        weight: newProfile.data.sportsman_profile?.weight || "",
        gender: newProfile.data.gender || "",
        district: newProfile.data.district || "",
        region: newProfile.data.region || "",
        sport_rank: authStore.userProfile?.data?.sportsman_profile?.sport_rank || "",
      };

      uploadedImageUrl.value = newProfile.data.profile_photo || null;
    }
  },
  { immediate: true }
);

onMounted(() => {
  getRegions();
});
</script>

<style scoped>
input[type="date"]::-webkit-calendar-picker-indicator {
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  cursor: pointer;
}
</style>
<style>
.el-input__wrapper {
  background-color: transparent !important;
  box-shadow: none !important;
}

.el-dialog__title {
  color: white !important;
}
.el-input__inner {
  color: white !important;
}
.no-scrollbar::-webkit-scrollbar-thumb {
  background-color: white !important;
  border: 1px solid white;
  border-radius: 8px;
  background-clip: padding-box;
}

.no-scrollbar::-webkit-scrollbar {
  width: 10px;
  height: 2px;
}

.no-scrollbar {
  -ms-overflow-style: none;
  /* scrollbar-width: thin; */
  /* margin: inherit; */
  scroll-margin-block-start: 0;
}
</style>
