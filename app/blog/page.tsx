import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { BlogGrid } from '@/components/blog/blog-grid'
import { BlogHero } from '@/components/blog/blog-hero'
import { BlogFilters } from '@/components/blog/blog-filters'
import { getAllBlogArticles, getFeaturedBlogArticles } from '@/lib/cosmic'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - Coffee Closer Network',
  description: 'Read the latest insights, tips, and strategies for SaaS sales professionals.',
}

export default async function BlogPage() {
  const [allArticles, featuredArticles] = await Promise.all([
    getAllBlogArticles(),
    getFeaturedBlogArticles()
  ])

  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        <BlogHero featuredArticle={featuredArticles[0]} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Latest Articles
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Insights, tips, and strategies for SaaS sales professionals
              </p>
            </div>
            
            <BlogFilters />
            
            <BlogGrid articles={allArticles} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}