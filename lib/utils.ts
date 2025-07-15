import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function formatDateTime(date: string | Date): string {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function getReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
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

// Time utility functions
export function getRelativeTime(date: string | Date): string {
  const now = new Date()
  const targetDate = new Date(date)
  const diffInSeconds = Math.floor((now.getTime() - targetDate.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return 'just now'
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400)
    return `${days} day${days !== 1 ? 's' : ''} ago`
  } else {
    return formatDate(date)
  }
}

export function getTimezoneOffset(timezoneKey: string): number {
  const offsets: Record<string, number> = {
    'EST': -5,
    'CST': -6,
    'MST': -7,
    'PST': -8,
    'GMT': 0,
    'CET': 1
  }
  return offsets[timezoneKey] || 0
}

export function generateChatTitle(name1: string, name2: string): string {
  const firstName1 = name1.split(' ')[0] ?? 'User'
  const firstName2 = name2.split(' ')[0] ?? 'User'
  return `${firstName1} & ${firstName2} Coffee Chat`
}

// Color utility functions
export function getPostTypeColor(postType: string): string {
  const colors: Record<string, string> = {
    'tip': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'win': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'question': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'resource': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    'general': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
  return colors[postType] || colors['general']
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    'scheduled': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'completed': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'cancelled': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    'no-show': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
  return colors[status] || colors['scheduled']
}

// Constants for form options
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

export function getBlogCategories() {
  return [
    { key: 'sales-tips', value: 'Sales Tips' },
    { key: 'networking', value: 'Networking' },
    { key: 'career-growth', value: 'Career Growth' },
    { key: 'saas-industry', value: 'SaaS Industry' },
    { key: 'community', value: 'Community' },
    { key: 'tools-resources', value: 'Tools & Resources' }
  ]
}

export function getPostTypes() {
  return [
    { key: 'tip', value: 'Sales Tip' },
    { key: 'win', value: 'Sales Win' },
    { key: 'question', value: 'Question' },
    { key: 'resource', value: 'Resource Share' },
    { key: 'general', value: 'General Update' }
  ]
}

export function getChatStatuses() {
  return [
    { key: 'scheduled', value: 'Scheduled' },
    { key: 'completed', value: 'Completed' },
    { key: 'cancelled', value: 'Cancelled' },
    { key: 'no-show', value: 'No Show' }
  ]
}

export function getWeekDays() {
  return [
    { key: 'monday', value: 'Monday' },
    { key: 'tuesday', value: 'Tuesday' },
    { key: 'wednesday', value: 'Wednesday' },
    { key: 'thursday', value: 'Thursday' },
    { key: 'friday', value: 'Friday' }
  ]
}

export function getRatingOptions() {
  return [
    { key: '5', value: '5 - Excellent' },
    { key: '4', value: '4 - Good' },
    { key: '3', value: '3 - Average' },
    { key: '2', value: '2 - Poor' },
    { key: '1', value: '1 - Very Poor' }
  ]
}

export function getCTATypes() {
  return [
    { key: 'homepage-hero', value: 'Homepage Hero' },
    { key: 'homepage-secondary', value: 'Homepage Secondary' },
    { key: 'blog-sidebar', value: 'Blog Sidebar' },
    { key: 'footer', value: 'Footer' },
    { key: 'dashboard', value: 'Dashboard' }
  ]
}

export function getUserRoles() {
  return [
    { key: 'member', value: 'Member' },
    { key: 'admin', value: 'Admin' }
  ]
}

// Utility functions for data processing
export function groupByDate<T extends { created_at: string }>(items: T[]): Record<string, T[]> {
  return items.reduce((groups, item) => {
    const date = new Date(item.created_at).toDateString()
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(item)
    return groups
  }, {} as Record<string, T[]>)
}

export function sortByDate<T extends { created_at: string }>(items: T[], ascending = false): T[] {
  return items.sort((a, b) => {
    const dateA = new Date(a.created_at).getTime()
    const dateB = new Date(b.created_at).getTime()
    return ascending ? dateA - dateB : dateB - dateA
  })
}

export function filterByDateRange<T extends { created_at: string }>(
  items: T[],
  startDate: Date,
  endDate: Date
): T[] {
  return items.filter(item => {
    const itemDate = new Date(item.created_at)
    return itemDate >= startDate && itemDate <= endDate
  })
}

export function searchItems<T extends Record<string, any>>(
  items: T[],
  query: string,
  searchFields: (keyof T)[]
): T[] {
  if (!query) return items
  
  const lowercaseQuery = query.toLowerCase()
  return items.filter(item =>
    searchFields.some(field => {
      const value = item[field]
      if (typeof value === 'string') {
        return value.toLowerCase().includes(lowercaseQuery)
      }
      return false
    })
  )
}

export function paginateItems<T>(items: T[], page: number, pageSize: number): T[] {
  const startIndex = (page - 1) * pageSize
  return items.slice(startIndex, startIndex + pageSize)
}

export function getTotalPages(totalItems: number, pageSize: number): number {
  return Math.ceil(totalItems / pageSize)
}