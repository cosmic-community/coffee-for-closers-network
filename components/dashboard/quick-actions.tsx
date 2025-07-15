import Link from 'next/link'
import { User } from '@/types'
import { Edit3, MessageSquare, Calendar, Settings, Coffee, Users } from 'lucide-react'

interface QuickActionsProps {
  user: User
}

export function QuickActions({ user }: QuickActionsProps) {
  const actions = [
    {
      name: 'Update Profile',
      href: '/dashboard/profile',
      icon: Edit3,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900'
    },
    {
      name: 'Create Post',
      href: '/community',
      icon: MessageSquare,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900'
    },
    {
      name: 'View Chats',
      href: '/dashboard/chats',
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900'
    },
    {
      name: 'Settings',
      href: '/dashboard/profile',
      icon: Settings,
      color: 'text-gray-600',
      bgColor: 'bg-gray-100 dark:bg-gray-800'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Profile Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <div className="flex items-center space-x-4 mb-4">
          {user.metadata.profile_photo && (
            <img
              src={user.metadata.profile_photo.imgix_url}
              alt={user.metadata.full_name}
              className="w-16 h-16 rounded-full"
            />
          )}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {user.metadata.full_name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {user.metadata.job_title} at {user.metadata.company}
            </p>
            <p className="text-sm text-gray-500">
              {typeof user.metadata.years_experience === 'string' 
                ? user.metadata.years_experience 
                : user.metadata.years_experience?.value || 'Experience not specified'}
            </p>
          </div>
        </div>
        
        {user.metadata.bio && (
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            {user.metadata.bio}
          </p>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {actions.map((action) => (
            <Link
              key={action.name}
              href={action.href}
              className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className={`p-3 rounded-full ${action.bgColor} mb-2`}>
                <action.icon className={`h-6 w-6 ${action.color}`} />
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {action.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Weekly Stats */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
          This Week
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Coffee className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Coffee Chats
              </span>
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              2
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4 text-green-600" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Posts Shared
              </span>
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              3
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-purple-600" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                New Connections
              </span>
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              5
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}