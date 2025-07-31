import { Coffee, Users, TrendingUp, Clock, MessageCircle, Star } from 'lucide-react'

interface Benefit {
  icon: React.ReactNode
  title: string
  description: string
}

const benefits: Benefit[] = [
  {
    icon: <Coffee className="h-6 w-6 text-primary-600" />,
    title: "15-Minute Coffee Chats",
    description: "Get matched with fellow sales professionals for quick, valuable conversations"
  },
  {
    icon: <Users className="h-6 w-6 text-primary-600" />,
    title: "500+ Active Members",
    description: "Connect with a growing community of SaaS and software sales experts"
  },
  {
    icon: <TrendingUp className="h-6 w-6 text-primary-600" />,
    title: "Career Growth",
    description: "Share insights, learn new strategies, and advance your sales career"
  },
  {
    icon: <Clock className="h-6 w-6 text-primary-600" />,
    title: "Flexible Scheduling",
    description: "Book chats that fit your schedule across different time zones"
  },
  {
    icon: <MessageCircle className="h-6 w-6 text-primary-600" />,
    title: "Expert Discussions",
    description: "Join conversations about the latest sales techniques and industry trends"
  },
  {
    icon: <Star className="h-6 w-6 text-primary-600" />,
    title: "Premium Network",
    description: "Connect with top performers from leading SaaS companies"
  }
]

export function SignupBenefits() {
  return (
    <div className="space-y-6">
      {/* Social Proof */}
      <div className="text-center">
        <div className="flex justify-center mb-2">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <img
                key={i}
                className="h-8 w-8 rounded-full border-2 border-white"
                src={`https://images.unsplash.com/photo-${1500000000000 + i}?w=64&h=64&fit=crop&auto=format,compress`}
                alt={`Member ${i}`}
              />
            ))}
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <span className="font-semibold text-primary-600">2,347 conversations</span> completed this month
        </p>
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
            <div className="flex-shrink-0 mt-1">
              {benefit.icon}
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                {benefit.title}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {benefit.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Testimonial */}
      <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
        <div className="flex items-center space-x-3">
          <img
            className="h-10 w-10 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format,compress"
            alt="Sarah Chen"
          />
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">Sarah Chen</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Senior AE at Salesforce</p>
          </div>
        </div>
        <blockquote className="mt-3 text-sm text-gray-700 dark:text-gray-300">
          "The conversations I've had through Coffee Closer Network have been invaluable. 
          I've learned new prospecting techniques and made connections that led to actual deals."
        </blockquote>
        <div className="flex items-center mt-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="h-3 w-3 text-yellow-400 fill-current" />
          ))}
        </div>
      </div>
    </div>
  )
}