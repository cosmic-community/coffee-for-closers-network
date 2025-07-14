import { Plus, Users, MessageSquare, Calendar, Settings, Mail } from 'lucide-react'

interface QuickActionsProps {
  onCreateUser: () => void
  onCreatePost: () => void
  onScheduleChat: () => void
  onSendNewsletter: () => void
  onViewSettings: () => void
}

export function QuickActions({ 
  onCreateUser, 
  onCreatePost, 
  onScheduleChat, 
  onSendNewsletter, 
  onViewSettings 
}: QuickActionsProps) {
  const actions = [
    {
      name: 'Create User',
      description: 'Add a new member to the community',
      icon: Users,
      color: 'bg-blue-600 hover:bg-blue-700',
      action: onCreateUser
    },
    {
      name: 'Create Post',
      description: 'Share a new community post',
      icon: MessageSquare,
      color: 'bg-green-600 hover:bg-green-700',
      action: onCreatePost
    },
    {
      name: 'Schedule Chat',
      description: 'Manually schedule a coffee chat',
      icon: Calendar,
      color: 'bg-purple-600 hover:bg-purple-700',
      action: onScheduleChat
    },
    {
      name: 'Send Newsletter',
      description: 'Send update to all members',
      icon: Mail,
      color: 'bg-yellow-600 hover:bg-yellow-700',
      action: onSendNewsletter
    },
    {
      name: 'System Settings',
      description: 'Configure community settings',
      icon: Settings,
      color: 'bg-gray-600 hover:bg-gray-700',
      action: onViewSettings
    }
  ]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        Quick Actions
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((action) => (
          <button
            key={action.name}
            onClick={action.action}
            className={`${action.color} text-white p-4 rounded-lg transition-colors group`}
          >
            <div className="flex items-center space-x-3">
              <action.icon className="h-6 w-6" />
              <div className="text-left">
                <h4 className="font-medium">{action.name}</h4>
                <p className="text-sm opacity-90">{action.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}