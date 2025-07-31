import { User } from '@cosmicjs/sdk'

// Auth types
export interface AuthUser {
  id: string
  email: string
  name: string
  role: string
  cosmicId: string
  metadata?: {
    full_name?: string
    email?: string
    password_hash?: string
    role?: string | { key: string; value: string }
    job_title?: string
    company?: string
    bio?: string
    timezone?: string
    availability?: string[]
    years_experience?: string
    industry_focus?: string[]
    linkedin_url?: string
    twitter_url?: string
    website_url?: string
    active_member?: boolean
    join_date?: string
    last_active?: string
    onboarding_completed?: boolean
    profile_completed?: boolean
    onboarding_step?: number
    welcome_completed?: boolean
    interests?: string[]
  }
}

export interface AuthContextType {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  refreshUser: () => Promise<void>
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
    bio: string
    timezone: string
    availability: string[]
    years_experience: string
    industry_focus: string[]
    linkedin_url: string
    twitter_url?: string
    website_url?: string
    active_member: boolean
    join_date: string
    last_active: string
    onboarding_completed?: boolean
    profile_completed?: boolean
    onboarding_step?: number
    welcome_completed?: boolean
    interests?: string[]
  }
}

// JWT types
export interface JWTPayload {
  userId: string
  email: string
  role: string
  iat?: number
  exp?: number
}

// Cosmic types
export interface CosmicUser extends User {
  metadata: {
    full_name: string
    email: string
    password_hash: string
    role: string | { key: string; value: string }
    job_title: string
    company: string
    bio?: string
    timezone?: string
    availability?: string[]
    years_experience?: string
    industry_focus?: string[]
    linkedin_url?: string
    twitter_url?: string
    website_url?: string
    active_member: boolean
    join_date: string
    last_active: string
    onboarding_completed?: boolean
    profile_completed?: boolean
    onboarding_step?: number
    welcome_completed?: boolean
    interests?: string[]
  }
}

// API Response types
export interface APIResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Onboarding types
export interface OnboardingData {
  interests?: string[]
  welcome_completed?: boolean
  bio?: string
  timezone?: string
  availability?: string[]
  years_experience?: string
  industry_focus?: string[]
  linkedin_url?: string
  profile_completed?: boolean
  onboarding_completed?: boolean
  onboarding_step?: number
}

// Form types
export interface SignUpFormData {
  fullName: string
  email: string
  password: string
  jobTitle: string
  company: string
  bio?: string
  timezone?: string
  availability?: string[]
  yearsExperience?: string
  industryFocus?: string[]
  linkedinUrl?: string
  twitterUrl?: string
  websiteUrl?: string
}

export interface SignInFormData {
  email: string
  password: string
}

// Password validation
export interface PasswordValidation {
  isValid: boolean
  errors: string[]
}

// Chat types
export interface ChatRequest {
  id: string
  requester: AuthUser
  recipient: AuthUser
  message: string
  status: 'pending' | 'accepted' | 'declined' | 'completed'
  scheduledDate?: string
  createdAt: string
  updatedAt: string
}

// Blog types
export interface BlogPost extends User {
  metadata: {
    excerpt: string
    featured_image?: { imgix_url: string }
    author?: CosmicUser
    tags?: string[]
    read_time?: number
    published_date: string
    featured?: boolean
  }
}

// Community types
export interface CommunityPost extends User {
  metadata: {
    content: string
    author: CosmicUser
    likes?: number
    comments?: Comment[]
    tags?: string[]
    posted_date: string
  }
}

export interface Comment {
  id: string
  author: CosmicUser
  content: string
  createdAt: string
}