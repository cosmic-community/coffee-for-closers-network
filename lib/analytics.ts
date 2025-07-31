interface SignupEvent {
  email?: string
  userId?: string
  company?: string
  jobTitle?: string
  step?: string
  error?: string
  source?: string
}

export async function trackSignupStep(
  event: string, 
  properties: SignupEvent = {}
): Promise<void> {
  try {
    // In production, this would send to your analytics service
    // (Google Analytics, Mixpanel, Amplitude, etc.)
    
    const eventData = {
      event,
      properties: {
        ...properties,
        timestamp: new Date().toISOString(),
        url: typeof window !== 'undefined' ? window.location.href : '',
        userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : '',
        referrer: typeof window !== 'undefined' ? document.referrer : ''
      }
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', eventData)
    }

    // Send to analytics service
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      // Example: Google Analytics 4
      if ('gtag' in window) {
        (window as any).gtag('event', event, {
          custom_parameter_1: properties.email,
          custom_parameter_2: properties.company,
          custom_parameter_3: properties.jobTitle,
          custom_parameter_4: properties.step
        })
      }

      // Example: Mixpanel
      if ('mixpanel' in window) {
        (window as any).mixpanel.track(event, properties)
      }

      // Example: Custom analytics endpoint
      await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData)
      }).catch(error => {
        console.error('Analytics tracking failed:', error)
      })
    }

  } catch (error) {
    // Fail silently for analytics
    console.error('Analytics error:', error)
  }
}

export async function trackSignupFunnel(
  step: 'signup_started' | 'signup_form_submitted' | 'signup_completed' | 'email_verification_sent' | 'email_verified' | 'onboarding_started' | 'onboarding_completed',
  properties: SignupEvent = {}
): Promise<void> {
  await trackSignupStep(`signup_funnel_${step}`, {
    ...properties,
    step: step
  })
}

export async function trackConversion(
  conversionType: 'signup' | 'email_verified' | 'profile_completed' | 'first_match',
  properties: SignupEvent = {}
): Promise<void> {
  await trackSignupStep(`conversion_${conversionType}`, {
    ...properties,
    source: conversionType
  })
}

// A/B Testing utilities
export function getSignupVariant(): 'default' | 'social_first' | 'minimal' {
  if (typeof window === 'undefined') return 'default'
  
  // Simple A/B test based on user ID hash or random
  const variants = ['default', 'social_first', 'minimal'] as const
  const hash = Math.abs(hashCode(window.navigator.userAgent + window.location.hostname))
  const variant = variants[hash % variants.length]
  return variant || 'default'
}

function hashCode(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return hash
}

export async function trackError(
  error: Error | string,
  context: string,
  properties: Record<string, any> = {}
): Promise<void> {
  const errorMessage = error instanceof Error ? error.message : error
  const errorStack = error instanceof Error ? error.stack : undefined

  await trackSignupStep('error_occurred', {
    ...properties,
    error: errorMessage,
    source: errorStack,
    step: context
  })
}

// User journey tracking
export class UserJourney {
  private static instance: UserJourney
  private journey: Array<{ step: string; timestamp: number; properties?: any }> = []

  static getInstance(): UserJourney {
    if (!UserJourney.instance) {
      UserJourney.instance = new UserJourney()
    }
    return UserJourney.instance
  }

  addStep(step: string, properties?: any): void {
    this.journey.push({
      step,
      timestamp: Date.now(),
      properties
    })

    // Limit journey length
    if (this.journey.length > 50) {
      this.journey = this.journey.slice(-25)
    }
  }

  getJourney(): Array<{ step: string; timestamp: number; properties?: any }> {
    return [...this.journey]
  }

  async sendJourney(): Promise<void> {
    if (this.journey.length === 0) return

    const firstStep = this.journey[0]
    const lastStep = this.journey[this.journey.length - 1]

    await trackSignupStep('user_journey', {
      source: this.journey,
      step: `${this.journey.length}_steps`,
      company: firstStep?.properties?.company,
      jobTitle: lastStep?.timestamp && firstStep?.timestamp ? 
        String(lastStep.timestamp - firstStep.timestamp) : undefined
    })
  }

  reset(): void {
    this.journey = []
  }
}