export interface AuthUser {
  id: string
  email: string
  name: string
  role: string
  cosmicId: string
  metadata?: {
    full_name?: string
    email?: string
    role?: string | { key: string; value: string }
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
    job_title?: string
    company?: string
    password_hash?: string
  }
}

export interface AuthContextType {
  user: AuthUser | null
  isLoading: boolean
  isAuthenticated: boolean
  isAdmin: boolean
  refreshUser: () => Promise<void>
  signOut: () => Promise<void>
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
    twitter_url: string
    website_url: string
    active_member: boolean
    join_date: string
    last_active: string
    onboarding_completed?: boolean
    profile_completed?: boolean
  }
}