export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: true,
  modules: [
    '@nuxtjs/i18n',
    '@pinia/nuxt',
  ],
  plugins: [
    '~/plugins/fancybox.client.ts'
  ],
  runtimeConfig: {
    public: {
      apiBase: 'https://api.palermo.uz/api/v1',
    }
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: 'ru',
      },
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      ],
    }
  },

  i18n: {
    defaultLocale: 'ru',
    langDir: './locales/',
    lazy: true,
    locales: [
      {
        code: 'ru',
        file: 'ru.json'
      },
      {
        code: 'en',
        file: 'en.json'
      }
    ],
  },

  css: ['@/assets/scss/main.scss'],
})
