import { NextRequest, NextResponse } from 'next/server'
import { getUserByEmail } from '@/lib/cosmic'
import { signJWT } from '@/lib/jwt'
import { sendEmail } from '@/lib/email'

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
    
    // Always return success to prevent email enumeration
    if (!user) {
      return NextResponse.json({
        success: true,
        message: 'If an account exists with that email, you will receive a password reset link.'
      })
    }

    // Generate password reset token (expires in 1 hour)
    const resetToken = await signJWT(
      { email: user.metadata.email, userId: user.id },
      '1h'
    )

    // Send password reset email
    const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${resetToken}`
    
    await sendEmail({
      to: user.metadata.email,
      subject: 'Reset Your Password - Coffee for Closers',
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
          <h2 style="color: #333; text-align: center;">Reset Your Password</h2>
          <p>Hi ${user.metadata.full_name},</p>
          <p>You requested to reset your password for your Coffee for Closers account.</p>
          <p>Click the link below to reset your password:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Reset Password</a>
          </div>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request this password reset, you can safely ignore this email.</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 14px;">Coffee for Closers Team</p>
        </div>
      `
    })

    return NextResponse.json({
      success: true,
      message: 'If an account exists with that email, you will receive a password reset link.'
    })

  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json(
      { error: 'Failed to process password reset request' },
      { status: 500 }
    )
  }
}