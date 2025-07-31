import { NextRequest, NextResponse } from 'next/server'
import { getUserByEmail } from '@/lib/cosmic'

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

    return NextResponse.json({
      verified: !!user.metadata.email_verified,
      user: {
        id: user.id,
        email: user.metadata.email,
        name: user.metadata.full_name
      }
    })

  } catch (error) {
    console.error('Check verification error:', error)
    return NextResponse.json(
      { error: 'Failed to check verification status' },
      { status: 500 }
    )
  }
}