# Coffee Closer Network

![Coffee Closer Network](https://imgix.cosmicjs.com/8821c9f0-6102-11f0-a051-23c10f41277a-photo-1521791136064-7986c2920216-1752532393190.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A full-stack web application for SaaS and software sales professionals to connect through 15-minute virtual coffee chats. Built with Next.js, Tailwind CSS, and powered by [Cosmic](https://www.cosmicjs.com).

## Features

- **Public Homepage** with clear CTA to join the community
- **Authentication System** with user signup, login, and profile management
- **User Roles** (Member, Admin) with appropriate permissions
- **Member Dashboard** featuring upcoming chats, profile management, and chat history
- **Smart Matchmaker** that pairs users weekly based on availability and timezone
- **Meeting Integration** with Calendly for seamless booking
- **Community Feed** for sharing sales tips, wins, and professional insights
- **Admin Dashboard** for managing users, posts, and matching system
- **Email Notifications** for new matches and upcoming chats
- **Donation/Subscription** support with Stripe integration
- **Blog Section** for content marketing powered by Cosmic CMS
- **Mobile Responsive** design with dark/light mode toggle

## Clone this Bucket

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket to get started instantly:

[![Clone this Bucket](https://img.shields.io/badge/Clone%20this%20Bucket-4F46E5?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=coffee-closers-production)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a full-stack web app called Coffee For Closers, a network for SaaS and software sales professionals to connect for 15-minute virtual coffee chats.

Use React with Tailwind CSS for the frontend and connect all content/data using Cosmic CMS. Focus on clean UI and clear UX. Deploy to Vercel and connect the app to GitHub.

Main Features:
	•	Public homepage with a clear CTA to join the community
	•	Auth system with user signup, login, and profile management
	•	User roles: member, admin
	•	Member dashboard with:
• Upcoming chats
• Profile info (bio, LinkedIn, availability)
• Chat history
	•	Smart matchmaker logic: pair users weekly based on availability and time zone
	•	Meeting booking via Calendly or generated calendar invites (basic integration)
	•	Community feed: users can share short posts, tips, or content (like a LinkedIn microfeed)
	•	Admin dashboard to manage users, posts, and matching
	•	Email notifications for new matches and upcoming chats
	•	Donation button or small subscription option (Stripe or Buy Me a Coffee)
	•	Blog section for content marketing (powered by Cosmic CMS)
	•	Mobile responsive, fast-loading, and easy to navigate

Design Instructions:
	•	Use Tailwind for layout and styling
	•	Modern, clean layout with bold CTAs and minimal clutter
	•	Dark/light mode toggle
	•	Sticky navigation and clear action buttons
	•	Friendly, SaaS-forward brand aesthetic

Content models:
	•	Users (with availability, timezone, social links, profile details)
	•	Coffee Chats (records of past and upcoming pairings)
	•	Posts (community feed)
	•	Blog articles
	•	Admin settings

Use best practices for UX and make the site functional before flashy. Prioritize a seamless onboarding flow, intuitive dashboards, and a reliable weekly matching system."

### Code Generation Prompt

> Create a full-stack web app called Coffee Closer Network for SaaS and software sales professionals to connect for 15-minute virtual coffee chats.

Use React with Tailwind CSS for the frontend and connect all content/data using Cosmic CMS. Focus on clean UI and clear UX. Deploy to Vercel and connect the app to GitHub.

Main Features:
	•	Public homepage with a clear CTA to join the community
	•	Auth system with user signup, login, and profile management
	•	User roles: member, admin
	•	Member dashboard with:
• Upcoming chats
• Profile info (bio, LinkedIn, availability)
• Chat history
	•	Smart matchmaker logic: pair users weekly based on availability and time zone
	•	Meeting booking via Calendly or generated calendar invites (basic integration)
	•	Community feed: users can share short posts, tips, or content (like a LinkedIn microfeed)
	•	Admin dashboard to manage users, posts, and matching
	•	Email notifications for new matches and upcoming chats
	•	Donation button or small subscription option (Stripe or Buy Me a Coffee)
	•	Blog section for content marketing (powered by Cosmic CMS)
	•	Mobile responsive, fast-loading, and easy to navigate

Design Instructions:
	•	Use Tailwind for layout and styling
	•	Modern, clean layout with bold CTAs and minimal clutter
	•	Dark/light mode toggle
	•	Sticky navigation and clear action buttons
	•	Friendly, SaaS-forward brand aesthetic

Content models:
	•	Users (with availability, timezone, social links, profile details)
	•	Coffee Chats (records of past and upcoming pairings)
	•	Posts (community feed)
	•	Blog articles
	•	Admin settings

Use best practices for UX and make the site functional before flashy. Prioritize a seamless onboarding flow, intuitive dashboards, and a reliable weekly matching system.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS
- **CMS**: [Cosmic](https://www.cosmicjs.com) - Headless CMS for content management
- **Authentication**: Custom auth system with user management
- **Payments**: Stripe integration for donations/subscriptions
- **Calendar**: Calendly integration for meeting booking
- **Email**: Email notifications for matches and updates
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- Bun (recommended) or npm
- [Cosmic](https://www.cosmicjs.com) account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/coffee-closer-network.git
cd coffee-closer-network
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Fill in your environment variables:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
STRIPE_PUBLIC_KEY=your-stripe-public-key
STRIPE_SECRET_KEY=your-stripe-secret-key
CALENDLY_ACCESS_TOKEN=your-calendly-token
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret
```

4. Run the development server:
```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Cosmic SDK Examples

### Fetching Users
```typescript
import { cosmic } from '@/lib/cosmic'

// Get all active users
const users = await cosmic.objects
  .find({ type: 'users', 'metadata.active_member': true })
  .depth(1)

// Get user by slug
const user = await cosmic.objects
  .findOne({ type: 'users', slug: 'user-slug' })
  .depth(1)
```

### Managing Coffee Chats
```typescript
// Create a new coffee chat
await cosmic.objects.insertOne({
  type: 'coffee-chats',
  title: 'Sarah & Mike Coffee Chat',
  metadata: {
    chat_title: 'Sarah & Mike Coffee Chat',
    participant_1: participantId1,
    participant_2: participantId2,
    scheduled_date: '2024-01-25',
    status: 'scheduled'
  }
})

// Get upcoming chats
const upcomingChats = await cosmic.objects
  .find({ 
    type: 'coffee-chats', 
    'metadata.status': 'scheduled',
    'metadata.scheduled_date': { $gte: new Date().toISOString() }
  })
  .depth(1)
```

### Community Posts
```typescript
// Create a new post
await cosmic.objects.insertOne({
  type: 'posts',
  title: 'My latest sales tip',
  metadata: {
    content: 'Here is my sales tip...',
    author: authorId,
    post_type: 'tip',
    posted_date: new Date().toISOString()
  }
})

// Get posts with authors
const posts = await cosmic.objects
  .find({ type: 'posts' })
  .depth(1)
  .sort('-created_at')
```

## Cosmic CMS Integration

This application uses [Cosmic](https://www.cosmicjs.com) as a headless CMS for content management. The integration includes:

- **Users**: Complete user profiles with availability, timezone, and professional details
- **Coffee Chats**: Meeting records with participant information and status tracking
- **Posts**: Community feed content with author relationships and engagement metrics
- **Blog Articles**: Content marketing articles with rich text and media
- **Call-to-Actions**: Dynamic CTAs for different sections of the application
- **Admin Settings**: Site configuration and feature toggles

All content is managed through the Cosmic dashboard and delivered via the [Cosmic SDK](https://www.cosmicjs.com/docs). The application uses TypeScript for type safety and includes proper error handling for all API interactions.

## Deployment Options

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Netlify
1. Build the application: `bun build`
2. Deploy the `out` folder to Netlify
3. Set environment variables in Netlify dashboard

### Environment Variables for Production
Make sure to set these in your deployment platform:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`
- `STRIPE_PUBLIC_KEY`
- `STRIPE_SECRET_KEY`
- `CALENDLY_ACCESS_TOKEN`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`

For more information on deploying Next.js applications, visit the [Next.js deployment documentation](https://nextjs.org/docs/deployment).
<!-- README_END -->