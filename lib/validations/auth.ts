interface ValidationResult {
  isValid: boolean
  errors: string[]
}

export function validateName(name: string): ValidationResult {
  const errors: string[] = []

  if (!name.trim()) {
    errors.push('Name is required')
  } else if (name.trim().length < 2) {
    errors.push('Name must be at least 2 characters')
  } else if (name.trim().length > 50) {
    errors.push('Name must be less than 50 characters')
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
  } else if (!emailRegex.test(email.trim())) {
    errors.push('Please enter a valid email address')
  } else if (email.length > 255) {
    errors.push('Email must be less than 255 characters')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

export function validateJobTitle(jobTitle: string): ValidationResult {
  const errors: string[] = []

  if (!jobTitle.trim()) {
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

  if (!company.trim()) {
    errors.push('Company is required')
  } else if (company.trim().length < 2) {
    errors.push('Company must be at least 2 characters')
  } else if (company.trim().length > 100) {
    errors.push('Company must be less than 100 characters')
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
      errors.push('Password must be at least 8 characters')
    }
    if (password.length > 128) {
      errors.push('Password must be less than 128 characters')
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
    if (!/(?=.*[!@#$%^&*(),.?":{}|<>])/.test(password)) {
      errors.push('Password must contain at least one special character')
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

export function validateUrl(url: string, fieldName: string): ValidationResult {
  const errors: string[] = []
  const urlRegex = /^https?:\/\/.+/

  if (url && !urlRegex.test(url)) {
    errors.push(`${fieldName} must be a valid URL starting with http:// or https://`)
  }

  if (url && url.length > 500) {
    errors.push(`${fieldName} must be less than 500 characters`)
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

export function validateLinkedInUrl(url: string): ValidationResult {
  const errors: string[] = []
  
  if (url) {
    const linkedinRegex = /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/
    if (!linkedinRegex.test(url)) {
      errors.push('Please enter a valid LinkedIn profile URL')
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
    const twitterRegex = /^https?:\/\/(www\.)?(twitter\.com|x\.com)\/[a-zA-Z0-9_]+\/?$/
    if (!twitterRegex.test(url)) {
      errors.push('Please enter a valid Twitter/X profile URL')
    }
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

export function validateAvailability(availability: string[]): ValidationResult {
  const errors: string[] = []
  const validSlots = [
    'Monday Morning',
    'Monday Afternoon',
    'Tuesday Morning',
    'Tuesday Afternoon',
    'Wednesday Morning',
    'Wednesday Afternoon',
    'Thursday Morning',
    'Thursday Afternoon',
    'Friday Morning',
    'Friday Afternoon'
  ]

  if (availability.length === 0) {
    errors.push('Please select at least one availability slot')
  }

  if (availability.length > 10) {
    errors.push('Too many availability slots selected')
  }

  const invalidSlots = availability.filter(slot => !validSlots.includes(slot))
  if (invalidSlots.length > 0) {
    errors.push('Invalid availability slots selected')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

export function validateTimezone(timezone: string): ValidationResult {
  const errors: string[] = []
  const validTimezones = ['EST', 'CST', 'MST', 'PST', 'GMT', 'CET']

  if (!timezone) {
    errors.push('Timezone is required')
  } else if (!validTimezones.includes(timezone)) {
    errors.push('Invalid timezone selected')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

export function validateExperience(experience: string): ValidationResult {
  const errors: string[] = []
  const validLevels = ['0-2', '3-5', '6-10', '10+']

  if (!experience) {
    errors.push('Years of experience is required')
  } else if (!validLevels.includes(experience)) {
    errors.push('Invalid experience level selected')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

export function validateIndustryFocus(industries: string[]): ValidationResult {
  const errors: string[] = []
  const validIndustries = [
    'SaaS',
    'Enterprise Software',
    'Cloud Services',
    'Security',
    'DevTools',
    'Analytics',
    'AI/ML',
    'Other'
  ]

  if (industries.length > 8) {
    errors.push('Too many industry focus areas selected')
  }

  const invalidIndustries = industries.filter(industry => !validIndustries.includes(industry))
  if (invalidIndustries.length > 0) {
    errors.push('Invalid industry focus areas selected')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}