'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface GradientBackgroundProps {
  children: ReactNode
  variant?: 'hero' | 'subtle' | 'vibrant' | 'dark' | 'coffee'
  className?: string
  animated?: boolean
}

export function GradientBackground({
  children,
  variant = 'hero',
  className = '',
  animated = true
}: GradientBackgroundProps) {
  const gradients = {
    hero: 'bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800',
    subtle: 'bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900',
    vibrant: 'bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500',
    dark: 'bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900',
    coffee: 'bg-gradient-to-br from-coffee-brown-800 via-coffee-brown-600 to-coffee-brown-400'
  }

  const floatingShapes = animated ? (
    <>
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/3 w-48 h-48 bg-purple-400/15 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </>
  ) : null

  return (
    <div className={`relative overflow-hidden ${gradients[variant]} ${className}`}>
      {floatingShapes}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

export function AnimatedGradientText({
  children,
  className = ''
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.span
      className={`bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent bg-300% ${className}`}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{
        backgroundSize: '300% 300%'
      }}
    >
      {children}
    </motion.span>
  )
}