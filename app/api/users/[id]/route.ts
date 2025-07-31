// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/session'
import { getUserById, updateUser, deleteUser } from '@/lib/cosmic'
import { hashPassword, validatePassword } from '@/lib/password'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const currentUser = await getCurrentUser()
    
    if (!currentUser) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Users can view their own profile, admins can view any profile
    if (currentUser.id !== id && currentUser.role !== 'admin') {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      )
    }

    const user = await getUserById(id)
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Remove sensitive data for non-admin users viewing others
    const userData = {
      id: user.id,
      title: user.title,
      slug: user.slug,
      created_at: user.created_at || '',
      metadata: {
        full_name: user.metadata.full_name,
        email: currentUser.id === id || currentUser.role === 'admin' ? user.metadata.email : '',
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
    }

    return NextResponse.json({ user: userData })

  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const currentUser = await getCurrentUser()
    
    if (!currentUser) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Users can update their own profile, admins can update any profile
    if (currentUser.id !== id && currentUser.role !== 'admin') {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const {
      fullName,
      email,
      password,
      role,
      jobTitle,
      company,
      bio,
      timezone,
      availability,
      yearsExperience,
      industryFocus,
      linkedinUrl,
      twitterUrl,
      websiteUrl,
      activeStatus
    } = body

    const existingUser = await getUserById(id)
    if (!existingUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Prepare update data
    const updateData: any = {
      metadata: {
        ...existingUser.metadata
      }
    }

    // Update fields if provided
    if (fullName) {
      updateData.title = fullName
      updateData.metadata.full_name = fullName
    }
    if (email && (currentUser.id === id || currentUser.role === 'admin')) {
      updateData.metadata.email = email.toLowerCase()
    }
    if (password) {
      const passwordValidation = validatePassword(password)
      if (!passwordValidation.isValid) {
        return NextResponse.json(
          { error: 'Password does not meet requirements', details: passwordValidation.errors },
          { status: 400 }
        )
      }
      updateData.metadata.password_hash = await hashPassword(password)
    }
    if (role && currentUser.role === 'admin') {
      updateData.metadata.role = role
    }
    if (jobTitle) updateData.metadata.job_title = jobTitle
    if (company) updateData.metadata.company = company
    if (bio !== undefined) updateData.metadata.bio = bio
    if (timezone) updateData.metadata.timezone = timezone
    if (availability) updateData.metadata.availability = availability
    if (yearsExperience) updateData.metadata.years_experience = yearsExperience
    if (industryFocus) updateData.metadata.industry_focus = industryFocus
    if (linkedinUrl !== undefined) updateData.metadata.linkedin_url = linkedinUrl
    if (twitterUrl !== undefined) updateData.metadata.twitter_url = twitterUrl
    if (websiteUrl !== undefined) updateData.metadata.website_url = websiteUrl
    if (activeStatus !== undefined && currentUser.role === 'admin') {
      updateData.metadata.active_member = activeStatus
    }

    // Update last active
    updateData.metadata.last_active = new Date().toISOString().split('T')[0]

    const updatedUser = await updateUser(id, updateData)

    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser.id,
        email: updatedUser.metadata.email,
        name: updatedUser.metadata.full_name,
        role: updatedUser.metadata.role
      }
    })

  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const currentUser = await getCurrentUser()
    
    if (!currentUser || currentUser.role !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      )
    }

    await deleteUser(id)

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully'
    })

  } catch (error) {
    console.error('Error deleting user:', error)
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    )
  }
}