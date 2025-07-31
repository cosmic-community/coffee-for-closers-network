import Link from 'next/link'
import { BlogArticle } from '@/types'
import { formatDate } from '@/lib/utils'

interface BlogSectionProps {
  articles: BlogArticle[]
}

export function BlogSection({ articles }: BlogSectionProps) {
  const displayArticles = articles.slice(0, 3)

  return (
    <section className="section bg-gray-50 dark:bg-gray-900">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Latest Insights
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Stay updated with the latest tips, strategies, and insights for sales professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {displayArticles.map((article) => (
            <article
              key={article.id}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {article.metadata?.featured_image && (
                <div className="aspect-video">
                  <img
                    src={`${article.metadata.featured_image.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
                    alt={article.metadata?.headline || 'Article image'}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="badge badge-primary">
                    {article.metadata?.category?.value || 'General'}
                  </span>
                  <span className="text-sm text-gray-500">
                    {article.metadata?.read_time || 5} min read
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  <Link
                    href={`/blog/${article.slug}`}
                    className="hover:text-primary-600 transition-colors"
                  >
                    {article.metadata?.headline || article.title}
                  </Link>
                </h3>
                
                {article.metadata?.excerpt && (
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {article.metadata.excerpt}
                  </p>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {article.metadata?.author?.metadata?.profile_photo && (
                      <img
                        src={article.metadata.author.metadata.profile_photo.imgix_url}
                        alt={article.metadata?.author?.metadata?.full_name || 'Author'}
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {article.metadata?.author?.metadata?.full_name || 'Anonymous'}
                    </span>
                  </div>
                  
                  <span className="text-sm text-gray-500">
                    {formatDate(article.metadata?.published_date || article.created_at || new Date().toISOString())}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/blog"
            className="btn btn-primary btn-lg"
          >
            Read More Articles
          </Link>
        </div>
      </div>
    </section>
  )
}