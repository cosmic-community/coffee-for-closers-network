import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { DashboardStats } from '@/components/dashboard/dashboard-stats'
import { UpcomingChats } from '@/components/dashboard/upcoming-chats'
import { RecentActivity } from '@/components/dashboard/recent-activity'
import { QuickActions } from '@/components/dashboard/quick-actions'
import { getUserChats, getAllPosts, getUserById } from '@/lib/cosmic'
import { CoffeeChat } from '@/types'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard - Coffee Closer Network',
  description: 'Your personal dashboard for managing coffee chats and networking activities.',
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect('/auth/signin')
  }

  const userId = (session.user as any).cosmicId
  const [user, userChats, recentPosts] = await Promise.all([
    getUserById(userId),
    getUserChats(userId),
    getAllPosts()
  ])

  if (!user) {
    redirect('/auth/signin')
  }

  const upcomingChats = userChats.filter((chat: CoffeeChat) => 
    chat.metadata.status.key === 'scheduled' &&
    new Date(chat.metadata.scheduled_date) > new Date()
  )

  const completedChats = userChats.filter((chat: CoffeeChat) => 
    chat.metadata.status.key === 'completed'
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader user={user} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            <DashboardStats 
              totalChats={userChats.length}
              upcomingChats={upcomingChats.length}
              completedChats={completedChats.length}
            />
            
            <UpcomingChats chats={upcomingChats} />
            
            <RecentActivity posts={recentPosts.slice(0, 5)} />
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-4">
            <QuickActions user={user} />
          </div>
        </div>
      </main>
    </div>
  )
}