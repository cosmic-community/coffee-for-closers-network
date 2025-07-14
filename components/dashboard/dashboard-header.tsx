'use client'

import { User } from '@/types'
import { signOut } from 'next-auth/react'
import { Settings, LogOut, Coffee, Bell } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import Link from 'next/link'

interface DashboardHeaderProps {
  user: User
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center space-x-2">
            <Coffee className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/dashboard"
              className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Overview
            </Link>
            <Link
              href="/dashboard/chats"
              className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              My Chats
            </Link>
            <Link
              href="/dashboard/profile"
              className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Profile
            </Link>
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>
            
            <div className="flex items-center space-x-3">
              {user.metadata.profile_photo && (
                <img
                  src={user.metadata.profile_photo.imgix_url}
                  alt={user.metadata.full_name}
                  className="w-8 h-8 rounded-full"
                />
              )}
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {user.metadata.full_name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {user.metadata.job_title} at {user.metadata.company}
                </p>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Link
                href="/dashboard/profile"
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <Settings className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </Link>
              
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <LogOut className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}