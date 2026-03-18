'use client';

interface LandingProps {
  onBegin: () => void;
}

export default function Landing({ onBegin }: LandingProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black px-6">
      <div className="max-w-2xl w-full text-center animate-fadeIn">
        <h1 className="text-5xl md:text-6xl font-bold mb-8 text-white leading-tight">
          You Can't Fool<br />
          <span className="text-neon-green">the Climate</span>
          <br />
          But Your Mind Can
        </h1>

        <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-xl mx-auto">
          You are about to take part in a <span className="text-neon-cyan font-semibold">2-minute experiment</span>.
        </p>

        <p className="text-base md:text-lg text-gray-400 mb-12 leading-relaxed max-w-xl mx-auto">
          Your decisions will reveal how humans misunderstand climate change.
        </p>

        <button
          onClick={onBegin}
          className="px-12 py-4 bg-neon-green text-black font-bold text-lg rounded-lg hover:bg-neon-cyan transition-all duration-200 active:scale-95 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-neon-green focus:ring-offset-2 focus:ring-offset-black"
          aria-label="Begin the climate bias experiment"
        >
          Begin Experiment
        </button>

        <p className="text-xs text-gray-600 mt-8">
          ~2 minutes • No personal data collected
        </p>
      </div>
    </div>
  );
}
