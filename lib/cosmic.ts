import { createBucketClient } from '@cosmicjs/sdk'
import { User, CreateUserData, UpdateUserData, Post, BlogArticle, CoffeeChat, CallToAction, AdminSettings } from '@/types'

if (!process.env.COSMIC_BUCKET_SLUG) {
  throw new Error('COSMIC_BUCKET_SLUG is required')
}

if (!process.env.COSMIC_READ_KEY) {
  throw new Error('COSMIC_READ_KEY is required')
}

// Read client (can be used client-side)
export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG,
  readKey: process.env.COSMIC_READ_KEY,
})

// Write client (server-side only)
const cosmicWrite = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG,
  readKey: process.env.COSMIC_READ_KEY,
  writeKey: process.env.COSMIC_WRITE_KEY,
})

// User operations
export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const { objects } = await cosmic.objects
      .find({
        type: 'users',
        'metadata.email': email.toLowerCase()
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return objects.length > 0 ? objects[0] as User : null
  } catch (error) {
    if ((error as any)?.status === 404) {
      return null
    }
    throw error
  }
}

export async function getUserById(id: string): Promise<User | null> {
  try {
    const { object } = await cosmic.objects
      .findOne({
        type: 'users',
        id: id
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return object as User
  } catch (error) {
    if ((error as any)?.status === 404) {
      return null
    }
    throw error
  }
}

export async function createUser(userData: CreateUserData): Promise<User> {
  try {
    const { object } = await cosmicWrite.objects.insertOne({
      type: 'users',
      status: 'published',
      ...userData
    })

    return object as User
  } catch (error) {
    console.error('Error creating user:', error)
    throw new Error('Failed to create user')
  }
}

export async function updateUser(id: string, updateData: UpdateUserData): Promise<User> {
  try {
    const { object } = await cosmicWrite.objects.updateOne(id, updateData)
    return object as User
  } catch (error) {
    console.error('Error updating user:', error)
    throw new Error('Failed to update user')
  }
}

export async function getAllUsers(): Promise<User[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'users' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return objects as User[]
  } catch (error) {
    if ((error as any)?.status === 404) {
      return []
    }
    throw error
  }
}

// Posts operations
export async function getAllPosts(): Promise<Post[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'posts' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .sort('created_at')

    return objects as Post[]
  } catch (error) {
    if ((error as any)?.status === 404) {
      return []
    }
    throw error
  }
}

// Blog articles operations
export async function getAllBlogArticles(): Promise<BlogArticle[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'blog-articles' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .sort('metadata.published_date')

    return objects as BlogArticle[]
  } catch (error) {
    if ((error as any)?.status === 404) {
      return []
    }
    throw error
  }
}

export async function getBlogArticleBySlug(slug: string): Promise<BlogArticle | null> {
  try {
    const { object } = await cosmic.objects
      .findOne({
        type: 'blog-articles',
        slug: slug
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return object as BlogArticle
  } catch (error) {
    if ((error as any)?.status === 404) {
      return null
    }
    throw error
  }
}

// Coffee chats operations
export async function getAllCoffeeChats(): Promise<CoffeeChat[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'coffee-chats' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .sort('metadata.scheduled_date')

    return objects as CoffeeChat[]
  } catch (error) {
    if ((error as any)?.status === 404) {
      return []
    }
    throw error
  }
}

export async function getCoffeeChatsForUser(userId: string): Promise<CoffeeChat[]> {
  try {
    const { objects } = await cosmic.objects
      .find({
        type: 'coffee-chats',
        $or: [
          { 'metadata.participant_1': userId },
          { 'metadata.participant_2': userId }
        ]
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .sort('metadata.scheduled_date')

    return objects as CoffeeChat[]
  } catch (error) {
    if ((error as any)?.status === 404) {
      return []
    }
    throw error
  }
}

// Call to actions operations
export async function getActiveCallToActions(): Promise<CallToAction[]> {
  try {
    const { objects } = await cosmic.objects
      .find({
        type: 'call-to-actions',
        'metadata.active': true
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .sort('metadata.priority_order')

    return objects as CallToAction[]
  } catch (error) {
    if ((error as any)?.status === 404) {
      return []
    }
    throw error
  }
}

export async function getCallToActionByType(ctaType: string): Promise<CallToAction | null> {
  try {
    const { objects } = await cosmic.objects
      .find({
        type: 'call-to-actions',
        'metadata.cta_type': ctaType,
        'metadata.active': true
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .sort('metadata.priority_order')
      .limit(1)

    return objects.length > 0 ? objects[0] as CallToAction : null
  } catch (error) {
    if ((error as any)?.status === 404) {
      return null
    }
    throw error
  }
}

// Admin settings operations
export async function getAdminSettings(): Promise<AdminSettings | null> {
  try {
    const { object } = await cosmic.objects
      .findOne({ type: 'admin-settings' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return object as AdminSettings
  } catch (error) {
    if ((error as any)?.status === 404) {
      return null
    }
    throw error
  }
}