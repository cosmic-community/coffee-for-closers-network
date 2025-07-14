import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { CommunityFeed } from '@/components/community/community-feed'
import { PostFilters } from '@/components/community/post-filters'
import { CreatePost } from '@/components/community/create-post'
import { getAllPosts, getAdminSettings } from '@/lib/cosmic'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Community - Coffee Closer Network',
  description: 'Connect with fellow sales professionals, share insights, and learn from the community.',
}

export default async function CommunityPage() {
  const session = await getServerSession(authOptions)
  const [posts, settings] = await Promise.all([
    getAllPosts(),
    getAdminSettings()
  ])

  // Check if community feed is enabled
  const communityEnabled = settings?.metadata?.community_feed_enabled ?? true

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
            <CreatePost userId={(session.user as any).cosmicId} />
          )}
          
          <PostFilters />
          
          <CommunityFeed posts={posts} />
        </div>
      </main>
      
      <Footer />
    </div>
  )
}