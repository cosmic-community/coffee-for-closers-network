'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { BlogGrid } from '@/components/blog/blog-grid'
import { BlogHero } from '@/components/blog/blog-hero'
import { BlogFilters } from '@/components/blog/blog-filters'
import { getAllBlogArticles, getFeaturedBlogArticles } from '@/lib/cosmic'
import { BlogArticle, BlogCategory } from '@/types'

export default function BlogPage() {
  const [allArticles, setAllArticles] = useState<BlogArticle[]>([])
  const [featuredArticle, setFeaturedArticle] = useState<BlogArticle | null>(null)
  const [filteredArticles, setFilteredArticles] = useState<BlogArticle[]>([])
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const [articles, featured] = await Promise.all([
          getAllBlogArticles(),
          getFeaturedBlogArticles()
        ])
        setAllArticles(articles)
        setFeaturedArticle(featured[0] || null)
        setFilteredArticles(articles)
      } catch (error) {
        console.error('Error fetching articles:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  useEffect(() => {
    let filtered = allArticles

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article => 
        article.metadata?.category?.key === selectedCategory
      )
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(article =>
        article.metadata?.headline?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.metadata?.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredArticles(filtered)
  }, [allArticles, selectedCategory, searchQuery])

  const categories = [
    { key: 'sales-tips' as BlogCategory, value: 'Sales Tips' },
    { key: 'networking' as BlogCategory, value: 'Networking' },
    { key: 'career-growth' as BlogCategory, value: 'Career Growth' },
    { key: 'saas-industry' as BlogCategory, value: 'SaaS Industry' },
    { key: 'community' as BlogCategory, value: 'Community' },
    { key: 'tools-resources' as BlogCategory, value: 'Tools & Resources' }
  ]

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        {featuredArticle && <BlogHero featuredArticle={featuredArticle} />}
        
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
            
            <BlogFilters
              categories={categories}
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
              onCategoryChange={setSelectedCategory}
              onSearchChange={setSearchQuery}
            />
            
            <BlogGrid articles={filteredArticles} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}