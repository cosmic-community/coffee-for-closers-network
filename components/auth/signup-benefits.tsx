import { Check, Users, Calendar, TrendingUp, Network, Coffee, MessageCircle } from 'lucide-react'

const benefits = [
  {
    icon: Coffee,
    title: 'Weekly Coffee Chats',
    description: 'Get matched with 1-2 sales professionals every week for 15-minute virtual coffee chats'
  },
  {
    icon: Network,
    title: 'Expand Your Network',
    description: 'Connect with 500+ SaaS and software sales professionals from top companies'
  },
  {
    icon: TrendingUp,
    title: 'Career Growth',
    description: 'Learn from experienced professionals and accelerate your sales career'
  },
  {
    icon: MessageCircle,
    title: 'Community Feed',
    description: 'Share wins, ask questions, and engage with the sales community'
  },
  {
    icon: Users,
    title: 'Industry Insights',
    description: 'Stay updated on sales trends, tools, and best practices'
  },
  {
    icon: Calendar,
    title: 'Flexible Scheduling',
    description: 'Set your availability and chat when it works for your schedule'
  }
]

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Senior Sales Engineer at Salesforce',
    quote: 'This network has been incredible for learning new demo strategies and connecting with other enterprise sellers.'
  },
  {
    name: 'Mike Rodriguez',
    role: 'Account Executive at HubSpot',
    quote: 'I\'ve made genuine connections that have helped me close bigger deals. The community is so supportive.'
  }
]

export function SignupBenefits() {
  return (
    <div className="space-y-8">
      {/* Benefits List */}
      <div className="space-y-6">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <benefit.icon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {benefit.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {benefit.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4 text-center">
          Join Our Growing Community
        </h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">500+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Members</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">1200+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Coffee Chats</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">95%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Satisfaction</div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900 dark:text-white text-center">
          What Members Say
        </h3>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
            <p className="text-sm text-gray-600 dark:text-gray-300 italic mb-2">
              "{testimonial.quote}"
            </p>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              <div className="font-medium">{testimonial.name}</div>
              <div>{testimonial.role}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Indicators */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <Check className="w-4 h-4 text-green-500" />
          <span>Free to join</span>
        </div>
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
          <Check className="w-4 h-4 text-green-500" />
          <span>No spam, ever</span>
        </div>
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
          <Check className="w-4 h-4 text-green-500" />
          <span>Cancel anytime</span>
        </div>
      </div>
    </div>
  )
}