import { BlogArticle } from '@/types'
import { formatDate } from '@/lib/utils'
import { Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface RelatedPostsProps {
  articles: BlogArticle[]
}

export function RelatedPosts({ articles }: RelatedPostsProps) {
  if (articles.length === 0) {
    return null
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Related Articles
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group block bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            {post.metadata?.featured_image && (
              <img
                src={`${post.metadata.featured_image.imgix_url}?w=400&h=200&fit=crop&auto=format,compress`}
                alt={post.metadata?.headline || 'Article image'}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            )}
            
            <div className="p-6">
              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                <span>{formatDate(post.metadata?.published_date || post.created_at || new Date().toISOString())}</span>
                {post.metadata?.read_time && (
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.metadata.read_time} min</span>
                  </div>
                )}
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">
                {post.metadata?.headline || post.title}
              </h3>
              
              {post.metadata?.excerpt && (
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {post.metadata.excerpt}
                </p>
              )}
              
              <div className="flex items-center text-primary-600 text-sm font-medium">
                <span>Read more</span>
                <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}