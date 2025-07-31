import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAvailabilitySlots(): string[] {
  return [
    'Morning (9-11 AM)',
    'Lunch (11 AM-2 PM)', 
    'Afternoon (2-5 PM)',
    'Evening (5-7 PM)'
  ]
}

export function getTimezoneOptions(): Array<{ key: string; value: string }> {
  return [
    { key: 'PST', value: 'Pacific Standard Time (PST)' },
    { key: 'MST', value: 'Mountain Standard Time (MST)' },
    { key: 'CST', value: 'Central Standard Time (CST)' },
    { key: 'EST', value: 'Eastern Standard Time (EST)' },
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
    'Software',
    'Technology',
    'Healthcare',
    'Finance',
    'E-commerce',
    'Marketing',
    'Education',
    'Real Estate',
    'Manufacturing',
    'Consulting',
    'Other'
  ]
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
    hour: 'numeric',
    minute: '2-digit'
  })
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}