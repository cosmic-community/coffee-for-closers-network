import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/session'
import { getUserById } from '@/lib/cosmic'

export async function GET(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser()
    
    if (!currentUser) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    // Get fresh user data from Cosmic CMS
    const user = await getUserById(currentUser.id)
    
    if (!user || !user.metadata.active_member) {
      return NextResponse.json(
        { error: 'User not found or inactive' },
        { status: 404 }
      )
    }

    const userRole = typeof user.metadata.role === 'string' ? user.metadata.role : user.metadata.role?.value || 'member'

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.metadata.email,
        name: user.metadata.full_name,
        role: userRole,
        cosmicId: user.id,
        profile: {
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
    })

  } catch (error) {
    console.error('Me endpoint error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user data' },
      { status: 500 }
    )
  }
}