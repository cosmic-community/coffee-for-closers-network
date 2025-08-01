// Base Cosmic CMS types
export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  status: 'draft' | 'published'
  created_at: string
  modified_at: string
  thumbnail?: string
  metadata?: Record<string, any>
}

// User types
export interface UserMetadata {
  full_name: string
  email: string
  password_hash: string
  role: 'admin' | 'member' | { key: string; value: string }
  job_title: string
  company: string
  bio: string
  profile_photo?: {
    url: string
    imgix_url: string
  }
  timezone: string | { key: string; value: string }
  availability: string[]
  years_experience: string | { key: string; value: string }
  industry_focus: string[]
  linkedin_url: string
  twitter_url: string | null
  website_url: string | null
  active_member: boolean
  join_date: string
  last_active: string
  onboarding_step?: number
  onboarding_completed?: boolean
  profile_completed?: boolean
  email_verified?: boolean
  email_verification_token?: string
  email_verification_expires?: string
  password_reset_token?: string
  password_reset_expires?: string
  password_reset_at?: string
}

export interface User extends CosmicObject {
  metadata: UserMetadata
}

export interface AuthUser {
  id: string
  email: string
  name: string
  role: 'admin' | 'member'
  metadata?: Partial<UserMetadata>
}

export interface CreateUserData {
  title: string
  slug: string
  metadata: {
    full_name: string
    email: string
    password_hash: string
    role: string
    job_title: string
    company: string
    bio?: string
    profile_photo?: {
      url: string
      imgix_url: string
    }
    timezone: string
    availability: string[]
    years_experience: string
    industry_focus: string[]
    linkedin_url?: string
    twitter_url?: string
    website_url?: string
    active_member: boolean
    join_date: string
    last_active: string
    onboarding_step?: number
    onboarding_completed?: boolean
    profile_completed?: boolean
  }
}

// Auth context types
export interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  isAdmin: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

// Onboarding types
export interface OnboardingData {
  bio?: string
  timezone?: string
  availability?: string[]
  years_experience?: string
  industry_focus?: string[]
  linkedin_url?: string
  twitter_url?: string
  website_url?: string
  onboarding_step?: number
  onboarding_completed?: boolean
  profile_completed?: boolean
}

// Validation types
export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

// Form data types
export interface SignupFormData {
  fullName: string
  email: string
  password: string
  confirmPassword: string
  jobTitle: string
  company: string
  bio?: string
  timezone?: string
  availability: string[]
  yearsExperience?: string
  industryFocus?: string[]
  linkedinUrl?: string
  twitterUrl?: string
  websiteUrl?: string
}

// JWT types
export interface JWTPayload {
  userId: string
  email: string
  role: 'admin' | 'member'
  exp?: number
  iat?: number
}

// Email types
export interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

export interface EmailTemplate {
  subject: string
  html: string
  text: string
}

// Blog types
export interface BlogPost extends CosmicObject {
  metadata: {
    excerpt: string
    author: User
    category: string
    tags: string[]
    featured_image?: {
      url: string
      imgix_url: string
    }
    published_date: string
    reading_time: number
    featured: boolean
  }
}

// Community types
export interface CommunityPost extends CosmicObject {
  metadata: {
    author: User
    content: string
    post_type: 'discussion' | 'question' | 'announcement'
    tags: string[]
    likes: number
    comments_count: number
    created_at: string
  }
}

// Chat types
export interface Chat extends CosmicObject {
  metadata: {
    participants: User[]
    scheduled_time: string
    duration: number
    status: 'scheduled' | 'completed' | 'cancelled'
    meeting_link?: string
    notes?: string
    topics: string[]
  }
}

// Re-export for backward compatibility
export type { AuthUser as User } from './index'