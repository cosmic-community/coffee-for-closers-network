import { User, CoffeeChat, CreateChatData } from '@/types'
import { createCoffeeChat, getActiveUsers, getAllChats } from '@/lib/cosmic'
import { getTimezoneOffset, generateChatTitle } from '@/lib/utils'

interface MatchingOptions {
  maxChatsPerWeek?: number
  preferSameTimezone?: boolean
  preferDifferentExperience?: boolean
  excludeRecentMatches?: boolean
}

export async function generateWeeklyMatches(
  options: MatchingOptions = {}
): Promise<CoffeeChat[]> {
  const {
    maxChatsPerWeek = 2,
    preferSameTimezone = true,
    preferDifferentExperience = true,
    excludeRecentMatches = true
  } = options

  try {
    // Get all active users
    const activeUsers = await getActiveUsers()
    
    if (activeUsers.length < 2) {
      return []
    }

    // Get existing chats to avoid recent matches
    const existingChats = excludeRecentMatches ? await getAllChats() : []
    
    // Filter users who have availability
    const availableUsers = activeUsers.filter(user => 
      user.metadata.availability && user.metadata.availability.length > 0
    )

    // Generate potential matches
    const matches = await findOptimalMatches(
      availableUsers,
      existingChats,
      maxChatsPerWeek,
      preferSameTimezone,
      preferDifferentExperience
    )

    // Create chat records
    const createdChats: CoffeeChat[] = []
    
    for (const match of matches) {
      const { user1, user2, scheduledDate } = match
      
      const chatData: CreateChatData = {
        title: generateChatTitle(user1.metadata.full_name, user2.metadata.full_name),
        metadata: {
          chat_title: generateChatTitle(user1.metadata.full_name, user2.metadata.full_name),
          participant_1: user1.id,
          participant_2: user2.id,
          scheduled_date: scheduledDate,
          status: 'scheduled',
          week_of_match: getWeekOfMatch(),
          auto_generated: true
        }
      }

      const createdChat = await createCoffeeChat(chatData)
      createdChats.push(createdChat)
    }

    return createdChats
  } catch (error) {
    console.error('Error generating weekly matches:', error)
    throw new Error('Failed to generate weekly matches')
  }
}

async function findOptimalMatches(
  users: User[],
  existingChats: CoffeeChat[],
  maxChatsPerWeek: number,
  preferSameTimezone: boolean,
  preferDifferentExperience: boolean
): Promise<Array<{ user1: User; user2: User; scheduledDate: string }>> {
  const matches: Array<{ user1: User; user2: User; scheduledDate: string }> = []
  const userChatCounts = new Map<string, number>()
  const recentMatches = getRecentMatches(existingChats)

  // Initialize chat counts
  users.forEach(user => {
    userChatCounts.set(user.id, 0)
  })

  // Count existing chats for this week
  const currentWeek = getWeekOfMatch()
  existingChats.forEach(chat => {
    if (chat.metadata.week_of_match === currentWeek) {
      const p1Count = userChatCounts.get(chat.metadata.participant_1.id) || 0
      const p2Count = userChatCounts.get(chat.metadata.participant_2.id) || 0
      userChatCounts.set(chat.metadata.participant_1.id, p1Count + 1)
      userChatCounts.set(chat.metadata.participant_2.id, p2Count + 1)
    }
  })

  // Generate all possible pairs
  const potentialPairs: Array<{
    user1: User
    user2: User
    score: number
    scheduledDate: string
  }> = []

  for (let i = 0; i < users.length; i++) {
    for (let j = i + 1; j < users.length; j++) {
      const user1 = users[i]
      const user2 = users[j]

      // Skip if either user has reached max chats
      if (
        (userChatCounts.get(user1.id) || 0) >= maxChatsPerWeek ||
        (userChatCounts.get(user2.id) || 0) >= maxChatsPerWeek
      ) {
        continue
      }

      // Skip if they've been matched recently
      if (recentMatches.has(`${user1.id}-${user2.id}`) || 
          recentMatches.has(`${user2.id}-${user1.id}`)) {
        continue
      }

      // Check for overlapping availability
      const commonAvailability = findCommonAvailability(user1, user2)
      if (commonAvailability.length === 0) {
        continue
      }

      // Calculate match score
      const score = calculateMatchScore(
        user1,
        user2,
        preferSameTimezone,
        preferDifferentExperience
      )

      // Pick a random common availability slot
      const randomSlot = commonAvailability[
        Math.floor(Math.random() * commonAvailability.length)
      ]
      
      const scheduledDate = getNextDateForSlot(randomSlot)

      potentialPairs.push({
        user1,
        user2,
        score,
        scheduledDate
      })
    }
  }

  // Sort by score (highest first)
  potentialPairs.sort((a, b) => b.score - a.score)

  // Select matches, ensuring no user appears more than maxChatsPerWeek times
  const selectedUsers = new Set<string>()
  
  for (const pair of potentialPairs) {
    const user1ChatCount = userChatCounts.get(pair.user1.id) || 0
    const user2ChatCount = userChatCounts.get(pair.user2.id) || 0

    if (user1ChatCount < maxChatsPerWeek && user2ChatCount < maxChatsPerWeek) {
      matches.push({
        user1: pair.user1,
        user2: pair.user2,
        scheduledDate: pair.scheduledDate
      })

      // Update chat counts
      userChatCounts.set(pair.user1.id, user1ChatCount + 1)
      userChatCounts.set(pair.user2.id, user2ChatCount + 1)
    }
  }

  return matches
}

function findCommonAvailability(user1: User, user2: User): string[] {
  const user1Availability = user1.metadata.availability || []
  const user2Availability = user2.metadata.availability || []
  
  return user1Availability.filter(slot => 
    user2Availability.includes(slot)
  )
}

function calculateMatchScore(
  user1: User,
  user2: User,
  preferSameTimezone: boolean,
  preferDifferentExperience: boolean
): number {
  let score = 0

  // Timezone compatibility
  const user1Timezone = user1.metadata.timezone?.key || 'EST'
  const user2Timezone = user2.metadata.timezone?.key || 'EST'
  
  if (preferSameTimezone) {
    if (user1Timezone === user2Timezone) {
      score += 10
    } else {
      // Penalize large timezone differences
      const timezoneOffset = Math.abs(
        getTimezoneOffset(user1Timezone) - getTimezoneOffset(user2Timezone)
      )
      score -= timezoneOffset * 2
    }
  }

  // Experience level diversity
  const user1Experience = user1.metadata.years_experience?.key || '0-2'
  const user2Experience = user2.metadata.years_experience?.key || '0-2'
  
  if (preferDifferentExperience) {
    if (user1Experience !== user2Experience) {
      score += 5
    }
  }

  // Industry overlap
  const user1Industries = user1.metadata.industry_focus || []
  const user2Industries = user2.metadata.industry_focus || []
  
  const commonIndustries = user1Industries.filter(industry => 
    user2Industries.includes(industry)
  )
  
  score += commonIndustries.length * 2

  // Availability overlap (more overlap = better match)
  const commonAvailability = findCommonAvailability(user1, user2)
  score += commonAvailability.length

  return score
}

function getRecentMatches(existingChats: CoffeeChat[]): Set<string> {
  const recentMatches = new Set<string>()
  const threeWeeksAgo = new Date()
  threeWeeksAgo.setDate(threeWeeksAgo.getDate() - 21)

  existingChats.forEach(chat => {
    const chatDate = new Date(chat.metadata.scheduled_date)
    if (chatDate >= threeWeeksAgo) {
      const p1Id = chat.metadata.participant_1.id
      const p2Id = chat.metadata.participant_2.id
      recentMatches.add(`${p1Id}-${p2Id}`)
      recentMatches.add(`${p2Id}-${p1Id}`)
    }
  })

  return recentMatches
}

function getWeekOfMatch(): string {
  const now = new Date()
  const monday = new Date(now)
  monday.setDate(now.getDate() - now.getDay() + 1)
  
  return monday.toISOString().split('T')[0]
}

function getNextDateForSlot(slot: string): string {
  const [dayName, period] = slot.split(' ')
  const dayIndex = {
    'Monday': 1,
    'Tuesday': 2,
    'Wednesday': 3,
    'Thursday': 4,
    'Friday': 5
  }[dayName] || 1

  const nextWeek = new Date()
  nextWeek.setDate(nextWeek.getDate() + (7 - nextWeek.getDay()) + dayIndex)
  
  return nextWeek.toISOString().split('T')[0]
}

export function getMatchingStats(chats: CoffeeChat[]): {
  totalMatches: number
  completedMatches: number
  cancelledMatches: number
  upcomingMatches: number
  averageRating: number
} {
  const totalMatches = chats.length
  const completedMatches = chats.filter(chat => 
    chat.metadata.status.key === 'completed'
  ).length
  const cancelledMatches = chats.filter(chat => 
    chat.metadata.status.key === 'cancelled'
  ).length
  const upcomingMatches = chats.filter(chat => 
    chat.metadata.status.key === 'scheduled'
  ).length

  const ratingsWithValues = chats
    .filter(chat => chat.metadata.rating?.key)
    .map(chat => parseInt(chat.metadata.rating?.key || '0'))
    .filter(rating => rating > 0)

  const averageRating = ratingsWithValues.length > 0
    ? ratingsWithValues.reduce((sum, rating) => sum + rating, 0) / ratingsWithValues.length
    : 0

  return {
    totalMatches,
    completedMatches,
    cancelledMatches,
    upcomingMatches,
    averageRating
  }
}

export function canGenerateMatches(settings: any): boolean {
  return settings?.metadata?.matching_enabled === true
}

export function getNextMatchingDate(settings: any): Date {
  const matchDay = settings?.metadata?.weekly_match_day?.key || 'monday'
  const dayIndex = {
    'monday': 1,
    'tuesday': 2,
    'wednesday': 3,
    'thursday': 4,
    'friday': 5
  }[matchDay] || 1

  const now = new Date()
  const nextDate = new Date(now)
  
  // Find next occurrence of the matching day
  const currentDay = now.getDay()
  const daysUntilMatch = (dayIndex - currentDay + 7) % 7
  
  if (daysUntilMatch === 0) {
    // Today is the matching day, set to next week
    nextDate.setDate(now.getDate() + 7)
  } else {
    nextDate.setDate(now.getDate() + daysUntilMatch)
  }
  
  return nextDate
}