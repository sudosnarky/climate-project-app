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

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black px-6 pt-20 pb-8">
      <div className="max-w-2xl w-full animate-slideInLeft">
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
        {phase.description && (
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            {phase.description}
          </p>
        )}

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
                  ? 'border-neon-green text-white hover:bg-neon-green hover:text-black focus:ring-neon-green'
                  : activeIndex === index
                    ? 'border-neon-cyan bg-neon-cyan text-black focus:ring-neon-cyan shadow-[0_0_30px_rgba(0,255,255,0.25)]'
                    : 'border-gray-700 text-gray-500 opacity-20 pointer-events-none'
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
            if (selectedIndex !== null) {
              onNext(selectedIndex);
            }
          }}
          disabled={disabled || selectedIndex === null}
          className="mt-8 w-full px-8 py-4 bg-neon-green text-black font-bold text-lg rounded-lg hover:bg-neon-cyan transition-all duration-200 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-neon-green focus:ring-offset-2 focus:ring-offset-black"
          aria-label="Go to next question"
        >
          Next
        </button>

        {/* Instructions */}
        <p className="text-center text-gray-500 text-sm mt-8">
          {disabled
            ? 'Saving your response...'
            : selectedIndex === null
              ? 'Select one option to continue'
              : 'Answer selected. Click Next to continue'}
        </p>
      </div>
    </div>
  );
}
