import bcrypt from 'bcryptjs'

export interface PasswordValidationResult {
  isValid: boolean
  errors: string[]
}

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12
  return await bcrypt.hash(password, saltRounds)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  try {
    return await bcrypt.compare(password, hash)
  } catch (error) {
    console.error('Password verification error:', error)
    return false
  }
}

export function validatePassword(password: string): PasswordValidationResult {
  const errors: string[] = []
  
  if (!password) {
    errors.push('Password is required')
    return { isValid: false, errors }
  }
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long')
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number')
  }
  
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

export function validatePasswordStrength(password: string): {
  score: number
  feedback: string[]
} {
  let score = 0
  const feedback: string[] = []
  
  if (password.length >= 8) score += 1
  else feedback.push('Use at least 8 characters')
  
  if (/[a-z]/.test(password)) score += 1
  else feedback.push('Add lowercase letters')
  
  if (/[A-Z]/.test(password)) score += 1
  else feedback.push('Add uppercase letters')
  
  if (/\d/.test(password)) score += 1
  else feedback.push('Add numbers')
  
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score += 1
  else feedback.push('Add special characters')
  
  if (password.length >= 12) score += 1
  
  return { score, feedback }
}