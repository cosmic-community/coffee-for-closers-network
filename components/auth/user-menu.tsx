'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { useAuth } from './auth-provider'
import { UserAvatar } from './user-avatar'
import { ChevronDown, User, Settings, Shield, LogOut } from 'lucide-react'
import toast from 'react-hot-toast'

export function UserMenu() {
  const { user, isAdmin } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (!user) return null

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false })
      toast.success('Signed out successfully')
      router.push('/')
    } catch (error) {
      toast.error('Failed to sign out')
    }
    setIsOpen(false)
  }

  const menuItems = [
    {
      label: 'Dashboard',
      icon: User,
      onClick: () => {
        router.push('/dashboard')
        setIsOpen(false)
      }
    },
    {
      label: 'Profile Settings',
      icon: Settings,
      onClick: () => {
        router.push('/dashboard/profile')
        setIsOpen(false)
      }
    },
    ...(isAdmin ? [{
      label: 'Admin Panel',
      icon: Shield,
      onClick: () => {
        router.push('/admin')
        setIsOpen(false)
      }
    }] : []),
    {
      label: 'Sign Out',
      icon: LogOut,
      onClick: handleSignOut,
      className: 'text-red-600 dark:text-red-400'
    }
  ]

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <UserAvatar size="sm" />
        <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-300">
          {user.name}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          <div className="p-3 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {user.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {user.email}
            </p>
            {user.role === 'admin' && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 mt-1">
                Admin
              </span>
            )}
          </div>

          <div className="py-1">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className={`flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  item.className || 'text-gray-700 dark:text-gray-300'
                }`}
              >
                <item.icon className="w-4 h-4 mr-3" />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}