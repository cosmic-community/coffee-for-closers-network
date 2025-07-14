import { formatRelativeTime } from '@/lib/utils'
import { User, MessageSquare, Calendar, UserPlus } from 'lucide-react'

interface Activity {
  id: string
  type: 'user_joined' | 'post_created' | 'chat_completed' | 'user_updated'
  user: {
    name: string
    avatar?: string
  }
  details: string
  timestamp: string
}

interface RecentActivityProps {
  activities: Activity[]
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'user_joined':
        return <UserPlus className="h-4 w-4 text-green-600" />
      case 'post_created':
        return <MessageSquare className="h-4 w-4 text-blue-600" />
      case 'chat_completed':
        return <Calendar className="h-4 w-4 text-purple-600" />
      case 'user_updated':
        return <User className="h-4 w-4 text-gray-600" />
      default:
        return <User className="h-4 w-4 text-gray-600" />
    }
  }

  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'user_joined':
        return 'bg-green-100'
      case 'post_created':
        return 'bg-blue-100'
      case 'chat_completed':
        return 'bg-purple-100'
      case 'user_updated':
        return 'bg-gray-100'
      default:
        return 'bg-gray-100'
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        Recent Activity
      </h3>
      
      <div className="space-y-4">
        {activities.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">
            No recent activity to display.
          </p>
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
                {getActivityIcon(activity.type)}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  {activity.user.avatar && (
                    <img
                      src={activity.user.avatar}
                      alt={activity.user.name}
                      className="w-6 h-6 rounded-full"
                    />
                  )}
                  <span className="font-medium text-gray-900 dark:text-white">
                    {activity.user.name}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {activity.details}
                </p>
                
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  {formatRelativeTime(activity.timestamp)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

// Helper function for relative time formatting
function formatRelativeTime(date: string): string {
  const now = new Date()
  const then = new Date(date)
  const diffInMs = now.getTime() - then.getTime()
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)

  if (diffInMinutes < 1) {
    return 'just now'
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`
  } else if (diffInDays < 7) {
    return `${diffInDays}d ago`
  } else {
    return then.toLocaleDateString()
  }
}