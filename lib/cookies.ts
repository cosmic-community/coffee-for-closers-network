import Cookies from 'js-cookie'

export const COOKIE_NAMES = {
  AUTH_TOKEN: 'auth-token',
  REFRESH_TOKEN: 'refresh-token',
  THEME: 'theme',
  LANGUAGE: 'language',
} as const

export interface CookieOptions {
  expires?: number | Date
  secure?: boolean
  sameSite?: 'strict' | 'lax' | 'none'
  domain?: string
  path?: string
}

export function setCookie(
  name: string,
  value: string,
  options: CookieOptions = {}
): void {
  const defaultOptions: CookieOptions = {
    expires: 7, // 7 days
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  }

  Cookies.set(name, value, { ...defaultOptions, ...options })
}

export function getCookie(name: string): string | undefined {
  return Cookies.get(name)
}

export function removeCookie(name: string, options: CookieOptions = {}): void {
  const defaultOptions: CookieOptions = {
    path: '/',
  }

  Cookies.remove(name, { ...defaultOptions, ...options })
}

export function removeAllCookies(): void {
  Object.values(COOKIE_NAMES).forEach((cookieName) => {
    removeCookie(cookieName)
  })
}

// Auth-specific cookie helpers
export function setAuthToken(token: string): void {
  setCookie(COOKIE_NAMES.AUTH_TOKEN, token, {
    expires: 7,
    secure: true,
    sameSite: 'strict',
  })
}

export function getAuthToken(): string | undefined {
  return getCookie(COOKIE_NAMES.AUTH_TOKEN)
}

export function removeAuthToken(): void {
  removeCookie(COOKIE_NAMES.AUTH_TOKEN)
}

export function setRefreshToken(token: string): void {
  setCookie(COOKIE_NAMES.REFRESH_TOKEN, token, {
    expires: 30, // 30 days
    secure: true,
    sameSite: 'strict',
  })
}

export function getRefreshToken(): string | undefined {
  return getCookie(COOKIE_NAMES.REFRESH_TOKEN)
}

export function removeRefreshToken(): void {
  removeCookie(COOKIE_NAMES.REFRESH_TOKEN)
}

// Theme helpers
export function setTheme(theme: string): void {
  setCookie(COOKIE_NAMES.THEME, theme, {
    expires: 365, // 1 year
  })
}

export function getTheme(): string | undefined {
  return getCookie(COOKIE_NAMES.THEME)
}

// Language helpers
export function setLanguage(language: string): void {
  setCookie(COOKIE_NAMES.LANGUAGE, language, {
    expires: 365, // 1 year
  })
}

export function getLanguage(): string | undefined {
  return getCookie(COOKIE_NAMES.LANGUAGE)
}

// Check if cookies are enabled
export function areCookiesEnabled(): boolean {
  try {
    const testCookie = 'test-cookie'
    setCookie(testCookie, 'test')
    const isEnabled = getCookie(testCookie) === 'test'
    removeCookie(testCookie)
    return isEnabled
  } catch (error) {
    return false
  }
}