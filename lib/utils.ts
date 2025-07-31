import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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

export function getTimezoneOptions(): Array<{ key: string; value: string }> {
  return [
    { key: 'EST', value: 'Eastern Time (EST)' },
    { key: 'CST', value: 'Central Time (CST)' },
    { key: 'MST', value: 'Mountain Time (MST)' },
    { key: 'PST', value: 'Pacific Time (PST)' },
    { key: 'GMT', value: 'Greenwich Mean Time (GMT)' },
    { key: 'CET', value: 'Central European Time (CET)' }
  ]
}

export function getExperienceLevels(): Array<{ key: string; value: string }> {
  return [
    { key: '0-2', value: '0-2 years' },
    { key: '3-5', value: '3-5 years' },
    { key: '6-10', value: '6-10 years' },
    { key: '10+', value: '10+ years' }
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
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
}

export function formatTime(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
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
    return `${diffInMinutes}m ago`
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`
  } else if (diffInDays < 7) {
    return `${diffInDays}d ago`
  } else {
    return formatDate(date)
  }
}

export function getPostTypeColor(postType: string): string {
  switch (postType) {
    case 'tip':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    case 'win':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'question':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    case 'resource':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
    case 'general':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'scheduled':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    case 'completed':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'cancelled':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    case 'no-show':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}