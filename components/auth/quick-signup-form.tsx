'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Loader2, Mail, User, Building } from 'lucide-react'
import { motion } from 'framer-motion'
import { 
  validateEmail, 
  validateName, 
  validateJobTitle, 
  validateCompany 
} from '@/lib/validations/auth'
import { trackSignupStep } from '@/lib/analytics'
import toast from 'react-hot-toast'

interface QuickSignupFormData {
  fullName: string
  email: string
  password: string
  jobTitle: string
  company: string
}

interface QuickSignupFormProps {
  onSuccess: (data: QuickSignupFormData, userId: string) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

export function QuickSignupForm({ onSuccess, isLoading, setIsLoading }: QuickSignupFormProps) {
  const [formData, setFormData] = useState<QuickSignupFormData>({
    fullName: '',
    email: '',
    password: '',
    jobTitle: '',
    company: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const validateField = (name: string, value: string) => {
    let validation = { isValid: true, errors: [] as string[] }
    
    switch (name) {
      case 'fullName':
        validation = validateName(value)
        break
      case 'email':
        validation = validateEmail(value)
        break
      case 'jobTitle':
        validation = validateJobTitle(value)
        break
      case 'company':
        validation = validateCompany(value)
        break
      case 'password':
        if (!value) {
          validation = { isValid: false, errors: ['Password is required'] }
        } else if (value.length < 8) {
          validation = { isValid: false, errors: ['Password must be at least 8 characters'] }
        }
        break
    }
    
    setFieldErrors(prev => ({
      ...prev,
      [name]: validation.isValid ? '' : validation.errors[0] || ''
    }))
    
    return validation.isValid
  }

  const handleFieldChange = (name: keyof QuickSignupFormData, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Real-time validation for touched fields
    if (touched[name]) {
      validateField(name, value)
    }
  }

  const handleFieldBlur = (name: keyof QuickSignupFormData) => {
    setTouched(prev => ({ ...prev, [name]: true }))
    validateField(name, formData[name])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Track form submission
      await trackSignupStep('signup_form_submitted', {
        email: formData.email,
        company: formData.company,
        jobTitle: formData.jobTitle
      })

      // Validate all fields
      const validations = [
        validateField('fullName', formData.fullName),
        validateField('email', formData.email),
        validateField('password', formData.password),
        validateField('jobTitle', formData.jobTitle),
        validateField('company', formData.company)
      ]

      if (!validations.every(Boolean)) {
        toast.error('Please fix the errors below')
        return
      }

      // Call quick signup API
      const response = await fetch('/api/auth/quick-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create account')
      }

      // Track successful signup
      await trackSignupStep('signup_completed', {
        userId: data.user.id,
        email: formData.email,
        company: formData.company,
        jobTitle: formData.jobTitle
      })

      onSuccess(formData, data.user.id)
    } catch (error) {
      console.error('Quick signup error:', error)
      
      // Track signup error
      await trackSignupStep('signup_error', {
        email: formData.email,
        error: error instanceof Error ? error.message : 'Unknown error'
      })
      
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('Failed to create account. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Full Name
        </label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            id="fullName"
            type="text"
            value={formData.fullName}
            onChange={(e) => handleFieldChange('fullName', e.target.value)}
            onBlur={() => handleFieldBlur('fullName')}
            required
            className={`input pl-10 ${fieldErrors.fullName ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
            placeholder="Enter your full name"
          />
        </div>
        {fieldErrors.fullName && (
          <motion.p 
            className="mt-1 text-xs text-red-600"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {fieldErrors.fullName}
          </motion.p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Work Email
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleFieldChange('email', e.target.value)}
            onBlur={() => handleFieldBlur('email')}
            required
            className={`input pl-10 ${fieldErrors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
            placeholder="Enter your work email"
          />
        </div>
        {fieldErrors.email && (
          <motion.p 
            className="mt-1 text-xs text-red-600"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {fieldErrors.email}
          </motion.p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Job Title
          </label>
          <input
            id="jobTitle"
            type="text"
            value={formData.jobTitle}
            onChange={(e) => handleFieldChange('jobTitle', e.target.value)}
            onBlur={() => handleFieldBlur('jobTitle')}
            required
            className={`input ${fieldErrors.jobTitle ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
            placeholder="Account Executive"
          />
          {fieldErrors.jobTitle && (
            <motion.p 
              className="mt-1 text-xs text-red-600"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {fieldErrors.jobTitle}
            </motion.p>
          )}
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Company
          </label>
          <div className="relative">
            <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              id="company"
              type="text"
              value={formData.company}
              onChange={(e) => handleFieldChange('company', e.target.value)}
              onBlur={() => handleFieldBlur('company')}
              required
              className={`input pl-10 ${fieldErrors.company ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
              placeholder="Your company"
            />
          </div>
          {fieldErrors.company && (
            <motion.p 
              className="mt-1 text-xs text-red-600"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {fieldErrors.company}
            </motion.p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) => handleFieldChange('password', e.target.value)}
            onBlur={() => handleFieldBlur('password')}
            required
            className={`input pr-10 ${fieldErrors.password ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
            placeholder="Create a secure password"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-gray-400" />
            ) : (
              <Eye className="h-4 w-4 text-gray-400" />
            )}
          </button>
        </div>
        {fieldErrors.password ? (
          <motion.p 
            className="mt-1 text-xs text-red-600"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {fieldErrors.password}
          </motion.p>
        ) : (
          <p className="mt-1 text-xs text-gray-500">
            Must be at least 8 characters
          </p>
        )}
      </div>

      <motion.button
        type="submit"
        disabled={isLoading}
        className="btn btn-primary w-full"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Creating your account...
          </>
        ) : (
          'Join the Network'
        )}
      </motion.button>
    </motion.form>
  )
}