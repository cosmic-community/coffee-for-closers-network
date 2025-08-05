'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ReactNode } from 'react'

interface SlideUpProps {
  children: ReactNode
  delay?: number
  duration?: number
  distance?: number
  className?: string
  threshold?: number
  triggerOnce?: boolean
  staggerChildren?: boolean
  staggerDelay?: number
}

export function SlideUp({
  children,
  delay = 0,
  duration = 0.8,
  distance = 60,
  className = '',
  threshold = 0.1,
  triggerOnce = true,
  staggerChildren = false,
  staggerDelay = 0.1
}: SlideUpProps) {
  const [ref, inView] = useInView({
    threshold,
    triggerOnce
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerChildren ? staggerDelay : 0,
        delayChildren: delay
      }
    }
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: distance
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  if (staggerChildren) {
    return (
      <motion.div
        ref={ref}
        className={className}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={itemVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  )
}

export function SlideUpItem({ children, className = '' }: { children: ReactNode, className?: string }) {
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 60
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  return (
    <motion.div
      className={className}
      variants={itemVariants}
    >
      {children}
    </motion.div>
  )
}