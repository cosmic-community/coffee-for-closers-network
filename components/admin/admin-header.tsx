import { Settings, Users, MessageSquare, Calendar, BarChart3 } from 'lucide-react'

export function AdminHeader() {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Settings className="h-8 w-8 text-primary-600 mr-3" />
            <div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Manage your Coffee for Closers community
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>Community Management</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}