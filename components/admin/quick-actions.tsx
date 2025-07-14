import { Plus, Users, MessageSquare, Calendar, Settings, Mail } from 'lucide-react'
import { AdminSettings } from '@/types'

interface QuickActionsProps {
  settings: AdminSettings | null
}

export function QuickActions({ settings }: QuickActionsProps) {
  const handleCreateUser = () => {
    // TODO: Implement create user functionality
    console.log('Create user')
  }

  const handleCreatePost = () => {
    // TODO: Implement create post functionality
    console.log('Create post')
  }

  const handleScheduleChat = () => {
    // TODO: Implement schedule chat functionality
    console.log('Schedule chat')
  }

  const handleSendNewsletter = () => {
    // TODO: Implement send newsletter functionality
    console.log('Send newsletter')
  }

  const handleViewSettings = () => {
    // TODO: Implement view settings functionality
    console.log('View settings')
  }

  const actions = [
    {
      name: 'Create User',
      description: 'Add a new member to the community',
      icon: Users,
      color: 'bg-blue-600 hover:bg-blue-700',
      action: handleCreateUser
    },
    {
      name: 'Create Post',
      description: 'Share a new community post',
      icon: MessageSquare,
      color: 'bg-green-600 hover:bg-green-700',
      action: handleCreatePost
    },
    {
      name: 'Schedule Chat',
      description: 'Manually schedule a coffee chat',
      icon: Calendar,
      color: 'bg-purple-600 hover:bg-purple-700',
      action: handleScheduleChat
    },
    {
      name: 'Send Newsletter',
      description: 'Send update to all members',
      icon: Mail,
      color: 'bg-yellow-600 hover:bg-yellow-700',
      action: handleSendNewsletter
    },
    {
      name: 'System Settings',
      description: 'Configure community settings',
      icon: Settings,
      color: 'bg-gray-600 hover:bg-gray-700',
      action: handleViewSettings
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