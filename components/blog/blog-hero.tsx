import { BlogArticle } from '@/types'
import { formatDate } from '@/lib/utils'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface BlogHeroProps {
  featuredArticle: BlogArticle
}

export function BlogHero({ featuredArticle }: BlogHeroProps) {
  return (
    <div className="relative bg-gradient-to-r from-primary-600 to-primary-800 overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      {featuredArticle.metadata.featured_image && (
        <div className="absolute inset-0">
          <img
            src={`${featuredArticle.metadata.featured_image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
            alt={featuredArticle.metadata.headline}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>
      )}
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-3xl">
          <div className="flex items-center space-x-4 text-white text-sm mb-4">
            <span className="bg-primary-600 px-3 py-1 rounded-full font-medium">
              Featured Article
            </span>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(featuredArticle.metadata.published_date || featuredArticle.created_at)}</span>
            </div>
            {featuredArticle.metadata.read_time && (
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{featuredArticle.metadata.read_time} min read</span>
              </div>
            )}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {featuredArticle.metadata.headline}
          </h1>
          
          <p className="text-xl text-gray-200 mb-8">
            {featuredArticle.metadata.excerpt}
          </p>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              {featuredArticle.metadata.author.metadata.profile_photo && (
                <img
                  src={`${featuredArticle.metadata.author.metadata.profile_photo.imgix_url}?w=48&h=48&fit=crop&auto=format,compress`}
                  alt={featuredArticle.metadata.author.metadata.full_name}
                  className="w-12 h-12 rounded-full"
                />
              )}
              <div>
                <p className="text-white font-medium">
                  {featuredArticle.metadata.author.metadata.full_name}
                </p>
                <p className="text-gray-200 text-sm">
                  {featuredArticle.metadata.author.metadata.job_title} at {featuredArticle.metadata.author.metadata.company}
                </p>
              </div>
            </div>
            
            <Link
              href={`/blog/${featuredArticle.slug}`}
              className="inline-flex items-center bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Read Article
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}