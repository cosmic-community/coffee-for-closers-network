import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function formatDateTime(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length).trim() + '...'
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function getTimezoneOptions() {
  return [
    { key: 'EST', value: 'Eastern Time (EST)' },
    { key: 'CST', value: 'Central Time (CST)' },
    { key: 'MST', value: 'Mountain Time (MST)' },
    { key: 'PST', value: 'Pacific Time (PST)' },
    { key: 'GMT', value: 'Greenwich Mean Time (GMT)' },
    { key: 'CET', value: 'Central European Time (CET)' }
  ]
}

export function getExperienceLevels() {
  return [
    { key: '0-2', value: '0-2 years' },
    { key: '3-5', value: '3-5 years' },
    { key: '6-10', value: '6-10 years' },
    { key: '10+', value: '10+ years' }
  ]
}

export function getAvailabilitySlots() {
  return [
    'Monday Morning',
    'Monday Afternoon',
    'Tuesday Morning',
    'Tuesday Afternoon',
    'Wednesday Morning',
    'Wednesday Afternoon',
    'Thursday Morning',
    'Thursday Afternoon',
    'Friday Morning',
    'Friday Afternoon'
  ]
}

export function getIndustryOptions() {
  return [
    'SaaS',
    'Enterprise Software',
    'Cloud Services',
    'Security',
    'DevTools',
    'Analytics',
    'AI/ML',
    'Other'
  ]
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function generateSlugFromEmail(email: string): string {
  const prefix = email.split('@')[0]
  return prefix ? slugify(prefix) : `user-${Date.now()}`
}

export function getCurrentDateString(): string {
  return new Date().toISOString().split('T')[0]
}

export function extractRoleValue(role: string | { key?: string; value?: string } | undefined): string {
  if (!role) return 'member'
  if (typeof role === 'string') return role
  return role.value || role.key || 'member'
}

export function extractSelectValue(field: string | { key?: string; value?: string } | undefined): string {
  if (!field) return ''
  if (typeof field === 'string') return field
  return field.value || field.key || ''
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export function isValidLinkedInUrl(url: string): boolean {
  return /^https?:\/\/(www\.)?linkedin\.com\/in\/.+/.test(url)
}

export function isValidTwitterUrl(url: string): boolean {
  return /^https?:\/\/(www\.)?(twitter\.com|x\.com)\/.+/.test(url)
}