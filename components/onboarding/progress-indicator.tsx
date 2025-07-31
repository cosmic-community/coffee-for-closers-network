import { CheckCircle, Circle } from 'lucide-react'

interface ProgressIndicatorProps {
  currentStep: number
  totalSteps: number
}

const steps = [
  { id: 1, name: 'Welcome', description: 'Your interests' },
  { id: 2, name: 'Profile', description: 'About you' },
  { id: 3, name: 'Complete', description: 'All done!' }
]

export function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-center">
        {steps.map((step, stepIdx) => (
          <div key={step.id} className="flex items-center">
            <div className="flex items-center">
              <div
                className={`
                  flex h-10 w-10 items-center justify-center rounded-full border-2
                  ${
                    step.id < currentStep
                      ? 'border-primary-600 bg-primary-600'
                      : step.id === currentStep
                      ? 'border-primary-600 bg-white'
                      : 'border-gray-300 bg-white'
                  }
                `}
              >
                {step.id < currentStep ? (
                  <CheckCircle className="h-5 w-5 text-white" />
                ) : (
                  <span
                    className={`
                      text-sm font-semibold
                      ${
                        step.id === currentStep
                          ? 'text-primary-600'
                          : 'text-gray-400'
                      }
                    `}
                  >
                    {step.id}
                  </span>
                )}
              </div>
              <div className="ml-3 hidden sm:block">
                <p
                  className={`
                    text-sm font-medium
                    ${
                      step.id <= currentStep
                        ? 'text-gray-900 dark:text-white'
                        : 'text-gray-500 dark:text-gray-400'
                    }
                  `}
                >
                  {step.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {step.description}
                </p>
              </div>
            </div>

            {stepIdx < steps.length - 1 && (
              <div
                className={`
                  ml-4 h-0.5 w-12 sm:w-20
                  ${
                    step.id < currentStep
                      ? 'bg-primary-600'
                      : 'bg-gray-300'
                  }
                `}
              />
            )}
          </div>
        ))}
      </div>

      {/* Mobile view */}
      <div className="mt-4 sm:hidden text-center">
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          {steps.find(s => s.id === currentStep)?.name}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Step {currentStep} of {totalSteps}
        </p>
      </div>
    </div>
  )
}