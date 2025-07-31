'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { WelcomeWizard } from '@/components/onboarding/welcome-wizard'
import { ProgressIndicator } from '@/components/onboarding/progress-indicator'
import { useAuth } from '@/hooks/use-auth'

export default function WelcomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, isAuthenticated } = useAuth()

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated && !searchParams.get('token')) {
      router.push('/auth/signin')
      return
    }
    
    // If user is already onboarded, redirect to dashboard
    if (user?.metadata?.onboarding_completed) {
      router.push('/dashboard')
      return
    }

    setIsLoading(false)
  }, [isAuthenticated, user, router, searchParams])

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
        <ProgressIndicator currentStep={1} totalSteps={3} />
        <WelcomeWizard />
      </div>
    </div>
  )
}