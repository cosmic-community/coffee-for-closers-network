export * from './cosmic'

// Additional types for application functionality
export interface JWTPayload {
  userId: string
  email: string
  role?: string
  type?: string
  exp?: number
  iat?: number
}

export interface EmailOptions {
  to: string
  subject: string
  html?: string
  text?: string
}

export interface EmailTemplate {
  subject: string
  html: string
  text: string
}

export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

export interface MatchingStats {
  totalMatches: number
  completedMatches: number
  cancelledMatches: number
  upcomingMatches: number
  averageRating: number
}

export interface OnboardingData {
  onboarding_step?: number
  onboarding_completed?: boolean
  profile_completed?: boolean
  [key: string]: any
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

export interface SigninFormData {
  email: string
  password: string
}

export interface ProfileFormData {
  fullName: string
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

export interface AuthContextType {
  user: AuthUser | null
  isLoading: boolean
  isAuthenticated: boolean
  isAdmin: boolean
  isMember: boolean
  signOut: () => Promise<void>
  refreshUser?: () => Promise<void>
}

// Re-export commonly used types for convenience
export type {
  User,
  CreateUserData,
  UpdateUserData,
  Post,
  PostType,
  BlogArticle,
  BlogCategory,
  CoffeeChat,
  ChatStatus,
  CallToAction,
  CTAType,
  AdminSettings,
  ApiResponse,
  AuthUser,
  BlogFilters,
  PostFilters,
  ChatFilters
} from './cosmic'