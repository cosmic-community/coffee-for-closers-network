import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '@/components/providers'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Coffee Closer Network - Connect with SaaS Sales Professionals',
  description: 'A network for SaaS and software sales professionals to connect for 15-minute virtual coffee chats. Build relationships, share insights, and grow your career in sales.',
  keywords: 'sales, SaaS, networking, coffee chats, sales professionals, career growth',
  authors: [{ name: 'Coffee Closer Network' }],
  creator: 'Coffee Closer Network',
  publisher: 'Coffee Closer Network',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXTAUTH_URL,
    title: 'Coffee Closer Network - Connect with SaaS Sales Professionals',
    description: 'A network for SaaS and software sales professionals to connect for 15-minute virtual coffee chats.',
    siteName: 'Coffee Closer Network',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coffee Closer Network - Connect with SaaS Sales Professionals',
    description: 'A network for SaaS and software sales professionals to connect for 15-minute virtual coffee chats.',
    creator: '@coffeeforclossers',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}