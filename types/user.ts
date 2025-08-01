export interface User {
  id: string
  title: string
  slug: string
  created_at?: string
  modified_at?: string
  status?: string
  published_at?: string
  metadata: UserMetadata
}

export interface UserMetadata {
  full_name: string
  email: string
  password_hash: string
  role: string | { key: string; value: string }
  job_title: string
  company: string
  bio?: string
  profile_photo?: {
    url: string
    imgix_url: string
  }
  linkedin_url?: string
  twitter_url?: string
  website_url?: string
  timezone: string | { key: string; value: string }
  availability: string[]
  years_experience: string | { key: string; value: string }
  industry_focus: string[]
  active_member: boolean
  join_date: string
  last_active: string
  email_verified?: boolean
  email_verified_at?: string
  onboarding_step?: number
  onboarding_completed?: boolean
  profile_completed?: boolean
}

export interface CreateUserData {
  title: string
  slug: string
  metadata: Omit<UserMetadata, 'email_verified' | 'email_verified_at'> & {
    onboarding_step?: number
    onboarding_completed?: boolean
    profile_completed?: boolean
  }
}

export interface UpdateUserData {
  title?: string
  slug?: string
  metadata?: Partial<UserMetadata>
}

export interface AuthUser {
  id: string
  email: string
  name: string
  role: string
  cosmicId: string
}

export interface UserProfile {
  id: string
  name: string
  email: string
  jobTitle: string
  company: string
  bio?: string
  profilePhoto?: string
  linkedinUrl?: string
  twitterUrl?: string
  websiteUrl?: string
  timezone: string
  availability: string[]
  yearsExperience: string
  industryFocus: string[]
  joinDate: string
  lastActive: string
}

// Validation interfaces
export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

export interface SignupFormData {
  fullName: string
  email: string
  password: string
  confirmPassword: string
  jobTitle: string
  company: string
  bio?: string
  timezone: string
  availability: string[]
  yearsExperience: string
  industryFocus: string[]
  linkedinUrl?: string
  twitterUrl?: string
  websiteUrl?: string
}

// Onboarding specific types
export interface OnboardingData {
  step: number
  completed: boolean
  profileCompleted: boolean
  emailVerified: boolean
}

export interface ProfileSetupData {
  bio?: string
  timezone: string
  availability: string[]
  yearsExperience: string
  industryFocus: string[]
  linkedinUrl?: string
  profilePhoto?: File
}