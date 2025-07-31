import { Post } from '@/types'
import { getPostTypeColor, getRelativeTime } from '@/lib/utils'
import { MessageSquare, ThumbsUp, Share2 } from 'lucide-react'

interface RecentActivityProps {
  posts: Post[]
}

export function RecentActivity({ posts }: RecentActivityProps) {
  if (posts.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recent Activity
        </h2>
        <div className="text-center py-8">
          <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            No recent activity. Join the community conversation!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Recent Activity
      </h2>
      
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                {post.metadata?.author?.metadata?.profile_photo && (
                  <img
                    src={post.metadata.author.metadata.profile_photo.imgix_url}
                    alt={post.metadata?.author?.metadata?.full_name || 'User'}
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {post.metadata?.author?.metadata?.full_name || 'Anonymous'}
                  </span>
                  <span className="text-sm text-gray-500 ml-2">
                    {getRelativeTime(post.metadata?.posted_date || post.created_at || new Date().toISOString())}
                  </span>
                </div>
              </div>
              {post.metadata?.post_type && (
                <span className={`badge ${getPostTypeColor(post.metadata.post_type.key || 'general')}`}>
                  {post.metadata.post_type.value}
                </span>
              )}
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              {post.metadata?.content || ''}
            </p>
            
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
                <ThumbsUp className="h-4 w-4" />
                <span>{post.metadata?.likes_count || 0}</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-green-600 transition-colors">
                <MessageSquare className="h-4 w-4" />
                <span>{post.metadata?.comments_count || 0}</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-purple-600 transition-colors">
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}