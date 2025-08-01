// Base Cosmic object interface
export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  bucket?: string
  created_at?: string
  modified_at?: string
  status?: string
  thumbnail?: string
  published_at?: string
  modified_by?: string
  created_by?: string
  type?: string
}

// User related types
export interface User extends CosmicObject {
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
    timezone: { key: string; value: string } | string
    availability: string[]
    years_experience: { key: string; value: string } | string
    industry_focus: string[]
    active_member: boolean
    join_date?: string
    last_active?: string
    onboarding_step?: number
    onboarding_completed?: boolean
    profile_completed?: boolean
    email_verified?: boolean
    email_verification_token?: string
    password_reset_token?: string
    password_reset_at?: string
  }
}

export interface AuthUser {
  id: string
  email: string
  name: string
  role: 'admin' | 'member'
  metadata?: User['metadata']
}

export interface CreateUserData {
  title: string
  slug: string
  metadata: Omit<User['metadata'], 'email_verified' | 'email_verification_token' | 'password_reset_token' | 'password_reset_at'> & {
    email_verified?: boolean
    email_verification_token?: string
    password_reset_token?: string
    password_reset_at?: string
  }
}

export interface UpdateUserData {
  title?: string
  metadata?: Partial<User['metadata']>
}

// Post related types
export type PostType = 'tip' | 'win' | 'question' | 'resource' | 'general'

export interface Post extends CosmicObject {
  metadata: {
    content: string
    author: User
    post_type: { key: PostType; value: string }
    featured_image?: {
      url: string
      imgix_url: string
    }
    tags: string[]
    likes_count?: number
    comments_count?: number
    featured_post: boolean
    posted_date?: string
  }
}

// Blog related types
export type BlogCategory = 'sales-tips' | 'networking' | 'career-growth' | 'saas-industry' | 'community' | 'tools-resources'

export interface BlogArticle extends CosmicObject {
  metadata: {
    headline: string
    excerpt: string
    content: string
    featured_image: {
      url: string
      imgix_url: string
    }
    author: User
    category: { key: BlogCategory; value: string }
    tags: string[]
    seo_title?: string
    seo_description?: string
    published_date?: string
    read_time?: number
    featured_article: boolean
  }
}

// Coffee Chat related types
export type ChatStatus = 'scheduled' | 'completed' | 'cancelled' | 'no-show'

export interface CoffeeChat extends CosmicObject {
  metadata: {
    chat_title: string
    participant_1: User
    participant_2: User
    scheduled_date: string
    status: { key: ChatStatus; value: string }
    meeting_link?: string
    calendly_event_id?: string
    notes?: string
    feedback_participant_1?: string
    feedback_participant_2?: string
    rating?: { key: string; value: string }
    week_of_match?: string
    auto_generated: boolean
  }
}

// Call to Action types
export type CTAType = 'homepage-hero' | 'homepage-secondary' | 'blog-sidebar' | 'footer' | 'dashboard'

export interface CallToAction extends CosmicObject {
  metadata: {
    cta_title: string
    cta_description: string
    button_text: string
    button_link: string
    cta_type: { key: CTAType; value: string }
    background_color?: string
    text_color?: string
    active: boolean
    priority_order?: number
  }
}

// Admin Settings types
export interface AdminSettings extends CosmicObject {
  metadata: {
    site_title: string
    site_description: string
    matching_enabled: boolean
    weekly_match_day: { key: string; value: string }
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
      [key: string]: string | undefined
    }
  }
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Filter types
export interface BlogFilters {
  category?: BlogCategory
  search?: string
  featured?: boolean
}

export interface PostFilters {
  type?: PostType
  author?: string
  search?: string
  featured?: boolean
}

export interface ChatFilters {
  status?: ChatStatus
  participant?: string
  dateRange?: {
    start: string
    end: string
  }
}