import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { WelcomeWizard } from '@/components/onboarding/welcome-wizard'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Welcome to Coffee for Closers - Get Started',
  description: 'Complete your profile setup and start connecting with sales professionals.',
}

export default async function WelcomePage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/auth/signin')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome to Coffee for Closers! 🎉
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Let's get you set up to start connecting with fellow sales professionals
          </p>
        </div>

        <WelcomeWizard />
      </div>
    </div>
  )
}