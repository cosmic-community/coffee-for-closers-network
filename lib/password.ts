import bcrypt from 'bcryptjs'
import { ValidationResult } from '@/types'

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12
  return bcrypt.hash(password, saltRounds)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export function validatePassword(password: string): ValidationResult {
  const errors: string[] = []
  
  if (!password) {
    return { isValid: false, errors: ['Password is required'] }
  }
  
  if (password.length < 8) {
    errors.push('At least 8 characters')
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('One uppercase letter')
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('One lowercase letter')
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('One number')
  }
  
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?]/.test(password)) {
    errors.push('One special character')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}