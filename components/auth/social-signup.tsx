'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Github, Mail } from 'lucide-react'
import toast from 'react-hot-toast'

export function SocialSignup() {
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const router = useRouter()

  const handleSocialSignup = async (provider: string) => {
    setIsLoading(provider)
    try {
      const result = await signIn(provider, {
        callbackUrl: '/onboarding/welcome',
        redirect: false
      })

      if (result?.error) {
        toast.error('Failed to sign up with ' + provider)
      } else if (result?.url) {
        router.push(result.url)
      }
    } catch (error) {
      console.error('Social signup error:', error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsLoading(null)
    }
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => handleSocialSignup('google')}
        disabled={isLoading !== null}
        className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
      >
        <Mail className="w-4 h-4 mr-2" />
        {isLoading === 'google' ? 'Connecting...' : 'Continue with Google'}
      </button>

      <button
        type="button"
        onClick={() => handleSocialSignup('github')}
        disabled={isLoading !== null}
        className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
      >
        <Github className="w-4 h-4 mr-2" />
        {isLoading === 'github' ? 'Connecting...' : 'Continue with GitHub'}
      </button>
    </div>
  )
}