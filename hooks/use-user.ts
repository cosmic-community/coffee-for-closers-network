'use client'

import { useState, useEffect } from 'react'
import { useAuth } from './use-auth'
import { User } from '@/types'

export function useUser(userId?: string) {
  const { user: currentUser, isAuthenticated } = useAuth()
  const { isAdmin } = useAuth()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isAuthenticated) {
      setUser(null)
      setIsLoading(false)
      return
    }

    const fetchUser = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const targetUserId = userId || currentUser?.id
        if (!targetUserId) {
          throw new Error('No user ID provided')
        }

        const response = await fetch(`/api/users/${targetUserId}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch user')
        }

        const data = await response.json()
        setUser(data.user)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch user')
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [userId, currentUser?.id, isAuthenticated])

  const updateUser = async (userData: Partial<User['metadata']>) => {
    if (!user) return

    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        throw new Error('Failed to update user')
      }

      const data = await response.json()
      setUser(prev => prev ? { ...prev, metadata: { ...prev.metadata, ...userData } } : null)
      
      return data.user
    } catch (err) {
      throw err
    }
  }

  return {
    user,
    isLoading,
    error,
    updateUser,
    refetch: () => {
      // Trigger re-fetch by updating a dependency
      setIsLoading(true)
    }
  }
}

export function useUsers() {
  const { isAdmin } = useAuth()
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isAdmin) {
      setUsers([])
      setIsLoading(false)
      return
    }

    const fetchUsers = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/users')
        
        if (!response.ok) {
          throw new Error('Failed to fetch users')
        }

        const data = await response.json()
        setUsers(data.users)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch users')
        setUsers([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [isAdmin])

  const createUser = async (userData: any) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        throw new Error('Failed to create user')
      }

      const data = await response.json()
      setUsers(prev => [...prev, data.user])
      
      return data.user
    } catch (err) {
      throw err
    }
  }

  const deleteUser = async (userId: string) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete user')
      }

      setUsers(prev => prev.filter(user => user.id !== userId))
    } catch (err) {
      throw err
    }
  }

  return {
    users,
    isLoading,
    error,
    createUser,
    deleteUser,
    refetch: () => {
      setIsLoading(true)
    }
  }
}