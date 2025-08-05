interface SignupFormData {
  fullName: string
  email: string
  password: string
  confirmPassword: string
  jobTitle: string
  company: string
  bio: string
  timezone: string
  availability: string[]
  yearsExperience: string
  industryFocus: string[]
  linkedinUrl: string
  twitterUrl: string
  websiteUrl: string
}

interface ValidationResult {
  isValid: boolean
  errors: string[]
}

export function validateSignupForm(data: SignupFormData): ValidationResult {
  const errors: string[] = []

  // Full name validation
  if (!data.fullName.trim()) {
    errors.push('Full name is required')
  } else if (data.fullName.trim().length < 2) {
    errors.push('Full name must be at least 2 characters')
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!data.email.trim()) {
    errors.push('Email is required')
  } else if (!emailRegex.test(data.email)) {
    errors.push('Please enter a valid email address')
  }

  // Password validation
  if (!data.password) {
    errors.push('Password is required')
  } else {
    if (data.password.length < 8) {
      errors.push('Password must be at least 8 characters long')
    }
    if (!/(?=.*[a-z])/.test(data.password)) {
      errors.push('Password must contain at least one lowercase letter')
    }
    if (!/(?=.*[A-Z])/.test(data.password)) {
      errors.push('Password must contain at least one uppercase letter')
    }
    if (!/(?=.*\d)/.test(data.password)) {
      errors.push('Password must contain at least one number')
    }
    if (!/(?=.*[!@#$%^&*])/.test(data.password)) {
      errors.push('Password must contain at least one special character (!@#$%^&*)')
    }
  }

  // Confirm password validation
  if (!data.confirmPassword) {
    errors.push('Please confirm your password')
  } else if (data.password !== data.confirmPassword) {
    errors.push('Passwords do not match')
  }

  // Job title validation
  if (!data.jobTitle.trim()) {
    errors.push('Job title is required')
  }

  // Company validation
  if (!data.company.trim()) {
    errors.push('Company is required')
  }

  // Availability validation
  if (data.availability.length === 0) {
    errors.push('Please select at least one availability slot')
  }

  // URL validations (optional fields)
  const urlRegex = /^https?:\/\/.+/
  if (data.linkedinUrl && !urlRegex.test(data.linkedinUrl)) {
    errors.push('LinkedIn URL must be a valid URL starting with http:// or https://')
  }
  if (data.twitterUrl && !urlRegex.test(data.twitterUrl)) {
    errors.push('Twitter URL must be a valid URL starting with http:// or https://')
  }
  if (data.websiteUrl && !urlRegex.test(data.websiteUrl)) {
    errors.push('Website URL must be a valid URL starting with http:// or https://')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

export function validateEmail(email: string): ValidationResult {
  const errors: string[] = []
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!email.trim()) {
    errors.push('Email is required')
  } else if (!emailRegex.test(email)) {
    errors.push('Please enter a valid email address')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

export function validatePassword(password: string): ValidationResult {
  const errors: string[] = []

  if (!password) {
    errors.push('Password is required')
  } else {
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long')
    }
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push('Password must contain at least one lowercase letter')
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push('Password must contain at least one uppercase letter')
    }
    if (!/(?=.*\d)/.test(password)) {
      errors.push('Password must contain at least one number')
    }
    if (!/(?=.*[!@#$%^&*])/.test(password)) {
      errors.push('Password must contain at least one special character (!@#$%^&*)')
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}