import jwt from 'jsonwebtoken'
import { AuthUser } from '@/types'

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'fallback-secret'
const JWT_EXPIRES_IN = '7d'

export interface JWTPayload {
  userId: string
  email: string
  role: string
  iat?: number
  exp?: number
}

export function signJWT(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  })
}

export function verifyJWT(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload
    return decoded
  } catch (error) {
    console.error('JWT verification failed:', error)
    return null
  }
}

export function generateAuthToken(user: AuthUser): string {
  return signJWT({
    userId: user.id,
    email: user.email,
    role: user.role,
  })
}

export function extractUserFromToken(token: string): AuthUser | null {
  const payload = verifyJWT(token)
  
  if (!payload) {
    return null
  }
  
  return {
    id: payload.userId,
    email: payload.email,
    name: '', // Will be filled from database
    role: payload.role,
    cosmicId: payload.userId,
  }
}

export function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwt.decode(token) as JWTPayload | null
    
    if (!decoded || !decoded.exp) {
      return true
    }
    
    return Date.now() >= decoded.exp * 1000
  } catch (error) {
    return true
  }
}

export function refreshTokenIfNeeded(token: string): string | null {
  const payload = verifyJWT(token)
  
  if (!payload) {
    return null
  }
  
  // Check if token expires within the next hour
  const oneHour = 60 * 60 * 1000
  const expiresAt = (payload.exp || 0) * 1000
  
  if (expiresAt - Date.now() < oneHour) {
    return signJWT({
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
    })
  }
  
  return token
}