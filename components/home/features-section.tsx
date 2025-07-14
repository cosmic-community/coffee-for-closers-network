import { Users, Calendar, MessageSquare, TrendingUp, Coffee, Shield } from 'lucide-react'

export function FeaturesSection() {
  const features = [
    {
      icon: Users,
      title: 'Smart Matching',
      description: 'Get paired with fellow sales professionals based on your availability, timezone, and interests.',
    },
    {
      icon: Calendar,
      title: 'Easy Scheduling',
      description: 'Seamless integration with Calendly for effortless meeting scheduling and calendar management.',
    },
    {
      icon: MessageSquare,
      title: 'Community Feed',
      description: 'Share insights, ask questions, and learn from a vibrant community of sales professionals.',
    },
    {
      icon: TrendingUp,
      title: 'Career Growth',
      description: 'Build meaningful connections that help accelerate your career and close more deals.',
    },
    {
      icon: Coffee,
      title: '15-Minute Chats',
      description: 'Perfect length for meaningful conversations without overwhelming your busy schedule.',
    },
    {
      icon: Shield,
      title: 'Quality Community',
      description: 'Curated network of verified SaaS and software sales professionals.',
    },
  ]

  return (
    <section className="section bg-gray-50 dark:bg-gray-900">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Coffee Closer Network?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Built specifically for sales professionals who want to grow their network, share knowledge, and advance their careers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg mb-6">
                <feature.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}