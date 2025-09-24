<template>
  <NuxtLayout name="custom">
    <section class="relative !bg-[#11101B] text-gray-100 py-16">
      <!-- Gradient background dekor -->
      <!-- <div
        class="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-black/40 blur-3xl"
      ></div> -->

      <div class="relative container mx-auto px-6 lg:px-12">
        <div
          class="mx-auto bg-white/5 backdrop-blur-md rounded-3xl p-8 lg:p-12 shadow-[0_8px_40px_rgba(0,0,0,0.4)] border border-white/10"
        >
          <!-- Header -->
          <header
            class="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10 border-b border-gray-700/40 pb-6"
          >
            <div>
              <h1
                class="text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight"
              >
                О нас —
                <span
                  class="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
                  >7Saber Rating</span
                >
              </h1>
              <p class="mt-3 text-base text-gray-300 max-w-xl">
                Национальная спортивная рейтинговая платформа, объединяющая спортсменов,
                тренеров, клубы и федерации.
              </p>
            </div>
            <div class="flex items-center gap-4">
              <a
                href="tel:+998990054321"
                class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-md hover:shadow-lg text-sm font-medium transition transform hover:scale-105"
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
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <!-- Left content -->
            <div class="lg:col-span-2 space-y-8 leading-relaxed">
              <article class="prose prose-invert max-w-none">
                <p class="text-gray-300">
                  7Saber Rating — это национальная спортивная рейтинговая платформа,
                  созданная для того, чтобы объединить спортсменов, тренеров, клубы и
                  федерации в единую цифровую систему учёта и продвижения спортивных
                  достижений.
                </p>

                <h3 class="text-xl font-semibold text-indigo-400">Наша миссия</h3>
                <ul class="space-y-2 marker:text-indigo-400">
                  <li>Каждый спортсмен может отследить свой рейтинг и прогресс.</li>
                  <li>Тренеры получают инструмент для анализа результатов.</li>
                  <li>
                    Федерации и клубы могут вести статистику и организовывать турниры.
                  </li>
                  <li>Спонсоры и партнёры получают доступ к проверенной информации.</li>
                </ul>

                <h3 class="text-xl font-semibold text-indigo-400 my-1">
                  Что мы предлагаем
                </h3>
                <ol class="list-decimal pl-6 space-y-1 marker:text-purple-400">
                  <li><strong>Единая база данных спортсменов и тренеров</strong></li>
                  <li><strong>Рейтинги в реальном времени</strong></li>
                  <li><strong>Организация и учёт соревнований</strong></li>
                  <li><strong>Медиа-поддержка</strong></li>
                  <li><strong>Инновации</strong></li>
                </ol>

                <h3 class="text-xl font-semibold text-indigo-400 my-1">Наши ценности</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    class="p-4 bg-gradient-to-br from-gray-800/70 to-gray-900/50 rounded-xl shadow hover:shadow-lg transition"
                  >
                    Честность и прозрачность — рейтинг только по результатам.
                  </div>
                  <div
                    class="p-4 bg-gradient-to-br from-gray-800/70 to-gray-900/50 rounded-xl shadow hover:shadow-lg transition"
                  >
                    Развитие спорта — поддержка профессионалов и начинающих.
                  </div>
                  <div
                    class="p-4 bg-gradient-to-br from-gray-800/70 to-gray-900/50 rounded-xl shadow hover:shadow-lg transition"
                  >
                    Инновации — передовые IT-решения.
                  </div>
                  <div
                    class="p-4 bg-gradient-to-br from-gray-800/70 to-gray-900/50 rounded-xl shadow hover:shadow-lg transition"
                  >
                    Открытость — сотрудничество с федерациями и клубами.
                  </div>
                </div>
              </article>

              <section>
                <h4 class="text-lg font-semibold mb-4 text-indigo-300">
                  Кому полезен 7Saber Rating
                </h4>
                <div class="flex flex-wrap gap-3">
                  <span
                    class="px-3 py-2 bg-indigo-600/40 hover:bg-indigo-600/60 rounded-full text-sm transition"
                    >Спортсмены</span
                  >
                  <span
                    class="px-3 py-2 bg-indigo-600/40 hover:bg-indigo-600/60 rounded-full text-sm transition"
                    >Тренеры</span
                  >
                  <span
                    class="px-3 py-2 bg-indigo-600/40 hover:bg-indigo-600/60 rounded-full text-sm transition"
                    >Федерации</span
                  >
                  <span
                    class="px-3 py-2 bg-indigo-600/40 hover:bg-indigo-600/60 rounded-full text-sm transition"
                    >Клубы</span
                  >
                  <span
                    class="px-3 py-2 bg-indigo-600/40 hover:bg-indigo-600/60 rounded-full text-sm transition"
                    >Спонсоры</span
                  >
                </div>
              </section>
            </div>

            <!-- Sidebar -->
            <aside class="space-y-8">
              <!-- Stats -->
              <div
                class="p-6 bg-gray-800/60 rounded-2xl shadow hover:shadow-lg transition"
              >
                <h5 class="text-sm font-medium text-gray-300 mb-3">Наши достижения</h5>
                <ul class="space-y-2 text-sm">
                  <li>
                    • Сотрудничество с
                    <span class="font-semibold text-indigo-300">114 федерациями</span>.
                  </li>
                  <li>• Поддержка национальных и международных турниров.</li>
                  <li>• Интеграция с современными IT-сервисами.</li>
                </ul>
              </div>

              <!-- Contacts -->
              <div class="p-6 bg-gray-800/60 rounded-2xl shadow">
                <h5 class="text-sm font-medium text-gray-300 mb-3">Контакты</h5>
                <div class="text-sm space-y-2 text-gray-300">
                  <div>+998 99 005 43 21 (Telegram / WhatsApp)</div>
                  <div>srhub04@gmail.com</div>
                  <div>г. Ташкент — Пн–Пт: 9:00–18:00</div>
                </div>

                <div class="mt-5 flex gap-3 flex-wrap">
                  <a
                    href="https://instagram.com/7srating"
                    target="_blank"
                    class="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600/40 hover:bg-indigo-600/70 transition text-sm"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://t.me/username"
                    target="_blank"
                    class="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600/40 hover:bg-indigo-600/70 transition text-sm"
                  >
                    Telegram
                  </a>
                  <a
                    href="https://facebook.com/7srating"
                    target="_blank"
                    class="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600/40 hover:bg-indigo-600/70 transition text-sm"
                  >
                    Facebook
                  </a>
                </div>
              </div>

              <!-- CTA -->
              <div
                class="p-6 bg-gradient-to-r from-indigo-700 to-purple-600 rounded-2xl text-center shadow-lg"
              >
                <div class="font-semibold text-white text-lg">Готовы начать?</div>
                <div class="mt-4">
                  <a
                    href="tel:+998990054321"
                    class="inline-block px-5 py-2.5 rounded-lg bg-white text-indigo-700 font-medium hover:bg-gray-100 transition transform hover:scale-105"
                  >
                    Связаться с нами
                  </a>
                </div>
              </div>
            </aside>
          </div>

          <footer class="mt-12 text-center text-xs text-gray-500">
            © 7Saber Rating — Все права защищены.
          </footer>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>

<script setup></script>

<style scoped>
.prose p {
  margin-bottom: 0.8rem;
}
</style>
