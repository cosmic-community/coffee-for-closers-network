import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    // Here you could add any cleanup logic like:
    // - Logging the signout event
    // - Invalidating specific tokens
    // - Updating user last active status
    
    return NextResponse.json({
      success: true,
      message: 'Signed out successfully'
    })

  } catch (error) {
    console.error('Signout error:', error)
    
    return NextResponse.json(
      { error: 'Failed to sign out' },
      { status: 500 }
    )
  }
}