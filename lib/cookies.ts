import Cookies from 'js-cookie'

export const COOKIE_NAMES = {
  AUTH_TOKEN: 'auth-token',
  USER_PREFERENCES: 'user-preferences',
  ONBOARDING_PROGRESS: 'onboarding-progress',
  THEME: 'theme'
} as const

export function getCookie(name: string): string | undefined {
  return Cookies.get(name)
}

export function setCookie(
  name: string, 
  value: string, 
  options?: Cookies.CookieAttributes
): void {
  Cookies.set(name, value, {
    expires: 7, // 7 days default
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    ...options
  })
}

export function removeCookie(name: string): void {
  Cookies.remove(name)
}

export function getAuthToken(): string | undefined {
  return getCookie(COOKIE_NAMES.AUTH_TOKEN)
}

export function setAuthToken(token: string): void {
  setCookie(COOKIE_NAMES.AUTH_TOKEN, token, {
    expires: 30, // 30 days for auth token
    httpOnly: false, // Client-side access needed
    secure: process.env.NODE_ENV === 'production'
  })
}

export function removeAuthToken(): void {
  removeCookie(COOKIE_NAMES.AUTH_TOKEN)
}

export function getUserPreferences(): Record<string, any> {
  const prefs = getCookie(COOKIE_NAMES.USER_PREFERENCES)
  try {
    return prefs ? JSON.parse(prefs) : {}
  } catch {
    return {}
  }
}

export function setUserPreferences(preferences: Record<string, any>): void {
  setCookie(COOKIE_NAMES.USER_PREFERENCES, JSON.stringify(preferences))
}