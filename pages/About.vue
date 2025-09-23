<template>
  <section class="bg-gray-900 text-gray-100 py-12">
    <div class="container mx-auto px-6 lg:px-12">
      <div
        class="max-w-5xl mx-auto bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl p-8 lg:p-12 shadow-2xl"
      >
        <header
          class="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6"
        >
          <div>
            <h1 class="text-3xl lg:text-4xl font-extrabold leading-tight">
              О нас — <span class="text-indigo-400">7Saber Rating</span>
            </h1>
            <p class="mt-2 text-sm text-gray-300">
              Национальная спортивная рейтинговая платформа, объединяющая спортсменов,
              тренеров, клубы и федерации.
            </p>
          </div>
          <div class="flex items-center gap-4">
            <a
              href="tel:+998990054321"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-sm font-medium"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
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
            <a href="#contact" class="text-sm text-gray-300 underline">Связаться</a>
          </div>
        </header>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Left column: description -->
          <div class="lg:col-span-2 space-y-6">
            <article class="prose prose-invert max-w-none">
              <p>
                7Saber Rating — это национальная спортивная рейтинговая платформа,
                созданная для того, чтобы объединить спортсменов, тренеров, клубы и
                федерации в единую цифровую систему учёта и продвижения спортивных
                достижений. Мы верим, что спорт — это честность, труд и результат, и
                именно поэтому наша платформа разработана по принципам прозрачности,
                объективности и открытости.
              </p>

              <h3>Наша миссия</h3>
              <ul>
                <li>
                  Каждый спортсмен может отследить свой рейтинг и прогресс в режиме
                  реального времени;
                </li>
                <li>
                  Тренеры получают инструмент для анализа результатов своих подопечных;
                </li>
                <li>
                  Федерации и клубы могут вести статистику, организовывать турниры и
                  управлять данными;
                </li>
                <li>
                  Спонсоры и партнёры получают доступ к проверенной информации о
                  спортсменах.
                </li>
              </ul>

              <h3>Что мы предлагаем</h3>
              <ol class="list-decimal pl-5">
                <li>
                  <strong>Единая база данных спортсменов и тренеров</strong> — профили с
                  биографией, фото и достижениями.
                </li>
                <li>
                  <strong>Рейтинги в реальном времени</strong> — автоматическое обновление
                  по результатам соревнований.
                </li>
                <li>
                  <strong>Организация и учёт соревнований</strong> — инструменты для
                  федераций и клубов.
                </li>
                <li>
                  <strong>Медиа-поддержка</strong> — помощь в продвижении в соцсетях и
                  СМИ.
                </li>
                <li>
                  <strong>Инновации</strong> — интеграции с регистрацией, трансляциями и
                  приложениями.
                </li>
              </ol>

              <h3>Наши ценности</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div class="p-4 bg-gray-800/60 rounded-lg">
                  Честность и прозрачность — рейтинг формируется только на основе
                  подтверждённых результатов.
                </div>
                <div class="p-4 bg-gray-800/60 rounded-lg">
                  Развитие спорта — поддержка профессионалов и начинающих.
                </div>
                <div class="p-4 bg-gray-800/60 rounded-lg">
                  Инновации — передовые IT-решения.
                </div>
                <div class="p-4 bg-gray-800/60 rounded-lg">
                  Открытость — сотрудничество с федерациями и клубами.
                </div>
              </div>
            </article>

            <section class="mt-4">
              <h4 class="text-lg font-semibold mb-3">Кому полезен 7Saber Rating</h4>
              <div class="flex flex-wrap gap-3">
                <span class="px-3 py-2 bg-indigo-700/40 rounded-full text-sm"
                  >Спортсмены</span
                >
                <span class="px-3 py-2 bg-indigo-700/40 rounded-full text-sm"
                  >Тренеры</span
                >
                <span class="px-3 py-2 bg-indigo-700/40 rounded-full text-sm"
                  >Федерации</span
                >
                <span class="px-3 py-2 bg-indigo-700/40 rounded-full text-sm">Клубы</span>
                <span class="px-3 py-2 bg-indigo-700/40 rounded-full text-sm"
                  >Спонсоры</span
                >
              </div>
            </section>
          </div>

          <!-- Right column: stats & contact -->
          <aside class="space-y-6">
            <div class="p-5 bg-gray-800/40 rounded-xl">
              <h5 class="text-sm font-medium text-gray-300 mb-2">Наши достижения</h5>
              <ul class="space-y-2 text-sm">
                <li>
                  • Сотрудничество с
                  <span class="font-semibold">114 федерациями</span> Узбекистана.
                </li>
                <li>• Поддержка национальных и международных турниров.</li>
                <li>• Интеграция с современными IT-сервисами.</li>
              </ul>
            </div>

            <div id="contact" class="p-5 bg-gray-800/40 rounded-xl">
              <h5 class="text-sm font-medium text-gray-300 mb-3">Контакты</h5>
              <div class="text-sm space-y-2">
                <div class="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M22 2L11 13"
                    />
                  </svg>
                  +998 99 005 43 21 (Telegram / WhatsApp)
                </div>
                <div class="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8"
                    />
                  </svg>
                  srhub04@gmail.com
                </div>
                <div class="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M3 21v-2a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v2"
                    />
                  </svg>
                  г. Ташкент — Пн–Пт: 9:00–18:00
                </div>
              </div>

              <div class="mt-4 flex gap-3">
                <a
                  aria-label="Instagram"
                  href="#"
                  class="px-3 py-2 bg-indigo-600/40 rounded-full text-sm"
                  >Instagram</a
                >
                <a
                  aria-label="Telegram"
                  href="#"
                  class="px-3 py-2 bg-indigo-600/40 rounded-full text-sm"
                  >Telegram</a
                >
                <a
                  aria-label="Facebook"
                  href="#"
                  class="px-3 py-2 bg-indigo-600/40 rounded-full text-sm"
                  >Facebook</a
                >
              </div>
            </div>

            <div
              class="p-5 bg-gradient-to-r from-indigo-700 to-indigo-500 rounded-xl text-center text-sm"
            >
              <div class="font-semibold">Готовы начать?</div>
              <div class="mt-3">
                <button class="px-4 py-2 rounded-lg bg-white text-indigo-700 font-medium">
                  Связаться с нами
                </button>
              </div>
            </div>
          </aside>
        </div>

        <footer class="mt-8 text-center text-xs text-gray-400">
          © 7Saber Rating — Все права защищены.
        </footer>
      </div>
    </div>
  </section>
</template>

<script setup></script>

<style scoped>
.prose p {
  margin-bottom: 0.6rem;
}
</style>
