export interface User {
  id: string
  title: string
  slug?: string
  type: 'users'
  status: 'published' | 'draft'
  created_at: string
  modified_at: string
  published_at?: string
  metadata: {
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
    email_verification_token?: string
    password_reset_token?: string
    password_reset_expires?: string
    password_reset_at?: string
    onboarding_step?: number
    onboarding_completed?: boolean
    profile_completed?: boolean
  }
}

export interface Post {
  id: string
  title: string
  slug?: string
  type: 'posts'
  status: 'published' | 'draft'
  created_at: string
  modified_at: string
  published_at?: string
  metadata?: {
    content: string
    author?: User
    post_type?: {
      key: string
      value: string
    }
    featured_image?: {
      url: string
      imgix_url: string
    }
    tags?: string[]
    likes_count?: number
    comments_count?: number
    featured_post?: boolean
    posted_date?: string
  }
}

export interface BlogArticle {
  id: string
  title: string
  slug?: string
  type: 'blog-articles'
  status: 'published' | 'draft'
  created_at: string
  modified_at: string
  published_at?: string
  metadata?: {
    headline: string
    excerpt: string
    content: string
    featured_image?: {
      url: string
      imgix_url: string
    }
    author?: User
    category?: {
      key: string
      value: string
    }
    tags?: string[]
    seo_title?: string
    seo_description?: string
    published_date?: string
    read_time?: number
    featured_article?: boolean
  }
}

export interface CoffeeChat {
  id: string
  title: string
  slug?: string
  type: 'coffee-chats'
  status: 'published' | 'draft'
  created_at: string
  modified_at: string
  published_at?: string
  metadata?: {
    chat_title: string
    participant_1?: User
    participant_2?: User
    scheduled_date?: string
    status?: {
      key: string
      value: string
    }
    meeting_link?: string
    calendly_event_id?: string
    notes?: string
    feedback_participant_1?: string
    feedback_participant_2?: string
    rating?: {
      key: string
      value: string
    }
    week_of_match?: string
    auto_generated?: boolean
  }
}

export interface CallToAction {
  id: string
  title: string
  slug?: string
  type: 'call-to-actions'
  status: 'published' | 'draft'
  created_at: string
  modified_at: string
  published_at?: string
  metadata: {
    cta_title: string
    cta_description: string
    button_text: string
    button_link: string
    cta_type?: {
      key: string
      value: string
    }
    background_color?: string
    text_color?: string
    active?: boolean
    priority_order?: number
  }
}

export interface AdminSettings {
  id: string
  title: string
  slug?: string
  type: 'admin-settings'
  status: 'published' | 'draft'
  created_at: string
  modified_at: string
  published_at?: string
  metadata: {
    site_title: string
    site_description: string
    matching_enabled: boolean
    weekly_match_day?: {
      key: string
      value: string
    }
    max_chats_per_week?: number
    welcome_email_enabled?: boolean
    match_notification_enabled?: boolean
    community_feed_enabled?: boolean
    donation_enabled?: boolean
    stripe_public_key?: string
    calendly_url?: string
    contact_email?: string
    social_links?: {
      twitter?: string
      linkedin?: string
      github?: string
    }
  }
}

export interface AuthUser {
  id: string
  email: string
  name: string
  role: 'member' | 'admin'
  cosmicId: string
}

export interface AuthContextType {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  isAdmin: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

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
  linkedinUrl?: string
  twitterUrl?: string
  websiteUrl?: string
}

export interface CreateUserData {
  title: string
  slug: string
  metadata: Omit<User['metadata'], 'email_verified' | 'email_verification_token'>
}

export interface LoginData {
  email: string
  password: string
}

export interface OnboardingData {
  step?: number
  completed?: boolean
  profileCompleted?: boolean
  emailVerified?: boolean
  onboarding_step?: number
  onboarding_completed?: boolean
  profile_completed?: boolean
}

export interface JWTPayload {
  userId: string
  email: string
  role: string
  exp?: number
  iat?: number
}

export interface EmailOptions {
  to: string
  subject: string
  html: string
  text: string
}

export interface EmailTemplate {
  subject: string
  html: string
  text: string
}

export interface MatchingStats {
  totalMatches: number
  completedMatches: number
  cancelledMatches: number
  upcomingMatches: number
  averageRating: number
}

export interface NotificationPreferences {
  emailNotifications: boolean
  pushNotifications: boolean
  weeklyDigest: boolean
  matchNotifications: boolean
  newPostNotifications: boolean
}

export interface UserProfile extends User {
  chatsCount: number
  postsCount: number
  joinedDate: string
  lastActive: string
  connections: number
}

export interface ChatRequest {
  id: string
  requester: User
  recipient: User
  message?: string
  preferredTimes: string[]
  status: 'pending' | 'accepted' | 'declined' | 'expired'
  createdAt: string
  expiresAt: string
}

export interface ConnectionRequest {
  id: string
  sender: User
  recipient: User
  message?: string
  status: 'pending' | 'accepted' | 'declined'
  createdAt: string
}

export interface Activity {
  id: string
  type: 'chat_completed' | 'post_created' | 'profile_updated' | 'connection_made'
  user: User
  description: string
  createdAt: string
  metadata?: Record<string, any>
}

export interface Stats {
  totalUsers: number
  totalChats: number
  totalPosts: number
  activeUsers: number
  completedChats: number
  upcomingChats: number
}

export interface FilterOptions {
  industry?: string[]
  experience?: string[]
  timezone?: string[]
  availability?: string[]
  company?: string
  jobTitle?: string
}

export interface SearchFilters {
  query?: string
  type?: 'all' | 'users' | 'posts' | 'articles'
  industry?: string
  experience?: string
  sortBy?: 'recent' | 'popular' | 'relevant'
  dateRange?: 'all' | 'week' | 'month' | 'year'
}

export interface PaginationParams {
  page: number
  limit: number
  total?: number
}

export interface CosmicResponse<T> {
  objects?: T[]
  object?: T
  total?: number
}

export interface FormState {
  isSubmitting: boolean
  errors: Record<string, string>
  touched: Record<string, boolean>
  values: Record<string, any>
}

export interface ModalState {
  isOpen: boolean
  type?: string
  data?: any
}

export interface ToastMessage {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}