'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Coffee, Users, TrendingUp, Clock, ArrowRight, CheckCircle } from 'lucide-react'
import { useOnboarding } from '@/hooks/use-onboarding'
import toast from 'react-hot-toast'

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
  value: string
}

const features: Feature[] = [
  {
    icon: <Coffee className="h-8 w-8" />,
    title: "Quick Coffee Chats",
    description: "15-minute conversations that fit your busy schedule",
    value: "time-efficient"
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Expert Network",
    description: "Connect with top performers from leading SaaS companies",
    value: "expert-network"
  },
  {
    icon: <TrendingUp className="h-8 w-8" />,
    title: "Career Growth",
    description: "Learn strategies and insights to advance your sales career",
    value: "career-growth"
  },
  {
    icon: <Clock className="h-8 w-8" />,
    title: "Smart Matching",
    description: "Get matched with professionals based on your interests and goals",
    value: "smart-matching"
  }
]

export function WelcomeWizard() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { updateOnboardingStep } = useOnboarding()

  const handleInterestToggle = (value: string) => {
    setSelectedInterests(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value)
        : [...prev, value]
    )
  }

  const handleContinue = async () => {
    if (selectedInterests.length === 0) {
      toast.error('Please select at least one area of interest')
      return
    }

    setIsLoading(true)
    
    try {
      await updateOnboardingStep(1, {
        interests: selectedInterests,
        welcome_completed: true
      })
      
      toast.success('Welcome step completed!')
      router.push('/onboarding/profile')
    } catch (error) {
      console.error('Failed to update onboarding:', error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <div className="mx-auto w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-6">
          <Coffee className="h-8 w-8 text-primary-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to Coffee Closer Network! ☕
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          You're now part of a community of 500+ sales professionals who are 
          serious about growing their careers and building meaningful connections.
        </p>
      </div>

      {/* Success Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="text-3xl font-bold text-primary-600 mb-2">2,347</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Conversations this month</div>
        </div>
        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="text-3xl font-bold text-primary-600 mb-2">95%</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Member satisfaction</div>
        </div>
        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="text-3xl font-bold text-primary-600 mb-2">15 min</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Average chat length</div>
        </div>
      </div>

      {/* Interest Selection */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          What interests you most about networking with fellow sales professionals?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Select all that apply - this helps us recommend the best connections for you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {features.map((feature) => {
            const isSelected = selectedInterests.includes(feature.value)
            return (
              <div
                key={feature.value}
                onClick={() => handleInterestToggle(feature.value)}
                className={`
                  relative p-6 rounded-lg border-2 cursor-pointer transition-all duration-200
                  ${isSelected 
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }
                `}
              >
                {isSelected && (
                  <div className="absolute top-3 right-3">
                    <CheckCircle className="h-5 w-5 text-primary-600" />
                  </div>
                )}
                <div className={`mb-3 ${isSelected ? 'text-primary-600' : 'text-gray-400'}`}>
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Step 1 of 3 • About 2 minutes remaining
          </p>
          <button
            onClick={handleContinue}
            disabled={isLoading || selectedInterests.length === 0}
            className="btn btn-primary flex items-center"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing...
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}