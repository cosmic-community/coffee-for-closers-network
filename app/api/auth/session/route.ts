import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getUserById } from '@/lib/cosmic'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const cosmicId = (session.user as any).cosmicId
    
    if (!cosmicId) {
      return NextResponse.json(
        { error: 'Invalid session data' },
        { status: 400 }
      )
    }

    // Get fresh user data from Cosmic CMS
    const user = await getUserById(cosmicId)
    
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
    console.error('Session error:', error)
    
    return NextResponse.json(
      { error: 'Failed to fetch session' },
      { status: 500 }
    )
  }
}