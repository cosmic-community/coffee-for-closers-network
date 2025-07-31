'use client'

import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight, Users, Coffee, Calendar } from 'lucide-react'

interface SuccessConfirmationProps {
  name: string
  onComplete: () => void
}

const benefits = [
  {
    icon: Coffee,
    title: 'Weekly Coffee Chats',
    description: 'Get matched with sales professionals every Monday'
  },
  {
    icon: Users,
    title: 'Growing Network',
    description: 'Join 500+ SaaS and software sales professionals'
  },
  {
    icon: Calendar,
    title: 'Flexible Scheduling',
    description: 'Book 15-minute chats that fit your schedule'
  }
]

export function SuccessConfirmation({ name, onComplete }: SuccessConfirmationProps) {
  return (
    <motion.div 
      className="text-center space-y-8"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Success Icon */}
      <motion.div 
        className="flex justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
          <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
        </div>
      </motion.div>

      {/* Welcome Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome, {name}! 🎉
        </h2>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          You're now part of Coffee Closer Network
        </p>
      </motion.div>

      {/* What's Next */}
      <motion.div 
        className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          What happens next?
        </h3>
        
        <div className="space-y-4">
          {benefits.map((benefit, index) => (
            <motion.div 
              key={index}
              className="flex items-start space-x-3 text-left"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
            >
              <div className="flex-shrink-0 w-8 h-8 bg-white dark:bg-gray-600 rounded-full flex items-center justify-center">
                <benefit.icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {benefit.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div 
        className="grid grid-cols-3 gap-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">500+</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Members</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">1200+</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Chats</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">95%</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Happy</div>
        </div>
      </motion.div>

      {/* Complete Button */}
      <motion.button
        onClick={onComplete}
        className="w-full flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 font-medium"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Complete Setup
        <ArrowRight className="w-5 h-5 ml-2" />
      </motion.button>

      {/* Footer Message */}
      <motion.p 
        className="text-sm text-gray-500 dark:text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        We'll help you complete your profile and get your first match!
      </motion.p>
    </motion.div>
  )
}