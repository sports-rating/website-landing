import { createI18n } from 'vue-i18n'

export default defineNuxtPlugin(async (nuxtApp) => {
  const uz = await import('~/locales/uz.json')
  const ru = await import('~/locales/ru.json')
  const en = await import('~/locales/en.json')

  const i18n = createI18n({
    legacy: false,
    locale: 'ru',
    fallbackLocale: 'ru',
    messages: {
      uz: uz.default,
      ru: ru.default,
      en: en.default,
    },
  })

  nuxtApp.vueApp.use(i18n)
})