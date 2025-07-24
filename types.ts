export interface User {
  id: string
  title: string
  slug: string
  created_at: string
  metadata: {
    full_name: string
    email: string
    password_hash: string
    role: {
      key: string
      value: string
    } | string
    job_title: string
    company: string
    bio: string
    profile_photo?: {
      url: string
      imgix_url: string
    }
    linkedin_url: string
    twitter_url: string
    website_url: string
    timezone: {
      key: string
      value: string
    } | string
    availability: string[]
    years_experience: {
      key: string
      value: string
    } | string
    industry_focus: string[]
    active_member: boolean
    join_date: string
    last_active: string
  }
}

export interface AuthUser {
  id: string
  email: string
  name: string
  role: string
  cosmicId: string
}

export interface Post {
  id: string
  title: string
  slug: string
  created_at: string
  metadata: {
    content: string
    author: User
    post_type: {
      key: string
      value: string
    }
    featured_image?: {
      url: string
      imgix_url: string
    }
    tags: string[]
    likes_count: number
    comments_count: number
    featured_post: boolean
    posted_date: string
  }
}

export interface BlogArticle {
  id: string
  title: string
  slug: string
  created_at: string
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
      key: string
      value: string
    }
    tags: string[]
    seo_title: string
    seo_description: string
    published_date: string
    read_time: number
    featured_article: boolean
  }
}

export interface CoffeeChat {
  id: string
  title: string
  slug: string
  created_at: string
  metadata: {
    chat_title: string
    participant_1: User
    participant_2: User
    scheduled_date: string
    status: {
      key: string
      value: string
    }
    meeting_link: string
    calendly_event_id: string
    notes: string
    feedback_participant_1: string
    feedback_participant_2: string
    rating: {
      key: string
      value: string
    }
    week_of_match: string
    auto_generated: boolean
  }
}

export interface CallToAction {
  id: string
  title: string
  slug: string
  created_at: string
  metadata: {
    cta_title: string
    cta_description: string
    button_text: string
    button_link: string
    cta_type: {
      key: string
      value: string
    }
    background_color: string
    text_color: string
    active: boolean
    priority_order: number
  }
}

export interface AdminSettings {
  id: string
  title: string
  slug: string
  created_at: string
  metadata: {
    site_title: string
    site_description: string
    matching_enabled: boolean
    weekly_match_day: {
      key: string
      value: string
    }
    max_chats_per_week: number
    welcome_email_enabled: boolean
    match_notification_enabled: boolean
    community_feed_enabled: boolean
    donation_enabled: boolean
    stripe_public_key: string
    calendly_url: string
    contact_email: string
    social_links: {
      twitter: string
      linkedin: string
      github: string
    }
  }
}

// Type aliases for dropdown values
export type BlogCategory = 'sales-tips' | 'networking' | 'career-growth' | 'saas-industry' | 'community' | 'tools-resources'
export type PostType = 'tip' | 'win' | 'question' | 'resource' | 'general'
export type ChatStatus = 'scheduled' | 'completed' | 'cancelled' | 'no-show'
export type TimeZoneKey = 'EST' | 'CST' | 'MST' | 'PST' | 'GMT' | 'CET'
export type ExperienceLevel = '0-2' | '3-5' | '6-10' | '10+'

// Additional interface for matching system
export interface CreateChatData {
  title: string
  metadata: {
    chat_title: string
    participant_1: string
    participant_2: string
    scheduled_date: string
    status: string
    week_of_match: string
    auto_generated: boolean
  }
}

// Form interfaces
export interface SignUpFormData {
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
  }
}

// API Response interfaces
export interface CosmicResponse<T> {
  object?: T
  objects?: T[]
  total?: number
}

export interface CosmicError {
  message: string
  status?: number
}

// Auth interfaces
export interface SignInCredentials {
  email: string
  password: string
}

export interface AuthResponse {
  success: boolean
  user?: AuthUser
  error?: string
  message?: string
}

export interface SessionUser extends AuthUser {
  profile: {
    job_title: string
    company: string
    bio: string
    profile_photo?: {
      url: string
      imgix_url: string
    }
    timezone: {
      key: string
      value: string
    } | string
    availability: string[]
    years_experience: {
      key: string
      value: string
    } | string
    industry_focus: string[]
    linkedin_url: string
    twitter_url: string
    website_url: string
    active_member: boolean
    join_date: string
    last_active: string
  }
}

// Utility types
export type OptionalExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>
export type RequiredExcept<T, K extends keyof T> = Required<T> & Partial<Pick<T, K>>

// NextAuth types extension
declare module 'next-auth' {
  interface Session {
    user: AuthUser
  }
  
  interface User extends AuthUser {}
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: string
    cosmicId: string
  }
}