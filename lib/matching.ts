import { MatchingStats } from '@/types'

export function calculateMatchingStats(chats: any[]): MatchingStats {
  const totalMatches = chats.length
  const completedMatches = chats.filter(chat => 
    chat.metadata?.status?.key === 'completed'
  ).length
  const cancelledMatches = chats.filter(chat => 
    chat.metadata?.status?.key === 'cancelled'
  ).length
  const upcomingMatches = chats.filter(chat => 
    chat.metadata?.status?.key === 'scheduled'
  ).length

  // Calculate average rating from completed chats
  const ratedChats = chats.filter(chat => 
    chat.metadata?.rating?.key && chat.metadata.rating.key !== ''
  )
  const averageRating = ratedChats.length > 0 
    ? ratedChats.reduce((sum, chat) => sum + parseInt(chat.metadata.rating.key), 0) / ratedChats.length
    : 0

  return {
    totalMatches,
    completedMatches,
    cancelledMatches,
    upcomingMatches,
    averageRating
  }
}