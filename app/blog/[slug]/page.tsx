// app/blog/[slug]/page.tsx
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { BlogPost } from '@/components/blog/blog-post'
import { RelatedPosts } from '@/components/blog/related-posts'
import { getBlogArticleBySlug, getAllBlogArticles } from '@/lib/cosmic'
import { BlogArticle } from '@/types'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: BlogPostPageProps
): Promise<Metadata> {
  const { slug } = await params
  const article = await getBlogArticleBySlug(slug)
  
  if (!article) {
    return {
      title: 'Article Not Found',
    }
  }
  
  return {
    title: article.metadata.seo_title || article.metadata.headline,
    description: article.metadata.seo_description || article.metadata.excerpt,
    openGraph: {
      title: article.metadata.headline,
      description: article.metadata.excerpt,
      images: article.metadata.featured_image ? [article.metadata.featured_image.imgix_url] : [],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const [article, allArticles] = await Promise.all([
    getBlogArticleBySlug(slug),
    getAllBlogArticles()
  ])

  if (!article) {
    notFound()
  }

  // Get related articles (same category, excluding current article) with proper typing
  const relatedArticles = allArticles
    .filter((a: BlogArticle) => 
      a.id !== article.id && 
      a.metadata.category?.key === article.metadata.category?.key
    )
    .slice(0, 3)

  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        <BlogPost article={article} />
        
        {relatedArticles.length > 0 && (
          <RelatedPosts articles={relatedArticles} />
        )}
      </main>
      
      <Footer />
    </div>
  )
}