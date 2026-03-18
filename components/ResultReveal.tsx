'use client';

import { ExperimentPhase } from '@/lib/types';

interface ResultRevealProps {
  phase: ExperimentPhase;
  selectedIndex: number;
  onContinue: () => void;
}

export default function ResultReveal({
  phase,
  selectedIndex,
  onContinue,
}: ResultRevealProps) {
  const selectedOption = phase.options[selectedIndex];

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black px-6 pt-20 pb-8">
      <div className="max-w-2xl w-full animate-slideUp">
        {/* Selected Choice Highlight */}
        <div className="mb-8 p-6 md:p-8 bg-gray-900 border-2 border-neon-cyan rounded-lg">
          <p className="text-sm font-mono text-neon-cyan uppercase tracking-wider mb-2">
            Your Choice
          </p>
          <p className="text-2xl md:text-3xl font-bold text-neon-green">
            {selectedOption.label}
          </p>
        </div>

        {/* Explanation */}
        <div className="mb-12">
          <h3 className="text-sm font-mono text-neon-green uppercase tracking-wider mb-4">
            What This Reveals
          </h3>
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
            {selectedOption.explanation}
          </p>
        </div>

        {/* Continue Button */}
        <button
          onClick={onContinue}
          className="w-full px-8 py-4 bg-neon-cyan text-black font-bold text-lg rounded-lg hover:bg-neon-green transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 focus:ring-offset-black"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
