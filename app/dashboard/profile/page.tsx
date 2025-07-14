import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { ProfileForm } from '@/components/dashboard/profile-form'
import { getUserById } from '@/lib/cosmic'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Profile - Coffee Closer Network',
  description: 'Manage your profile and networking preferences.',
}

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect('/auth/signin')
  }

  const userId = (session.user as any).cosmicId
  const user = await getUserById(userId)

  if (!user) {
    redirect('/auth/signin')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader user={user} />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Profile Settings
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Update your information and networking preferences
            </p>
          </div>
          
          <div className="p-6">
            <ProfileForm user={user} />
          </div>
        </div>
      </main>
    </div>
  )
}