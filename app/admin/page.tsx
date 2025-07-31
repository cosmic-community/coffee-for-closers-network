import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions, isAdmin } from '@/lib/auth'
import { AdminHeader } from '@/components/admin/admin-header'
import { AdminStats } from '@/components/admin/admin-stats'
import { RecentActivity } from '@/components/admin/recent-activity'
import { QuickActions } from '@/components/admin/quick-actions'
import { getAllUsers, getAllChats, getAllPosts, getAdminSettings } from '@/lib/cosmic'
import { getMatchingStats } from '@/lib/matching'
import { User } from '@/types'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Dashboard - Coffee Closer Network',
  description: 'Manage users, posts, and system settings.',
}

export default async function AdminPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user || !isAdmin(session.user as any)) {
    redirect('/dashboard')
  }

  const [users, chats, posts, settings] = await Promise.all([
    getAllUsers(),
    getAllChats(),
    getAllPosts(),
    getAdminSettings()
  ])

  const matchingStats = getMatchingStats(chats)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            <AdminStats 
              totalUsers={users.length}
              activeUsers={users.filter((u: User) => u.metadata.active_member).length}
              totalChats={chats.length}
              totalPosts={posts.length}
              matchingStats={matchingStats}
            />
            
            <RecentActivity 
              recentUsers={users.slice(0, 5)}
              recentPosts={posts.slice(0, 5)}
              recentChats={chats.slice(0, 5)}
            />
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-4">
            <QuickActions settings={settings} />
          </div>
        </div>
      </main>
    </div>
  )
}