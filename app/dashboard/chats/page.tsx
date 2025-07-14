'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { ChatsList } from '@/components/dashboard/chats-list'
import { ChatFilters } from '@/components/dashboard/chat-filters'
import { getUserChats, getUserById } from '@/lib/cosmic'
import { User, CoffeeChat, ChatStatus } from '@/types'

type TimeRange = 'all' | 'upcoming' | 'past'

export default function ChatsPage() {
  const { data: session, status } = useSession()
  const [user, setUser] = useState<User | null>(null)
  const [userChats, setUserChats] = useState<CoffeeChat[]>([])
  const [selectedStatus, setSelectedStatus] = useState<ChatStatus | 'all'>('all')
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/auth/signin')
    }

    if (status === 'authenticated' && session?.user) {
      const fetchData = async () => {
        try {
          const userId = (session.user as any).cosmicId
          const [userData, chatsData] = await Promise.all([
            getUserById(userId),
            getUserChats(userId)
          ])
          setUser(userData)
          setUserChats(chatsData)
        } catch (error) {
          console.error('Error fetching data:', error)
        } finally {
          setLoading(false)
        }
      }

      fetchData()
    }
  }, [session, status])

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
        </div>
      </div>
    )
  }

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
            <ChatFilters
              selectedStatus={selectedStatus}
              selectedTimeRange={selectedTimeRange}
              onStatusChange={setSelectedStatus}
              onTimeRangeChange={setSelectedTimeRange}
            />
            <ChatsList 
              chats={userChats} 
              currentUserId={(session?.user as any)?.cosmicId || ''}
            />
          </div>
        </div>
      </main>
    </div>
  )
}