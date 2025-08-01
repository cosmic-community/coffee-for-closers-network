'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SignupFormData } from '@/types/user'
import { validateSignupForm } from '@/lib/validations/user'
import toast from 'react-hot-toast'

interface UseSignupReturn {
  formData: SignupFormData
  setFormData: React.Dispatch<React.SetStateAction<SignupFormData>>
  isLoading: boolean
  validationErrors: string[]
  handleSubmit: (e: React.FormEvent) => Promise<void>
  updateField: (field: keyof SignupFormData, value: any) => void
  toggleAvailability: (slot: string) => void
  toggleIndustry: (industry: string) => void
}

const initialFormData: SignupFormData = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  jobTitle: '',
  company: '',
  bio: '',
  timezone: 'EST',
  availability: [],
  yearsExperience: '0-2',
  industryFocus: [],
  linkedinUrl: '',
  twitterUrl: '',
  websiteUrl: ''
}

export function useSignup(): UseSignupReturn {
  const [formData, setFormData] = useState<SignupFormData>(initialFormData)
  const [isLoading, setIsLoading] = useState(false)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const router = useRouter()

  const updateField = (field: keyof SignupFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear validation errors when user starts typing
    if (validationErrors.length > 0) {
      setValidationErrors([])
    }
  }

  const toggleAvailability = (slot: string) => {
    setFormData(prev => ({
      ...prev,
      availability: prev.availability.includes(slot)
        ? prev.availability.filter(s => s !== slot)
        : [...prev.availability, slot]
    }))
  }

  const toggleIndustry = (industry: string) => {
    setFormData(prev => ({
      ...prev,
      industryFocus: prev.industryFocus.includes(industry)
        ? prev.industryFocus.filter(i => i !== industry)
        : [...prev.industryFocus, industry]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setValidationErrors([])

    try {
      // Validate form data
      const validation = validateSignupForm(formData)
      if (!validation.isValid) {
        setValidationErrors(validation.errors)
        toast.error('Please fix the errors below')
        return
      }

      // Call signup API
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          jobTitle: formData.jobTitle,
          company: formData.company,
          bio: formData.bio,
          timezone: formData.timezone,
          availability: formData.availability,
          yearsExperience: formData.yearsExperience,
          industryFocus: formData.industryFocus,
          linkedinUrl: formData.linkedinUrl,
          twitterUrl: formData.twitterUrl,
          websiteUrl: formData.websiteUrl
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create account')
      }

      toast.success('Account created successfully!')
      
      // Redirect to sign in page
      router.push('/auth/signin?message=Account created successfully! Please sign in.')
      
    } catch (error) {
      console.error('Signup error:', error)
      if (error instanceof Error) {
        toast.error(error.message)
        setValidationErrors([error.message])
      } else {
        toast.error('Failed to create account. Please try again.')
        setValidationErrors(['Failed to create account. Please try again.'])
      }
    } finally {
      setIsLoading(false)
    }
  }

  return {
    formData,
    setFormData,
    isLoading,
    validationErrors,
    handleSubmit,
    updateField,
    toggleAvailability,
    toggleIndustry
  }
}

// Hook for multi-step signup flow
interface UseSignupFlowReturn {
  currentStep: number
  totalSteps: number
  nextStep: () => void
  prevStep: () => void
  goToStep: (step: number) => void
  isFirstStep: boolean
  isLastStep: boolean
  progress: number
}

export function useSignupFlow(initialStep: number = 1, maxSteps: number = 3): UseSignupFlowReturn {
  const [currentStep, setCurrentStep] = useState(initialStep)

  const nextStep = () => {
    if (currentStep < maxSteps) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const goToStep = (step: number) => {
    if (step >= 1 && step <= maxSteps) {
      setCurrentStep(step)
    }
  }

  return {
    currentStep,
    totalSteps: maxSteps,
    nextStep,
    prevStep,
    goToStep,
    isFirstStep: currentStep === 1,
    isLastStep: currentStep === maxSteps,
    progress: (currentStep / maxSteps) * 100
  }
}