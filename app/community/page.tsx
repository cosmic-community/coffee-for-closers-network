'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { CommunityFeed } from '@/components/community/community-feed'
import { PostFilters } from '@/components/community/post-filters'
import { CreatePost } from '@/components/community/create-post'
import { getAllPosts, getAdminSettings } from '@/lib/cosmic'
import { Post, PostType, AdminSettings } from '@/types'

export default function CommunityPage() {
  const { data: session } = useSession()
  const [posts, setPosts] = useState<Post[]>([])
  const [settings, setSettings] = useState<AdminSettings | null>(null)
  const [selectedType, setSelectedType] = useState<PostType | 'all'>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsData, settingsData] = await Promise.all([
          getAllPosts(),
          getAdminSettings()
        ])
        setPosts(postsData)
        setSettings(settingsData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Check if community feed is enabled
  const communityEnabled = settings?.metadata?.community_feed_enabled ?? true

  const postTypes = [
    { key: 'tip' as PostType, value: 'Sales Tip' },
    { key: 'win' as PostType, value: 'Sales Win' },
    { key: 'question' as PostType, value: 'Question' },
    { key: 'resource' as PostType, value: 'Resource Share' },
    { key: 'general' as PostType, value: 'General Update' }
  ]

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!communityEnabled) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Community Feed
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              The community feed is currently disabled. Please check back later.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Community Feed
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Connect with fellow sales professionals and share your insights
            </p>
          </div>
          
          {session?.user && (
            <CreatePost userId={(session.user as any).cosmicId || ''} />
          )}
          
          <PostFilters
            postTypes={postTypes}
            selectedType={selectedType}
            onTypeChange={setSelectedType}
          />
          
          <CommunityFeed posts={posts} />
        </div>
      </main>
      
      <Footer />
    </div>
  )
}