import { BlogArticle } from '@/types'
import { formatDate } from '@/lib/utils'
import { Calendar, Clock, User, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface BlogGridProps {
  articles: BlogArticle[]
  showExcerpt?: boolean
  className?: string
}

export function BlogGrid({ articles, showExcerpt = true, className = '' }: BlogGridProps) {
  if (articles.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No articles found
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Check back later for new content!
        </p>
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {articles.map((article) => (
        <Link
          key={article.id}
          href={`/blog/${article.slug}`}
          className="group block bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
        >
          {article.metadata?.featured_image && (
            <div className="relative overflow-hidden rounded-t-lg">
              <img
                src={`${article.metadata.featured_image.imgix_url}?w=400&h=240&fit=crop&auto=format,compress`}
                alt={article.metadata?.headline || 'Article image'}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
              />
              {article.metadata?.featured_article && (
                <div className="absolute top-3 left-3">
                  <span className="bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Featured
                  </span>
                </div>
              )}
            </div>
          )}
          
          <div className="p-6">
            {/* Category Badge */}
            <div className="flex items-center space-x-2 mb-3">
              <span className="px-3 py-1 bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 rounded-full text-xs font-medium">
                {article.metadata?.category?.value || 'General'}
              </span>
            </div>
            
            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
              {article.metadata?.headline || article.title}
            </h3>
            
            {/* Excerpt */}
            {showExcerpt && article.metadata?.excerpt && (
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                {article.metadata.excerpt}
              </p>
            )}
            
            {/* Meta Info */}
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(article.metadata?.published_date || article.created_at || new Date().toISOString())}</span>
                </div>
                {article.metadata?.read_time && (
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{article.metadata.read_time} min</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Author */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {article.metadata?.author?.metadata?.profile_photo && (
                  <img
                    src={`${article.metadata.author.metadata.profile_photo.imgix_url}?w=32&h=32&fit=crop&auto=format,compress`}
                    alt={article.metadata?.author?.metadata?.full_name || 'Author'}
                    className="w-6 h-6 rounded-full"
                  />
                )}
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {article.metadata?.author?.metadata?.full_name || 'Anonymous'}
                </span>
              </div>
              
              <div className="flex items-center text-primary-600 text-sm font-medium">
                <span>Read more</span>
                <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}