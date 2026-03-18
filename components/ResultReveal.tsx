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
    <div className="min-h-screen w-full bg-black px-6 pt-20 pb-8">
      <div className="max-w-2xl w-full mx-auto animate-slideUp flex min-h-[calc(100vh-7rem)] flex-col">
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

        <div className="mt-auto sticky bottom-0 pt-6 pb-2 bg-gradient-to-t from-black via-black/95 to-transparent">
          <button
            onClick={onContinue}
            className="w-full px-8 py-4 bg-white text-black font-bold text-lg rounded-lg hover:bg-gray-200 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
