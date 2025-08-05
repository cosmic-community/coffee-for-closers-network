import { Variants } from 'framer-motion'

// Page transitions
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20
  },
  in: {
    opacity: 1,
    y: 0
  },
  out: {
    opacity: 0,
    y: -20
  }
}

export const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5
}

// Stagger animations
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 30
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}

// Card animations
export const cardHover: Variants = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  },
  hover: {
    scale: 1.02,
    y: -5,
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  }
}

// Button animations
export const buttonVariants: Variants = {
  rest: {
    scale: 1
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: 'easeOut'
    }
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1,
      ease: 'easeOut'
    }
  }
}

// Modal animations
export const modalBackdrop: Variants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2
    }
  }
}

export const modalContent: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 20
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}

// Slide animations
export const slideInVariants: Variants = {
  left: {
    x: -100,
    opacity: 0
  },
  right: {
    x: 100,
    opacity: 0
  },
  top: {
    y: -100,
    opacity: 0
  },
  bottom: {
    y: 100,
    opacity: 0
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1
  }
}

// Text animations
export const textReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
}

export const letterAnimation: Variants = {
  hidden: {
    opacity: 0,
    y: 50
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}

// Loading animations
export const loadingSpinner: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear'
    }
  }
}

export const loadingDots: Variants = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
}

// Floating animations
export const floatingAnimation: Variants = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
}

export const pulseAnimation: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
}

// Form animations
export const formFieldVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -20
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut'
    }
  },
  error: {
    x: [0, -10, 10, -10, 10, 0],
    transition: {
      duration: 0.5
    }
  }
}

// Navigation animations
export const navItemVariants: Variants = {
  closed: {
    opacity: 0,
    x: -20
  },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  }
}

export const mobileMenuVariants: Variants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.3,
      when: 'afterChildren'
    }
  },
  open: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: 0.3,
      when: 'beforeChildren',
      staggerChildren: 0.1
    }
  }
}

// Notification animations
export const notificationVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 100,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  },
  exit: {
    opacity: 0,
    x: 100,
    scale: 0.9,
    transition: {
      duration: 0.2,
      ease: 'easeIn'
    }
  }
}

// Tab animations
export const tabContentVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  }
}

// Accordion animations
export const accordionVariants: Variants = {
  closed: {
    height: 0,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: 'easeInOut'
    }
  },
  open: {
    height: 'auto',
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeInOut'
    }
  }
}

// Utility functions
export const createStaggerVariants = (staggerDelay: number = 0.1): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay
    }
  }
})

export const createSlideVariants = (direction: 'left' | 'right' | 'up' | 'down', distance: number = 50): Variants => {
  const offsets = {
    left: { x: -distance, y: 0 },
    right: { x: distance, y: 0 },
    up: { x: 0, y: -distance },
    down: { x: 0, y: distance }
  }

  return {
    hidden: {
      opacity: 0,
      ...offsets[direction]
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  }
}

export const createScaleVariants = (initialScale: number = 0.9): Variants => ({
  hidden: {
    opacity: 0,
    scale: initialScale
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut'
    }
  }
})

// Animation presets
export const animationPresets = {
  // Quick and snappy
  quick: {
    duration: 0.2,
    ease: 'easeOut'
  },
  // Smooth and natural
  smooth: {
    duration: 0.4,
    ease: [0.25, 0.46, 0.45, 0.94]
  },
  // Bouncy and playful
  bouncy: {
    duration: 0.6,
    ease: [0.68, -0.55, 0.265, 1.55]
  },
  // Slow and elegant
  elegant: {
    duration: 0.8,
    ease: [0.25, 0.46, 0.45, 0.94]
  }
}