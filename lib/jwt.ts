import jwt from 'jsonwebtoken'
import { JWTPayload } from '@/types'

const JWT_SECRET = process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET or NEXTAUTH_SECRET environment variable is required')
}

export async function signJWT(
  payload: Omit<JWTPayload, 'exp' | 'iat'>,
  expiresIn: string = '1h'
): Promise<string> {
  return jwt.sign(payload, JWT_SECRET, { expiresIn })
}

export async function verifyJWT(token: string): Promise<JWTPayload | null> {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload
    return decoded
  } catch (error) {
    console.error('JWT verification failed:', error)
    return null
  }
}