'use client';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  currentScreen: string;
}

const STAGE_LABELS = ['Time', 'Risk', 'Responsibility', 'Personal Risk', 'Action'];

export default function ProgressBar({
  currentStep,
  totalSteps,
  currentScreen,
}: ProgressBarProps) {
  const percentage = (currentStep / totalSteps) * 100;
  const phaseMatch = currentScreen.match(/^phase(\d+)(-reveal)?$/);
  const phaseIndex = phaseMatch ? Number(phaseMatch[1]) - 1 : STAGE_LABELS.length - 1;
  const boundedIndex = Math.min(Math.max(phaseIndex, 0), STAGE_LABELS.length - 1);
  const stage = STAGE_LABELS[boundedIndex];

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
