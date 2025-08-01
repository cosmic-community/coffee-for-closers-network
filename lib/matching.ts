import { CoffeeChat, MatchingStats } from '@/types'

export function getMatchingStats(chats: CoffeeChat[]): MatchingStats {
  const totalMatches = chats.length
  const completedMatches = chats.filter(chat => chat.metadata?.status?.key === 'completed').length
  const cancelledMatches = chats.filter(chat => chat.metadata?.status?.key === 'cancelled').length
  const upcomingMatches = chats.filter(chat => 
    chat.metadata?.status?.key === 'scheduled' &&
    new Date(chat.metadata?.scheduled_date || '') > new Date()
  ).length

  // Calculate average rating from completed chats with ratings
  const ratedChats = chats.filter(chat => 
    chat.metadata?.status?.key === 'completed' && 
    chat.metadata?.rating?.key && 
    !isNaN(Number(chat.metadata.rating.key))
  )
  
  const averageRating = ratedChats.length > 0 
    ? ratedChats.reduce((sum, chat) => sum + Number(chat.metadata?.rating?.key || 0), 0) / ratedChats.length
    : 0

  return {
    totalMatches,
    completedMatches,
    cancelledMatches,
    upcomingMatches,
    averageRating: Math.round(averageRating * 10) / 10 // Round to 1 decimal place
  }
}

export function canUserCreateMatch(userChats: CoffeeChat[], maxChatsPerWeek: number): boolean {
  const now = new Date()
  const weekStart = new Date(now.setDate(now.getDate() - now.getDay()))
  weekStart.setHours(0, 0, 0, 0)
  
  const thisWeekChats = userChats.filter(chat => {
    const chatDate = new Date(chat.metadata?.scheduled_date || '')
    return chatDate >= weekStart && chat.metadata?.status?.key === 'scheduled'
  })
  
  return thisWeekChats.length < maxChatsPerWeek
}

export function getAvailableMatchDays(): string[] {
  return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
}

export function generateChatTitle(participant1Name: string, participant2Name: string): string {
  return `${participant1Name} & ${participant2Name} Coffee Chat`
}