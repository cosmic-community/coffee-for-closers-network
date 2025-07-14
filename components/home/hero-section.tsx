import Link from 'next/link'
import { Coffee, Users, Clock, TrendingUp } from 'lucide-react'
import { CallToAction } from '@/types'

interface HeroSectionProps {
  cta?: CallToAction
}

export function HeroSection({ cta }: HeroSectionProps) {
  const defaultCTA = {
    metadata: {
      cta_title: "Ready to Level Up Your Sales Game?",
      cta_description: "Join Coffee Closer Network and connect with fellow SaaS and software sales professionals. Get matched for 15-minute virtual coffee chats, share insights, and grow your network.",
      button_text: "Join the Network",
      button_link: "/auth/signup"
    }
  }

  const ctaData = cta || defaultCTA

  return (
    <section className="hero-section py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {ctaData.metadata.cta_title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            {ctaData.metadata.cta_description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={ctaData.metadata.button_link}
              className="btn btn-primary btn-lg"
            >
              {ctaData.metadata.button_text}
            </Link>
            <Link
              href="/blog"
              className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-primary-600"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Users className="h-8 w-8 text-white/80" />
            </div>
            <div className="text-3xl font-bold mb-1">500+</div>
            <div className="text-white/80">Active Members</div>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Coffee className="h-8 w-8 text-white/80" />
            </div>
            <div className="text-3xl font-bold mb-1">1,200+</div>
            <div className="text-white/80">Coffee Chats</div>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Clock className="h-8 w-8 text-white/80" />
            </div>
            <div className="text-3xl font-bold mb-1">15 Min</div>
            <div className="text-white/80">Average Chat</div>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <TrendingUp className="h-8 w-8 text-white/80" />
            </div>
            <div className="text-3xl font-bold mb-1">95%</div>
            <div className="text-white/80">Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  )
}