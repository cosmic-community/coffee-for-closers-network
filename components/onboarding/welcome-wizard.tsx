'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle, ArrowRight, Coffee, Users, Calendar } from 'lucide-react'
import toast from 'react-hot-toast'

const steps = [
  {
    id: 'welcome',
    title: 'Welcome!',
    description: 'You\'ve successfully joined the Coffee for Closers network.',
    icon: CheckCircle
  },
  {
    id: 'how-it-works',
    title: 'How It Works',
    description: 'Every week, we match you with 1-2 sales professionals for 15-minute coffee chats.',
    icon: Coffee
  },
  {
    id: 'community',
    title: 'Join the Community',
    description: 'Share wins, ask questions, and learn from fellow sales professionals.',
    icon: Users
  },
  {
    id: 'ready',
    title: 'You\'re All Set!',
    description: 'Complete your profile to get better matches and start networking.',
    icon: Calendar
  }
]

export function WelcomeWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const router = useRouter()

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handleComplete = async () => {
    try {
      toast.success('Welcome complete! Let\'s set up your profile.')
      router.push('/onboarding/profile')
    } catch (error) {
      console.error('Error completing welcome:', error)
      toast.error('Something went wrong. Please try again.')
    }
  }

  const step = steps[currentStep]
  if (!step) {
    // Fallback to first step if currentStep is undefined
    setCurrentStep(0)
    return null
  }

  const Icon = step.icon

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
          <span>Step {currentStep + 1} of {steps.length}</span>
          <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Current Step */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
          <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {step.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          {step.description}
        </p>
      </div>

      {/* Step-specific content */}
      {currentStep === 1 && (
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-green-600 dark:text-green-400 font-bold">1</span>
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white">Get Matched</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Every Monday</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-blue-600 dark:text-blue-400 font-bold">2</span>
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white">Schedule Chat</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">15 minutes</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-purple-600 dark:text-purple-400 font-bold">3</span>
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white">Connect & Learn</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Build relationships</p>
            </div>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="mb-8">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
              Community Features:
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Share your sales wins and lessons learned
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Ask questions and get advice from peers
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Discover new tools and resources
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Stay updated on industry trends
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="px-4 py-2 text-gray-600 dark:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        <button
          type="button"
          onClick={handleNext}
          className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {currentStep === steps.length - 1 ? 'Complete Setup' : 'Next'}
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  )
}