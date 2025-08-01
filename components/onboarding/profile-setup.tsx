'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, ArrowLeft, User, MapPin, Briefcase } from 'lucide-react'
import { useOnboarding } from '@/hooks/use-onboarding'
import { useAuth } from '@/hooks/use-auth'
import { 
  getAvailabilitySlots, 
  getTimezoneOptions, 
  getExperienceLevels, 
  getIndustryOptions 
} from '@/lib/utils'
import toast from 'react-hot-toast'

interface ProfileData {
  bio: string
  timezone: string
  availability: string[]
  yearsExperience: string
  industryFocus: string[]
  linkedinUrl: string
}

export function ProfileSetup() {
  const { user } = useAuth()
  
  // Extract string values from metadata safely
  const getStringValue = (value: string | { key: string; value: string } | undefined): string => {
    if (!value) return ''
    if (typeof value === 'string') {
      return value
    }
    if (typeof value === 'object' && 'value' in value) {
      return value.value
    }
    return ''
  }

  const [profileData, setProfileData] = useState<ProfileData>({
    bio: user?.metadata?.bio || '',
    timezone: getStringValue(user?.metadata?.timezone) || 'EST',
    availability: user?.metadata?.availability || [],
    yearsExperience: getStringValue(user?.metadata?.years_experience) || '0-2',
    industryFocus: user?.metadata?.industry_focus || [],
    linkedinUrl: user?.metadata?.linkedin_url || ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { updateOnboardingStep } = useOnboarding()

  const handleAvailabilityChange = (slot: string) => {
    setProfileData(prev => ({
      ...prev,
      availability: prev.availability.includes(slot)
        ? prev.availability.filter(s => s !== slot)
        : [...prev.availability, slot]
    }))
  }

  const handleIndustryChange = (industry: string) => {
    setProfileData(prev => ({
      ...prev,
      industryFocus: prev.industryFocus.includes(industry)
        ? prev.industryFocus.filter(i => i !== industry)
        : [...prev.industryFocus, industry]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (profileData.availability.length === 0) {
      toast.error('Please select at least one availability slot')
      return
    }

    setIsLoading(true)
    
    try {
      await updateOnboardingStep(2, {
        bio: profileData.bio,
        timezone: profileData.timezone,
        availability: profileData.availability,
        years_experience: profileData.yearsExperience,
        industry_focus: profileData.industryFocus,
        linkedin_url: profileData.linkedinUrl,
        profile_completed: true,
        onboarding_completed: true
      })
      
      toast.success('Profile setup complete! Welcome to the network!')
      router.push('/dashboard?welcome=true')
    } catch (error) {
      console.error('Failed to complete profile setup:', error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    router.push('/onboarding/welcome')
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="mx-auto w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-6">
          <User className="h-8 w-8 text-primary-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Complete Your Profile
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Help other members know more about you and your sales experience.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Bio Section */}
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tell us about yourself
            </label>
            <textarea
              id="bio"
              value={profileData.bio}
              onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
              rows={4}
              className="input"
              placeholder="Share your sales experience, what you're passionate about, or what you're looking to learn..."
            />
            <p className="mt-1 text-xs text-gray-500">
              This helps other members understand your background and interests.
            </p>
          </div>

          {/* Timezone & Experience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <MapPin className="inline h-4 w-4 mr-1" />
                Timezone
              </label>
              <select
                id="timezone"
                value={profileData.timezone}
                onChange={(e) => setProfileData(prev => ({ ...prev, timezone: e.target.value }))}
                className="input"
              >
                {getTimezoneOptions().map((option) => (
                  <option key={option.key} value={option.key}>
                    {option.value}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="yearsExperience" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Briefcase className="inline h-4 w-4 mr-1" />
                Years of Experience
              </label>
              <select
                id="yearsExperience"
                value={profileData.yearsExperience}
                onChange={(e) => setProfileData(prev => ({ ...prev, yearsExperience: e.target.value }))}
                className="input"
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              When are you typically available for coffee chats? *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {getAvailabilitySlots().map((slot) => (
                <label key={slot} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profileData.availability.includes(slot)}
                    onChange={() => handleAvailabilityChange(slot)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{slot}</span>
                </label>
              ))}
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Select all times that work for you. You can always change this later.
            </p>
          </div>

          {/* Industry Focus */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Industry Focus (Optional)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {getIndustryOptions().map((industry) => (
                <label key={industry} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profileData.industryFocus.includes(industry)}
                    onChange={() => handleIndustryChange(industry)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{industry}</span>
                </label>
              ))}
            </div>
          </div>

          {/* LinkedIn URL */}
          <div>
            <label htmlFor="linkedinUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              LinkedIn Profile (Optional)
            </label>
            <input
              id="linkedinUrl"
              type="url"
              value={profileData.linkedinUrl}
              onChange={(e) => setProfileData(prev => ({ ...prev, linkedinUrl: e.target.value }))}
              className="input"
              placeholder="https://linkedin.com/in/yourprofile"
            />
            <p className="mt-1 text-xs text-gray-500">
              This helps other members learn more about your professional background.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={handleBack}
              className="btn btn-outline flex items-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </button>
            
            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Step 2 of 3 • Almost done!
              </p>
              <button
                type="submit"
                disabled={isLoading || profileData.availability.length === 0}
                className="btn btn-primary flex items-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Completing...
                  </>
                ) : (
                  <>
                    Complete Setup
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}