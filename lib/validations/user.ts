import { ValidationResult, SignupFormData } from '@/types/user'

export function validateEmail(email: string): ValidationResult {
  const errors: string[] = []
  
  if (!email) {
    errors.push('Email is required')
  } else {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(email)) {
      errors.push('Please enter a valid email address')
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

export function validateName(name: string): ValidationResult {
  const errors: string[] = []
  
  if (!name) {
    errors.push('Full name is required')
  } else if (name.trim().length < 2) {
    errors.push('Full name must be at least 2 characters')
  } else if (name.trim().length > 100) {
    errors.push('Full name must be less than 100 characters')
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
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter')
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter')
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

export function validateJobTitle(jobTitle: string): ValidationResult {
  const errors: string[] = []
  
  if (!jobTitle) {
    errors.push('Job title is required')
  } else if (jobTitle.trim().length < 2) {
    errors.push('Job title must be at least 2 characters')
  } else if (jobTitle.trim().length > 100) {
    errors.push('Job title must be less than 100 characters')
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
    errors.push('Company name must be at least 2 characters')
  } else if (company.trim().length > 100) {
    errors.push('Company name must be less than 100 characters')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

export function validateBio(bio: string): ValidationResult {
  const errors: string[] = []
  
  if (bio && bio.length > 500) {
    errors.push('Bio must be less than 500 characters')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

export function validateUrl(url: string, fieldName: string): ValidationResult {
  const errors: string[] = []
  
  if (url) {
    try {
      new URL(url)
    } catch {
      errors.push(`${fieldName} must be a valid URL`)
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

export function validateLinkedInUrl(url: string): ValidationResult {
  const errors: string[] = []
  
  if (url) {
    const urlValidation = validateUrl(url, 'LinkedIn URL')
    if (!urlValidation.isValid) {
      return urlValidation
    }
    
    if (!url.includes('linkedin.com')) {
      errors.push('LinkedIn URL must be a valid LinkedIn profile URL')
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

export function validateTwitterUrl(url: string): ValidationResult {
  const errors: string[] = []
  
  if (url) {
    const urlValidation = validateUrl(url, 'Twitter URL')
    if (!urlValidation.isValid) {
      return urlValidation
    }
    
    if (!url.includes('twitter.com') && !url.includes('x.com')) {
      errors.push('Twitter URL must be a valid Twitter/X profile URL')
    }
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
  }
  
  const validSlots = [
    'Monday Morning', 'Monday Afternoon',
    'Tuesday Morning', 'Tuesday Afternoon',
    'Wednesday Morning', 'Wednesday Afternoon',
    'Thursday Morning', 'Thursday Afternoon',
    'Friday Morning', 'Friday Afternoon'
  ]
  
  const invalidSlots = availability.filter(slot => !validSlots.includes(slot))
  if (invalidSlots.length > 0) {
    errors.push('Invalid availability slots selected')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

export function validateSignupForm(formData: SignupFormData): ValidationResult {
  const errors: string[] = []
  
  // Validate required fields
  const nameValidation = validateName(formData.fullName)
  if (!nameValidation.isValid) {
    errors.push(...nameValidation.errors)
  }
  
  const emailValidation = validateEmail(formData.email)
  if (!emailValidation.isValid) {
    errors.push(...emailValidation.errors)
  }
  
  const passwordValidation = validatePassword(formData.password)
  if (!passwordValidation.isValid) {
    errors.push(...passwordValidation.errors)
  }
  
  // Validate password confirmation
  if (formData.password !== formData.confirmPassword) {
    errors.push('Passwords do not match')
  }
  
  const jobTitleValidation = validateJobTitle(formData.jobTitle)
  if (!jobTitleValidation.isValid) {
    errors.push(...jobTitleValidation.errors)
  }
  
  const companyValidation = validateCompany(formData.company)
  if (!companyValidation.isValid) {
    errors.push(...companyValidation.errors)
  }
  
  const availabilityValidation = validateAvailability(formData.availability)
  if (!availabilityValidation.isValid) {
    errors.push(...availabilityValidation.errors)
  }
  
  // Validate optional fields
  if (formData.bio) {
    const bioValidation = validateBio(formData.bio)
    if (!bioValidation.isValid) {
      errors.push(...bioValidation.errors)
    }
  }
  
  if (formData.linkedinUrl) {
    const linkedinValidation = validateLinkedInUrl(formData.linkedinUrl)
    if (!linkedinValidation.isValid) {
      errors.push(...linkedinValidation.errors)
    }
  }
  
  if (formData.twitterUrl) {
    const twitterValidation = validateTwitterUrl(formData.twitterUrl)
    if (!twitterValidation.isValid) {
      errors.push(...twitterValidation.errors)
    }
  }
  
  if (formData.websiteUrl) {
    const websiteValidation = validateUrl(formData.websiteUrl, 'Website URL')
    if (!websiteValidation.isValid) {
      errors.push(...websiteValidation.errors)
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}