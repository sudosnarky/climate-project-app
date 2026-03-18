'use client';

import { useEffect } from 'react';

export default function ThankYouScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.close();

      // Fallback for browsers that block window.close() on non-script-opened tabs.
      setTimeout(() => {
        if (!document.hidden) {
          window.location.replace('about:blank');
        }
      }, 120);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black px-6">
      <div className="max-w-xl w-full text-center animate-fadeSlideUp">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Thank You</h2>
        <p className="text-gray-300 text-lg leading-relaxed">
          Your response has been recorded.
        </p>
      </div>
    </div>
  );
}
