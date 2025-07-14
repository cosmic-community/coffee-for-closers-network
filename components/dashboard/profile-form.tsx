'use client'

import { useState } from 'react'
import { User } from '@/types'
import { updateUser } from '@/lib/cosmic'
import { getAvailabilitySlots, getTimezoneOptions, getExperienceLevels, getIndustryOptions } from '@/lib/utils'
import { Loader2, Save } from 'lucide-react'
import toast from 'react-hot-toast'

interface ProfileFormProps {
  user: User
}

export function ProfileForm({ user }: ProfileFormProps) {
  const [formData, setFormData] = useState({
    fullName: user.metadata.full_name || '',
    jobTitle: user.metadata.job_title || '',
    company: user.metadata.company || '',
    bio: user.metadata.bio || '',
    timezone: user.metadata.timezone?.key || 'EST',
    availability: user.metadata.availability || [],
    yearsExperience: user.metadata.years_experience?.key || '0-2',
    industryFocus: user.metadata.industry_focus || [],
    linkedinUrl: user.metadata.linkedin_url || '',
    twitterUrl: user.metadata.twitter_url || '',
    websiteUrl: user.metadata.website_url || ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const updateData = {
        title: formData.fullName,
        metadata: {
          full_name: formData.fullName,
          email: user.metadata.email, // Keep existing email
          role: user.metadata.role.key,
          job_title: formData.jobTitle,
          company: formData.company,
          bio: formData.bio,
          timezone: formData.timezone,
          availability: formData.availability,
          years_experience: formData.yearsExperience,
          industry_focus: formData.industryFocus,
          linkedin_url: formData.linkedinUrl,
          twitter_url: formData.twitterUrl,
          website_url: formData.websiteUrl
        }
      }

      await updateUser(user.id, updateData)
      toast.success('Profile updated successfully!')
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error('Failed to update profile')
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
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
            className="input mt-1"
          />
        </div>

        <div>
          <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Job Title
          </label>
          <input
            id="jobTitle"
            type="text"
            value={formData.jobTitle}
            onChange={(e) => setFormData(prev => ({ ...prev, jobTitle: e.target.value }))}
            className="input mt-1"
          />
        </div>
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Company
        </label>
        <input
          id="company"
          type="text"
          value={formData.company}
          onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
          className="input mt-1"
        />
      </div>

      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Bio
        </label>
        <textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
          rows={4}
          className="textarea mt-1"
          placeholder="Tell us about yourself and your sales experience..."
        />
      </div>

      {/* Preferences */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Timezone
          </label>
          <select
            id="timezone"
            value={formData.timezone}
            onChange={(e) => setFormData(prev => ({ ...prev, timezone: e.target.value }))}
            className="select mt-1"
          >
            {getTimezoneOptions().map(option => (
              <option key={option.key} value={option.key}>
                {option.value}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="yearsExperience" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Years of Experience
          </label>
          <select
            id="yearsExperience"
            value={formData.yearsExperience}
            onChange={(e) => setFormData(prev => ({ ...prev, yearsExperience: e.target.value }))}
            className="select mt-1"
          >
            {getExperienceLevels().map(option => (
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
          Availability
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {getAvailabilitySlots().map(slot => (
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
          Industry Focus
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {getIndustryOptions().map(industry => (
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
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Social Links</h3>
        
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
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          )}
        </button>
      </div>
    </form>
  )
}