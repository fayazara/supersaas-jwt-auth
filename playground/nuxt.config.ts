export default defineNuxtConfig({
  modules: ['../src/module'],
  supersaasJwtAuth: {
    secret: '803c32b542ef196d8fe73c0db306998a',
  },
  devtools: { enabled: true },
  compatibilityDate: '2024-10-14',
})
