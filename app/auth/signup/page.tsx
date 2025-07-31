import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { SignupFlow } from '@/components/auth/signup-flow'
import { SocialSignup } from '@/components/auth/social-signup'
import { SignupBenefits } from '@/components/auth/signup-benefits'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Join Coffee Closer Network - Connect with Sales Professionals',
  description: 'Join our network of 500+ SaaS and software sales professionals. Get matched for 15-minute coffee chats and grow your career.',
}

export default async function SignUpPage() {
  const session = await getServerSession(authOptions)
  
  if (session) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex">
        {/* Left side - Signup Flow */}
        <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full">
            <SignupFlow />
            
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <a href="/auth/signin" className="font-medium text-primary-600 hover:text-primary-500">
                  Sign in
                </a>
              </p>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                By signing up, you agree to our{' '}
                <a href="/terms" className="underline">Terms</a> and{' '}
                <a href="/privacy" className="underline">Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Benefits */}
        <div className="hidden lg:flex flex-1 bg-white dark:bg-gray-800">
          <div className="flex-1 flex items-center justify-center py-12 px-8">
            <div className="max-w-lg">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Why Sales Professionals Love Us
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Join the fastest-growing network of SaaS sales professionals
                </p>
              </div>
              <SignupBenefits />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}