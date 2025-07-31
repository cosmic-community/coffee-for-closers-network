'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, Clock, RefreshCw, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

interface EmailVerificationPromptProps {
  email: string
  onVerificationComplete: () => void
  onResend: () => void
}

export function EmailVerificationPrompt({ 
  email, 
  onVerificationComplete, 
  onResend 
}: EmailVerificationPromptProps) {
  const [isResending, setIsResending] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)
  const [isChecking, setIsChecking] = useState(false)

  // Start cooldown timer
  useEffect(() => {
    setResendCooldown(60) // 60 seconds cooldown
    const timer = setInterval(() => {
      setResendCooldown(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Poll for verification status
  useEffect(() => {
    const checkVerification = async () => {
      try {
        const response = await fetch('/api/auth/check-verification', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        })

        if (response.ok) {
          const data = await response.json()
          if (data.verified) {
            onVerificationComplete()
          }
        }
      } catch (error) {
        console.error('Error checking verification:', error)
      }
    }

    const interval = setInterval(checkVerification, 3000) // Check every 3 seconds
    return () => clearInterval(interval)
  }, [email, onVerificationComplete])

  const handleResend = async () => {
    if (resendCooldown > 0) return

    setIsResending(true)
    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      if (response.ok) {
        toast.success('Verification email sent!')
        setResendCooldown(60)
        onResend()
      } else {
        throw new Error('Failed to resend email')
      }
    } catch (error) {
      toast.error('Failed to resend verification email')
    } finally {
      setIsResending(false)
    }
  }

  const handleManualCheck = async () => {
    setIsChecking(true)
    try {
      const response = await fetch('/api/auth/check-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      if (response.ok) {
        const data = await response.json()
        if (data.verified) {
          onVerificationComplete()
          toast.success('Email verified successfully!')
        } else {
          toast.error('Email not verified yet. Please check your inbox.')
        }
      }
    } catch (error) {
      toast.error('Failed to check verification status')
    } finally {
      setIsChecking(false)
    }
  }

  return (
    <motion.div 
      className="text-center space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Email Icon */}
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
          <Mail className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
      </div>

      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Check Your Email
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          We've sent a verification link to
        </p>
        <p className="font-semibold text-gray-900 dark:text-white">
          {email}
        </p>
      </div>

      {/* Instructions */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Clock className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-gray-600 dark:text-gray-300 text-left">
            <p className="font-medium mb-1">What to do next:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Check your inbox (and spam folder)</li>
              <li>Click the verification link in the email</li>
              <li>You'll be automatically redirected here</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={handleManualCheck}
          disabled={isChecking}
          className="w-full flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isChecking ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Checking...
            </>
          ) : (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              I've verified my email
            </>
          )}
        </button>

        <button
          onClick={handleResend}
          disabled={resendCooldown > 0 || isResending}
          className="w-full px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isResending ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin inline" />
              Sending...
            </>
          ) : resendCooldown > 0 ? (
            `Resend email in ${resendCooldown}s`
          ) : (
            'Resend verification email'
          )}
        </button>
      </div>

      {/* Help Text */}
      <div className="text-xs text-gray-500 dark:text-gray-400">
        <p>
          Didn't receive the email? Check your spam folder or{' '}
          <button 
            onClick={handleResend}
            disabled={resendCooldown > 0}
            className="underline hover:text-gray-700 dark:hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            try again
          </button>
        </p>
      </div>
    </motion.div>
  )
}