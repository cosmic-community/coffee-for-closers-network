import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET || 'fallback-secret-key'

export interface JWTPayload {
  userId: string
  email: string
  role: string
  iat?: number
  exp?: number
}

export async function signJWT(payload: Omit<JWTPayload, 'iat' | 'exp'>): Promise<string> {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '24h'
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

export async function generateResetToken(email: string): Promise<string> {
  return signJWT({
    userId: '',
    email,
    role: 'reset',
  })
}

export async function generateVerificationToken(userId: string, email: string): Promise<string> {
  return signJWT({
    userId,
    email,
    role: 'verification',
  })
}