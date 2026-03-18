'use client';

import { useState } from 'react';
import { ExperimentPhase } from '@/lib/types';

interface ExperimentPhaseProps {
  phase: ExperimentPhase;
  onNext: (optionIndex: number) => void;
  disabled: boolean;
  stepNumber: number;
}

export default function ExperimentPhaseComponent({
  phase,
  onNext,
  disabled,
  stepNumber,
}: ExperimentPhaseProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const activeIndex = hoveredIndex ?? selectedIndex;
  const hasSelection = selectedIndex !== null;
  const canProceed = hasSelection && !disabled;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black px-6 pt-20 pb-8">
      <div className="max-w-2xl w-full animate-fadeSlideUp">
        {/* Phase Indicator */}
        <div className="mb-8">
          <p className="text-sm font-mono text-neon-cyan uppercase tracking-wider">
            Phase {stepNumber} of 3
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
            {phase.question}
          </h2>
        </div>

        {/* Description */}
        <div className="min-h-16 mb-12">
          {phase.description && (
            <p className="text-xl text-gray-300 leading-relaxed">
              {phase.description}
            </p>
          )}
        </div>

        {/* Options */}
        <div
          className="space-y-4"
          role="group"
          aria-label={`Options for ${phase.question}`}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {phase.options.map((option, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onFocus={() => setHoveredIndex(index)}
              disabled={disabled}
              className={`w-full p-6 md:p-8 border-2 rounded-lg transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black text-left ${
                activeIndex === null
                  ? 'border-neon-green text-white focus:ring-neon-green'
                  : activeIndex === index
                    ? 'border-neon-green text-white focus:ring-neon-green'
                    : 'border-gray-900 bg-black text-gray-700 opacity-50'
              }`}
              aria-label={`Option: ${option.label}`}
              aria-pressed={selectedIndex === index}
            >
              <span className="text-lg md:text-xl font-semibold block">
                {option.label}
              </span>
              {option.value && (
                <span className={`text-sm mt-2 block ${activeIndex === index ? 'opacity-80' : 'opacity-70'}`}>
                  {option.value}
                </span>
              )}
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            if (canProceed && selectedIndex !== null) {
              onNext(selectedIndex);
            }
          }}
          aria-disabled={!canProceed}
          className={`mt-8 w-full px-8 py-4 font-bold text-lg rounded-lg transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-neon-green focus:ring-offset-2 focus:ring-offset-black ${
            canProceed
              ? 'bg-white text-black hover:bg-gray-200'
              : hasSelection
                ? 'bg-white text-black cursor-wait'
                : 'bg-white text-black cursor-not-allowed'
          }`}
          aria-label="Go to next question"
        >
          Next
        </button>

        {/* Instructions */}
        <p className="text-center text-gray-500 text-sm mt-8">
          {disabled
            ? 'Saving your response...'
            : selectedIndex === null
              ? 'Select one response to continue'
              : 'Response recorded. Click Next to continue'}
        </p>
      </div>
    </div>
  );
}
