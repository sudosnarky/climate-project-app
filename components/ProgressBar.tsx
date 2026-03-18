'use client';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const percentage = (currentStep / totalSteps) * 100;
  const stage = currentStep <= 3 ? 'Perception' : currentStep <= 5 ? 'Risk' : 'Responsibility';

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-900">
      <div className="px-4 md:px-6 pt-2 pb-1 flex items-center justify-between">
        <p className="text-[11px] md:text-xs font-mono uppercase tracking-wider text-gray-400">
          Stage
        </p>
        <p className="text-[11px] md:text-xs font-mono uppercase tracking-wider text-neon-cyan">
          {stage}
        </p>
      </div>
      <div className="h-1 bg-gray-900">
        <div
          className="h-full bg-neon-green transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
