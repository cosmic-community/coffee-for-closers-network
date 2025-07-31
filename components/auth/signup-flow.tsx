'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, Check, Mail, User, Building, Eye, EyeOff } from 'lucide-react'
import { QuickSignupForm } from './quick-signup-form'
import { EmailVerificationPrompt } from './email-verification-prompt'
import { SuccessConfirmation } from './success-confirmation'
import { trackSignupStep } from '@/lib/analytics'
import toast from 'react-hot-toast'

type SignupStep = 'form' | 'verification' | 'success'

interface SignupData {
  fullName: string
  email: string
  password: string
  jobTitle: string
  company: string
}

export function SignupFlow() {
  const [currentStep, setCurrentStep] = useState<SignupStep>('form')
  const [signupData, setSignupData] = useState<SignupData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignupSuccess = async (data: SignupData, userId: string) => {
    setSignupData(data)
    
    // Track successful signup
    await trackSignupStep('signup_completed', {
      userId,
      email: data.email,
      company: data.company,
      jobTitle: data.jobTitle
    })
    
    setCurrentStep('verification')
  }

  const handleVerificationComplete = async () => {
    if (signupData) {
      await trackSignupStep('email_verified', {
        email: signupData.email
      })
    }
    
    setCurrentStep('success')
  }

  const handleFlowComplete = () => {
    toast.success('Welcome to Coffee Closer Network!')
    router.push('/onboarding/welcome')
  }

  const stepVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  }

  const getStepNumber = (step: SignupStep): number => {
    switch (step) {
      case 'form': return 1
      case 'verification': return 2  
      case 'success': return 3
      default: return 1
    }
  }

  return (
    <div className="max-w-md w-full mx-auto">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
          <span>Step {getStepNumber(currentStep)} of 3</span>
          <span>{Math.round((getStepNumber(currentStep) / 3) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <motion.div 
            className="bg-primary-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(getStepNumber(currentStep) / 3) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={getStepNumber(currentStep)}>
          <motion.div
            key={currentStep}
            custom={getStepNumber(currentStep)}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
          >
            {currentStep === 'form' && (
              <div className="space-y-6">
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Join the Network
                  </h1>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Connect with 500+ sales professionals in 2 minutes
                  </p>
                </div>
                
                <QuickSignupForm 
                  onSuccess={handleSignupSuccess}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              </div>
            )}

            {currentStep === 'verification' && signupData && (
              <EmailVerificationPrompt
                email={signupData.email}
                onVerificationComplete={handleVerificationComplete}
                onResend={() => {
                  // Handle resend verification email
                  toast.success('Verification email sent!')
                }}
              />
            )}

            {currentStep === 'success' && signupData && (
              <SuccessConfirmation
                name={signupData.fullName}
                onComplete={handleFlowComplete}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Trust Indicators */}
      {currentStep === 'form' && (
        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <Check className="w-4 h-4 text-green-500 mr-1" />
              <span>Free to join</span>
            </div>
            <div className="flex items-center">
              <Check className="w-4 h-4 text-green-500 mr-1" />
              <span>No spam</span>
            </div>
            <div className="flex items-center">
              <Check className="w-4 h-4 text-green-500 mr-1" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}