'use client'

import { motion } from 'framer-motion'
import { Coffee, Users, TrendingUp, MessageSquare, Calendar, Star } from 'lucide-react'

export function FloatingIcons() {
  const icons = [
    { Icon: Coffee, delay: 0, x: '10%', y: '20%' },
    { Icon: Users, delay: 2, x: '80%', y: '15%' },
    { Icon: TrendingUp, delay: 4, x: '15%', y: '70%' },
    { Icon: MessageSquare, delay: 1, x: '75%', y: '65%' },
    { Icon: Calendar, delay: 3, x: '50%', y: '10%' },
    { Icon: Star, delay: 5, x: '90%', y: '80%' }
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map(({ Icon, delay, x, y }, index) => (
        <motion.div
          key={index}
          className="absolute opacity-20 dark:opacity-10"
          style={{ left: x, top: y }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 8 + index,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay
          }}
        >
          <Icon className="w-8 h-8 text-current" />
        </motion.div>
      ))}
    </div>
  )
}

export function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
        style={{ top: '-10%', left: '-10%' }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute w-72 h-72 bg-gradient-to-r from-pink-400/20 to-yellow-400/20 rounded-full blur-3xl"
        style={{ bottom: '-10%', right: '-10%' }}
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -40, 0],
          y: [0, 25, 0]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      <motion.div
        className="absolute w-48 h-48 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-2xl"
        style={{ top: '40%', left: '60%' }}
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  )
}

export function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute w-4 h-4 bg-blue-500/30 rounded-full"
        style={{ top: '20%', left: '10%' }}
        animate={{
          y: [0, -100, 0],
          opacity: [0, 1, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0
        }}
      />
      <motion.div
        className="absolute w-3 h-3 bg-purple-500/30 rounded-full"
        style={{ top: '60%', left: '80%' }}
        animate={{
          y: [0, -80, 0],
          opacity: [0, 1, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      <motion.div
        className="absolute w-2 h-2 bg-pink-500/30 rounded-full"
        style={{ top: '40%', left: '30%' }}
        animate={{
          y: [0, -60, 0],
          opacity: [0, 1, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      <motion.div
        className="absolute w-6 h-6 bg-yellow-500/30 rounded-full"
        style={{ top: '80%', left: '70%' }}
        animate={{
          y: [0, -120, 0],
          opacity: [0, 1, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
      />
    </div>
  )
}

export function FloatingCards() {
  const cards = [
    { title: "Coffee Chat", icon: Coffee, color: "from-coffee-brown-400 to-coffee-brown-600" },
    { title: "Networking", icon: Users, color: "from-blue-400 to-blue-600" },
    { title: "Growth", icon: TrendingUp, color: "from-green-400 to-green-600" },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          className={`absolute bg-gradient-to-br ${card.color} rounded-lg p-4 shadow-lg backdrop-blur-sm bg-opacity-20`}
          style={{
            top: `${20 + index * 25}%`,
            left: `${10 + index * 30}%`,
            width: '120px',
            height: '80px'
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 4 + index,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.5
          }}
        >
          <card.icon className="w-6 h-6 text-white mb-2" />
          <p className="text-xs text-white font-medium">{card.title}</p>
        </motion.div>
      ))}
    </div>
  )
}