'use client';

interface FinalScreenProps {
  onRestart: () => void;
}

export default function FinalScreen({ onRestart }: FinalScreenProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black px-6">
      <div className="max-w-2xl w-full text-center animate-fadeIn">
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
          <p className="text-gray-300 text-lg leading-relaxed italic">
            Your cognitive biases are not a personal failure. They are the result of millions of years of evolution shaped for a world that no longer exists. The invisible threat, the distant future, the diffused responsibility—these are not individual character flaws. They are human design features. Understanding them is the first step.
          </p>
        </div>

        {/* Call to Action */}
        <div className="mb-8">
          <p className="text-gray-400 text-base mb-6">
            What you learned here, others need to know.
          </p>
          <button
            onClick={onRestart}
            className="px-8 py-4 bg-neon-green text-black font-bold text-lg rounded-lg hover:bg-neon-cyan transition-all duration-200 active:scale-95 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-neon-green focus:ring-offset-2 focus:ring-offset-black"
          >
            Take Again
          </button>
        </div>

        <p className="text-xs text-gray-600 mt-8">
          Share this experiment. Every mind matters.
        </p>
      </div>
    </div>
  );
}
