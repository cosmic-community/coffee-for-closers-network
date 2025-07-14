import { Calendar, Coffee, CheckCircle, Clock } from 'lucide-react'

interface DashboardStatsProps {
  totalChats: number
  upcomingChats: number
  completedChats: number
}

export function DashboardStats({ totalChats, upcomingChats, completedChats }: DashboardStatsProps) {
  const stats = [
    {
      name: 'Total Chats',
      value: totalChats,
      icon: Coffee,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900'
    },
    {
      name: 'Upcoming Chats',
      value: upcomingChats,
      icon: Calendar,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900'
    },
    {
      name: 'Completed Chats',
      value: completedChats,
      icon: CheckCircle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900'
    },
    {
      name: 'This Week',
      value: upcomingChats, // Could be more specific
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100 dark:bg-orange-900'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {stat.name}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </p>
            </div>
            <div className={`p-3 rounded-full ${stat.bgColor}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}