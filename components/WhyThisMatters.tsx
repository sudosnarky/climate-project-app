'use client';

interface WhyThisMattersProps {
  onContinue: () => void;
}

export default function WhyThisMatters({ onContinue }: WhyThisMattersProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black px-6 pt-20 pb-8">
      <div className="max-w-2xl w-full text-center animate-fadeSlideUp">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
          Why This <span className="text-neon-green">Matters</span>
        </h2>

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 md:p-8 text-left mb-10 space-y-5">
          <p className="text-lg text-gray-200 leading-relaxed">
            Climate change persists not only because of missing information.
          </p>
          <p className="text-lg text-gray-200 leading-relaxed">
            It persists because predictable cognitive biases shape perception, responsibility, and urgency.
          </p>
          <p className="text-lg text-gray-200 leading-relaxed">
            Policies and awareness campaigns fail when they assume purely rational decision-making.
          </p>
          <p className="text-xl text-neon-cyan font-semibold leading-relaxed pt-2">
            Understanding the mind may be key to solving the climate crisis.
          </p>
        </div>

        <button
          onClick={onContinue}
          className="w-full px-8 py-4 bg-white text-black font-bold text-lg rounded-lg hover:bg-gray-200 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
