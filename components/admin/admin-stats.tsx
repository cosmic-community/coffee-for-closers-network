import { Users, MessageSquare, Calendar, TrendingUp } from 'lucide-react'

interface AdminStatsProps {
  totalUsers: number
  activeUsers: number
  totalChats: number
  totalPosts: number
  matchingStats: {
    totalMatches: number
    completedMatches: number
    cancelledMatches: number
    upcomingMatches: number
    averageRating: number
  }
}

export function AdminStats({ 
  totalUsers, 
  activeUsers, 
  totalChats, 
  totalPosts, 
  matchingStats 
}: AdminStatsProps) {
  const userGrowth = 12 // Calculate this based on historical data
  
  const statItems = [
    {
      name: 'Total Users',
      value: totalUsers,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      change: `+${userGrowth}%`,
      changeColor: 'text-green-600'
    },
    {
      name: 'Active Users',
      value: activeUsers,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      change: `${Math.round((activeUsers / totalUsers) * 100)}%`,
      changeColor: 'text-green-600'
    },
    {
      name: 'Community Posts',
      value: totalPosts,
      icon: MessageSquare,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      change: 'This month',
      changeColor: 'text-gray-600'
    },
    {
      name: 'Coffee Chats',
      value: matchingStats.completedMatches,
      icon: Calendar,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      change: `${totalChats} total`,
      changeColor: 'text-gray-600'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statItems.map((item) => (
        <div key={item.name} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center">
            <div className={`p-3 rounded-lg ${item.bgColor}`}>
              <item.icon className={`h-6 w-6 ${item.color}`} />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {item.name}
              </h3>
              <div className="flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {item.value.toLocaleString()}
                </p>
                <p className={`ml-2 text-sm ${item.changeColor}`}>
                  {item.change}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}