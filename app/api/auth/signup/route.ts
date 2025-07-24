import { NextRequest, NextResponse } from 'next/server'
import { hashPassword, validatePassword } from '@/lib/password'
import { createUser, getUserByEmail } from '@/lib/cosmic'
import { CreateUserData } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      fullName,
      email,
      password,
      jobTitle,
      company,
      bio,
      timezone,
      availability,
      yearsExperience,
      industryFocus,
      linkedinUrl,
      twitterUrl,
      websiteUrl
    } = body

    // Validate required fields
    if (!fullName || !email || !password || !jobTitle || !company) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
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

    // Validate availability
    if (!availability || !Array.isArray(availability) || availability.length === 0) {
      return NextResponse.json(
        { error: 'Please select your availability' },
        { status: 400 }
      )
    }

    // Check if user already exists
    try {
      const existingUser = await getUserByEmail(email)
      if (existingUser) {
        return NextResponse.json(
          { error: 'User with this email already exists' },
          { status: 409 }
        )
      }
    } catch (error) {
      // User doesn't exist, which is what we want
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create user slug from email - add null check and provide fallback
    const emailPrefix = email.split('@')[0]
    const userSlug = emailPrefix ? emailPrefix.toLowerCase().replace(/[^a-z0-9]/g, '-') : 'user'
    
    // Prepare user data
    const userData: CreateUserData = {
      title: fullName,
      slug: userSlug,
      metadata: {
        full_name: fullName,
        email: email.toLowerCase(),
        password_hash: hashedPassword,
        role: 'member',
        job_title: jobTitle,
        company: company,
        bio: bio || '',
        timezone: timezone || 'EST',
        availability: availability,
        years_experience: yearsExperience || '0-2',
        industry_focus: industryFocus || [],
        linkedin_url: linkedinUrl || '',
        twitter_url: twitterUrl || '',
        website_url: websiteUrl || '',
        active_member: true,
        join_date: new Date().toISOString().split('T')[0] || '',
        last_active: new Date().toISOString().split('T')[0] || ''
      }
    }

    // Create user in Cosmic CMS
    const newUser = await createUser(userData)

    // Return success (don't include sensitive data)
    return NextResponse.json({
      success: true,
      message: 'Account created successfully',
      user: {
        id: newUser.id,
        email: newUser.metadata.email,
        name: newUser.metadata.full_name
      }
    })

  } catch (error) {
    console.error('Signup error:', error)
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to create account. Please try again.' },
      { status: 500 }
    )
  }
}