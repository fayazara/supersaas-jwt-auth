import type { H3Event } from 'h3'
import { defineEventHandler, createError, getRequestURL } from 'h3'
import { verifyToken } from '../utils/jwt-auth'
import { useRuntimeConfig } from '#imports'

const EXCLUDE_NUXT_SYSTEM_ROUTES = ['/api/_hub/']

export default defineEventHandler(async (event: H3Event) => {
  const config = useRuntimeConfig()
  const path = getRequestURL(event).pathname

  // Check if the route should be excluded or included
  const shouldAuthenticate = config.jwtAuth.includeRoutes?.length
    ? config.jwtAuth.includeRoutes.some(route => path.startsWith(route))
    : !config.jwtAuth.excludeRoutes?.some(route => path.startsWith(route))

  if (!shouldAuthenticate || EXCLUDE_NUXT_SYSTEM_ROUTES.some(route => path.startsWith(route))) {
    return
  }

  const authHeader = event.node.req.headers['authorization']
  const token = authHeader?.split(' ')[1]

  if (!token) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized: No token provided',
    })
  }

  const decoded = await verifyToken(token)
  if (!decoded) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized: Invalid token',
    })
  }

  event.context.user = decoded
})