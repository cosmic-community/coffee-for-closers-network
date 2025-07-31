import { useState } from 'react'
import { useAuth } from '@/hooks/use-auth'

interface OnboardingData {
  interests?: string[]
  welcome_completed?: boolean
  bio?: string
  timezone?: string
  availability?: string[]
  years_experience?: string
  industry_focus?: string[]
  linkedin_url?: string
  profile_completed?: boolean
  onboarding_completed?: boolean
  onboarding_step?: number
}

export function useOnboarding() {
  const [isLoading, setIsLoading] = useState(false)
  const { user, refreshUser } = useAuth()

  const updateOnboardingStep = async (step: number, data: OnboardingData) => {
    if (!user) {
      throw new Error('User not authenticated')
    }

    setIsLoading(true)
    
    try {
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          step,
          data: {
            ...data,
            onboarding_step: step
          }
        })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to update onboarding')
      }

      const result = await response.json()
      
      // Refresh user data to get updated onboarding status
      await refreshUser()
      
      return result
    } catch (error) {
      console.error('Onboarding update error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const completeOnboarding = async () => {
    return updateOnboardingStep(3, {
      onboarding_completed: true,
      profile_completed: true
    })
  }

  return {
    isLoading,
    updateOnboardingStep,
    completeOnboarding,
    currentStep: user?.metadata?.onboarding_step || 0,
    isCompleted: user?.metadata?.onboarding_completed || false
  }
}