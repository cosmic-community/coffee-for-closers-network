import { RedirectType, redirect } from 'next/navigation'

export default function JoinPage() {
  // Use permanent redirect to /auth/signup
  redirect('/auth/signup', RedirectType.replace)
}

// Add metadata for the page
export const metadata = {
  title: 'Join the Network | Coffee for Closers',
  description: 'Join our community of SaaS and software sales professionals.',
}