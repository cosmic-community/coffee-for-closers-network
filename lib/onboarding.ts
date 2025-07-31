export interface OnboardingStep {
  id: number
  name: string
  description: string
  required: boolean
  completed?: boolean
}

export const onboardingSteps: OnboardingStep[] = [
  {
    id: 1,
    name: 'Welcome',
    description: 'Learn about the network and select your interests',
    required: true
  },
  {
    id: 2,
    name: 'Profile Setup',
    description: 'Complete your professional profile',
    required: true
  },
  {
    id: 3,
    name: 'Ready to Connect',
    description: 'Start networking with fellow sales professionals',
    required: false
  }
]

export function getOnboardingProgress(user: any): {
  currentStep: number
  totalSteps: number
  isCompleted: boolean
  nextStepUrl: string
} {
  const currentStep = user?.metadata?.onboarding_step || 0
  const isCompleted = user?.metadata?.onboarding_completed || false
  
  let nextStepUrl = '/onboarding/welcome'
  
  if (currentStep >= 1 && !isCompleted) {
    nextStepUrl = '/onboarding/profile'
  } else if (isCompleted) {
    nextStepUrl = '/dashboard'
  }

  return {
    currentStep,
    totalSteps: onboardingSteps.length,
    isCompleted,
    nextStepUrl
  }
}

export function validateOnboardingStep(step: number, data: any): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []

  switch (step) {
    case 1:
      if (!data.interests || !Array.isArray(data.interests) || data.interests.length === 0) {
        errors.push('Please select at least one area of interest')
      }
      break
    
    case 2:
      if (!data.availability || !Array.isArray(data.availability) || data.availability.length === 0) {
        errors.push('Please select at least one availability slot')
      }
      if (!data.timezone) {
        errors.push('Please select your timezone')
      }
      if (!data.years_experience) {
        errors.push('Please select your years of experience')
      }
      break
    
    default:
      errors.push('Invalid onboarding step')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}