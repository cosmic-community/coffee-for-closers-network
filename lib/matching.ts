import { CoffeeChat } from '@/types'

export interface MatchingStats {
  totalMatches: number
  completedMatches: number
  cancelledMatches: number
  upcomingMatches: number
  averageRating: number
}

export function getMatchingStats(chats: CoffeeChat[]): MatchingStats {
  const totalMatches = chats.length
  const completedMatches = chats.filter(chat => 
    typeof chat.metadata.status === 'object' 
      ? chat.metadata.status.key === 'completed'
      : chat.metadata.status === 'completed'
  ).length
  
  const cancelledMatches = chats.filter(chat => 
    typeof chat.metadata.status === 'object' 
      ? chat.metadata.status.key === 'cancelled'
      : chat.metadata.status === 'cancelled'
  ).length
  
  const upcomingMatches = chats.filter(chat => 
    typeof chat.metadata.status === 'object' 
      ? chat.metadata.status.key === 'scheduled'
      : chat.metadata.status === 'scheduled'
  ).length

  // Calculate average rating from completed chats with ratings
  const completedChatsWithRatings = chats.filter(chat => {
    const isCompleted = typeof chat.metadata.status === 'object' 
      ? chat.metadata.status.key === 'completed'
      : chat.metadata.status === 'completed'
    
    const hasRating = chat.metadata.rating && (
      typeof chat.metadata.rating === 'object' 
        ? chat.metadata.rating.key && chat.metadata.rating.key !== ''
        : chat.metadata.rating !== ''
    )
    
    return isCompleted && hasRating
  })

  const averageRating = completedChatsWithRatings.length > 0
    ? completedChatsWithRatings.reduce((sum, chat) => {
        const rating = typeof chat.metadata.rating === 'object' 
          ? parseInt(chat.metadata.rating.key) || 0
          : parseInt(chat.metadata.rating) || 0
        return sum + rating
      }, 0) / completedChatsWithRatings.length
    : 0

  return {
    totalMatches,
    completedMatches,
    cancelledMatches,
    upcomingMatches,
    averageRating: Math.round(averageRating * 10) / 10 // Round to 1 decimal place
  }
}

export function createWeeklyMatches(users: any[]): CoffeeChat[] {
  // Implementation for creating weekly matches
  // This would contain the matching algorithm logic
  return []
}

export function getMatchingAlgorithm() {
  // Implementation for matching algorithm preferences
  return {
    prioritizeTimezone: true,
    prioritizeExperience: false,
    prioritizeIndustry: true,
    maxChatsPerWeek: 2
  }
}