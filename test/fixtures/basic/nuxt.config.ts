import MyModule from '../../../src/module'

export default defineNuxtConfig({
  modules: [MyModule],
  supersaasJwtAuth: {
    secret: '803c32b542ef196d8fe73c0db306998a',
    excludeRoutes: ['/'],
  },
})
