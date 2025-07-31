import { NextRequest, NextResponse } from 'next/server'
import { getUserById } from '@/lib/cosmic'
import { updateUser } from '@/lib/cosmic'
import { verifyJWT } from '@/lib/jwt'
import { hashPassword, validatePassword } from '@/lib/password'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token, password } = body

    if (!token || !password) {
      return NextResponse.json(
        { error: 'Token and password are required' },
        { status: 400 }
      )
    }

    // Validate password strength
    const passwordValidation = validatePassword(password)
    if (!passwordValidation.isValid) {
      return NextResponse.json(
        { error: 'Password does not meet requirements', details: passwordValidation.errors },
        { status: 400 }
      )
    }

    // Verify the JWT token
    const payload = await verifyJWT(token)
    
    if (!payload || !payload.userId) {
      return NextResponse.json(
        { error: 'Invalid or expired reset token' },
        { status: 400 }
      )
    }

    // Find user by ID
    const user = await getUserById(payload.userId as string)
    
    if (!user || !user.metadata.active_member) {
      return NextResponse.json(
        { error: 'User not found or account is inactive' },
        { status: 404 }
      )
    }

    // Hash the new password
    const hashedPassword = await hashPassword(password)

    // Update user's password
    await updateUser(user.id, {
      metadata: {
        ...user.metadata,
        password_hash: hashedPassword,
        password_reset_at: new Date().toISOString(),
        last_active: new Date().toISOString().split('T')[0]
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Password reset successfully'
    })

  } catch (error) {
    console.error('Password reset error:', error)
    return NextResponse.json(
      { error: 'Failed to reset password' },
      { status: 500 }
    )
  }
}