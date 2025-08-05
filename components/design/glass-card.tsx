'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  blur?: 'sm' | 'md' | 'lg' | 'xl'
  border?: boolean
  shadow?: boolean
}

export function GlassCard({
  children,
  className = '',
  hover = true,
  blur = 'md',
  border = true,
  shadow = true
}: GlassCardProps) {
  const blurClasses = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl'
  }

  return (
    <motion.div
      className={cn(
        'relative rounded-xl bg-white/10 dark:bg-black/10',
        blurClasses[blur],
        border && 'border border-white/20 dark:border-white/10',
        shadow && 'shadow-xl shadow-black/5',
        hover && 'transition-all duration-300 hover:bg-white/20 dark:hover:bg-black/20 hover:shadow-2xl hover:shadow-black/10',
        className
      )}
      whileHover={hover ? { y: -5 } : undefined}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export function GlassButton({
  children,
  className = '',
  onClick,
  disabled = false,
  variant = 'default'
}: {
  children: ReactNode
  className?: string
  onClick?: () => void
  disabled?: boolean
  variant?: 'default' | 'primary' | 'secondary'
}) {
  const variants = {
    default: 'bg-white/10 hover:bg-white/20 text-white border-white/20',
    primary: 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-100 border-blue-400/30',
    secondary: 'bg-purple-500/20 hover:bg-purple-500/30 text-purple-100 border-purple-400/30'
  }

  return (
    <motion.button
      className={cn(
        'px-6 py-3 rounded-lg backdrop-blur-md border transition-all duration-300',
        'focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent',
        variants[variant],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.05 } : undefined}
      whileTap={!disabled ? { scale: 0.95 } : undefined}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.button>
  )
}

export function GlassModal({
  children,
  isOpen,
  onClose,
  className = ''
}: {
  children: ReactNode
  isOpen: boolean
  onClose: () => void
  className?: string
}) {
  if (!isOpen) return null

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.div
        className={cn(
          'relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl max-w-lg w-full',
          className
        )}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}