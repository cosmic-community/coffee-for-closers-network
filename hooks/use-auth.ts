import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { AuthUser, AuthContextType, CosmicUser } from '@/types'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const fetchUser = async (): Promise<AuthUser | null> => {
    try {
      const response = await fetch('/api/auth/me', {
        credentials: 'include'
      })
      
      if (response.ok) {
        const data = await response.json()
        const cosmicUser = data.user as CosmicUser
        
        if (cosmicUser && cosmicUser.id) {
          // Safely extract role value with proper type checking
          let userRole = 'member'
          if (cosmicUser.metadata?.role) {
            if (typeof cosmicUser.metadata.role === 'string') {
              userRole = cosmicUser.metadata.role
            } else if (cosmicUser.metadata.role && typeof cosmicUser.metadata.role === 'object' && 'value' in cosmicUser.metadata.role) {
              const roleObj = cosmicUser.metadata.role as { value?: string }
              userRole = roleObj.value || 'member'
            }
          }

          // Convert CosmicUser to AuthUser with proper metadata handling
          const authUser: AuthUser = {
            id: cosmicUser.id,
            email: cosmicUser.metadata?.email || '',
            name: cosmicUser.metadata?.full_name || cosmicUser.title || '',
            role: userRole,
            cosmicId: cosmicUser.id,
            metadata: {
              full_name: cosmicUser.metadata?.full_name || undefined,
              email: cosmicUser.metadata?.email || undefined,
              password_hash: cosmicUser.metadata?.password_hash || undefined,
              role: cosmicUser.metadata?.role || undefined,
              job_title: cosmicUser.metadata?.job_title || undefined,
              company: cosmicUser.metadata?.company || undefined,
              bio: cosmicUser.metadata?.bio || undefined,
              timezone: cosmicUser.metadata?.timezone || undefined,
              availability: cosmicUser.metadata?.availability || undefined,
              years_experience: cosmicUser.metadata?.years_experience || undefined,
              industry_focus: cosmicUser.metadata?.industry_focus || undefined,
              linkedin_url: cosmicUser.metadata?.linkedin_url || undefined,
              twitter_url: cosmicUser.metadata?.twitter_url || undefined,
              website_url: cosmicUser.metadata?.website_url || undefined,
              active_member: cosmicUser.metadata?.active_member || undefined,
              join_date: cosmicUser.metadata?.join_date || undefined,
              last_active: cosmicUser.metadata?.last_active || undefined,
              onboarding_completed: cosmicUser.metadata?.onboarding_completed || undefined,
              profile_completed: cosmicUser.metadata?.profile_completed || undefined,
              onboarding_step: cosmicUser.metadata?.onboarding_step || undefined,
              welcome_completed: cosmicUser.metadata?.welcome_completed || undefined,
              interests: cosmicUser.metadata?.interests || undefined
            }
          }
          
          return authUser
        }
      }
      
      return null
    } catch (error) {
      console.error('Failed to fetch user:', error)
      return null
    }
  }

  const refreshUser = async (): Promise<void> => {
    const updatedUser = await fetchUser()
    setUser(updatedUser)
  }

  const signIn = async (email: string, password: string): Promise<{ user: AuthUser }> => {
    const response = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include'
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Sign in failed')
    }

    const data = await response.json()
    if (data.user) {
      setUser(data.user)
    }
    return data
  }

  const signUp = async (userData: {
    email: string
    password: string
    full_name: string
    company?: string
    job_title?: string
  }): Promise<{ user: AuthUser }> => {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
      credentials: 'include'
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Sign up failed')
    }

    const data = await response.json()
    if (data.user) {
      setUser(data.user)
    }
    return data
  }

  const signOut = async (): Promise<void> => {
    try {
      await fetch('/api/auth/signout', {
        method: 'POST',
        credentials: 'include'
      })
    } catch (error) {
      console.error('Sign out error:', error)
    } finally {
      setUser(null)
      router.push('/auth/signin')
    }
  }

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const fetchedUser = await fetchUser()
      setUser(fetchedUser)
      setIsLoading(false)
    }

    initAuth()
  }, [])

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    signIn,
    signUp,
    signOut,
    refreshUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}