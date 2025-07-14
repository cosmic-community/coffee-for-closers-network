import { useState } from 'react'
import { PostType } from '@/types'
import { Image, Send, X } from 'lucide-react'

interface CreatePostProps {
  onSubmit: (data: {
    content: string
    postType: PostType
    tags: string[]
    image?: File
  }) => void
  isLoading?: boolean
}

export function CreatePost({ onSubmit, isLoading = false }: CreatePostProps) {
  const [content, setContent] = useState('')
  const [postType, setPostType] = useState<PostType>('general')
  const [tags, setTags] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const postTypes: Array<{ key: PostType; value: string }> = [
    { key: 'tip', value: 'Sales Tip' },
    { key: 'win', value: 'Sales Win' },
    { key: 'question', value: 'Question' },
    { key: 'resource', value: 'Resource Share' },
    { key: 'general', value: 'General Update' }
  ]

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    const tagArray = tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0)

    onSubmit({
      content: content.trim(),
      postType,
      tags: tagArray,
      image: image || undefined
    })

    // Reset form
    setContent('')
    setTags('')
    setImage(null)
    setImagePreview(null)
    setPostType('general')
  }

  const removeImage = () => {
    setImage(null)
    setImagePreview(null)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        Share with the Community
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Post Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Post Type
          </label>
          <select
            value={postType}
            onChange={(e) => setPostType(e.target.value as PostType)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {postTypes.map((type) => (
              <option key={type.key} value={type.key}>
                {type.value}
              </option>
            ))}
          </select>
        </div>

        {/* Content */}
        <div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind? Share a sales tip, celebrate a win, or ask a question..."
            rows={4}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
            maxLength={500}
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {content.length}/500 characters
            </span>
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tags (optional)
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter tags separated by commas (e.g., cold-outreach, demo-tips)"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Add Image (optional)
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 cursor-pointer">
              <Image className="h-5 w-5" />
              <span>Upload Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
          
          {imagePreview && (
            <div className="mt-3 relative inline-block">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!content.trim() || isLoading}
            className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                <span>Posting...</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>Post</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}