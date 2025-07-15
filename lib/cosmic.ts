import { createBucketClient } from '@cosmicjs/sdk'
import { User, Post, BlogArticle, CoffeeChat, CallToAction, AdminSettings } from '@/types'

const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG!,
  readKey: process.env.COSMIC_READ_KEY!,
  writeKey: process.env.COSMIC_WRITE_KEY!,
})

// User functions
export async function getUsers(): Promise<User[]> {
  try {
    const response = await cosmic.objects.find({
      type: 'users',
    }).props(['id', 'title', 'slug', 'metadata', 'created_at']).depth(1)
    
    return response.objects || []
  } catch (error) {
    console.error('Error fetching users:', error)
    return []
  }
}

export async function getAllUsers(): Promise<User[]> {
  return getUsers()
}

export async function getActiveUsers(): Promise<User[]> {
  try {
    const response = await cosmic.objects.find({
      type: 'users',
      'metadata.active_member': true
    }).props(['id', 'title', 'slug', 'metadata', 'created_at']).depth(1)
    
    return response.objects || []
  } catch (error) {
    console.error('Error fetching active users:', error)
    return []
  }
}

export async function getUserBySlug(slug: string): Promise<User | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'users',
      slug,
    }).props(['id', 'title', 'slug', 'metadata', 'created_at']).depth(1)
    
    return response.object || null
  } catch (error) {
    console.error('Error fetching user:', error)
    return null
  }
}

export async function getUserById(id: string): Promise<User | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'users',
      id,
    }).props(['id', 'title', 'slug', 'metadata', 'created_at']).depth(1)
    
    return response.object || null
  } catch (error) {
    console.error('Error fetching user:', error)
    return null
  }
}

export async function createUser(userData: any): Promise<User> {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'users',
      ...userData,
    })
    
    return response.object
  } catch (error) {
    console.error('Error creating user:', error)
    throw new Error('Failed to create user account')
  }
}

export async function updateUser(id: string, userData: any): Promise<User> {
  try {
    const response = await cosmic.objects.updateOne(id, userData)
    return response.object
  } catch (error) {
    console.error('Error updating user:', error)
    throw new Error('Failed to update user')
  }
}

// Post functions
export async function getPosts(): Promise<Post[]> {
  try {
    const response = await cosmic.objects.find({
      type: 'posts',
    }).props(['id', 'title', 'slug', 'metadata', 'created_at']).depth(1)
    
    return response.objects || []
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export async function getAllPosts(): Promise<Post[]> {
  return getPosts()
}

export async function getFeaturedPosts(): Promise<Post[]> {
  try {
    const response = await cosmic.objects.find({
      type: 'posts',
      'metadata.featured_post': true
    }).props(['id', 'title', 'slug', 'metadata', 'created_at']).depth(1)
    
    return response.objects || []
  } catch (error) {
    console.error('Error fetching featured posts:', error)
    return []
  }
}

export async function createPost(postData: any): Promise<Post> {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'posts',
      ...postData,
    })
    
    return response.object
  } catch (error) {
    console.error('Error creating post:', error)
    throw new Error('Failed to create post')
  }
}

// Blog functions
export async function getBlogArticles(): Promise<BlogArticle[]> {
  try {
    const response = await cosmic.objects.find({
      type: 'blog-articles',
    }).props(['id', 'title', 'slug', 'metadata', 'created_at']).depth(1)
    
    return response.objects || []
  } catch (error) {
    console.error('Error fetching blog articles:', error)
    return []
  }
}

export async function getAllBlogArticles(): Promise<BlogArticle[]> {
  return getBlogArticles()
}

export async function getFeaturedBlogArticles(): Promise<BlogArticle[]> {
  try {
    const response = await cosmic.objects.find({
      type: 'blog-articles',
      'metadata.featured_article': true
    }).props(['id', 'title', 'slug', 'metadata', 'created_at']).depth(1)
    
    return response.objects || []
  } catch (error) {
    console.error('Error fetching featured blog articles:', error)
    return []
  }
}

export async function getBlogArticleBySlug(slug: string): Promise<BlogArticle | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'blog-articles',
      slug,
    }).props(['id', 'title', 'slug', 'metadata', 'created_at']).depth(1)
    
    return response.object || null
  } catch (error) {
    console.error('Error fetching blog article:', error)
    return null
  }
}

// Coffee Chat functions
export async function getCoffeeChats(): Promise<CoffeeChat[]> {
  try {
    const response = await cosmic.objects.find({
      type: 'coffee-chats',
    }).props(['id', 'title', 'slug', 'metadata', 'created_at']).depth(1)
    
    return response.objects || []
  } catch (error) {
    console.error('Error fetching coffee chats:', error)
    return []
  }
}

export async function getAllChats(): Promise<CoffeeChat[]> {
  return getCoffeeChats()
}

export async function getUserChats(userId: string): Promise<CoffeeChat[]> {
  try {
    const response = await cosmic.objects.find({
      type: 'coffee-chats',
      $or: [
        { 'metadata.participant_1': userId },
        { 'metadata.participant_2': userId }
      ]
    }).props(['id', 'title', 'slug', 'metadata', 'created_at']).depth(1)
    
    return response.objects || []
  } catch (error) {
    console.error('Error fetching user chats:', error)
    return []
  }
}

export async function createCoffeeChat(chatData: any): Promise<CoffeeChat> {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'coffee-chats',
      ...chatData,
    })
    
    return response.object
  } catch (error) {
    console.error('Error creating coffee chat:', error)
    throw new Error('Failed to create coffee chat')
  }
}

// Call to Action functions
export async function getCallToActions(): Promise<CallToAction[]> {
  try {
    const response = await cosmic.objects.find({
      type: 'call-to-actions',
    }).props(['id', 'title', 'slug', 'metadata', 'created_at']).depth(1)
    
    return response.objects || []
  } catch (error) {
    console.error('Error fetching call to actions:', error)
    return []
  }
}

export async function getActiveCTAs(): Promise<CallToAction[]> {
  try {
    const response = await cosmic.objects.find({
      type: 'call-to-actions',
      'metadata.active': true
    }).props(['id', 'title', 'slug', 'metadata', 'created_at']).depth(1)
    
    return response.objects || []
  } catch (error) {
    console.error('Error fetching active CTAs:', error)
    return []
  }
}

// Admin Settings functions
export async function getAdminSettings(): Promise<AdminSettings | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'admin-settings',
      slug: 'coffee-for-closers-settings',
    }).props(['id', 'title', 'slug', 'metadata', 'created_at']).depth(1)
    
    return response.object || null
  } catch (error) {
    console.error('Error fetching admin settings:', error)
    return null
  }
}

export async function updateAdminSettings(id: string, settingsData: any): Promise<AdminSettings> {
  try {
    const response = await cosmic.objects.updateOne(id, settingsData)
    return response.object
  } catch (error) {
    console.error('Error updating admin settings:', error)
    throw new Error('Failed to update admin settings')
  }
}