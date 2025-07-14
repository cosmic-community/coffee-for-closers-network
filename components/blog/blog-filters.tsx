'use client'

import { useState } from 'react'
import { BlogCategory } from '@/types'
import { Search, Filter, X } from 'lucide-react'

interface BlogFiltersProps {
  categories: Array<{ key: BlogCategory; value: string }>
  selectedCategory: BlogCategory | 'all'
  searchQuery: string
  onCategoryChange: (category: BlogCategory | 'all') => void
  onSearchChange: (query: string) => void
}

export function BlogFilters({
  categories,
  selectedCategory,
  searchQuery,
  onCategoryChange,
  onSearchChange
}: BlogFiltersProps) {
  const [showFilters, setShowFilters] = useState(false)

  const allCategories = [
    { key: 'all' as const, value: 'All Categories' },
    ...categories
  ]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden flex items-center space-x-2 text-gray-600 dark:text-gray-400"
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
        </button>

        {/* Desktop Categories */}
        <div className="hidden lg:flex items-center space-x-2">
          {allCategories.map((category) => (
            <button
              key={category.key}
              onClick={() => onCategoryChange(category.key as BlogCategory | 'all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category.key
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {category.value}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Categories */}
      {showFilters && (
        <div className="lg:hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-2">
            {allCategories.map((category) => (
              <button
                key={category.key}
                onClick={() => {
                  onCategoryChange(category.key as BlogCategory | 'all')
                  setShowFilters(false)
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category.key
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {category.value}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}