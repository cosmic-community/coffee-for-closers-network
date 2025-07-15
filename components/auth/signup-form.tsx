'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { createUser } from '@/lib/cosmic'
import { getAvailabilitySlots, getTimezoneOptions, getExperienceLevels, getIndustryOptions } from '@/lib/utils'
import toast from 'react-hot-toast'

export function SignUpForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    jobTitle: '',
    company: '',
    bio: '',
    timezone: 'EST',
    availability: [] as string[],
    yearsExperience: '0-2',
    industryFocus: [] as string[],
    linkedinUrl: '',
    twitterUrl: '',
    websiteUrl: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Validate required fields
      if (!formData.fullName || !formData.email || !formData.jobTitle || !formData.company) {
        toast.error('Please fill in all required fields')
        return
      }

      if (formData.availability.length === 0) {
        toast.error('Please select your availability')
        return
      }

      // Create user in Cosmic
      const userData = {
        title: formData.fullName,
        metadata: {
          full_name: formData.fullName,
          email: formData.email,
          role: 'member' as const,
          job_title: formData.jobTitle,
          company: formData.company,
          bio: formData.bio,
          timezone: formData.timezone as any,
          availability: formData.availability,
          years_experience: formData.yearsExperience as any,
          industry_focus: formData.industryFocus,
          linkedin_url: formData.linkedinUrl,
          twitter_url: formData.twitterUrl,
          website_url: formData.websiteUrl
        }
      }

      await createUser(userData)
      
      toast.success('Account created successfully!')
      router.push('/auth/signin')
    } catch (error) {
      console.error('Signup error:', error)
      toast.error('Failed to create account. Please try again.')
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
            className="input mt-1"
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
            className="input mt-1"
            placeholder="Enter your email"
          />
        </div>
      </div>

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
            className="input pr-10"
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
            className="input mt-1"
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
            className="input mt-1"
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
          className="textarea mt-1"
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
            className="select mt-1"
          >
            {getTimezoneOptions().map((option: { key: string; value: string }) => (
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
            className="select mt-1"
          >
            {getExperienceLevels().map((option: { key: string; value: string }) => (
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
          {getAvailabilitySlots().map((slot: string) => (
            <label key={slot} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.availability.includes(slot)}
                onChange={() => handleAvailabilityChange(slot)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm">{slot}</span>
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
          {getIndustryOptions().map((industry: string) => (
            <label key={industry} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.industryFocus.includes(industry)}
                onChange={() => handleIndustryChange(industry)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm">{industry}</span>
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
            className="input mt-1"
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
            className="input mt-1"
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
            className="input mt-1"
            placeholder="https://yourwebsite.com"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="btn btn-primary w-full"
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