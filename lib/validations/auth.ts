import { ValidationResult, SignupFormData } from '@/types'

export function validateEmail(email: string): ValidationResult {
  const errors: string[] = []

  if (!email) {
    errors.push('Email is required')
    return { isValid: false, errors }
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!emailRegex.test(email)) {
    errors.push('Please enter a valid email address')
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
    return { isValid: false, errors }
  }

  if (name.trim().length < 2) {
    errors.push('Full name must be at least 2 characters long')
  }

  if (name.trim().length > 100) {
    errors.push('Full name must be less than 100 characters')
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
    return { isValid: false, errors }
  }

  if (jobTitle.trim().length < 2) {
    errors.push('Job title must be at least 2 characters long')
  }

  if (jobTitle.trim().length > 100) {
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
    return { isValid: false, errors }
  }

  if (company.trim().length < 2) {
    errors.push('Company name must be at least 2 characters long')
  }

  if (company.trim().length > 100) {
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

  if (!url) {
    return { isValid: true, errors }
  }

  try {
    new URL(url)
  } catch {
    errors.push(`${fieldName} must be a valid URL`)
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

export function validateLinkedInUrl(url: string): ValidationResult {
  const errors: string[] = []

  if (!url) {
    return { isValid: true, errors }
  }

  if (!url.includes('linkedin.com')) {
    errors.push('LinkedIn URL must be a valid LinkedIn profile URL')
  }

  return validateUrl(url, 'LinkedIn URL')
}

export function validateTwitterUrl(url: string): ValidationResult {
  const errors: string[] = []

  if (!url) {
    return { isValid: true, errors }
  }

  if (!url.includes('twitter.com') && !url.includes('x.com')) {
    errors.push('Twitter URL must be a valid Twitter/X profile URL')
  }

  return validateUrl(url, 'Twitter URL')
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

  for (const slot of availability) {
    if (!validSlots.includes(slot)) {
      errors.push(`Invalid availability slot: ${slot}`)
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

export function validateSignupForm(data: SignupFormData): ValidationResult {
  const errors: string[] = []

  // Validate individual fields
  const nameValidation = validateName(data.fullName)
  if (!nameValidation.isValid) {
    errors.push(...nameValidation.errors)
  }

  const emailValidation = validateEmail(data.email)
  if (!emailValidation.isValid) {
    errors.push(...emailValidation.errors)
  }

  const jobTitleValidation = validateJobTitle(data.jobTitle)
  if (!jobTitleValidation.isValid) {
    errors.push(...jobTitleValidation.errors)
  }

  const companyValidation = validateCompany(data.company)
  if (!companyValidation.isValid) {
    errors.push(...companyValidation.errors)
  }

  const availabilityValidation = validateAvailability(data.availability)
  if (!availabilityValidation.isValid) {
    errors.push(...availabilityValidation.errors)
  }

  // Validate password confirmation
  if (data.password !== data.confirmPassword) {
    errors.push('Passwords do not match')
  }

  // Validate optional fields
  if (data.bio) {
    const bioValidation = validateBio(data.bio)
    if (!bioValidation.isValid) {
      errors.push(...bioValidation.errors)
    }
  }

  if (data.linkedinUrl) {
    const linkedinValidation = validateLinkedInUrl(data.linkedinUrl)
    if (!linkedinValidation.isValid) {
      errors.push(...linkedinValidation.errors)
    }
  }

  if (data.twitterUrl) {
    const twitterValidation = validateTwitterUrl(data.twitterUrl)
    if (!twitterValidation.isValid) {
      errors.push(...twitterValidation.errors)
    }
  }

  if (data.websiteUrl) {
    const websiteValidation = validateUrl(data.websiteUrl, 'Website URL')
    if (!websiteValidation.isValid) {
      errors.push(...websiteValidation.errors)
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}