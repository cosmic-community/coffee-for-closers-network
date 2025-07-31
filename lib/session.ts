import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { AuthUser } from '@/types'

export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const session = await getServerSession(authOptions)
    return session?.user as AuthUser || null
  } catch (error) {
    console.error('Failed to get current user:', error)
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

export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser()
  return !!user
}

export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser()
  return user?.role === 'admin'
}

export async function isMember(): Promise<boolean> {
  const user = await getCurrentUser()
  return user?.role === 'member' || user?.role === 'admin'
}

export interface SessionInfo {
  user: AuthUser | null
  isAuthenticated: boolean
  isAdmin: boolean
  isMember: boolean
}

export async function getSessionInfo(): Promise<SessionInfo> {
  const user = await getCurrentUser()
  
  return {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isMember: user?.role === 'member' || user?.role === 'admin',
  }
}

// Client-side session helpers (for use in components)
export function createClientSession(user: AuthUser | null): SessionInfo {
  return {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isMember: user?.role === 'member' || user?.role === 'admin',
  }
}