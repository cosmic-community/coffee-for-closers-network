'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { 
  getAvailabilitySlots, 
  getTimezoneOptions, 
  getExperienceLevels, 
  getIndustryOptions 
} from '@/lib/utils'
import { validateSignupForm } from '@/lib/validations/auth'
import toast from 'react-hot-toast'

interface SignUpFormData {
  fullName: string
  email: string
  password: string
  confirmPassword: string
  jobTitle: string
  company: string
  bio: string
  timezone: string
  availability: string[]
  yearsExperience: string
  industryFocus: string[]
  linkedinUrl: string
  twitterUrl: string
  websiteUrl: string
}

export function SignUpForm() {
  const [formData, setFormData] = useState<SignUpFormData>({
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
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const router = useRouter()

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

      toast.success('Account created successfully! Please sign in.')
      router.push('/auth/signin')
    } catch (error) {
      console.error('Signup error:', error)
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('Failed to create account. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleAvailabilityChange = (slot: string) => {
    setFormData(prev => ({
      ...prev,
      availability: prev.availability.includes(slot)
        ? prev.availability.filter(s => s !== slot)
        : [...prev.availability, slot]
    }))
  }

  const handleIndustryChange = (industry: string) => {
    setFormData(prev => ({
      ...prev,
      industryFocus: prev.industryFocus.includes(industry)
        ? prev.industryFocus.filter(i => i !== industry)
        : [...prev.industryFocus, industry]
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Show validation errors */}
      {validationErrors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <h3 className="text-sm font-medium text-red-800 mb-2">Please fix the following errors:</h3>
          <ul className="text-sm text-red-700 space-y-1">
            {validationErrors.map((error, index) => (
              <li key={index}>• {error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Full Name *
          </label>
          <input
            id="fullName"
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email Address *
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter your email"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Password *
          </label>
          <div className="relative mt-1">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white pr-10"
              placeholder="Create a password"
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
          <p className="mt-1 text-xs text-gray-500">
            Must be at least 8 characters with uppercase, lowercase, number, and special character
          </p>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Confirm Password *
          </label>
          <div className="relative mt-1">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white pr-10"
              placeholder="Confirm your password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Professional Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Job Title *
          </label>
          <input
            id="jobTitle"
            type="text"
            value={formData.jobTitle}
            onChange={(e) => setFormData(prev => ({ ...prev, jobTitle: e.target.value }))}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="e.g., Account Executive"
          />
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Company *
          </label>
          <input
            id="company"
            type="text"
            value={formData.company}
            onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="e.g., Salesforce"
          />
        </div>
      </div>

      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Bio
        </label>
        <textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="Tell us about yourself and your sales experience..."
        />
      </div>

      {/* Preferences */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Timezone *
          </label>
          <select
            id="timezone"
            value={formData.timezone}
            onChange={(e) => setFormData(prev => ({ ...prev, timezone: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            {getTimezoneOptions().map((option) => (
              <option key={option.key} value={option.key}>
                {option.value}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="yearsExperience" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Years of Experience *
          </label>
          <select
            id="yearsExperience"
            value={formData.yearsExperience}
            onChange={(e) => setFormData(prev => ({ ...prev, yearsExperience: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            {getExperienceLevels().map((option) => (
              <option key={option.key} value={option.key}>
                {option.value}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Availability */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Availability * (Select all that apply)
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {getAvailabilitySlots().map((slot) => (
            <label key={slot} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.availability.includes(slot)}
                onChange={() => handleAvailabilityChange(slot)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">{slot}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Industry Focus */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Industry Focus (Optional)
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {getIndustryOptions().map((industry) => (
            <label key={industry} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.industryFocus.includes(industry)}
                onChange={() => handleIndustryChange(industry)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">{industry}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Social Links */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Social Links (Optional)</h3>
        
        <div>
          <label htmlFor="linkedinUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            LinkedIn URL
          </label>
          <input
            id="linkedinUrl"
            type="url"
            value={formData.linkedinUrl}
            onChange={(e) => setFormData(prev => ({ ...prev, linkedinUrl: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="https://linkedin.com/in/yourprofile"
          />
        </div>

        <div>
          <label htmlFor="twitterUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Twitter URL
          </label>
          <input
            id="twitterUrl"
            type="url"
            value={formData.twitterUrl}
            onChange={(e) => setFormData(prev => ({ ...prev, twitterUrl: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="https://twitter.com/yourhandle"
          />
        </div>

        <div>
          <label htmlFor="websiteUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Website URL
          </label>
          <input
            id="websiteUrl"
            type="url"
            value={formData.websiteUrl}
            onChange={(e) => setFormData(prev => ({ ...prev, websiteUrl: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="https://yourwebsite.com"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Creating account...
          </>
        ) : (
          'Create Account'
        )}
      </button>
    </form>
  )
}