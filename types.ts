export interface User {
  id: string
  title: string
  slug: string
  created_at?: string
  metadata: {
    full_name: string
    email: string
    password_hash: string
    role: 'member' | 'admin' | { key: string; value: string }
    job_title: string
    company: string
    bio: string
    profile_photo?: {
      url: string
      imgix_url: string
    }
    linkedin_url: string
    twitter_url: string | null
    website_url: string | null
    timezone: { key: string; value: string } | string
    availability: string[]
    years_experience: { key: string; value: string } | string
    industry_focus: string[]
    active_member: boolean
    join_date: string
    last_active: string
    email_verified?: boolean
    email_verified_at?: string
    password_reset_at?: string
  }
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

export interface UpdateUserData {
  title?: string
  slug?: string
  metadata?: Partial<User['metadata']>
}

export interface AuthUser {
  id: string
  email: string
  name: string
  role: string
  cosmicId: string
  profile?: {
    full_name?: string
    job_title?: string
    company?: string
    profile_photo?: {
      url: string
      imgix_url: string
    }
  }
}

export interface Post {
  id: string
  title: string
  slug: string
  created_at?: string
  metadata: {
    content: string
    author: User
    post_type: { key: string; value: string }
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

export type PostType = 'tip' | 'win' | 'question' | 'resource' | 'general'

export interface BlogArticle {
  id: string
  title: string
  slug: string
  created_at?: string
  metadata: {
    headline: string
    excerpt: string
    content: string
    featured_image: {
      url: string
      imgix_url: string
    }
    author: User
    category: { key: string; value: string }
    tags: string[]
    seo_title: string
    seo_description: string
    published_date: string
    read_time: number
    featured_article: boolean
  }
}

export type BlogCategory = 'sales-tips' | 'networking' | 'career-growth' | 'saas-industry' | 'community' | 'tools-resources'

export interface CoffeeChat {
  id: string
  title: string
  slug: string
  created_at?: string
  metadata: {
    chat_title: string
    participant_1: User
    participant_2: User
    scheduled_date: string
    status: { key: string; value: string }
    meeting_link: string
    calendly_event_id: string
    notes: string
    feedback_participant_1: string | null
    feedback_participant_2: string | null
    rating: { key: string; value: string }
    week_of_match: string
    auto_generated: boolean
  }
}

export type ChatStatus = 'scheduled' | 'completed' | 'cancelled' | 'no-show'

export interface CallToAction {
  id: string
  title: string
  slug: string
  metadata: {
    cta_title: string
    cta_description: string
    button_text: string
    button_link: string
    cta_type: { key: string; value: string }
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

export type TimeZoneKey = 'EST' | 'CST' | 'MST' | 'PST' | 'GMT' | 'CET'
export type ExperienceLevel = '0-2' | '3-5' | '6-10' | '10+'

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}