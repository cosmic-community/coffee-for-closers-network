import { redirect } from 'next/navigation'

export default function OnboardingPage() {
  // Redirect to welcome step
  redirect('/onboarding/welcome')
}

export const metadata = {
  title: 'Welcome to Coffee Closer Network',
  description: 'Complete your onboarding to start connecting with sales professionals.',
}