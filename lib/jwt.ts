import jwt from 'jsonwebtoken'

export interface JWTPayload {
  email: string
  userId: string
  role: string
  iat?: number
  exp?: number
}

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key'

export async function signJWT(payload: Omit<JWTPayload, 'iat' | 'exp'>): Promise<string> {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '1h'
  })
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

export function createPasswordResetToken(email: string, userId: string, role: string = 'member'): Promise<string> {
  return signJWT({ email, userId, role })
}

export function createEmailVerificationToken(email: string, userId: string, role: string = 'member'): Promise<string> {
  return signJWT({ email, userId, role })
}