import { BlogArticle } from '@/types'
import { formatDate } from '@/lib/utils'
import { Calendar, Clock, User, Tag } from 'lucide-react'

interface BlogPostProps {
  article: BlogArticle
}

export function BlogPost({ article }: BlogPostProps) {
  return (
    <article className="max-w-4xl mx-auto">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(article.metadata?.published_date || article.created_at || new Date().toISOString())}</span>
          </div>
          {article.metadata?.read_time && (
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{article.metadata.read_time} min read</span>
            </div>
          )}
          <div className="flex items-center space-x-1">
            <User className="h-4 w-4" />
            <span>{article.metadata?.author?.metadata?.full_name || 'Anonymous'}</span>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {article.metadata?.headline || article.title}
        </h1>

        {article.metadata?.excerpt && (
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            {article.metadata.excerpt}
          </p>
        )}

        {article.metadata?.tags && article.metadata.tags.length > 0 && (
          <div className="flex items-center space-x-2 mb-6">
            <Tag className="h-4 w-4 text-gray-500" />
            <div className="flex flex-wrap gap-2">
              {article.metadata.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Featured Image */}
      {article.metadata?.featured_image && (
        <div className="mb-8">
          <img
            src={`${article.metadata.featured_image.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
            alt={article.metadata?.headline || 'Article image'}
            className="w-full h-64 md:h-96 object-cover rounded-lg"
          />
        </div>
      )}

      {/* Content */}
      {article.metadata?.content && (
        <div 
          className="prose prose-lg max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: article.metadata.content }}
        />
      )}

      {/* Author Info */}
      {article.metadata?.author && (
        <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center space-x-4">
            {article.metadata.author.metadata?.profile_photo && (
              <img
                src={`${article.metadata.author.metadata.profile_photo.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                alt={article.metadata.author.metadata?.full_name || 'Author'}
                className="w-16 h-16 rounded-full"
              />
            )}
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {article.metadata.author.metadata?.full_name || 'Anonymous'}
              </h3>
              {article.metadata.author.metadata?.job_title && article.metadata.author.metadata?.company && (
                <p className="text-gray-600 dark:text-gray-400">
                  {article.metadata.author.metadata.job_title} at {article.metadata.author.metadata.company}
                </p>
              )}
              {article.metadata.author.metadata?.bio && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {article.metadata.author.metadata.bio}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </article>
  )
}