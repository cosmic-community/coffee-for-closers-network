export interface SignUpValidation {
  fullName: string
  email: string
  password: string
  confirmPassword: string
  jobTitle: string
  company: string
  bio?: string
  timezone: string
  availability: string[]
  yearsExperience: string
  industryFocus?: string[]
  linkedinUrl?: string
  twitterUrl?: string
  websiteUrl?: string
}

export interface SignInValidation {
  email: string
  password: string
}

export interface ForgotPasswordValidation {
  email: string
}

export interface ResetPasswordValidation {
  token: string
  password: string
  confirmPassword: string
}

export function validateSignUp(data: SignUpValidation): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  // Required fields
  if (!data.fullName?.trim()) {
    errors.push('Full name is required')
  }
  
  if (!data.email?.trim()) {
    errors.push('Email is required')
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Invalid email format')
  }
  
  if (!data.password) {
    errors.push('Password is required')
  } else if (data.password.length < 8) {
    errors.push('Password must be at least 8 characters')
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(data.password)) {
    errors.push('Password must contain uppercase, lowercase, number, and special character')
  }
  
  if (data.password !== data.confirmPassword) {
    errors.push('Passwords do not match')
  }
  
  if (!data.jobTitle?.trim()) {
    errors.push('Job title is required')
  }
  
  if (!data.company?.trim()) {
    errors.push('Company is required')
  }
  
  if (!data.timezone) {
    errors.push('Timezone is required')
  }
  
  if (!data.availability || data.availability.length === 0) {
    errors.push('At least one availability slot is required')
  }
  
  if (!data.yearsExperience) {
    errors.push('Years of experience is required')
  }

  // Optional URL validations
  if (data.linkedinUrl && !isValidUrl(data.linkedinUrl)) {
    errors.push('Invalid LinkedIn URL format')
  }
  
  if (data.twitterUrl && !isValidUrl(data.twitterUrl)) {
    errors.push('Invalid Twitter URL format')
  }
  
  if (data.websiteUrl && !isValidUrl(data.websiteUrl)) {
    errors.push('Invalid website URL format')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

export function validateSignIn(data: SignInValidation): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!data.email?.trim()) {
    errors.push('Email is required')
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Invalid email format')
  }
  
  if (!data.password) {
    errors.push('Password is required')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

export function validateForgotPassword(data: ForgotPasswordValidation): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!data.email?.trim()) {
    errors.push('Email is required')
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Invalid email format')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

export function validateResetPassword(data: ResetPasswordValidation): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!data.token?.trim()) {
    errors.push('Reset token is required')
  }
  
  if (!data.password) {
    errors.push('Password is required')
  } else if (data.password.length < 8) {
    errors.push('Password must be at least 8 characters')
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(data.password)) {
    errors.push('Password must contain uppercase, lowercase, number, and special character')
  }
  
  if (data.password !== data.confirmPassword) {
    errors.push('Passwords do not match')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// Common validation patterns
export const VALIDATION_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
  url: /^https?:\/\/.+/,
  linkedin: /^https?:\/\/(www\.)?linkedin\.com\/in\/.+/,
  twitter: /^https?:\/\/(www\.)?(twitter\.com|x\.com)\/.+/
}

// Sanitization helpers
export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '')
}

export function sanitizeEmail(email: string): string {
  return email.toLowerCase().trim()
}

export function sanitizeUrl(url: string): string {
  if (!url) return ''
  const trimmed = url.trim()
  if (trimmed && !trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
    return `https://${trimmed}`
  }
  return trimmed
}