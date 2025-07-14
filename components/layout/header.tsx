'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Menu, X, Coffee, User, LogOut } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/theme-toggle'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session } = useSession()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Community', href: '/community' },
    { name: 'Blog', href: '/blog' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Coffee className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Coffee Closer Network
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {session?.user ? (
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span className="hidden sm:block">{session.user.name}</span>
                </button>
                
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 z-50">
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/dashboard/profile"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link
                  href="/auth/signin"
                  className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="btn btn-primary"
                >
                  Join Network
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}