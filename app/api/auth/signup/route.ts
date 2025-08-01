import { NextRequest, NextResponse } from 'next/server'
import { hashPassword, validatePassword } from '@/lib/password'
import { createUser, getUserByEmail } from '@/lib/cosmic'
import { CreateUserData } from '@/types'
import { 
  validateEmail, 
  validateName, 
  validateJobTitle, 
  validateCompany,
  validateBio,
  validateUrl,
  validateLinkedInUrl,
  validateTwitterUrl,
  validateAvailability
} from '@/lib/validations/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      fullName,
      email,
      password,
      jobTitle,
      company,
      bio = '',
      timezone = 'EST',
      availability = [],
      yearsExperience = '0-2',
      industryFocus = [],
      linkedinUrl = '',
      twitterUrl = '',
      websiteUrl = ''
    } = body

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

    const passwordValidation = validatePassword(password)
    if (!passwordValidation.isValid) {
      return NextResponse.json(
        { error: 'Password requirements not met', details: passwordValidation.errors },
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

    const availabilityValidation = validateAvailability(availability)
    if (!availabilityValidation.isValid) {
      return NextResponse.json(
        { error: availabilityValidation.errors[0] },
        { status: 400 }
      )
    }

    // Validate optional fields
    if (bio) {
      const bioValidation = validateBio(bio)
      if (!bioValidation.isValid) {
        return NextResponse.json(
          { error: bioValidation.errors[0] },
          { status: 400 }
        )
      }
    }

    if (linkedinUrl) {
      const linkedinValidation = validateLinkedInUrl(linkedinUrl)
      if (!linkedinValidation.isValid) {
        return NextResponse.json(
          { error: linkedinValidation.errors[0] },
          { status: 400 }
        )
      }
    }

    if (twitterUrl) {
      const twitterValidation = validateTwitterUrl(twitterUrl)
      if (!twitterValidation.isValid) {
        return NextResponse.json(
          { error: twitterValidation.errors[0] },
          { status: 400 }
        )
      }
    }

    if (websiteUrl) {
      const websiteValidation = validateUrl(websiteUrl, 'Website URL')
      if (!websiteValidation.isValid) {
        return NextResponse.json(
          { error: websiteValidation.errors[0] },
          { status: 400 }
        )
      }
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
        bio: bio,
        timezone: timezone,
        availability: availability,
        years_experience: yearsExperience,
        industry_focus: industryFocus,
        linkedin_url: linkedinUrl,
        twitter_url: twitterUrl,
        website_url: websiteUrl,
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

    // Return success (don't include sensitive data) - handle potentially undefined metadata safely
    const userEmail = newUser.metadata?.email ?? email
    const userName = newUser.metadata?.full_name ?? fullName
    
    return NextResponse.json({
      success: true,
      message: 'Account created successfully',
      user: {
        id: newUser.id,
        email: userEmail,
        name: userName
      }
    })

  } catch (error) {
    console.error('Signup error:', error)
    
    // Provide more specific error messages based on error type
    if (error instanceof Error) {
      // Check for common Cosmic CMS errors
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
      
      return NextResponse.json(
        { error: 'Unable to create account. Please try again.' },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { error: 'Server error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}