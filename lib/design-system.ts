export const designTokens = {
  // Color palette
  colors: {
    primary: {
      50: '#eff8ff',
      100: '#daedff',
      200: '#bce0ff',
      300: '#8eccff',
      400: '#59afff',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      950: '#172554'
    },
    coffee: {
      50: '#f7f3f0',
      100: '#ede3d9',
      200: '#dac7b3',
      300: '#c2a485',
      400: '#ad8660',
      500: '#8b6f47',
      600: '#705a3a',
      700: '#5c4830',
      800: '#4e3c2a',
      900: '#443427'
    },
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
      950: '#030712'
    },
    success: {
      50: '#f0fdf4',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d'
    },
    warning: {
      50: '#fffbeb',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309'
    },
    error: {
      50: '#fef2f2',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c'
    }
  },

  // Typography
  typography: {
    fontFamilies: {
      sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      heading: ['Cal Sans', 'Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'monospace']
    },
    fontSizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
      '7xl': '4.5rem',
      '8xl': '6rem',
      '9xl': '8rem'
    },
    fontWeights: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900'
    },
    lineHeights: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2'
    },
    letterSpacings: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em'
    }
  },

  // Spacing
  spacing: {
    px: '1px',
    0: '0',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    11: '2.75rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem'
  },

  // Border radius
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px'
  },

  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    none: '0 0 #0000'
  },

  // Gradients
  gradients: {
    hero: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    primary: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    coffee: 'linear-gradient(135deg, #8b4513 0%, #d2691e 50%, #cd853f 100%)',
    success: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    warning: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    error: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    sunset: 'linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)',
    ocean: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    forest: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)',
    cosmic: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'
  },

  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },

  // Z-index
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800
  },

  // Component variants
  components: {
    button: {
      sizes: {
        sm: {
          height: '2rem',
          minWidth: '2rem',
          fontSize: '0.875rem',
          paddingX: '0.75rem'
        },
        md: {
          height: '2.5rem',
          minWidth: '2.5rem',
          fontSize: '1rem',
          paddingX: '1rem'
        },
        lg: {
          height: '3rem',
          minWidth: '3rem',
          fontSize: '1.125rem',
          paddingX: '1.5rem'
        },
        xl: {
          height: '3.5rem',
          minWidth: '3.5rem',
          fontSize: '1.25rem',
          paddingX: '2rem'
        }
      },
      variants: {
        solid: {
          backgroundColor: 'primary.500',
          color: 'white',
          _hover: {
            backgroundColor: 'primary.600'
          }
        },
        outline: {
          border: '1px solid',
          borderColor: 'primary.500',
          color: 'primary.500',
          _hover: {
            backgroundColor: 'primary.50'
          }
        },
        ghost: {
          color: 'primary.500',
          _hover: {
            backgroundColor: 'primary.50'
          }
        },
        glass: {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: 'white'
        }
      }
    },
    card: {
      variants: {
        elevated: {
          backgroundColor: 'white',
          boxShadow: 'lg',
          borderRadius: 'lg'
        },
        outlined: {
          backgroundColor: 'white',
          border: '1px solid',
          borderColor: 'gray.200',
          borderRadius: 'lg'
        },
        glass: {
          backgroundColor: 'rgba(255, 255, 255, 0.25)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          borderRadius: 'xl'
        }
      }
    },
    input: {
      sizes: {
        sm: {
          height: '2rem',
          fontSize: '0.875rem',
          paddingX: '0.75rem'
        },
        md: {
          height: '2.5rem',
          fontSize: '1rem',
          paddingX: '1rem'
        },
        lg: {
          height: '3rem',
          fontSize: '1.125rem',
          paddingX: '1.25rem'
        }
      },
      variants: {
        outline: {
          border: '1px solid',
          borderColor: 'gray.300',
          borderRadius: 'md',
          _focus: {
            borderColor: 'primary.500',
            boxShadow: '0 0 0 1px primary.500'
          }
        },
        filled: {
          backgroundColor: 'gray.50',
          border: '1px solid transparent',
          borderRadius: 'md',
          _focus: {
            backgroundColor: 'white',
            borderColor: 'primary.500'
          }
        }
      }
    }
  },

  // Animation timings
  animations: {
    durations: {
      instant: '0ms',
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
      slower: '750ms',
      slowest: '1000ms'
    },
    easings: {
      linear: 'linear',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      elastic: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }
  }
}

// Utility functions
export const getColor = (path: string): string => {
  const keys = path.split('.')
  let current: any = designTokens.colors
  
  for (const key of keys) {
    current = current[key]
    if (!current) return '#000000'
  }
  
  return current
}

export const getSpacing = (size: string | number): string => {
  if (typeof size === 'number') {
    return `${size * 0.25}rem`
  }
  return designTokens.spacing[size as keyof typeof designTokens.spacing] || '0'
}

export const getFontSize = (size: string): string => {
  return designTokens.typography.fontSizes[size as keyof typeof designTokens.typography.fontSizes] || '1rem'
}

export const getShadow = (size: string): string => {
  return designTokens.shadows[size as keyof typeof designTokens.shadows] || 'none'
}

export const getBreakpoint = (size: string): string => {
  return designTokens.breakpoints[size as keyof typeof designTokens.breakpoints] || '0px'
}

// Component factory functions
export const createButtonStyles = (size: string, variant: string) => {
  const sizeStyles = designTokens.components.button.sizes[size as keyof typeof designTokens.components.button.sizes]
  const variantStyles = designTokens.components.button.variants[variant as keyof typeof designTokens.components.button.variants]
  
  return {
    ...sizeStyles,
    ...variantStyles
  }
}

export const createCardStyles = (variant: string) => {
  return designTokens.components.card.variants[variant as keyof typeof designTokens.components.card.variants] || {}
}

export const createInputStyles = (size: string, variant: string) => {
  const sizeStyles = designTokens.components.input.sizes[size as keyof typeof designTokens.components.input.sizes]
  const variantStyles = designTokens.components.input.variants[variant as keyof typeof designTokens.components.input.variants]
  
  return {
    ...sizeStyles,
    ...variantStyles
  }
}

// Theme context
export type DesignTheme = typeof designTokens

export const lightTheme: DesignTheme = designTokens

export const darkTheme: DesignTheme = {
  ...designTokens,
  colors: {
    ...designTokens.colors,
    gray: {
      50: '#030712',
      100: '#111827',
      200: '#1f2937',
      300: '#374151',
      400: '#4b5563',
      500: '#6b7280',
      600: '#9ca3af',
      700: '#d1d5db',
      800: '#e5e7eb',
      900: '#f3f4f6',
      950: '#f9fafb'
    }
  }
}