import { useState } from 'react'
import { PostType } from '@/types'
import { Filter, X } from 'lucide-react'

interface PostFiltersProps {
  postTypes: Array<{ key: PostType; value: string }>
  selectedType: PostType | 'all'
  onTypeChange: (type: PostType | 'all') => void
}

export function PostFilters({
  postTypes,
  selectedType,
  onTypeChange
}: PostFiltersProps) {
  const [showFilters, setShowFilters] = useState(false)

  const allTypes = [
    { key: 'all' as const, value: 'All Posts' },
    ...postTypes
  ]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Filter Posts
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
      <div className="hidden lg:flex items-center space-x-2 mt-4">
        {allTypes.map((type) => (
          <button
            key={type.key}
            onClick={() => onTypeChange(type.key as PostType | 'all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedType === type.key
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {type.value}
          </button>
        ))}
      </div>

      {/* Mobile Filters */}
      {showFilters && (
        <div className="lg:hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-2">
            {allTypes.map((type) => (
              <button
                key={type.key}
                onClick={() => {
                  onTypeChange(type.key as PostType | 'all')
                  setShowFilters(false)
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedType === type.key
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {type.value}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}