import { NextRequest, NextResponse } from 'next/server'

export interface CookieOptions {
  httpOnly?: boolean
  secure?: boolean
  sameSite?: 'strict' | 'lax' | 'none'
  maxAge?: number
  path?: string
  domain?: string
}

const defaultOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
}

export function setCookie(
  response: NextResponse,
  name: string,
  value: string,
  options: CookieOptions = {}
): void {
  const cookieOptions = { ...defaultOptions, ...options }
  
  let cookieString = `${name}=${encodeURIComponent(value)}`
  
  if (cookieOptions.maxAge !== undefined) {
    cookieString += `; Max-Age=${cookieOptions.maxAge}`
  }
  
  if (cookieOptions.path) {
    cookieString += `; Path=${cookieOptions.path}`
  }
  
  if (cookieOptions.domain) {
    cookieString += `; Domain=${cookieOptions.domain}`
  }
  
  if (cookieOptions.secure) {
    cookieString += '; Secure'
  }
  
  if (cookieOptions.httpOnly) {
    cookieString += '; HttpOnly'
  }
  
  if (cookieOptions.sameSite) {
    cookieString += `; SameSite=${cookieOptions.sameSite}`
  }
  
  response.headers.append('Set-Cookie', cookieString)
}

export function getCookie(request: NextRequest, name: string): string | undefined {
  return request.cookies.get(name)?.value
}

export function deleteCookie(
  response: NextResponse,
  name: string,
  options: Omit<CookieOptions, 'maxAge'> = {}
): void {
  setCookie(response, name, '', { ...options, maxAge: 0 })
}

// Common cookie names used in the application
export const COOKIE_NAMES = {
  THEME: 'theme',
  USER_PREFERENCES: 'user_preferences',
  LAST_ACTIVITY: 'last_activity',
  REMEMBER_ME: 'remember_me',
} as const

// Helper functions for specific cookies
export function setThemeCookie(response: NextResponse, theme: 'light' | 'dark' | 'system'): void {
  setCookie(response, COOKIE_NAMES.THEME, theme, {
    httpOnly: false, // Theme needs to be accessible to client-side JS
    maxAge: 60 * 60 * 24 * 365, // 1 year
  })
}

export function getThemeCookie(request: NextRequest): 'light' | 'dark' | 'system' | undefined {
  const theme = getCookie(request, COOKIE_NAMES.THEME)
  if (theme === 'light' || theme === 'dark' || theme === 'system') {
    return theme
  }
  return undefined
}

export function setUserPreferencesCookie(
  response: NextResponse,
  preferences: Record<string, any>
): void {
  setCookie(response, COOKIE_NAMES.USER_PREFERENCES, JSON.stringify(preferences), {
    httpOnly: false,
    maxAge: 60 * 60 * 24 * 30, // 30 days
  })
}

export function getUserPreferencesCookie(request: NextRequest): Record<string, any> | null {
  const preferences = getCookie(request, COOKIE_NAMES.USER_PREFERENCES)
  if (preferences) {
    try {
      return JSON.parse(preferences)
    } catch {
      return null
    }
  }
  return null
}

export function setLastActivityCookie(response: NextResponse): void {
  setCookie(response, COOKIE_NAMES.LAST_ACTIVITY, new Date().toISOString(), {
    maxAge: 60 * 60 * 24, // 24 hours
  })
}

export function getLastActivityCookie(request: NextRequest): Date | null {
  const lastActivity = getCookie(request, COOKIE_NAMES.LAST_ACTIVITY)
  if (lastActivity) {
    try {
      return new Date(lastActivity)
    } catch {
      return null
    }
  }
  return null
}