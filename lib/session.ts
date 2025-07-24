import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { AuthUser } from '@/types'

export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return null
    }
    
    return {
      id: (session.user as any).cosmicId || '',
      email: session.user.email || '',
      name: session.user.name || '',
      role: (session.user as any).role || 'member',
      cosmicId: (session.user as any).cosmicId || ''
    }
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

export async function requireAuth(): Promise<AuthUser> {
  const user = await getCurrentUser()
  
  if (!user) {
    throw new Error('Authentication required')
  }
  
  return user
}

export async function requireAdmin(): Promise<AuthUser> {
  const user = await requireAuth()
  
  if (user.role !== 'admin') {
    throw new Error('Admin access required')
  }
  
  return user
}

export function isAuthenticated(user: AuthUser | null): boolean {
  return user !== null
}

export function hasRole(user: AuthUser | null, role: string): boolean {
  return user?.role === role
}

export function isAdmin(user: AuthUser | null): boolean {
  return hasRole(user, 'admin')
}

export function isMember(user: AuthUser | null): boolean {
  return user?.role === 'member' || user?.role === 'admin'
}