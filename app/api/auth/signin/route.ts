import { NextRequest, NextResponse } from 'next/server'
import { verifyPassword } from '@/lib/password'
import { getUserByEmail, updateUser } from '@/lib/cosmic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find user by email
    const user = await getUserByEmail(email.toLowerCase())
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Check if user is active
    if (!user.metadata.active_member) {
      return NextResponse.json(
        { error: 'Account is not active. Please contact support.' },
        { status: 403 }
      )
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.metadata.password_hash)
    
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Update last active date
    try {
      await updateUser(user.id, {
        metadata: {
          ...user.metadata,
          last_active: new Date().toISOString().split('T')[0]
        }
      })
    } catch (error) {
      console.error('Failed to update last active:', error)
      // Don't fail the login for this
    }

    // Return user data for NextAuth
    const userRole = typeof user.metadata.role === 'string' ? user.metadata.role : user.metadata.role?.value || 'member'
    
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.metadata.email,
        name: user.metadata.full_name,
        role: userRole,
        cosmicId: user.id
      }
    })

  } catch (error) {
    console.error('Signin error:', error)
    
    return NextResponse.json(
      { error: 'Authentication failed. Please try again.' },
      { status: 500 }
    )
  }
}