import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/session'
import { getAllUsers, createUser } from '@/lib/cosmic'
import { hashPassword, validatePassword } from '@/lib/password'
import { CreateUserData } from '@/types'

export async function GET(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser()
    
    if (!currentUser || currentUser.role !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      )
    }

    const users = await getAllUsers()
    
    // Remove sensitive data
    const sanitizedUsers = users.map(user => ({
      id: user.id,
      title: user.title,
      slug: user.slug,
      created_at: user.created_at || '',
      metadata: {
        full_name: user.metadata.full_name,
        email: user.metadata.email,
        role: user.metadata.role,
        job_title: user.metadata.job_title,
        company: user.metadata.company,
        bio: user.metadata.bio,
        profile_photo: user.metadata.profile_photo,
        timezone: user.metadata.timezone,
        availability: user.metadata.availability,
        years_experience: user.metadata.years_experience,
        industry_focus: user.metadata.industry_focus,
        linkedin_url: user.metadata.linkedin_url,
        twitter_url: user.metadata.twitter_url,
        website_url: user.metadata.website_url,
        active_member: user.metadata.active_member,
        join_date: user.metadata.join_date,
        last_active: user.metadata.last_active
      }
    }))

    return NextResponse.json({
      users: sanitizedUsers,
      total: users.length
    })

  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser()
    
    if (!currentUser || currentUser.role !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const {
      fullName,
      email,
      password,
      role = 'member',
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
    if (!fullName || !email || !password || !jobTitle || !company) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate password
    const passwordValidation = validatePassword(password)
    if (!passwordValidation.isValid) {
      return NextResponse.json(
        { error: 'Password does not meet requirements', details: passwordValidation.errors },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create user slug
    const emailPrefix = email.split('@')[0]
    const userSlug = emailPrefix ? emailPrefix.toLowerCase().replace(/[^a-z0-9]/g, '-') : 'user'

    const userData: CreateUserData = {
      title: fullName,
      slug: userSlug,
      metadata: {
        full_name: fullName,
        email: email.toLowerCase(),
        password_hash: hashedPassword,
        role: role,
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
        join_date: new Date().toISOString().split('T')[0],
        last_active: new Date().toISOString().split('T')[0]
      }
    }

    const newUser = await createUser(userData)

    return NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        email: newUser.metadata.email,
        name: newUser.metadata.full_name,
        role: newUser.metadata.role
      }
    })

  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}