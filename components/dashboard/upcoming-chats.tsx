import { CoffeeChat } from '@/types'
import { formatDate } from '@/lib/utils'
import { Calendar, Clock, ExternalLink, Coffee } from 'lucide-react'

interface UpcomingChatsProps {
  chats: CoffeeChat[]
}

export function UpcomingChats({ chats }: UpcomingChatsProps) {
  if (chats.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Upcoming Chats
        </h2>
        <div className="text-center py-8">
          <Coffee className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            No upcoming chats scheduled. You'll be matched with fellow sales professionals soon!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Upcoming Chats
      </h2>
      
      <div className="space-y-4">
        {chats.map((chat) => {
          const otherParticipant = chat.metadata.participant_1.metadata.full_name === 'Current User' 
            ? chat.metadata.participant_2 
            : chat.metadata.participant_1

          return (
            <div
              key={chat.id}
              className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              {otherParticipant.metadata.profile_photo && (
                <img
                  src={otherParticipant.metadata.profile_photo.imgix_url}
                  alt={otherParticipant.metadata.full_name}
                  className="w-12 h-12 rounded-full"
                />
              )}
              
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {otherParticipant.metadata.full_name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {otherParticipant.metadata.job_title} at {otherParticipant.metadata.company}
                </p>
                <div className="flex items-center space-x-4 mt-1">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      {formatDate(chat.metadata.scheduled_date)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      15 min
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                {chat.metadata.meeting_link && (
                  <a
                    href={chat.metadata.meeting_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Join
                  </a>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}