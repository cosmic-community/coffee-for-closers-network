import Link from 'next/link'
import { Post } from '@/types'
import { getPostTypeColor, getRelativeTime } from '@/lib/utils'

interface CommunitySectionProps {
  posts: Post[]
}

export function CommunitySection({ posts }: CommunitySectionProps) {
  const displayPosts = posts.slice(0, 3)

  return (
    <section className="section">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Join the Conversation
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Connect with fellow sales professionals, share insights, and learn from the community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {displayPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`badge ${getPostTypeColor(post.metadata.post_type.key)}`}>
                  {post.metadata.post_type.value}
                </span>
                <span className="text-sm text-gray-500">
                  {getRelativeTime(post.metadata.posted_date || post.created_at)}
                </span>
              </div>
              
              <p className="text-gray-900 dark:text-white mb-4 line-clamp-3">
                {post.metadata.content}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {post.metadata.author?.metadata?.profile_photo && (
                    <img
                      src={post.metadata.author.metadata.profile_photo.imgix_url}
                      alt={post.metadata.author.metadata.full_name}
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {post.metadata.author?.metadata?.full_name || 'Anonymous'}
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>👍 {post.metadata.likes_count || 0}</span>
                  <span>💬 {post.metadata.comments_count || 0}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/community"
            className="btn btn-primary btn-lg"
          >
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  )
}