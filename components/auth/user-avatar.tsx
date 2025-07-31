'use client'

import { useAuth } from './auth-provider'

interface UserAvatarProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  showName?: boolean
}

export function UserAvatar({ size = 'md', className = '', showName = false }: UserAvatarProps) {
  const { user } = useAuth()

  if (!user) return null

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg'
  }

  const initials = user.name
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'U'

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {user.profile?.profile_photo?.imgix_url ? (
        <img
          src={`${user.profile.profile_photo.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
          alt={user.name || 'User'}
          className={`${sizeClasses[size]} rounded-full object-cover border-2 border-gray-200 dark:border-gray-700`}
        />
      ) : (
        <div
          className={`${sizeClasses[size]} bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold border-2 border-gray-200 dark:border-gray-700`}
        >
          {initials}
        </div>
      )}
      
      {showName && (
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
            {user.name}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
            {user.profile?.job_title} at {user.profile?.company}
          </p>
        </div>
      )}
    </div>
  )
}