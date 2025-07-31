import { createBucketClient } from '@cosmicjs/sdk'
import { 
  User, 
  Post, 
  BlogArticle, 
  CoffeeChat, 
  CallToAction, 
  AdminSettings,
  CreateUserData,
  CosmicResponse 
} from '@/types'

const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// User functions
export async function getAllUsers(): Promise<User[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'users' })
      .props(['id', 'title', 'slug', 'created_at', 'metadata'])
      .depth(1)
    
    return objects || []
  } catch (error) {
    if ((error as any).status === 404) {
      return []
    }
    throw error
  }
}

export async function getUserById(id: string): Promise<User | null> {
  try {
    const { object } = await cosmic.objects
      .findOne({ id, type: 'users' })
      .props(['id', 'title', 'slug', 'created_at', 'metadata'])
      .depth(1)
    
    return object || null
  } catch (error) {
    if ((error as any).status === 404) {
      return null
    }
    throw error
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'users', 'metadata.email': email })
      .props(['id', 'title', 'slug', 'created_at', 'metadata'])
      .depth(1)
    
    return objects?.[0] || null
  } catch (error) {
    if ((error as any).status === 404) {
      return null
    }
    throw error
  }
}

export async function createUser(userData: CreateUserData): Promise<User> {
  try {
    const { object } = await cosmic.objects.insertOne({
      ...userData,
      type: 'users',
      status: 'published'
    })
    
    return object as User
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}

export async function updateUser(id: string, updates: Partial<User>): Promise<User> {
  try {
    const { object } = await cosmic.objects.updateOne(id, updates)
    return object as User
  } catch (error) {
    console.error('Error updating user:', error)
    throw error
  }
}

export async function deleteUser(id: string): Promise<void> {
  try {
    await cosmic.objects.deleteOne(id)
  } catch (error) {
    console.error('Error deleting user:', error)
    throw error
  }
}

// Post functions
export async function getPosts(): Promise<Post[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'posts' })
      .props(['id', 'title', 'slug', 'created_at', 'metadata'])
      .depth(1)
      .sort('-created_at')
    
    return objects || []
  } catch (error) {
    if ((error as any).status === 404) {
      return []
    }
    throw error
  }
}

export async function getPostById(id: string): Promise<Post | null> {
  try {
    const { object } = await cosmic.objects
      .findOne({ id, type: 'posts' })
      .props(['id', 'title', 'slug', 'created_at', 'metadata'])
      .depth(1)
    
    return object || null
  } catch (error) {
    if ((error as any).status === 404) {
      return null
    }
    throw error
  }
}

// Blog article functions
export async function getBlogArticles(): Promise<BlogArticle[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'blog-articles' })
      .props(['id', 'title', 'slug', 'created_at', 'metadata'])
      .depth(1)
      .sort('-created_at')
    
    return objects || []
  } catch (error) {
    if ((error as any).status === 404) {
      return []
    }
    throw error
  }
}

export async function getBlogArticleBySlug(slug: string): Promise<BlogArticle | null> {
  try {
    const { object } = await cosmic.objects
      .findOne({ slug, type: 'blog-articles' })
      .props(['id', 'title', 'slug', 'created_at', 'metadata'])
      .depth(1)
    
    return object || null
  } catch (error) {
    if ((error as any).status === 404) {
      return null
    }
    throw error
  }
}

// Coffee chat functions
export async function getCoffeeChats(): Promise<CoffeeChat[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'coffee-chats' })
      .props(['id', 'title', 'slug', 'created_at', 'metadata'])
      .depth(1)
      .sort('-created_at')
    
    return objects || []
  } catch (error) {
    if ((error as any).status === 404) {
      return []
    }
    throw error
  }
}

export async function getCoffeeChatsByUserId(userId: string): Promise<CoffeeChat[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ 
        type: 'coffee-chats',
        $or: [
          { 'metadata.participant_1': userId },
          { 'metadata.participant_2': userId }
        ]
      })
      .props(['id', 'title', 'slug', 'created_at', 'metadata'])
      .depth(1)
      .sort('-created_at')
    
    return objects || []
  } catch (error) {
    if ((error as any).status === 404) {
      return []
    }
    throw error
  }
}

// Call to action functions
export async function getCallToActions(): Promise<CallToAction[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'call-to-actions', 'metadata.active': true })
      .props(['id', 'title', 'slug', 'created_at', 'metadata'])
      .depth(1)
      .sort('metadata.priority_order')
    
    return objects || []
  } catch (error) {
    if ((error as any).status === 404) {
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
      .props(['id', 'title', 'slug', 'created_at', 'metadata'])
      .depth(1)
      .sort('metadata.priority_order')
    
    return objects?.[0] || null
  } catch (error) {
    if ((error as any).status === 404) {
      return null
    }
    throw error
  }
}

// Admin settings functions
export async function getAdminSettings(): Promise<AdminSettings | null> {
  try {
    const { object } = await cosmic.objects
      .findOne({ type: 'admin-settings' })
      .props(['id', 'title', 'slug', 'created_at', 'metadata'])
      .depth(1)
    
    return object || null
  } catch (error) {
    if ((error as any).status === 404) {
      return null
    }
    throw error
  }
}

// Generic helper functions
export async function createObject(objectData: any): Promise<any> {
  try {
    const { object } = await cosmic.objects.insertOne({
      ...objectData,
      status: 'published'
    })
    
    return object
  } catch (error) {
    console.error('Error creating object:', error)
    throw error
  }
}

export async function updateObject(id: string, updates: any): Promise<any> {
  try {
    const { object } = await cosmic.objects.updateOne(id, updates)
    return object
  } catch (error) {
    console.error('Error updating object:', error)
    throw error
  }
}

export async function deleteObject(id: string): Promise<void> {
  try {
    await cosmic.objects.deleteOne(id)
  } catch (error) {
    console.error('Error deleting object:', error)
    throw error
  }
}

// Search and filtering
export async function searchUsers(query: string): Promise<User[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ 
        type: 'users',
        $or: [
          { 'metadata.full_name': { $regex: query, $options: 'i' } },
          { 'metadata.company': { $regex: query, $options: 'i' } },
          { 'metadata.job_title': { $regex: query, $options: 'i' } }
        ]
      })
      .props(['id', 'title', 'slug', 'created_at', 'metadata'])
      .depth(1)
      .limit(20)
    
    return objects || []
  } catch (error) {
    if ((error as any).status === 404) {
      return []
    }
    throw error
  }
}

export async function getUsersByRole(role: string): Promise<User[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'users', 'metadata.role': role })
      .props(['id', 'title', 'slug', 'created_at', 'metadata'])
      .depth(1)
    
    return objects || []
  } catch (error) {
    if ((error as any).status === 404) {
      return []
    }
    throw error
  }
}

export async function getActiveUsers(): Promise<User[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'users', 'metadata.active_member': true })
      .props(['id', 'title', 'slug', 'created_at', 'metadata'])
      .depth(1)
      .sort('-metadata.last_active')
    
    return objects || []
  } catch (error) {
    if ((error as any).status === 404) {
      return []
    }
    throw error
  }
}

// Statistics helpers
export async function getUserStats(): Promise<{
  total: number
  active: number
  admins: number
  members: number
}> {
  try {
    const users = await getAllUsers()
    
    return {
      total: users.length,
      active: users.filter(u => u.metadata.active_member).length,
      admins: users.filter(u => {
        const role = typeof u.metadata.role === 'string' ? u.metadata.role : u.metadata.role?.value
        return role === 'admin'
      }).length,
      members: users.filter(u => {
        const role = typeof u.metadata.role === 'string' ? u.metadata.role : u.metadata.role?.value
        return role === 'member'
      }).length
    }
  } catch (error) {
    console.error('Error getting user stats:', error)
    return { total: 0, active: 0, admins: 0, members: 0 }
  }
}

export default cosmic