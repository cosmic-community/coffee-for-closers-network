// Base Cosmic Object Interface
export interface BaseCosmicObject {
  id: string
  title: string
  slug: string
  status: 'published' | 'draft'
  created_at: string
  modified_at: string
  metadata: Record<string, any>
}

// User Types
export interface UserRole {
  key: string
  value: string
}

export interface UserMetadata {
  full_name: string
  email: string
  password_hash: string
  role: string | UserRole
  job_title: string
  company: string
  bio: string
  timezone: string
  availability: string[]
  years_experience: string
  industry_focus: string[]
  linkedin_url: string
  twitter_url: string
  website_url: string
  active_member: boolean
  join_date: string
  last_active: string
  email_verified?: boolean
  email_verified_at?: string
  password_reset_at?: string
  onboarding_step?: number
  onboarding_completed?: boolean
  profile_completed?: boolean
  profile_photo?: {
    imgix_url: string
    url: string
  }
}

export interface User extends BaseCosmicObject {
  metadata: UserMetadata
}

export interface AuthUser {
  id: string
  email: string
  name: string
  role: string
  cosmicId: string
  profile?: UserProfile
}

export interface UserProfile {
  job_title: string
  company: string
  bio: string
  profile_photo?: {
    imgix_url: string
    url: string
  }
  timezone: string
  availability: string[]
  years_experience: string
  industry_focus: string[]
  linkedin_url: string
  twitter_url: string
  website_url: string
  active_member: boolean
  join_date: string
  last_active: string
}

// Auth Context Types
export interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  isAdmin: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

// Form Data Types
export interface SignupFormData {
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

export interface QuickSignupFormData {
  fullName: string
  email: string
  password: string
  jobTitle: string
  company: string
}

export interface CreateUserData {
  title: string
  slug: string
  metadata: Omit<UserMetadata, 'password_reset_at' | 'email_verified' | 'email_verified_at' | 'onboarding_completed' | 'profile_completed'>
}

// Onboarding Types
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

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean
  message?: string
  error?: string
  data?: T
}

export interface AuthResponse extends ApiResponse {
  user?: {
    id: string
    email: string
    name: string
    role?: string
    cosmicId?: string
    onboardingToken?: string
  }
}

export interface UserResponse extends ApiResponse {
  user?: User
}

export interface UsersResponse extends ApiResponse {
  users?: User[]
}

// Validation Types
export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

// Analytics Types
export interface AnalyticsEvent {
  event: string
  properties: Record<string, any>
  timestamp: string
  url?: string
  userAgent?: string
  referrer?: string
}

export interface SignupEvent {
  email?: string
  userId?: string
  company?: string
  jobTitle?: string
  step?: string
  error?: string
  source?: string
}

// Email Types
export interface EmailTemplate {
  subject: string
  html: string
  text: string
}

export interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

// JWT Payload Types
export interface JWTPayload {
  userId?: string
  email?: string
  role?: string
  type?: string
  exp?: number
  iat?: number
}

// NextAuth Types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      role: string
      cosmicId: string
    }
  }

  interface User {
    id: string
    email: string
    name: string
    role: string
    cosmicId: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: string
    cosmicId: string
  }
}

// Utility Types
export type UserJourneyStep = {
  step: string
  timestamp: number
  properties?: any
}

export type SignupStep = 'form' | 'verification' | 'success'

export type ConversionType = 'signup' | 'email_verified' | 'profile_completed' | 'first_match'

export type SignupVariant = 'default' | 'social_first' | 'minimal'