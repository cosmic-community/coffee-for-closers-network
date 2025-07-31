'use client'

import { useAuth as useAuthContext } from '@/components/auth/auth-provider'

export { useAuthContext as useAuth }

// Additional auth-related hooks can be added here
export function useRequireAuth() {
  const { user, isLoading } = useAuthContext()
  
  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    requireAuth: () => {
      if (!isLoading && !user) {
        throw new Error('Authentication required')
      }
      return user
    }
  }
}

export function useRequireAdmin() {
  const { user, isLoading, isAdmin } = useAuthContext()
  
  return {
    user,
    isLoading,
    isAdmin,
    requireAdmin: () => {
      if (!isLoading && (!user || !isAdmin)) {
        throw new Error('Admin access required')
      }
      return user
    }
  }
}