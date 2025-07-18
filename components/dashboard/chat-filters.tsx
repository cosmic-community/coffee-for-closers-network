'use client'

import { useState } from 'react'
import { ChatStatus } from '@/types'
import { Filter, Calendar, Clock } from 'lucide-react'

type TimeRange = 'all' | 'upcoming' | 'past'

interface ChatFiltersProps {
  selectedStatus: ChatStatus | 'all'
  selectedTimeRange: TimeRange
  onStatusChange: (status: ChatStatus | 'all') => void
  onTimeRangeChange: (range: TimeRange) => void
}

export function ChatFilters({
  selectedStatus,
  selectedTimeRange,
  onStatusChange,
  onTimeRangeChange
}: ChatFiltersProps) {
  const [showFilters, setShowFilters] = useState(false)

  const statusOptions = [
    { key: 'all' as const, value: 'All Status' },
    { key: 'scheduled' as ChatStatus, value: 'Scheduled' },
    { key: 'completed' as ChatStatus, value: 'Completed' },
    { key: 'cancelled' as ChatStatus, value: 'Cancelled' },
    { key: 'no-show' as ChatStatus, value: 'No Show' }
  ]

  const timeRangeOptions = [
    { key: 'all' as TimeRange, value: 'All Time' },
    { key: 'upcoming' as TimeRange, value: 'Upcoming' },
    { key: 'past' as TimeRange, value: 'Past' }
  ]

  const handleStatusChange = (status: string) => {
    onStatusChange(status as ChatStatus | 'all')
  }

  const handleTimeRangeChange = (range: string) => {
    onTimeRangeChange(range as TimeRange)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Filter Chats
        </h3>
        
        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden flex items-center space-x-2 text-gray-600 dark:text-gray-400"
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
        </button>
      </div>

      {/* Desktop Filters */}
      <div className="hidden lg:block mt-4 space-y-4">
        {/* Status Filter */}
        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Calendar className="h-4 w-4" />
            <span>Status</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {statusOptions.map((status) => (
              <button
                key={status.key}
                onClick={() => handleStatusChange(status.key)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedStatus === status.key
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {status.value}
              </button>
            ))}
          </div>
        </div>

        {/* Time Range Filter */}
        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Clock className="h-4 w-4" />
            <span>Time Range</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {timeRangeOptions.map((range) => (
              <button
                key={range.key}
                onClick={() => handleTimeRangeChange(range.key)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedTimeRange === range.key
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {range.value}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Filters */}
      {showFilters && (
        <div className="lg:hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
          {/* Status Filter */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Calendar className="h-4 w-4" />
              <span>Status</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((status) => (
                <button
                  key={status.key}
                  onClick={() => {
                    handleStatusChange(status.key)
                    setShowFilters(false)
                  }}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedStatus === status.key
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {status.value}
                </button>
              ))}
            </div>
          </div>

          {/* Time Range Filter */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Clock className="h-4 w-4" />
              <span>Time Range</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {timeRangeOptions.map((range) => (
                <button
                  key={range.key}
                  onClick={() => {
                    handleTimeRangeChange(range.key)
                    setShowFilters(false)
                  }}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedTimeRange === range.key
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {range.value}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}