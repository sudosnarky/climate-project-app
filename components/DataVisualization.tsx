'use client';

import { AllPhaseResults } from '@/lib/types';
import { PHASE_DESCRIPTIONS, PHASES } from '@/lib/data';

interface DataVisualizationProps {
  results: AllPhaseResults;
  onComplete: () => void;
}

export default function DataVisualization({
  results,
  onComplete,
}: DataVisualizationProps) {
  const formatPercent = (value: number): string => {
    return Number.isInteger(value) ? `${value}%` : `${value.toFixed(1)}%`;
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black px-6 pt-20 pb-12">
      <div className="max-w-3xl w-full animate-fadeIn">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
            How Others{' '}
            <span className="text-neon-green">Responded</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Live data from all experiment participants
          </p>
        </div>

        {/* Results for each phase */}
        <div className="space-y-12 mb-12">
          {PHASES.map((phase) => {
            const phaseId = phase.id;
            const result = results[phaseId] ?? {
              phaseId,
              optionCounts: phase.options.map(() => 0),
              optionLabels: phase.options.map((option) => option.label),
              percentages: phase.options.map(() => 0),
              totalResponses: 0,
            };
            const phaseDesc = PHASE_DESCRIPTIONS[phaseId];

            return (
              <div key={phaseId} className="border-b border-gray-800 pb-8">
                {/* Phase Title */}
                <div className="mb-6">
                  <h3 className="text-xl md:text-2xl font-bold text-white">
                    {phaseDesc?.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {result.totalResponses} total responses
                  </p>
                </div>

                {/* Bar Charts */}
                <div className="space-y-4">
                  {phase.options.map((option, optionIndex) => {
                    const label = option.label;
                    const percentage = result.percentages[optionIndex] || 0;
                    const isEven = optionIndex % 2 === 0;
                    const barColor = isEven ? 'bg-neon-green' : 'bg-neon-cyan';

                    return (
                      <div key={optionIndex} className="w-full">
                        <div className="flex items-baseline gap-3 mb-1">
                          <span className="text-gray-300 font-medium flex-1 text-sm md:text-base">
                            {label}
                          </span>
                          <span className="text-neon-green font-bold text-lg md:text-xl min-w-[50px] text-right">
                            {formatPercent(percentage)}
                          </span>
                        </div>
                        {/* Bar */}
                        <div className="w-full h-3 bg-gray-900 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${barColor} rounded-full animate-barFill`}
                            style={{
                              '--bar-width': `${percentage}%`,
                            } as React.CSSProperties}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Continue Button */}
        <button
          onClick={onComplete}
          className="w-full px-8 py-4 bg-neon-green text-black font-bold text-lg rounded-lg hover:bg-neon-cyan transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-neon-green focus:ring-offset-2 focus:ring-offset-black"
        >
          See Final Insight
        </button>
      </div>
    </div>
  );
}
