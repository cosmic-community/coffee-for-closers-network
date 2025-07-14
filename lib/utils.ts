import { clsx, type ClassValue } from 'clsx'
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
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function formatTime(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text
  }
  return text.slice(0, maxLength) + '...'
}

export function getTimezoneOffset(timezone: string): number {
  const timezones: Record<string, number> = {
    'EST': -5,
    'CST': -6,
    'MST': -7,
    'PST': -8,
    'GMT': 0,
    'CET': 1
  }
  return timezones[timezone] || 0
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email)
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export function getPostTypeColor(type: string): string {
  const colors: Record<string, string> = {
    'tip': 'bg-blue-100 text-blue-800',
    'win': 'bg-green-100 text-green-800',
    'question': 'bg-purple-100 text-purple-800',
    'resource': 'bg-yellow-100 text-yellow-800',
    'general': 'bg-gray-100 text-gray-800'
  }
  return colors[type] || colors.general
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'sales-tips': 'bg-blue-500',
    'networking': 'bg-green-500',
    'career-growth': 'bg-purple-500',
    'saas-industry': 'bg-yellow-500',
    'community': 'bg-pink-500',
    'tools-resources': 'bg-indigo-500'
  }
  return colors[category] || 'bg-gray-500'
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    'scheduled': 'bg-blue-100 text-blue-800',
    'completed': 'bg-green-100 text-green-800',
    'cancelled': 'bg-red-100 text-red-800',
    'no-show': 'bg-gray-100 text-gray-800'
  }
  return colors[status] || colors.scheduled
}

export function parseScheduledDate(dateString: string): Date {
  const date = new Date(dateString)
  return isNaN(date.getTime()) ? new Date() : date
}

export function getRelativeTime(date: string | Date): string {
  const now = new Date()
  const then = new Date(date)
  const diffInMs = now.getTime() - then.getTime()
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)

  if (diffInMinutes < 1) {
    return 'just now'
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`
  } else if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`
  } else {
    return formatDate(date)
  }
}

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function generateChatTitle(user1: string, user2: string): string {
  const name1 = user1 || 'User'
  const name2 = user2 || 'User'
  return `${name1} & ${name2} Coffee Chat`
}

export function getAvailabilitySlots(): string[] {
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

export function getIndustryOptions(): string[] {
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

export function getExperienceLevels(): Array<{key: string, value: string}> {
  return [
    { key: '0-2', value: '0-2 years' },
    { key: '3-5', value: '3-5 years' },
    { key: '6-10', value: '6-10 years' },
    { key: '10+', value: '10+ years' }
  ]
}

export function getTimezoneOptions(): Array<{key: string, value: string}> {
  return [
    { key: 'EST', value: 'Eastern Time (EST)' },
    { key: 'CST', value: 'Central Time (CST)' },
    { key: 'MST', value: 'Mountain Time (MST)' },
    { key: 'PST', value: 'Pacific Time (PST)' },
    { key: 'GMT', value: 'Greenwich Mean Time (GMT)' },
    { key: 'CET', value: 'Central European Time (CET)' }
  ]
}

export function isUpcoming(date: string | Date): boolean {
  const now = new Date()
  const eventDate = new Date(date)
  return eventDate > now
}

export function isPastDue(date: string | Date): boolean {
  const now = new Date()
  const eventDate = new Date(date)
  return eventDate < now
}

export function optimizeImage(url: string | undefined, options: {
  width?: number
  height?: number
  quality?: number
  format?: 'auto' | 'webp' | 'jpg' | 'png'
} = {}): string {
  if (!url) return ''
  
  const { width, height, quality = 80, format = 'auto' } = options
  const params = new URLSearchParams()
  
  if (width) params.append('w', width.toString())
  if (height) params.append('h', height.toString())
  if (quality) params.append('q', quality.toString())
  if (format) params.append('auto', format)
  
  const separator = url.includes('?') ? '&' : '?'
  return url + separator + params.toString()
}

export function formatRelativeTime(date: string | Date): string {
  const now = new Date()
  const then = new Date(date)
  const diffInMs = now.getTime() - then.getTime()
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)

  if (diffInMinutes < 1) {
    return 'just now'
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`
  } else if (diffInDays < 7) {
    return `${diffInDays}d ago`
  } else {
    return formatDate(date)
  }
}