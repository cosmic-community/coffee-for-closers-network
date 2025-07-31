import { ValidationResult, SignupFormData } from '@/types'

export function validateEmail(email: string): ValidationResult {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  if (!email) {
    return { isValid: false, errors: ['Email is required'] }
  }
  
  if (!emailRegex.test(email)) {
    return { isValid: false, errors: ['Please enter a valid email address'] }
  }
  
  return { isValid: true, errors: [] }
}

export function validateName(name: string): ValidationResult {
  if (!name) {
    return { isValid: false, errors: ['Name is required'] }
  }
  
  if (name.length < 2) {
    return { isValid: false, errors: ['Name must be at least 2 characters'] }
  }
  
  if (name.length > 100) {
    return { isValid: false, errors: ['Name must be less than 100 characters'] }
  }
  
  return { isValid: true, errors: [] }
}

export function validateJobTitle(jobTitle: string): ValidationResult {
  if (!jobTitle) {
    return { isValid: false, errors: ['Job title is required'] }
  }
  
  if (jobTitle.length < 2) {
    return { isValid: false, errors: ['Job title must be at least 2 characters'] }
  }
  
  if (jobTitle.length > 100) {
    return { isValid: false, errors: ['Job title must be less than 100 characters'] }
  }
  
  return { isValid: true, errors: [] }
}

export function validateCompany(company: string): ValidationResult {
  if (!company) {
    return { isValid: false, errors: ['Company is required'] }
  }
  
  if (company.length < 2) {
    return { isValid: false, errors: ['Company name must be at least 2 characters'] }
  }
  
  if (company.length > 100) {
    return { isValid: false, errors: ['Company name must be less than 100 characters'] }
  }
  
  return { isValid: true, errors: [] }
}

export function validateBio(bio: string): ValidationResult {
  if (bio.length > 500) {
    return { isValid: false, errors: ['Bio must be less than 500 characters'] }
  }
  
  return { isValid: true, errors: [] }
}

export function validateUrl(url: string, fieldName: string): ValidationResult {
  if (!url) {
    return { isValid: true, errors: [] } // Optional field
  }
  
  try {
    new URL(url)
    return { isValid: true, errors: [] }
  } catch {
    return { isValid: false, errors: [`${fieldName} must be a valid URL`] }
  }
}

export function validateLinkedInUrl(url: string): ValidationResult {
  if (!url) {
    return { isValid: true, errors: [] } // Optional field
  }
  
  const linkedinRegex = /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9\-]+\/?$/
  
  if (!linkedinRegex.test(url)) {
    return { isValid: false, errors: ['Please enter a valid LinkedIn profile URL'] }
  }
  
  return { isValid: true, errors: [] }
}

export function validateTwitterUrl(url: string): ValidationResult {
  if (!url) {
    return { isValid: true, errors: [] } // Optional field
  }
  
  const twitterRegex = /^https?:\/\/(www\.)?(twitter\.com|x\.com)\/[a-zA-Z0-9_]+\/?$/
  
  if (!twitterRegex.test(url)) {
    return { isValid: false, errors: ['Please enter a valid Twitter/X profile URL'] }
  }
  
  return { isValid: true, errors: [] }
}

export function validateAvailability(availability: string[]): ValidationResult {
  if (!availability || availability.length === 0) {
    return { isValid: false, errors: ['Please select at least one availability slot'] }
  }
  
  const validSlots = [
    'Morning (9-11 AM)',
    'Lunch (11 AM-2 PM)',
    'Afternoon (2-5 PM)',
    'Evening (5-7 PM)'
  ]
  
  const invalidSlots = availability.filter(slot => !validSlots.includes(slot))
  
  if (invalidSlots.length > 0) {
    return { isValid: false, errors: ['Invalid availability slots selected'] }
  }
  
  return { isValid: true, errors: [] }
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
  
  // Validate password match
  if (formData.password !== formData.confirmPassword) {
    errors.push('Passwords do not match')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}