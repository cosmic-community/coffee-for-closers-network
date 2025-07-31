import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { updateUser, getUserById } from '@/lib/cosmic'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { step, data } = body

    if (!step || !data) {
      return NextResponse.json(
        { error: 'Step and data are required' },
        { status: 400 }
      )
    }

    // Get current user data
    const userId = (session.user as any).cosmicId
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID not found' },
        { status: 400 }
      )
    }

    const currentUser = await getUserById(userId)
    if (!currentUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Update user with onboarding data
    const updatedMetadata = {
      ...currentUser.metadata,
      ...data,
      onboarding_step: step,
      last_active: new Date().toISOString().split('T')[0] || ''
    }

    await updateUser(userId, {
      metadata: updatedMetadata
    })

    return NextResponse.json({
      success: true,
      message: `Onboarding step ${step} completed`,
      step,
      data: updatedMetadata
    })

  } catch (error) {
    console.error('Onboarding update error:', error)
    
    return NextResponse.json(
      { error: 'Failed to update onboarding progress' },
      { status: 500 }
    )
  }
}