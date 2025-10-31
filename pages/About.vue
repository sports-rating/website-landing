<template>
  <NuxtLayout name="custom">
    <section class="relative !bg-[#11101B] text-gray-100 py-12 md:py-16">
      <div class="relative container mx-auto px-4 sm:px-6 lg:px-12">
        <div
          class="mx-auto bg-white/5 backdrop-blur-md rounded-3xl p-6 sm:p-8 lg:p-12 shadow-[0_8px_40px_rgba(0,0,0,0.4)] border border-white/10"
        >
          <!-- Header -->
          <header
            class="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10 border-b border-gray-700/40 pb-6"
          >
            <div>
              <h1
                class="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight"
              >
                {{ t("aboutTitle") }}
                <span
                  class="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
                  >7Saber Rating</span
                >
              </h1>
              <p class="mt-3 text-sm sm:text-base text-gray-300 max-w-xl">
                {{ t("aboutDescription") }}
              </p>
            </div>
            <div class="flex items-center">
              <a
                href="tel:+998990054321"
                class="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-md hover:shadow-lg text-sm sm:text-base font-medium transition transform hover:scale-105"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M2 7v6a2 2 0 0 0 2 2h3l3 3 3-3h3a2 2 0 0 0 2-2V7"
                  />
                </svg>
                +998 99 005 43 21
              </a>
            </div>
          </header>

          <!-- Content grid -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
            <!-- Left content -->
            <div class="lg:col-span-2 space-y-8 leading-relaxed">
              <article class="prose prose-invert max-w-none">
                <p class="text-gray-300">{{ t("introText") }}</p>

                <h3 class="text-lg sm:text-xl font-semibold text-indigo-400">
                  {{ t("missionTitle") }}
                </h3>
                <ul class="space-y-2 marker:text-indigo-400 text-sm sm:text-base">
                  <li>{{ t("mission1") }}</li>
                  <li>{{ t("mission2") }}</li>
                  <li>{{ t("mission3") }}</li>
                  <li>{{ t("mission4") }}</li>
                </ul>

                <h3 class="text-lg sm:text-xl font-semibold text-indigo-400 my-1">
                  {{ t("offerTitle") }}
                </h3>
                <ol
                  class="list-decimal pl-5 sm:pl-6 space-y-1 marker:text-purple-400 text-sm sm:text-base"
                >
                  <li>{{ t("offer1") }}</li>
                  <li>{{ t("offer2") }}</li>
                  <li>{{ t("offer3") }}</li>
                  <li>{{ t("offer4") }}</li>
                  <li>{{ t("offer5") }}</li>
                </ol>

                <h3 class="text-lg sm:text-xl font-semibold text-indigo-400 my-1">
                  {{ t("valuesTitle") }}
                </h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    class="p-4 bg-gradient-to-br from-gray-800/70 to-gray-900/50 rounded-xl shadow hover:shadow-lg transition text-sm sm:text-base"
                  >
                    {{ t("value1") }}
                  </div>
                  <div
                    class="p-4 bg-gradient-to-br from-gray-800/70 to-gray-900/50 rounded-xl shadow hover:shadow-lg transition text-sm sm:text-base"
                  >
                    {{ t("value2") }}
                  </div>
                  <div
                    class="p-4 bg-gradient-to-br from-gray-800/70 to-gray-900/50 rounded-xl shadow hover:shadow-lg transition text-sm sm:text-base"
                  >
                    {{ t("value3") }}
                  </div>
                  <div
                    class="p-4 bg-gradient-to-br from-gray-800/70 to-gray-900/50 rounded-xl shadow hover:shadow-lg transition text-sm sm:text-base"
                  >
                    {{ t("value4") }}
                  </div>
                </div>
              </article>

              <section>
                <h4 class="text-base sm:text-lg font-semibold mb-4 text-indigo-300">
                  {{ t("usefulTitle") }}
                </h4>
                <div class="flex flex-wrap gap-2 sm:gap-3">
                  <span
                    v-for="(item, index) in [
                      'athletess',
                      'trainerss',
                      'federations',
                      'clubs',
                      'sponsors',
                    ]"
                    :key="index"
                    class="px-3 py-2 bg-indigo-600/40 hover:bg-indigo-600/60 rounded-full text-xs sm:text-sm transition"
                  >
                    {{ t(item) }}
                  </span>
                </div>
              </section>
            </div>

            <!-- Sidebar -->
            <aside class="space-y-6 sm:space-y-8">
              <!-- Stats -->
              <div
                class="p-5 sm:p-6 bg-gray-800/60 rounded-2xl shadow hover:shadow-lg transition"
              >
                <h5 class="text-xs sm:text-sm font-medium text-gray-300 mb-3">
                  {{ t("achievementsTitle") }}
                </h5>
                <ul class="space-y-2 text-xs sm:text-sm">
                  <li>{{ t("achievement1") }}</li>
                  <li>{{ t("achievement2") }}</li>
                  <li>{{ t("achievement3") }}</li>
                </ul>
              </div>

              <!-- Contacts -->
              <div class="p-5 sm:p-6 bg-gray-800/60 rounded-2xl shadow">
                <h5 class="text-xs sm:text-sm font-medium text-gray-300 mb-3">
                  {{ t("contactTitle") }}
                </h5>
                <div class="text-xs sm:text-sm space-y-2 text-gray-300">
                  <div>+998 99 005 43 21 (Telegram / WhatsApp)</div>
                  <div>srhub04@gmail.com</div>
                  <div>{{ t("address") }}</div>
                </div>

                <div class="mt-5 flex gap-2 sm:gap-3 flex-wrap">
                  <a
                    href="https://instagram.com/7srating"
                    target="_blank"
                    class="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-indigo-600/40 hover:bg-indigo-600/70 transition text-xs sm:text-sm"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://t.me/username"
                    target="_blank"
                    class="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-indigo-600/40 hover:bg-indigo-600/70 transition text-xs sm:text-sm"
                  >
                    Telegram
                  </a>
                  <a
                    href="https://facebook.com/7srating"
                    target="_blank"
                    class="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-indigo-600/40 hover:bg-indigo-600/70 transition text-xs sm:text-sm"
                  >
                    Facebook
                  </a>
                </div>
              </div>

              <!-- CTA -->
              <div
                class="p-5 sm:p-6 bg-gradient-to-r from-indigo-700 to-purple-600 rounded-2xl text-center shadow-lg"
              >
                <div class="font-semibold text-white text-base sm:text-lg">
                  {{ t("readyTitle") }}
                </div>
                <div class="mt-4">
                  <a
                    href="tel:+998990054321"
                    class="inline-block px-4 sm:px-5 py-2.5 rounded-lg bg-white text-indigo-700 font-medium hover:bg-gray-100 transition transform hover:scale-105 text-sm sm:text-base"
                  >
                    {{ t("contactUs") }}
                  </a>
                </div>
              </div>
            </aside>
          </div>

          <footer class="mt-10 sm:mt-12 text-center text-[10px] sm:text-xs text-gray-500">
            {{ t("footer") }}
          </footer>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<style scoped>
.prose p {
  margin-bottom: 0.8rem;
}
</style>
