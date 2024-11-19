import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import clsx from 'clsx';

interface Step {
  id: number;
  title: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => {
        const isCompleted = step.id < currentStep;
        const isCurrent = step.id === currentStep;
        
        return (
          <React.Fragment key={step.id}>
            <div className="flex items-center">
              <motion.div
                className={clsx(
                  'w-8 h-8 rounded-full flex items-center justify-center font-medium transition-colors',
                  isCompleted && 'bg-indigo-500 text-white',
                  isCurrent && 'bg-indigo-500/20 text-indigo-400 ring-2 ring-indigo-500',
                  !isCompleted && !isCurrent && 'bg-slate-800/50 text-slate-400'
                )}
                animate={{
                  scale: isCurrent ? 1.1 : 1,
                }}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span>{step.id}</span>
                )}
              </motion.div>
              <span className={clsx(
                'ml-3 text-sm font-medium hidden sm:block',
                isCurrent ? 'text-white' : 'text-slate-400'
              )}>
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 mx-4">
                <div className={clsx(
                  'h-0.5 transition-colors',
                  step.id < currentStep ? 'bg-indigo-500' : 'bg-slate-800/50'
                )} />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}