// Base Cosmic object interface
export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  bucket: string
  created_at: string
  modified_at: string
  status: 'published' | 'draft'
  thumbnail?: string
  published_at: string
  modified_by: string
  created_by: string
  type: string
}

// User-related types
export interface User extends CosmicObject {
  type: 'users'
  metadata: {
    full_name: string
    email: string
    role: {
      key: 'member' | 'admin'
      value: 'Member' | 'Admin'
    }
    job_title: string
    company: string
    bio?: string
    profile_photo?: {
      url: string
      imgix_url: string
    }
    linkedin_url?: string
    twitter_url?: string | null
    website_url?: string | null
    timezone: {
      key: 'EST' | 'CST' | 'MST' | 'PST' | 'GMT' | 'CET'
      value: string
    }
    availability: string[]
    years_experience: {
      key: '0-2' | '3-5' | '6-10' | '10+'
      value: string
    }
    industry_focus: string[]
    active_member: boolean
    join_date?: string
    last_active?: string
  }
}

export interface CreateUserData {
  title: string
  metadata: Omit<User['metadata'], 'role' | 'active_member' | 'join_date' | 'last_active'> & {
    role?: User['metadata']['role']
    active_member?: boolean
    join_date?: string
    last_active?: string
  }
}

export interface UpdateUserData {
  title?: string
  metadata?: Partial<User['metadata']>
}

// Post-related types
export type PostType = 'tip' | 'win' | 'question' | 'resource' | 'general'

export interface Post extends CosmicObject {
  type: 'posts'
  metadata: {
    content: string
    author: User
    post_type: {
      key: PostType
      value: string
    }
    featured_image?: {
      url: string
      imgix_url: string
    }
    tags?: string[]
    likes_count?: number
    comments_count?: number
    featured_post: boolean
    posted_date?: string
  }
}

// Blog article types
export type BlogCategory = 'sales-tips' | 'networking' | 'career-growth' | 'saas-industry' | 'community' | 'tools-resources'

export interface BlogArticle extends CosmicObject {
  type: 'blog-articles'
  metadata: {
    headline: string
    excerpt: string
    content: string
    featured_image: {
      url: string
      imgix_url: string
    }
    author: User
    category: {
      key: BlogCategory
      value: string
    }
    tags: string[]
    seo_title?: string
    seo_description?: string
    published_date?: string
    read_time?: number
    featured_article: boolean
  }
}

// Coffee chat types
export type ChatStatus = 'scheduled' | 'completed' | 'cancelled' | 'no-show'

export interface CoffeeChat extends CosmicObject {
  type: 'coffee-chats'
  metadata: {
    chat_title: string
    participant_1: User
    participant_2: User
    scheduled_date: string
    status: {
      key: ChatStatus
      value: string
    }
    meeting_link?: string
    calendly_event_id?: string
    notes?: string
    feedback_participant_1?: string | null
    feedback_participant_2?: string | null
    rating?: {
      key: string
      value: string
    }
    week_of_match?: string
    auto_generated: boolean
  }
}

// Call to action types
export type CTAType = 'homepage-hero' | 'homepage-secondary' | 'blog-sidebar' | 'footer' | 'dashboard'

export interface CallToAction extends CosmicObject {
  type: 'call-to-actions'
  metadata: {
    cta_title: string
    cta_description: string
    button_text: string
    button_link: string
    cta_type: {
      key: CTAType
      value: string
    }
    background_color?: string
    text_color?: string
    active: boolean
    priority_order?: number
  }
}

// Admin settings types
export interface AdminSettings extends CosmicObject {
  type: 'admin-settings'
  metadata: {
    site_title: string
    site_description: string
    matching_enabled: boolean
    weekly_match_day: {
      key: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday'
      value: string
    }
    max_chats_per_week: number
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

// API response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Authentication types
export interface AuthUser {
  id: string
  email: string
  name: string
  image?: string
  cosmicId?: string
  role?: 'admin' | 'member'
}

// Matching statistics
export interface MatchingStats {
  totalMatches: number
  completedMatches: number
  cancelledMatches: number
  upcomingMatches: number
  averageRating: number
}

// Form types
export interface SignupFormData {
  full_name: string
  email: string
  password: string
  job_title: string
  company: string
  bio?: string
  timezone: string
  availability: string[]
  years_experience: string
  industry_focus: string[]
}

export interface SigninFormData {
  email: string
  password: string
}

export interface ProfileFormData {
  full_name: string
  job_title: string
  company: string
  bio?: string
  linkedin_url?: string
  twitter_url?: string
  website_url?: string
  timezone: string
  availability: string[]
  years_experience: string
  industry_focus: string[]
}

// Filter types
export interface BlogFilters {
  category: BlogCategory | 'all'
  search: string
}

export interface PostFilters {
  type: PostType | 'all'
  author?: string
}

export interface ChatFilters {
  status: ChatStatus | 'all'
  dateRange?: {
    from: Date
    to: Date
  }
}