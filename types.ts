// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type_slug?: string;
  created_at: string;
  modified_at: string;
  status?: string;
  published_at?: string;
  bucket?: string;
  thumbnail?: string;
  type?: string;
  created_by?: string;
  modified_by?: string;
}

// User interface
export interface User extends CosmicObject {
  type: 'users';
  metadata: {
    full_name: string;
    email: string;
    role: {
      key: UserRole;
      value: string;
    };
    job_title: string;
    company: string;
    bio?: string;
    profile_photo?: {
      url: string;
      imgix_url: string;
    };
    linkedin_url?: string;
    twitter_url?: string;
    website_url?: string;
    timezone: {
      key: TimeZoneKey;
      value: string;
    };
    availability: string[];
    years_experience: {
      key: ExperienceLevel;
      value: string;
    };
    industry_focus?: string[];
    active_member?: boolean;
    join_date?: string;
    last_active?: string;
  };
}

// Coffee Chat interface
export interface CoffeeChat extends CosmicObject {
  type: 'coffee-chats';
  metadata: {
    chat_title: string;
    participant_1: User;
    participant_2: User;
    scheduled_date: string;
    status: {
      key: ChatStatus;
      value: string;
    };
    meeting_link?: string;
    calendly_event_id?: string;
    notes?: string;
    feedback_participant_1?: string;
    feedback_participant_2?: string;
    rating?: {
      key: string;
      value: string;
    };
    week_of_match?: string;
    auto_generated?: boolean;
  };
}

// Post interface
export interface Post extends CosmicObject {
  type: 'posts';
  metadata: {
    content: string;
    author: User;
    post_type: {
      key: PostType;
      value: string;
    };
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    tags?: string[];
    likes_count?: number;
    comments_count?: number;
    featured_post?: boolean;
    posted_date?: string;
  };
}

// Blog Article interface
export interface BlogArticle extends CosmicObject {
  type: 'blog-articles';
  metadata: {
    headline: string;
    excerpt: string;
    content: string;
    featured_image: {
      url: string;
      imgix_url: string;
    };
    author: User;
    category: {
      key: BlogCategory;
      value: string;
    };
    tags?: string[];
    seo_title?: string;
    seo_description?: string;
    published_date?: string;
    read_time?: number;
    featured_article?: boolean;
  };
}

// Call to Action interface
export interface CallToAction extends CosmicObject {
  type: 'call-to-actions';
  metadata: {
    cta_title: string;
    cta_description: string;
    button_text: string;
    button_link: string;
    cta_type: {
      key: CTAType;
      value: string;
    };
    background_color?: string;
    text_color?: string;
    active?: boolean;
    priority_order?: number;
  };
}

// Admin Settings interface
export interface AdminSettings extends CosmicObject {
  type: 'admin-settings';
  metadata: {
    site_title: string;
    site_description: string;
    matching_enabled: boolean;
    weekly_match_day: {
      key: WeekDay;
      value: string;
    };
    max_chats_per_week: number;
    welcome_email_enabled?: boolean;
    match_notification_enabled?: boolean;
    community_feed_enabled?: boolean;
    donation_enabled?: boolean;
    stripe_public_key?: string;
    calendly_url?: string;
    contact_email?: string;
    social_links?: {
      twitter?: string;
      linkedin?: string;
      github?: string;
    };
  };
}

// Type literals for select-dropdown values
export type UserRole = 'member' | 'admin';
export type TimeZoneKey = 'EST' | 'CST' | 'MST' | 'PST' | 'GMT' | 'CET';
export type ExperienceLevel = '0-2' | '3-5' | '6-10' | '10+';
export type ChatStatus = 'scheduled' | 'completed' | 'cancelled' | 'no-show';
export type PostType = 'tip' | 'win' | 'question' | 'resource' | 'general';
export type BlogCategory = 'sales-tips' | 'networking' | 'career-growth' | 'saas-industry' | 'community' | 'tools-resources';
export type CTAType = 'homepage-hero' | 'homepage-secondary' | 'blog-sidebar' | 'footer' | 'dashboard';
export type WeekDay = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday';

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Form types
export interface CreateUserData {
  title: string;
  metadata: {
    full_name: string;
    email: string;
    role: UserRole;
    job_title: string;
    company: string;
    bio?: string;
    timezone: TimeZoneKey;
    availability: string[];
    years_experience: ExperienceLevel;
    industry_focus?: string[];
    linkedin_url?: string;
    twitter_url?: string;
    website_url?: string;
  };
}

export interface CreatePostData {
  title: string;
  metadata: {
    content: string;
    author: string; // User ID
    post_type: PostType;
    tags?: string[];
    posted_date: string;
  };
}

export interface CreateChatData {
  title: string;
  metadata: {
    chat_title: string;
    participant_1: string; // User ID
    participant_2: string; // User ID
    scheduled_date: string;
    status: ChatStatus;
    week_of_match?: string;
    auto_generated?: boolean;
  };
}

// Utility types
export type OptionalMetadata<T> = Partial<T['metadata']>;
export type CreateData<T> = Omit<T, 'id' | 'created_at' | 'modified_at'>;

// Auth types
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  cosmicId: string;
}

// Component prop types
export interface UserCardProps {
  user: User;
  showContact?: boolean;
  className?: string;
}

export interface PostCardProps {
  post: Post;
  showActions?: boolean;
  className?: string;
}

export interface ChatCardProps {
  chat: CoffeeChat;
  currentUserId: string;
  showActions?: boolean;
  className?: string;
}

export interface BlogCardProps {
  article: BlogArticle;
  showExcerpt?: boolean;
  className?: string;
}

// Type guards
export function isUser(obj: CosmicObject): obj is User {
  return obj.type === 'users';
}

export function isPost(obj: CosmicObject): obj is Post {
  return obj.type === 'posts';
}

export function isCoffeeChat(obj: CosmicObject): obj is CoffeeChat {
  return obj.type === 'coffee-chats';
}

export function isBlogArticle(obj: CosmicObject): obj is BlogArticle {
  return obj.type === 'blog-articles';
}

export function isCallToAction(obj: CosmicObject): obj is CallToAction {
  return obj.type === 'call-to-actions';
}

export function isAdminSettings(obj: CosmicObject): obj is AdminSettings {
  return obj.type === 'admin-settings';
}

// Error types
export interface CosmicError extends Error {
  status?: number;
  code?: string;
}

// Helper function for error handling
export function isCosmicError(error: unknown): error is CosmicError {
  return error instanceof Error && 'status' in error;
}