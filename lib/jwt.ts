import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.NEXTAUTH_SECRET
if (!JWT_SECRET) {
  throw new Error('NEXTAUTH_SECRET environment variable is required')
}

export interface JWTPayload {
  email?: string
  userId?: string
  type?: string
  exp?: number
  iat?: number
}

export async function signJWT(payload: object, expiresIn: string = '24h'): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn },
      (err, token) => {
        if (err) {
          reject(err)
        } else {
          resolve(token as string)
        }
      }
    )
  })
}

export async function verifyJWT(token: string): Promise<JWTPayload | null> {
  return new Promise((resolve) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        resolve(null)
      } else {
        resolve(decoded as JWTPayload)
      }
    })
  })
}

export function generateEmailVerificationToken(email: string): Promise<string> {
  return signJWT({ email, type: 'email_verification' }, '24h')
}

export function generatePasswordResetToken(email: string, userId: string): Promise<string> {
  return signJWT({ email, userId, type: 'password_reset' }, '1h')
}

export async function verifyEmailVerificationToken(token: string): Promise<string | null> {
  const payload = await verifyJWT(token)
  if (payload && payload.type === 'email_verification' && payload.email) {
    return payload.email
  }
  return null
}

export async function verifyPasswordResetToken(token: string): Promise<{ email: string; userId: string } | null> {
  const payload = await verifyJWT(token)
  if (payload && payload.type === 'password_reset' && payload.email && payload.userId) {
    return { email: payload.email, userId: payload.userId }
  }
  return null
}