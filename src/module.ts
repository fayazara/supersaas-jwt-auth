import { defineNuxtModule, createResolver, addServerHandler } from '@nuxt/kit'
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
    includeRoutes: [],
  },
  setup(_options, _nuxt) {
    if (!_options.secret) {
      throw new Error(
        'JWT secret is required. Please provide it in the module options or through environment variables.',
      )
    }
    const resolver = createResolver(import.meta.url)

    // Add runtime config
    _nuxt.options.runtimeConfig.jwtAuth = defu(_nuxt.options.runtimeConfig.jwtAuth, {
      secret: _options.secret,
      expirationTime: _options.expirationTime,
      excludeRoutes: _options.excludeRoutes,
      includeRoutes: _options.includeRoutes,
    })

    addServerHandler({
      handler: resolver.resolve('./runtime/server/middleware/auth'),
    })
  },
})
