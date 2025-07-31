export interface CosmicFile {
  url: string
  imgix_url: string
}

export interface CosmicSelectOption {
  key: string
  value: string
}

export interface CosmicUser {
  id: string
  title: string
  slug: string
  created_at?: string
  modified_at?: string
  status?: string
  metadata: {
    full_name: string
    email: string
    password_hash: string
    role: string | CosmicSelectOption
    job_title: string
    company: string
    bio?: string
    profile_photo?: CosmicFile
    linkedin_url?: string
    twitter_url?: string
    website_url?: string
    timezone: string | CosmicSelectOption
    availability: string[]
    years_experience: string | CosmicSelectOption
    industry_focus: string[]
    active_member: boolean
    join_date?: string
    last_active?: string
    onboarding_completed?: boolean
    profile_completed?: boolean
    onboarding_step?: string
    welcome_completed?: boolean
    interests?: string[]
  }
}

export interface User extends CosmicUser {}

export interface AuthUser {
  id: string
  email: string
  name: string
  role: string
  cosmicId: string
  metadata?: CosmicUser['metadata']
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

export interface UpdateUserData {
  title?: string
  slug?: string
  metadata?: Partial<CosmicUser['metadata']>
}

export interface Post {
  id: string
  title: string
  slug: string
  created_at?: string
  metadata: {
    content: string
    author: CosmicUser
    post_type: CosmicSelectOption
    featured_image?: CosmicFile
    tags: string[]
    likes_count?: number
    comments_count?: number
    featured_post: boolean
    posted_date?: string
  }
}

export interface BlogArticle {
  id: string
  title: string
  slug: string
  created_at?: string
  metadata: {
    headline: string
    excerpt: string
    content: string
    featured_image: CosmicFile
    author: CosmicUser
    category: CosmicSelectOption
    tags: string[]
    seo_title?: string
    seo_description?: string
    published_date?: string
    read_time?: number
    featured_article: boolean
  }
}

export interface CoffeeChat {
  id: string
  title: string
  slug: string
  created_at?: string
  metadata: {
    chat_title: string
    participant_1: CosmicUser
    participant_2: CosmicUser
    scheduled_date: string
    status: CosmicSelectOption
    meeting_link?: string
    calendly_event_id?: string
    notes?: string
    feedback_participant_1?: string
    feedback_participant_2?: string
    rating?: CosmicSelectOption
    week_of_match?: string
    auto_generated: boolean
  }
}

export interface CallToAction {
  id: string
  title: string
  slug: string
  created_at?: string
  metadata: {
    cta_title: string
    cta_description: string
    button_text: string
    button_link: string
    cta_type: CosmicSelectOption
    background_color?: string
    text_color?: string
    active: boolean
    priority_order?: number
  }
}

export interface AdminSettings {
  id: string
  title: string
  slug: string
  created_at?: string
  metadata: {
    site_title: string
    site_description: string
    matching_enabled: boolean
    weekly_match_day: CosmicSelectOption
    max_chats_per_week: number
    welcome_email_enabled: boolean
    match_notification_enabled: boolean
    community_feed_enabled: boolean
    donation_enabled: boolean
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

export interface AuthContextType {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<{ user: AuthUser }>
  signOut: () => Promise<void>
  refreshUser: () => Promise<void>
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  total: number
  page: number
  limit: number
}