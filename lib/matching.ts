import { User, CoffeeChat, CreateChatData } from '@/types'
import { getAllUsers, getCoffeeChats, createObject } from '@/lib/cosmic'

export interface MatchingOptions {
  maxChatsPerWeek: number
  excludeRecentMatches: boolean
  recentMatchThreshold: number // days
  preferredTimezones?: string[]
  preferredIndustries?: string[]
}

export interface MatchResult {
  participant1: User
  participant2: User
  score: number
  reasons: string[]
}

export interface MatchingStats {
  totalUsers: number
  eligibleUsers: number
  totalMatches: number
  successfulMatches: number
  failedMatches: number
}

export function getMatchingStats(chats: CoffeeChat[]): MatchingStats {
  const totalMatches = chats.length
  const successfulMatches = chats.filter(chat => 
    chat.metadata.status.key === 'completed'
  ).length
  const failedMatches = chats.filter(chat => 
    chat.metadata.status.key === 'cancelled' || chat.metadata.status.key === 'no-show'
  ).length

  return {
    totalUsers: 0, // This would be calculated separately
    eligibleUsers: 0, // This would be calculated separately  
    totalMatches,
    successfulMatches,
    failedMatches
  }
}

class MatchingService {
  private defaultOptions: MatchingOptions = {
    maxChatsPerWeek: 2,
    excludeRecentMatches: true,
    recentMatchThreshold: 30, // 30 days
  }

  async generateMatches(options?: Partial<MatchingOptions>): Promise<{
    matches: MatchResult[]
    stats: MatchingStats
  }> {
    const config = { ...this.defaultOptions, ...options }
    
    try {
      const users = await this.getEligibleUsers(config)
      const recentChats = await this.getRecentChats(config.recentMatchThreshold)
      
      const matches = this.calculateMatches(users, recentChats, config)
      const optimizedMatches = this.optimizeMatches(matches)
      
      const stats: MatchingStats = {
        totalUsers: users.length,
        eligibleUsers: users.filter(u => u.metadata.active_member).length,
        totalMatches: optimizedMatches.length,
        successfulMatches: 0,
        failedMatches: 0,
      }

      return { matches: optimizedMatches, stats }
    } catch (error) {
      console.error('Error generating matches:', error)
      throw error
    }
  }

  async createCoffeeChats(matches: MatchResult[]): Promise<{
    created: CoffeeChat[]
    failed: { match: MatchResult; error: string }[]
  }> {
    const created: CoffeeChat[] = []
    const failed: { match: MatchResult; error: string }[] = []

    for (const match of matches) {
      try {
        const chat = await this.createChatFromMatch(match)
        created.push(chat)
      } catch (error) {
        failed.push({
          match,
          error: error instanceof Error ? error.message : 'Unknown error'
        })
      }
    }

    return { created, failed }
  }

  private async getEligibleUsers(options: MatchingOptions): Promise<User[]> {
    const allUsers = await getAllUsers()
    
    return allUsers.filter(user => {
      if (!user.metadata.active_member) return false
      
      // Check if user has preferred timezones
      if (options.preferredTimezones && options.preferredTimezones.length > 0) {
        const userTimezone = typeof user.metadata.timezone === 'string' 
          ? user.metadata.timezone 
          : user.metadata.timezone?.key
        
        if (!userTimezone || !options.preferredTimezones.includes(userTimezone)) {
          return false
        }
      }
      
      // Check if user has preferred industries
      if (options.preferredIndustries && options.preferredIndustries.length > 0) {
        const hasMatchingIndustry = user.metadata.industry_focus.some(industry =>
          options.preferredIndustries!.includes(industry)
        )
        
        if (!hasMatchingIndustry) return false
      }
      
      return true
    })
  }

  private async getRecentChats(days: number): Promise<CoffeeChat[]> {
    const allChats = await getCoffeeChats()
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - days)
    
    return allChats.filter(chat => {
      const chatDate = new Date(chat.metadata.scheduled_date)
      return chatDate >= cutoffDate
    })
  }

  private calculateMatches(
    users: User[],
    recentChats: CoffeeChat[],
    options: MatchingOptions
  ): MatchResult[] {
    const matches: MatchResult[] = []
    const recentPairs = this.getRecentPairs(recentChats)
    
    for (let i = 0; i < users.length; i++) {
      for (let j = i + 1; j < users.length; j++) {
        const user1 = users[i]!
        const user2 = users[j]!
        
        // Skip if recently matched
        if (options.excludeRecentMatches) {
          const pairKey = this.getPairKey(user1.id, user2.id)
          if (recentPairs.has(pairKey)) continue
        }
        
        // Calculate compatibility score
        const score = this.calculateCompatibilityScore(user1, user2)
        const reasons = this.getMatchReasons(user1, user2)
        
        matches.push({
          participant1: user1,
          participant2: user2,
          score,
          reasons,
        })
      }
    }
    
    return matches.sort((a, b) => b.score - a.score)
  }

  private optimizeMatches(matches: MatchResult[]): MatchResult[] {
    const optimized: MatchResult[] = []
    const usedUsers = new Set<string>()
    
    for (const match of matches) {
      const user1Id = match.participant1.id
      const user2Id = match.participant2.id
      
      if (!usedUsers.has(user1Id) && !usedUsers.has(user2Id)) {
        optimized.push(match)
        usedUsers.add(user1Id)
        usedUsers.add(user2Id)
      }
    }
    
    return optimized
  }

  private calculateCompatibilityScore(user1: User, user2: User): number {
    let score = 0
    
    // Industry overlap
    const industries1 = user1.metadata.industry_focus
    const industries2 = user2.metadata.industry_focus
    const industryOverlap = industries1.filter(industry => 
      industries2.includes(industry)
    ).length
    score += industryOverlap * 20
    
    // Experience level compatibility
    const exp1 = typeof user1.metadata.years_experience === 'string' 
      ? user1.metadata.years_experience 
      : user1.metadata.years_experience?.key
    const exp2 = typeof user2.metadata.years_experience === 'string' 
      ? user2.metadata.years_experience 
      : user2.metadata.years_experience?.key
    
    if (exp1 === exp2) score += 15
    else if (this.isAdjacentExperienceLevel(exp1, exp2)) score += 10
    
    // Timezone compatibility
    const tz1 = typeof user1.metadata.timezone === 'string' 
      ? user1.metadata.timezone 
      : user1.metadata.timezone?.key
    const tz2 = typeof user2.metadata.timezone === 'string' 
      ? user2.metadata.timezone 
      : user2.metadata.timezone?.key
    
    if (tz1 === tz2) score += 25
    else if (this.areCompatibleTimezones(tz1, tz2)) score += 15
    
    // Availability overlap
    const availabilityOverlap = user1.metadata.availability.filter(slot =>
      user2.metadata.availability.includes(slot)
    ).length
    score += availabilityOverlap * 5
    
    // Random factor for variety
    score += Math.random() * 10
    
    return Math.round(score)
  }

  private getMatchReasons(user1: User, user2: User): string[] {
    const reasons: string[] = []
    
    // Industry overlap
    const industryOverlap = user1.metadata.industry_focus.filter(industry =>
      user2.metadata.industry_focus.includes(industry)
    )
    
    if (industryOverlap.length > 0) {
      reasons.push(`Shared interest in ${industryOverlap.join(', ')}`)
    }
    
    // Experience level
    const exp1 = typeof user1.metadata.years_experience === 'string' 
      ? user1.metadata.years_experience 
      : user1.metadata.years_experience?.value
    const exp2 = typeof user2.metadata.years_experience === 'string' 
      ? user2.metadata.years_experience 
      : user2.metadata.years_experience?.value
    
    if (exp1 === exp2) {
      reasons.push(`Similar experience level (${exp1})`)
    }
    
    // Timezone
    const tz1 = typeof user1.metadata.timezone === 'string' 
      ? user1.metadata.timezone 
      : user1.metadata.timezone?.value
    const tz2 = typeof user2.metadata.timezone === 'string' 
      ? user2.metadata.timezone 
      : user2.metadata.timezone?.value
    
    if (tz1 === tz2) {
      reasons.push(`Same timezone (${tz1})`)
    }
    
    // Availability
    const availabilityOverlap = user1.metadata.availability.filter(slot =>
      user2.metadata.availability.includes(slot)
    )
    
    if (availabilityOverlap.length > 2) {
      reasons.push(`Multiple matching availability slots`)
    }
    
    return reasons
  }

  private getRecentPairs(chats: CoffeeChat[]): Set<string> {
    const pairs = new Set<string>()
    
    chats.forEach(chat => {
      const pairKey = this.getPairKey(
        chat.metadata.participant_1.id,
        chat.metadata.participant_2.id
      )
      pairs.add(pairKey)
    })
    
    return pairs
  }

  private getPairKey(userId1: string, userId2: string): string {
    return [userId1, userId2].sort().join('-')
  }

  private isAdjacentExperienceLevel(exp1?: string, exp2?: string): boolean {
    const levels = ['0-2', '3-5', '6-10', '10+']
    const index1 = levels.indexOf(exp1 || '')
    const index2 = levels.indexOf(exp2 || '')
    
    return Math.abs(index1 - index2) === 1
  }

  private areCompatibleTimezones(tz1?: string, tz2?: string): boolean {
    const adjacentTimezones: Record<string, string[]> = {
      'EST': ['CST'],
      'CST': ['EST', 'MST'],
      'MST': ['CST', 'PST'],
      'PST': ['MST'],
      'GMT': ['CET'],
      'CET': ['GMT'],
    }
    
    if (!tz1 || !tz2) return false
    
    return adjacentTimezones[tz1]?.includes(tz2) || false
  }

  private async createChatFromMatch(match: MatchResult): Promise<CoffeeChat> {
    const nextMonday = this.getNextMonday()
    const chatTitle = `${match.participant1.metadata.full_name} & ${match.participant2.metadata.full_name} Coffee Chat`
    
    const chatData: CreateChatData = {
      title: chatTitle,
      metadata: {
        chat_title: chatTitle,
        participant_1: match.participant1.id,
        participant_2: match.participant2.id,
        scheduled_date: nextMonday.toISOString().split('T')[0]!,
        status: 'scheduled',
        week_of_match: this.getWeekOfYear(nextMonday),
        auto_generated: true,
      },
    }
    
    return createObject(chatData) as Promise<CoffeeChat>
  }

  private getNextMonday(): Date {
    const today = new Date()
    const monday = new Date(today)
    const daysUntilMonday = (1 + 7 - today.getDay()) % 7
    monday.setDate(today.getDate() + (daysUntilMonday || 7))
    return monday
  }

  private getWeekOfYear(date: Date): string {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1)
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000
    const weekOfYear = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
    return `${date.getFullYear()}-W${weekOfYear.toString().padStart(2, '0')}`
  }
}

// Create and export singleton instance
export const matchingService = new MatchingService()

// Export convenience functions
export const generateMatches = (options?: Partial<MatchingOptions>) =>
  matchingService.generateMatches(options)

export const createCoffeeChats = (matches: MatchResult[]) =>
  matchingService.createCoffeeChats(matches)