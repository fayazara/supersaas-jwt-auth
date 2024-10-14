import * as jose from 'jose'
import type { JwtPayload } from '../../../types'
import { useRuntimeConfig } from '#imports'

export const generateToken = async (user: JwtPayload): Promise<string> => {
  const config = useRuntimeConfig()
  const secret = new TextEncoder().encode(config.jwtAuth.secret)

  return await new jose.SignJWT({
    id: user.id,
    email: user.email,
    role: user.role,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(config.jwtAuth.expirationTime)
    .sign(secret)
}

export const verifyToken = async (token: string): Promise<JwtPayload | null> => {
  try {
    const config = useRuntimeConfig()
    const secret = new TextEncoder().encode(config.jwtAuth.secret)
    const { payload } = await jose.jwtVerify(token, secret)
    return {
      id: payload.id as string,
      email: payload.email as string,
      role: payload.role as string,
    }
    // eslint-disable-next-line @stylistic/brace-style
  } catch (error) {
    console.error(error)
    return null
  }
}
