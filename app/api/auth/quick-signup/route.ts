import { NextRequest, NextResponse } from 'next/server'
import { hashPassword } from '@/lib/password'
import { createUser, getUserByEmail } from '@/lib/cosmic'
import { CreateUserData } from '@/types/auth'
import { signJWT } from '@/lib/jwt'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fullName, email, password, jobTitle, company } = body

    // Validate required fields
    if (!fullName || !email || !password || !jobTitle || !company) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Validate password length
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      )
    }

    // Check if user already exists
    try {
      const existingUser = await getUserByEmail(email)
      if (existingUser) {
        return NextResponse.json(
          { error: 'An account with this email already exists' },
          { status: 409 }
        )
      }
    } catch (error) {
      // User doesn't exist, which is what we want for signup
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create user slug from email with safe fallback
    const emailPrefix = email.split('@')[0]
    const userSlug = emailPrefix ? emailPrefix.toLowerCase().replace(/[^a-z0-9]/g, '-') : `user-${Date.now()}`
    
    // Get current date in YYYY-MM-DD format
    const currentDate = new Date().toISOString().split('T')[0]
    
    // Prepare user data with minimal required fields
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
        bio: '',
        timezone: 'EST', // Default timezone
        availability: ['Morning'], // Default availability
        years_experience: '0-2', // Default experience
        industry_focus: [],
        linkedin_url: '',
        twitter_url: '',
        website_url: '',
        active_member: true,
        join_date: currentDate,
        last_active: currentDate,
        onboarding_completed: false, // Track onboarding status
        profile_completed: false // Track profile completion
      }
    }

    // Create user in Cosmic CMS
    const newUser = await createUser(userData)

    // Generate welcome token for onboarding
    const welcomeToken = await signJWT(
      { 
        userId: newUser.id, 
        email: email.toLowerCase(),
        type: 'onboarding'
      }
    )

    // Return success with minimal user data
    // Fix TypeScript errors by providing safe fallbacks for potentially undefined values
    const userEmail = newUser.metadata?.email as string || email
    const userName = newUser.metadata?.full_name as string || fullName
    
    return NextResponse.json({
      success: true,
      message: 'Account created successfully! Welcome to the network.',
      user: {
        id: newUser.id,
        email: userEmail,
        name: userName,
        onboardingToken: welcomeToken
      }
    })

  } catch (error) {
    console.error('Quick signup error:', error)
    
    // Provide specific error messages
    if (error instanceof Error) {
      if (error.message.includes('duplicate') || error.message.includes('already exists')) {
        return NextResponse.json(
          { error: 'An account with this email already exists' },
          { status: 409 }
        )
      }
      
      if (error.message.includes('validation') || error.message.includes('required')) {
        return NextResponse.json(
          { error: 'Please check all required fields and try again' },
          { status: 400 }
        )
      }
    }
    
    return NextResponse.json(
      { error: 'Unable to create account. Please try again.' },
      { status: 500 }
    )
  }
}