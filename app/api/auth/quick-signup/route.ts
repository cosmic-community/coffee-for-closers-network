import { NextRequest, NextResponse } from 'next/server'
import { hashPassword } from '@/lib/password'
import { createUser, getUserByEmail } from '@/lib/cosmic'
import { CreateUserData } from '@/types'
import { signJWT } from '@/lib/jwt'
import { 
  validateEmail, 
  validateName, 
  validateJobTitle, 
  validateCompany 
} from '@/lib/validations/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fullName, email, password, jobTitle, company } = body

    // Validate required fields
    const nameValidation = validateName(fullName)
    if (!nameValidation.isValid) {
      return NextResponse.json(
        { error: nameValidation.errors[0] },
        { status: 400 }
      )
    }

    const emailValidation = validateEmail(email)
    if (!emailValidation.isValid) {
      return NextResponse.json(
        { error: emailValidation.errors[0] },
        { status: 400 }
      )
    }

    const jobTitleValidation = validateJobTitle(jobTitle)
    if (!jobTitleValidation.isValid) {
      return NextResponse.json(
        { error: jobTitleValidation.errors[0] },
        { status: 400 }
      )
    }

    const companyValidation = validateCompany(company)
    if (!companyValidation.isValid) {
      return NextResponse.json(
        { error: companyValidation.errors[0] },
        { status: 400 }
      )
    }

    // Validate password length (simplified for quick signup)
    if (!password || password.length < 8) {
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
    const emailPrefix = email.split('@')[0] || 'user'
    const userSlug = emailPrefix.toLowerCase().replace(/[^a-z0-9]/g, '-') || `user-${Date.now()}`
    
    // Get current date in YYYY-MM-DD format
    const currentDate = new Date().toISOString().split('T')[0]
    
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
        bio: '',
        timezone: 'EST',
        availability: ['Morning'],
        years_experience: '0-2',
        industry_focus: [],
        linkedin_url: '',
        twitter_url: '',
        website_url: '',
        active_member: true,
        join_date: currentDate,
        last_active: currentDate,
        onboarding_step: 0,
        onboarding_completed: false,
        profile_completed: false
      }
    }

    // Create user in Cosmic CMS
    const newUser = await createUser(userData)

    // Generate welcome token for onboarding
    const welcomeToken = await signJWT({
      userId: newUser.id,
      email: email.toLowerCase(),
      role: 'member'
    })

    // Return success with minimal user data - handle potentially undefined metadata safely
    const userEmail = newUser.metadata?.email ?? email
    const userName = newUser.metadata?.full_name ?? fullName
    
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