import { NextRequest, NextResponse } from 'next/server'
import { getUserByEmail, updateUser } from '@/lib/cosmic'
import { verifyJWT } from '@/lib/jwt'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token } = body

    if (!token) {
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      )
    }

    // Verify the JWT token
    const payload = await verifyJWT(token)
    
    if (!payload || !payload.email) {
      return NextResponse.json(
        { error: 'Invalid or expired verification token' },
        { status: 400 }
      )
    }

    // Find user by email
    const user = await getUserByEmail(payload.email as string)
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Check if already verified
    if (user.metadata.email_verified) {
      return NextResponse.json({
        success: true,
        message: 'Email already verified'
      })
    }

    // Update user to mark email as verified
    await updateUser(user.id, {
      metadata: {
        ...user.metadata,
        email_verified: true,
        email_verified_at: new Date().toISOString()
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Email verified successfully'
    })

  } catch (error) {
    console.error('Email verification error:', error)
    return NextResponse.json(
      { error: 'Failed to verify email' },
      { status: 500 }
    )
  }
}