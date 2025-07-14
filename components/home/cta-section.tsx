import Link from 'next/link'
import { CallToAction } from '@/types'

interface CTASectionProps {
  cta?: CallToAction
}

export function CTASection({ cta }: CTASectionProps) {
  const defaultCTA = {
    metadata: {
      cta_title: "Ready to Start Networking?",
      cta_description: "Join thousands of sales professionals who are already building meaningful connections and advancing their careers.",
      button_text: "Get Started Today",
      button_link: "/auth/signup",
      background_color: "#3b82f6",
      text_color: "#ffffff"
    }
  }

  const ctaData = cta || defaultCTA

  return (
    <section 
      className="section py-20"
      style={{
        backgroundColor: ctaData.metadata.background_color || '#3b82f6',
        color: ctaData.metadata.text_color || '#ffffff'
      }}
    >
      <div className="container text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {ctaData.metadata.cta_title}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {ctaData.metadata.cta_description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={ctaData.metadata.button_link}
              className="btn btn-primary btn-lg bg-white text-primary-600 hover:bg-gray-100"
            >
              {ctaData.metadata.button_text}
            </Link>
            <Link
              href="/community"
              className="btn btn-outline btn-lg border-white hover:bg-white hover:text-primary-600"
            >
              Explore Community
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}