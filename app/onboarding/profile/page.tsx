'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ProfileSetup } from '@/components/onboarding/profile-setup'
import { ProgressIndicator } from '@/components/onboarding/progress-indicator'
import { useAuth } from '@/hooks/use-auth'

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      router.push('/auth/signin')
      return
    }
    
    // If user hasn't completed welcome step, redirect back
    // Use optional chaining to safely access potentially undefined properties
    if (!user?.metadata || !user.metadata.onboarding_step || user.metadata.onboarding_step < 1) {
      router.push('/onboarding/welcome')
      return
    }

    // If user is already fully onboarded, redirect to dashboard
    if (user.metadata.onboarding_completed) {
      router.push('/dashboard')
      return
    }

    setIsLoading(false)
  }, [isAuthenticated, user, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <ProgressIndicator currentStep={2} totalSteps={3} />
        <ProfileSetup />
      </div>
    </div>
  )
}