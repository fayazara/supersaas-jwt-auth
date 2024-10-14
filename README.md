# Supersaas JWT Auth

A simple and lightweight JWT authentication module for Nuxt 3, made for Supersaas.dev, the full stack Nuxt 3 saas starter kit.

## Features

- 🔒 Easy JWT authentication for Nuxt 3 API routes
- 🎛️ Flexible configuration with exclude or include routes
- 🔑 Secure token verification

## Installation

```bash
npm install supersaas-jwt-auth
yarn add supersaas-jwt-auth
pnpm add supersaas-jwt-auth
```

## Usage

Add the module to your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ['supersaas-jwt-auth'],
  supersaasJwtAuth: {
    secret: process.env.JWT_SECRET_TOKEN,
    // blacklist the routes you want to exclude
    excludeRoutes: ['/api/auth/login', '/api/auth/register'],
    // or if prefer the reverse approach and whitelist the routes you want to protect
    // includeRoutes: ['/api/protected'],
  },
})
```

That's it! You can now use Supersaas JWT Auth in your Nuxt app ✨

## Local development

<details>
  <summary>Local development</summary>
  
  ```bash
  # Install dependencies
  npm install
  
  # Generate type stubs
  npm run dev:prepare
  
  # Develop with the playground
  npm run dev
  
  # Build the playground
  npm run dev:build
  
  # Run ESLint
  npm run lint
  
  # Run Vitest
  npm run test
  npm run test:watch
  
  # Release new version
  npm run release
  ```

</details>


## License

[MIT](./LICENSE)
