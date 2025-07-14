'use client'

import { useState } from 'react'
import { CoffeeChat } from '@/types'
import { formatDate, getStatusColor } from '@/lib/utils'
import { Calendar, Clock, ExternalLink, MessageSquare, Star } from 'lucide-react'

interface ChatsListProps {
  chats: CoffeeChat[]
  currentUserId: string
}

export function ChatsList({ chats, currentUserId }: ChatsListProps) {
  const [filter, setFilter] = useState<'all' | 'scheduled' | 'completed' | 'cancelled'>('all')

  const filteredChats = chats.filter(chat => {
    if (filter === 'all') return true
    return chat.metadata.status.key === filter
  })

  if (chats.length === 0) {
    return (
      <div className="text-center py-8">
        <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500 dark:text-gray-400">
          No coffee chats yet. You'll be matched with fellow sales professionals soon!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filter buttons */}
      <div className="flex space-x-2">
        {[
          { key: 'all', label: 'All' },
          { key: 'scheduled', label: 'Scheduled' },
          { key: 'completed', label: 'Completed' },
          { key: 'cancelled', label: 'Cancelled' }
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key as any)}
            className={`btn btn-sm ${
              filter === key
                ? 'btn-primary'
                : 'btn-outline'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Chats list */}
      <div className="space-y-4">
        {filteredChats.map((chat) => {
          const otherParticipant = chat.metadata.participant_1.id === currentUserId
            ? chat.metadata.participant_2
            : chat.metadata.participant_1

          return (
            <div
              key={chat.id}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  {otherParticipant.metadata.profile_photo && (
                    <img
                      src={otherParticipant.metadata.profile_photo.imgix_url}
                      alt={otherParticipant.metadata.full_name}
                      className="w-12 h-12 rounded-full"
                    />
                  )}
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
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
                </div>

                <div className="flex items-center space-x-2">
                  <span className={`badge ${getStatusColor(chat.metadata.status.key)}`}>
                    {chat.metadata.status.value}
                  </span>
                  
                  {chat.metadata.meeting_link && chat.metadata.status.key === 'scheduled' && (
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

              {/* Chat notes */}
              {chat.metadata.notes && (
                <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>Notes:</strong> {chat.metadata.notes}
                  </p>
                </div>
              )}

              {/* Feedback and rating */}
              {chat.metadata.status.key === 'completed' && (
                <div className="mt-4 space-y-2">
                  {chat.metadata.rating?.key && (
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium">
                        {chat.metadata.rating.value}
                      </span>
                    </div>
                  )}
                  
                  {(chat.metadata.feedback_participant_1 || chat.metadata.feedback_participant_2) && (
                    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        <strong>Feedback:</strong> {
                          chat.metadata.participant_1.id === currentUserId
                            ? chat.metadata.feedback_participant_1
                            : chat.metadata.feedback_participant_2
                        }
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}