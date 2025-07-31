'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

interface SocialProvider {
  id: string
  name: string
  icon: string
  color: string
}

const socialProviders: SocialProvider[] = [
  {
    id: 'google',
    name: 'Google',
    icon: '🚀',
    color: 'bg-red-600 hover:bg-red-700'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: '💼',
    color: 'bg-blue-600 hover:bg-blue-700'
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: '⚡',
    color: 'bg-gray-800 hover:bg-gray-900'
  }
]

export function SocialSignup() {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null)
  const router = useRouter()

  const handleSocialSignup = async (providerId: string) => {
    setLoadingProvider(providerId)
    
    try {
      const result = await signIn(providerId, {
        callbackUrl: '/onboarding/welcome',
        redirect: false
      })

      if (result?.error) {
        toast.error(`Failed to sign up with ${providerId}`)
      } else if (result?.url) {
        router.push(result.url)
      }
    } catch (error) {
      console.error(`${providerId} signup error:`, error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoadingProvider(null)
    }
  }

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-600" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {socialProviders.map((provider) => (
          <button
            key={provider.id}
            onClick={() => handleSocialSignup(provider.id)}
            disabled={loadingProvider !== null}
            className={`
              w-full flex items-center justify-center px-4 py-2 border border-transparent 
              rounded-md shadow-sm text-sm font-medium text-white
              ${provider.color}
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-colors duration-200
            `}
          >
            {loadingProvider === provider.id ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <span className="mr-2">{provider.icon}</span>
            )}
            Continue with {provider.name}
          </button>
        ))}
      </div>
    </div>
  )
}