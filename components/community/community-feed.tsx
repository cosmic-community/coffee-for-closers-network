import { Post } from '@/types'
import { formatDate, getPostTypeColor } from '@/lib/utils'
import { Heart, MessageCircle, Share2 } from 'lucide-react'

interface CommunityFeedProps {
  posts: Post[]
}

export function CommunityFeed({ posts }: CommunityFeedProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No posts yet
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Be the first to share something with the community!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          {/* Author Info */}
          <div className="flex items-center space-x-3 mb-4">
            {post.metadata.author.metadata.profile_photo && (
              <img
                src={`${post.metadata.author.metadata.profile_photo.imgix_url}?w=48&h=48&fit=crop&auto=format,compress`}
                alt={post.metadata.author.metadata.full_name}
                className="w-12 h-12 rounded-full"
              />
            )}
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                {post.metadata.author.metadata.full_name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {post.metadata.author.metadata.job_title} at {post.metadata.author.metadata.company}
              </p>
            </div>
            <div className="flex-1"></div>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPostTypeColor(post.metadata.post_type.key)}`}>
                {post.metadata.post_type.value}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {formatDate(post.metadata.posted_date || post.created_at)}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="mb-4">
            <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
              {post.metadata.content}
            </p>
          </div>

          {/* Featured Image */}
          {post.metadata.featured_image && (
            <div className="mb-4">
              <img
                src={`${post.metadata.featured_image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
                alt="Post image"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}

          {/* Tags */}
          {post.metadata.tags && post.metadata.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.metadata.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm"
                >
                  #{tag.replace(/\s+/g, '')}
                </span>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center space-x-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors">
              <Heart className="h-4 w-4" />
              <span className="text-sm">{post.metadata.likes_count || 0}</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm">{post.metadata.comments_count || 0}</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-green-500 transition-colors">
              <Share2 className="h-4 w-4" />
              <span className="text-sm">Share</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}