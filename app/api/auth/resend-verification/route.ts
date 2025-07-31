import { NextRequest, NextResponse } from 'next/server'
import { getUserByEmail } from '@/lib/cosmic'
import { sendVerificationEmail } from '@/lib/email'
import { signJWT } from '@/lib/jwt'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Find user by email
    const user = await getUserByEmail(email.toLowerCase())
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Check if already verified
    if (user.metadata.email_verified) {
      return NextResponse.json(
        { error: 'Email is already verified' },
        { status: 400 }
      )
    }

    // Generate new verification token
    const verificationToken = await signJWT({
      userId: user.id,
      email: user.metadata.email,
      type: 'email_verification'
    }, '24h') // 24 hour expiry

    // Send verification email
    await sendVerificationEmail(
      user.metadata.email,
      user.metadata.full_name,
      verificationToken
    )

    return NextResponse.json({
      success: true,
      message: 'Verification email sent successfully'
    })

  } catch (error) {
    console.error('Resend verification error:', error)
    return NextResponse.json(
      { error: 'Failed to resend verification email' },
      { status: 500 }
    )
  }
}