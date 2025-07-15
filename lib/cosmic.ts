import { createBucketClient } from '@cosmicjs/sdk'
import { 
  User, 
  Post, 
  CoffeeChat, 
  BlogArticle, 
  CallToAction, 
  AdminSettings, 
  CosmicResponse,
  CreateUserData,
  CreatePostData,
  CreateChatData,
  CosmicError
} from '@/types'
import { getCosmicConfig } from './utils'

// Initialize Cosmic client with staging environment
const cosmicConfig = getCosmicConfig()
export const cosmic = createBucketClient({
  bucketSlug: cosmicConfig.bucketSlug,
  readKey: cosmicConfig.readKey,
  writeKey: cosmicConfig.writeKey,
  apiEnvironment: "staging"
})

// Error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Users functions
export async function getAllUsers(): Promise<User[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'users' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as User[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch users')
  }
}

export async function getActiveUsers(): Promise<User[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'users',
        'metadata.active_member': true 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as User[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch active users')
  }
}

export async function getUserBySlug(slug: string): Promise<User | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'users', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object as User
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch user')
  }
}

export async function getUserById(id: string): Promise<User | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'users', id })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object as User
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch user')
  }
}

export async function createUser(userData: CreateUserData): Promise<User> {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'users',
      title: userData.title,
      slug: userData.title.toLowerCase().replace(/\s+/g, '-'),
      metadata: {
        ...userData.metadata,
        active_member: true,
        join_date: new Date().toISOString().split('T')[0]
      }
    })
    
    return response.object as User
  } catch (error) {
    console.error('Error creating user:', error)
    throw new Error('Failed to create user')
  }
}

export async function updateUser(id: string, userData: Partial<CreateUserData>): Promise<User> {
  try {
    const response = await cosmic.objects.updateOne(id, {
      title: userData.title,
      metadata: userData.metadata
    })
    
    return response.object as User
  } catch (error) {
    console.error('Error updating user:', error)
    throw new Error('Failed to update user')
  }
}

// Posts functions
export async function getAllPosts(): Promise<Post[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'posts' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .sort('-created_at')
    
    return response.objects as Post[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch posts')
  }
}

export async function getFeaturedPosts(): Promise<Post[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'posts',
        'metadata.featured_post': true 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .sort('-created_at')
    
    return response.objects as Post[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch featured posts')
  }
}

export async function getPostsByType(postType: string): Promise<Post[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'posts',
        'metadata.post_type': postType 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .sort('-created_at')
    
    return response.objects as Post[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch posts')
  }
}

export async function createPost(postData: CreatePostData): Promise<Post> {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'posts',
      title: postData.title,
      slug: postData.title.toLowerCase().replace(/\s+/g, '-'),
      metadata: {
        ...postData.metadata,
        likes_count: 0,
        comments_count: 0,
        featured_post: false
      }
    })
    
    return response.object as Post
  } catch (error) {
    console.error('Error creating post:', error)
    throw new Error('Failed to create post')
  }
}

// Coffee Chats functions
export async function getAllChats(): Promise<CoffeeChat[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'coffee-chats' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .sort('-created_at')
    
    return response.objects as CoffeeChat[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch chats')
  }
}

export async function getUpcomingChats(): Promise<CoffeeChat[]> {
  try {
    const currentDate = new Date().toISOString().split('T')[0]
    const response = await cosmic.objects
      .find({ 
        type: 'coffee-chats',
        'metadata.status': 'scheduled',
        'metadata.scheduled_date': { $gte: currentDate }
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .sort('metadata.scheduled_date')
    
    return response.objects as CoffeeChat[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch upcoming chats')
  }
}

export async function getUserChats(userId: string): Promise<CoffeeChat[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'coffee-chats',
        $or: [
          { 'metadata.participant_1': userId },
          { 'metadata.participant_2': userId }
        ]
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .sort('-created_at')
    
    return response.objects as CoffeeChat[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch user chats')
  }
}

export async function createCoffeeChat(chatData: CreateChatData): Promise<CoffeeChat> {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'coffee-chats',
      title: chatData.title,
      slug: chatData.title.toLowerCase().replace(/\s+/g, '-'),
      metadata: chatData.metadata
    })
    
    return response.object as CoffeeChat
  } catch (error) {
    console.error('Error creating coffee chat:', error)
    throw new Error('Failed to create coffee chat')
  }
}

export async function updateCoffeeChat(id: string, chatData: Partial<CreateChatData>): Promise<CoffeeChat> {
  try {
    const response = await cosmic.objects.updateOne(id, {
      title: chatData.title,
      metadata: chatData.metadata
    })
    
    return response.object as CoffeeChat
  } catch (error) {
    console.error('Error updating coffee chat:', error)
    throw new Error('Failed to update coffee chat')
  }
}

// Blog Articles functions
export async function getAllBlogArticles(): Promise<BlogArticle[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'blog-articles' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .sort('-created_at')
    
    return response.objects as BlogArticle[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch blog articles')
  }
}

export async function getFeaturedBlogArticles(): Promise<BlogArticle[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'blog-articles',
        'metadata.featured_article': true 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .sort('-created_at')
    
    return response.objects as BlogArticle[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch featured blog articles')
  }
}

export async function getBlogArticleBySlug(slug: string): Promise<BlogArticle | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'blog-articles', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object as BlogArticle
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch blog article')
  }
}

export async function getBlogArticlesByCategory(category: string): Promise<BlogArticle[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'blog-articles',
        'metadata.category': category 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .sort('-created_at')
    
    return response.objects as BlogArticle[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch blog articles')
  }
}

// Call to Actions functions
export async function getAllCTAs(): Promise<CallToAction[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'call-to-actions' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .sort('metadata.priority_order')
    
    return response.objects as CallToAction[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch CTAs')
  }
}

export async function getActiveCTAs(): Promise<CallToAction[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'call-to-actions',
        'metadata.active': true 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .sort('metadata.priority_order')
    
    return response.objects as CallToAction[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch active CTAs')
  }
}

export async function getCTAsByType(ctaType: string): Promise<CallToAction[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'call-to-actions',
        'metadata.cta_type': ctaType,
        'metadata.active': true 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .sort('metadata.priority_order')
    
    return response.objects as CallToAction[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch CTAs')
  }
}

// Admin Settings functions
export async function getAdminSettings(): Promise<AdminSettings | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'admin-settings' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object as AdminSettings
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch admin settings')
  }
}

export async function updateAdminSettings(id: string, settings: Partial<AdminSettings['metadata']>): Promise<AdminSettings> {
  try {
    const response = await cosmic.objects.updateOne(id, {
      metadata: settings
    })
    
    return response.object as AdminSettings
  } catch (error) {
    console.error('Error updating admin settings:', error)
    throw new Error('Failed to update admin settings')
  }
}

// Utility functions
export async function deleteObject(id: string): Promise<void> {
  try {
    await cosmic.objects.deleteOne(id)
  } catch (error) {
    console.error('Error deleting object:', error)
    throw new Error('Failed to delete object')
  }
}

export async function searchObjects(query: string): Promise<any[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { 'metadata.content': { $regex: query, $options: 'i' } }
        ]
      })
      .props(['id', 'title', 'slug', 'metadata', 'type'])
      .depth(1)
    
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to search objects')
  }
}