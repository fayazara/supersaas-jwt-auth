export interface JwtAuthOptions {
  secret: string
  expirationTime?: string
  excludeRoutes?: string[]
  includeRoutes?: string[]
}

export interface JwtPayload {
  id: string
  email: string
  role: string
}
