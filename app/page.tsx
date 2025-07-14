import { HeroSection } from '@/components/home/hero-section'
import { FeaturesSection } from '@/components/home/features-section'
import { CommunitySection } from '@/components/home/community-section'
import { BlogSection } from '@/components/home/blog-section'
import { CTASection } from '@/components/home/cta-section'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { getActiveCTAs, getFeaturedBlogArticles, getFeaturedPosts } from '@/lib/cosmic'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Coffee Closer Network - Connect with SaaS Sales Professionals',
  description: 'Join our network of SaaS and software sales professionals for 15-minute virtual coffee chats. Build relationships, share insights, and grow your career.',
}

export default async function HomePage() {
  const [ctas, featuredPosts, blogArticles] = await Promise.all([
    getActiveCTAs(),
    getFeaturedPosts(),
    getFeaturedBlogArticles()
  ])

  const heroCTA = ctas.find(cta => cta.metadata.cta_type.key === 'homepage-hero')
  const secondaryCTA = ctas.find(cta => cta.metadata.cta_type.key === 'homepage-secondary')

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection cta={heroCTA} />
        <FeaturesSection />
        <CommunitySection posts={featuredPosts} />
        <BlogSection articles={blogArticles} />
        <CTASection cta={secondaryCTA} />
      </main>
      <Footer />
    </div>
  )
}