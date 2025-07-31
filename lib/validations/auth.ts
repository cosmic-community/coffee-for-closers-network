export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

export function validateEmail(email: string): ValidationResult {
  const errors: string[] = []
  
  if (!email) {
    errors.push('Email is required')
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
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
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

export function validateConfirmPassword(password: string, confirmPassword: string): ValidationResult {
  const errors: string[] = []
  
  if (!confirmPassword) {
    errors.push('Please confirm your password')
  } else if (password !== confirmPassword) {
    errors.push('Passwords do not match')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

export function validateName(name: string): ValidationResult {
  const errors: string[] = []
  
  if (!name) {
    errors.push('Name is required')
  } else if (name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long')
  } else if (!/^[a-zA-Z\s'-]+$/.test(name)) {
    errors.push('Name can only contain letters, spaces, hyphens, and apostrophes')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

export function validateJobTitle(jobTitle: string): ValidationResult {
  const errors: string[] = []
  
  if (!jobTitle) {
    errors.push('Job title is required')
  } else if (jobTitle.trim().length < 2) {
    errors.push('Job title must be at least 2 characters long')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

export function validateCompany(company: string): ValidationResult {
  const errors: string[] = []
  
  if (!company) {
    errors.push('Company is required')
  } else if (company.trim().length < 2) {
    errors.push('Company name must be at least 2 characters long')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

export function validateBio(bio: string): ValidationResult {
  const errors: string[] = []
  
  if (bio && bio.length > 500) {
    errors.push('Bio must be 500 characters or less')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

export function validateUrl(url: string, fieldName: string): ValidationResult {
  const errors: string[] = []
  
  if (url && !/^https?:\/\/.+/.test(url)) {
    errors.push(`${fieldName} must be a valid URL starting with http:// or https://`)
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

export function validateLinkedInUrl(url: string): ValidationResult {
  const errors: string[] = []
  
  if (url && !/^https?:\/\/(www\.)?linkedin\.com\/in\/.+/.test(url)) {
    errors.push('Please enter a valid LinkedIn profile URL')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

export function validateTwitterUrl(url: string): ValidationResult {
  const errors: string[] = []
  
  if (url && !/^https?:\/\/(www\.)?(twitter\.com|x\.com)\/.+/.test(url)) {
    errors.push('Please enter a valid Twitter/X profile URL')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

export function validateAvailability(availability: string[]): ValidationResult {
  const errors: string[] = []
  
  if (!availability || availability.length === 0) {
    errors.push('Please select at least one availability slot')
  } else if (availability.length > 10) {
    errors.push('Please select no more than 10 availability slots')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

export function validateIndustryFocus(industries: string[]): ValidationResult {
  const errors: string[] = []
  
  if (industries && industries.length > 5) {
    errors.push('Please select no more than 5 industry focus areas')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Comprehensive signup form validation
export function validateSignupForm(data: {
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
}): ValidationResult {
  const allErrors: string[] = []
  
  // Validate each field
  const validations = [
    validateName(data.fullName),
    validateEmail(data.email),
    validatePassword(data.password),
    validateConfirmPassword(data.password, data.confirmPassword),
    validateJobTitle(data.jobTitle),
    validateCompany(data.company),
    validateBio(data.bio),
    validateAvailability(data.availability),
    validateIndustryFocus(data.industryFocus),
    validateLinkedInUrl(data.linkedinUrl),
    validateTwitterUrl(data.twitterUrl),
    validateUrl(data.websiteUrl, 'Website URL'),
  ]
  
  // Collect all errors
  validations.forEach(validation => {
    allErrors.push(...validation.errors)
  })
  
  // Validate required select fields
  if (!data.timezone) {
    allErrors.push('Please select a timezone')
  }
  
  if (!data.yearsExperience) {
    allErrors.push('Please select your years of experience')
  }
  
  return {
    isValid: allErrors.length === 0,
    errors: allErrors
  }
}

// Signin form validation
export function validateSigninForm(data: {
  email: string
  password: string
}): ValidationResult {
  const allErrors: string[] = []
  
  const emailValidation = validateEmail(data.email)
  allErrors.push(...emailValidation.errors)
  
  if (!data.password) {
    allErrors.push('Password is required')
  }
  
  return {
    isValid: allErrors.length === 0,
    errors: allErrors
  }
}

// Password reset validation
export function validatePasswordReset(data: {
  password: string
  confirmPassword: string
}): ValidationResult {
  const allErrors: string[] = []
  
  const passwordValidation = validatePassword(data.password)
  allErrors.push(...passwordValidation.errors)
  
  const confirmValidation = validateConfirmPassword(data.password, data.confirmPassword)
  allErrors.push(...confirmValidation.errors)
  
  return {
    isValid: allErrors.length === 0,
    errors: allErrors
  }
}