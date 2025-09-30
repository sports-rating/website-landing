<template>
  <NuxtLayout name="custom">
    <div class="bg-[#11101B]">
      <div class="min-h-screen bg-[#11101B] text-white container">
        <!-- Header -->
        <header class="bg-[#11101B] py-6">
          <div class="container mx-auto px-4">
            <h1 class="text-3xl font-bold">
              Многофункциональный ледовый комплекс
              <span class="text-red-500">Humo Arena</span>
            </h1>
          </div>
        </header>

        <!-- Image -->
        <div class="container mx-auto px-4">
          <img
            src="/boks.svg"
            alt="Humo Arena"
            class="rounded-xl shadow-lg w-full h-[431px] object-cover"
          />
        </div>

        <!-- Info Section -->
        <section class="container mx-auto px-4 mt-10">
          <div class="w-full flex justify-between items-center">
            <h2 class="text-2xl font-bold mb-6">Информация о комплексе</h2>

            <!-- Buy Button -->
            <div class="flex justify-end mb-6">
              <button class="font-medium px-4 py-2 rounded-md text-white bg-red-500">
                Купить абонемент
              </button>
            </div>
          </div>

          <div class="bg-gray-900 rounded-xl overflow-hidden border border-gray-700">
            <div
              class="flex items-center justify-between px-6 py-4 border-b border-gray-700"
            >
              <span class="font-semibold">Название комплекса</span>
              <span class="text-gray-300">"Colosseum" Оздоровительный комплекс</span>
            </div>
            <div
              class="flex items-center justify-between px-6 py-4 border-b border-gray-700"
            >
              <span class="font-semibold">Режим работы</span>
              <span class="bg-red-600 text-white px-3 py-1 rounded-full text-sm"
                >24/7</span
              >
            </div>
            <div
              class="flex items-center justify-between px-6 py-4 border-b border-gray-700"
            >
              <span class="font-semibold">Адрес</span>
              <span class="text-gray-300">Ташкент, Юнусабадский район, 19А</span>
            </div>
            <div class="flex items-center justify-between px-6 py-4">
              <span class="font-semibold">Ориентир</span>
              <span class="text-gray-300">Рынок "Уч кахрамон"</span>
            </div>
          </div>
        </section>

        <div class="flex w-full">
          <!-- About -->
          <section class="container mx-auto px-4 mt-12 w-full">
            <h3 class="text-xl font-bold mb-4">О компании</h3>
            <p class="text-gray-300 leading-relaxed">
              Все началось в начале 2013 года, когда Пулатов Мавлонбек решил встретиться с
              группой пахтакористов с целью посмотреть матчи и, возможно, создать новую
              группу болельщиков в ближайшем будущем. В то же время и в том же городе
              колумбийец Маджин Хемер Сьерра встречался с другой группой мадридистов с той
              же целью. По совпадению, они нашли друг друга в твиттере и решили
              встретиться и объединить свои группы, чтобы создать одну большую группу
              сторонников в городе.В августе того же года у них состоялась первая
              официальная встреча недавно созданного клуба болельщиков, они подписали
              учредительное документы, устав, членов совета директоров и постоянное место
              встречи. Г-н Андрес Лопес, Хулио Морено и Томас А. Бейкер также участвовал в
              этой встрече и считается основателями Пеньи. С момента своего основания,Peña
              Madridista Atlanta была зарегистрирована под названием "Madridistas Atlanta
              Inc" в качестве некоммерческой организации в своем родном штате Джорджия, а
              также в соответствии с федеральными законами Соединенных Штатов для работы в
              качестве таковой. В настоящее время в клубе 78 членов, которые собираются в
              своем официальном домашнем ирландском пабе Olde Blind Dog в Брукхейвене,
              чтобы посмотреть все матчи, и их целью с момента его создания было
              объединить мадридистов в Атланте и ее столичном регионе, чтобы сделать еще
              больше наш легендарный клуб.
            </p>
          </section>

          <!-- Activities -->
          <aside
            class="container mx-auto px-4 py-4 mt-12 w-[40%] bg-[#2E2F3E] rounded-xl border border-gray-700"
          >
            <h3 class="text-xl font-bold">Основные деятельности компании:</h3>
            <ul class="max-w-sm p-4 px-0">
              <li class="py-2 flex gap-1 items-center">
                <div class="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                Оздоровительные учреждения
              </li>
              <li class="py-2 flex gap-1 items-center">
                <div class="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                Клиники, санатории
              </li>
              <li class="py-2 flex gap-1 items-center">
                <div class="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                Фитнес-центры
              </li>
              <li class="py-2 flex gap-1 items-center">
                <div class="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                Залы, сцены
              </li>
              <li class="py-2 flex gap-1 items-center">
                <div class="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                Торговые комплексы
              </li>
              <li class="py-2 flex gap-1 items-center">
                <div class="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                Лаборатории, бассейны, сауны
              </li>
            </ul>
          </aside>
        </div>

        <!-- Map -->
        <section class="container mx-auto px-4 mt-12">
          <h3 class="text-xl font-bold mb-4">На карте</h3>
          <div class="rounded-xl overflow-hidden border border-gray-700">
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A6f8fa...&amp;source=constructor"
              width="100%"
              height="300"
              frameborder="0"
            ></iframe>
          </div>
        </section>

        <!-- Other Complexes -->
        <section class="container mx-auto px-4 mt-16">
          <h2 class="text-2xl font-bold mb-6">ДРУГИЕ Спортивное учреждение</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              v-for="complex in otherComplexes"
              :key="complex.id"
              class="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
            >
              <img
                :src="complex.image"
                :alt="complex.title"
                class="h-32 w-full object-cover"
              />
              <div class="p-4">
                <h3 class="text-sm font-bold mb-2 line-clamp-2">{{ complex.title }}</h3>
                <p class="text-xs text-gray-400 line-clamp-2">
                  {{ complex.description }}
                </p>
              </div>
            </div>
          </div>
        </section>

        <footer
          class="mt-16 py-8 text-center text-gray-500 text-sm border-t border-gray-800"
        >
          © 2025 Все права защищены.
        </footer>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref } from "vue";

const otherComplexes = ref([
  {
    id: 1,
    title: "Многофункциональный ледовый комплекс Тюмень Арена",
    description: "Современный ледовый комплекс...",
    image: "/boks.svg",
  },
  {
    id: 2,
    title: "Многофункциональный ледовый комплекс Нефтехим Арена",
    description: "Крупнейший спортивный комплекс региона...",
    image: "/boks.svg",
  },
  {
    id: 3,
    title: "Многофункциональный ледовый комплекс Татнефть Арена",
    description: "Универсальный спортивный комплекс...",
    image: "/boks.svg",
  },
  {
    id: 4,
    title: "Многофункциональный ледовый комплекс Трактор Арена",
    description: "Современная арена с профессиональным оборудованием...",
    image: "/boks.svg",
  },
]);
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
