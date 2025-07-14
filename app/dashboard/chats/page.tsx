import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { ChatsList } from '@/components/dashboard/chats-list'
import { ChatFilters } from '@/components/dashboard/chat-filters'
import { getUserChats, getUserById } from '@/lib/cosmic'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Chats - Coffee Closer Network',
  description: 'View and manage your coffee chat history and upcoming meetings.',
}

export default async function ChatsPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect('/auth/signin')
  }

  const userId = (session.user as any).cosmicId
  const [user, userChats] = await Promise.all([
    getUserById(userId),
    getUserChats(userId)
  ])

  if (!user) {
    redirect('/auth/signin')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader user={user} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              My Coffee Chats
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              View your chat history and upcoming meetings
            </p>
          </div>
          
          <div className="p-6">
            <ChatFilters />
            <ChatsList chats={userChats} currentUserId={userId} />
          </div>
        </div>
      </main>
    </div>
  )
}