import { defineNuxtModule, createResolver, addServerHandler, addImports } from '@nuxt/kit'
import { defu } from 'defu'

// Module options TypeScript interface definition
export interface ModuleOptions {
  secret: string
  expirationTime: string
  excludeRoutes: string[]
  includeRoutes: string[]
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'supersaas-jwt-auth',
    configKey: 'supersaasJwtAuth',
  },
  // Default configuration options of the Nuxt module
  defaults: {
    secret: '',
    expirationTime: '7d',
    excludeRoutes: [],
    includeRoutes: ['/api/**'],
  },
  setup(_options, _nuxt) {
    if (!_options.secret) {
      console.log('JWT secret is required. Please provide it in the module options or through environment variables.')
    }
    const resolver = createResolver(import.meta.url)

    // Add runtime config
    _nuxt.options.runtimeConfig.jwtAuth = defu(_nuxt.options.runtimeConfig.jwtAuth, {
      secret: _options.secret,
      expirationTime: _options.expirationTime,
      excludeRoutes: _options.excludeRoutes,
      includeRoutes: _options.includeRoutes,
    })

    // Add route rules for JWT authentication
    for (const route of _options.includeRoutes) {
      _nuxt.options.nitro.routeRules = defu(_nuxt.options.nitro.routeRules, {
        [route]: { 'supersaas-jwt-auth': true },
      })
    }

    const utilities = [
      {
        name: 'generateJwtToken',
        from: '../src/runtime/server/utils/jwt-auth',
      },
      {
        name: 'verifyJwtToken',
        from: '../src/runtime/server/utils/jwt-auth',
      },
    ]

    utilities.forEach((utility) => {
      addImports(utility)
    })

    addServerHandler({
      handler: resolver.resolve('./runtime/server/middleware/jwtAuth'),
    })
  },
})
