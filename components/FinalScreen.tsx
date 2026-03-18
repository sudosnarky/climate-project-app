'use client';

import { useState } from 'react';

interface FinalScreenProps {
  onFinalize: () => void;
}

export default function FinalScreen({ onFinalize }: FinalScreenProps) {
  const [reflection, setReflection] = useState<'yes' | 'no' | null>(null);

  const handleReflection = (value: 'yes' | 'no') => {
    if (reflection) return;
    setReflection(value);

    setTimeout(() => {
      onFinalize();
    }, 220);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black px-6">
      <div className="max-w-2xl w-full text-center animate-fadeSlideUp">
        {/* Main Message */}
        <div className="mb-12">
          <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-8">
            Climate change is not just<br />
            <span className="text-neon-green">
              a crisis of the planet.
            </span>
            <br />
            It is a crisis of<br />
            <span className="text-neon-cyan">human perception.</span>
          </h2>
        </div>

        {/* Reflection */}
        <div className="bg-gray-900 border-l-4 border-neon-green p-8 mb-12 rounded-lg">
          <p className="text-gray-300 text-lg leading-relaxed italic mb-6">
            Your cognitive biases are not a personal failure. They are adaptive shortcuts from an earlier world. In a modern climate crisis, those same shortcuts can delay urgent collective response.
          </p>

          <p className="text-white font-semibold text-xl mb-5">
            Would you change your decisions now?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => handleReflection('yes')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-neon-green focus:ring-offset-2 focus:ring-offset-black ${
                reflection === 'yes'
                  ? 'bg-neon-green text-black'
                  : 'bg-white text-black hover:bg-gray-200'
              }`}
              disabled={Boolean(reflection)}
            >
              Yes
            </button>
            <button
              onClick={() => handleReflection('no')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 focus:ring-offset-black ${
                reflection === 'no'
                  ? 'bg-neon-cyan text-black'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
              disabled={Boolean(reflection)}
            >
              No
            </button>
          </div>

          {reflection && (
            <p className="text-sm text-gray-400 mt-5 animate-fadeIn">
              Loading final screen...
            </p>
          )}
        </div>

        {/* Call to Action */}
        <div className="mb-8">
          <p className="text-gray-400 text-base mb-6">
            What you learned here, others should experience.
          </p>
        </div>

        <p className="text-xs text-gray-600 mt-8">
          Share this experiment. Every mind matters.
        </p>
      </div>
    </div>
  );
}
