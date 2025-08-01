import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// Rate limiting store (in production, use Redis or similar)
const rateLimit = new Map<string, { count: number; resetTime: number }>()

function isRateLimited(ip: string, limit: number = 5, windowMs: number = 15 * 60 * 1000): boolean {
  const now = Date.now()
  const userLimit = rateLimit.get(ip)

  if (!userLimit || now > userLimit.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + windowMs })
    return false
  }

  if (userLimit.count >= limit) {
    return true
  }

  userLimit.count++
  return false
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const ip = request.ip || request.headers.get('X-Forwarded-For') || 'unknown'

  // Rate limiting for auth routes
  if (pathname.startsWith('/api/auth/signup') || pathname.startsWith('/api/auth/signin')) {
    if (isRateLimited(ip, 5, 15 * 60 * 1000)) { // 5 attempts per 15 minutes
      return new NextResponse('Too many requests', { status: 429 })
    }
  }

  // Rate limiting for password reset
  if (pathname.startsWith('/api/auth/forgot-password')) {
    if (isRateLimited(ip, 3, 60 * 60 * 1000)) { // 3 attempts per hour
      return new NextResponse('Too many requests', { status: 429 })
    }
  }

  // Authentication check for protected routes
  const protectedPaths = ['/dashboard', '/onboarding', '/admin']
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path))

  if (isProtectedPath) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
    
    if (!token) {
      const url = request.nextUrl.clone()
      url.pathname = '/auth/signin'
      url.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(url)
    }

    // Admin-only routes
    if (pathname.startsWith('/admin') && token.role !== 'admin') {
      return new NextResponse('Forbidden', { status: 403 })
    }

    // Onboarding flow control
    if (pathname.startsWith('/onboarding')) {
      // Allow access to onboarding routes if user is not fully onboarded
      // This logic can be expanded based on user's onboarding status
    }
  }

  // Redirect authenticated users away from auth pages
  const authPaths = ['/auth/signin', '/auth/signup', '/join']
  const isAuthPath = authPaths.some(path => pathname.startsWith(path))

  if (isAuthPath) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
    
    if (token) {
      // Redirect to dashboard if already authenticated
      const url = request.nextUrl.clone()
      url.pathname = '/dashboard'
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (except auth routes we want to protect)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}