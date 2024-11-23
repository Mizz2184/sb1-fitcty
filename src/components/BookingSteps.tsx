import { Check } from 'lucide-react';
import { cn } from '../utils/cn';

interface Step {
  title: string;
  description: string;
}

interface BookingStepsProps {
  steps: Step[];
  currentStep: number;
}

export function BookingSteps({ steps, currentStep }: BookingStepsProps) {
  return (
    <div className="w-full py-4">
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div
            key={index}
            className={cn(
              'flex flex-col items-center relative',
              index < steps.length - 1 && 'flex-1'
            )}
          >
            <div
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center border-2',
                index < currentStep
                  ? 'bg-blue-500 border-blue-500 text-white'
                  : index === currentStep
                  ? 'border-blue-500 text-blue-500'
                  : 'border-gray-300 text-gray-300'
              )}
            >
              {index < currentStep ? (
                <Check className="w-5 h-5" />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>

            <div className="mt-2 text-center">
              <div
                className={cn(
                  'font-medium',
                  index <= currentStep ? 'text-blue-500' : 'text-gray-400'
                )}
              >
                {step.title}
              </div>
              <div
                className={cn(
                  'text-sm',
                  index <= currentStep ? 'text-gray-600' : 'text-gray-400'
                )}
              >
                {step.description}
              </div>
            </div>

            {index < steps.length - 1 && (
              <div
                className={cn(
                  'absolute top-4 w-full h-[2px]',
                  index < currentStep ? 'bg-blue-500' : 'bg-gray-300'
                )}
                style={{ left: '50%' }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
