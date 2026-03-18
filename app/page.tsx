'use client';

import { useEffect, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Landing from '@/components/Landing';
import ProgressBar from '@/components/ProgressBar';
import ExperimentPhaseComponent from '@/components/ExperimentPhase';
import ResultReveal from '@/components/ResultReveal';
import DataVisualization from '@/components/DataVisualization';
import WhyThisMatters from '@/components/WhyThisMatters';
import FinalScreen from '@/components/FinalScreen';
import { AppState, UserResponse, AllPhaseResults } from '@/lib/types';
import { PHASES, SCREEN_ORDER } from '@/lib/data';
import { addResponse, subscribeToResults } from '@/lib/firebase';

const STORAGE_KEY = 'climate-experiment-v1';

function createNewSession(): AppState {
  return {
    currentScreen: 'landing',
    userResponses: [],
    sessionId: uuidv4(),
    startTime: Date.now(),
  };
}

export default function Home() {
  const [appState, setAppState] = useState<AppState>(() => {
    if (typeof window === 'undefined') {
      return createNewSession();
    }

    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return createNewSession();
    }

    try {
      return JSON.parse(stored) as AppState;
    } catch {
      return createNewSession();
    }
  });
  const [liveResults, setLiveResults] = useState<AllPhaseResults>({});
  const [isProcessing, setIsProcessing] = useState(false);

  // Subscribe to Firebase real-time updates
  useEffect(() => {
    const unsubscribeFn = subscribeToResults((results) => {
      setLiveResults(results);
    });

    return () => {
      unsubscribeFn();
    };
  }, []);

  // Persist state to localStorage
  useEffect(() => {
    if (appState) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
    }
  }, [appState]);

  /**
   * Get current step number for progress bar
   */
  const getProgressStep = useCallback((): number => {
    const screenIndex = SCREEN_ORDER.indexOf(appState.currentScreen);
    return screenIndex >= 0 ? screenIndex + 1 : 1;
  }, [appState]);

  /**
   * Navigate to next screen
   */
  const goToNextScreen = useCallback(() => {
    const currentIndex = SCREEN_ORDER.indexOf(appState.currentScreen);
    if (currentIndex < SCREEN_ORDER.length - 1) {
      const nextScreen = SCREEN_ORDER[currentIndex + 1] as AppState['currentScreen'];
      setAppState((prev) => ({ ...prev, currentScreen: nextScreen }));
    }
  }, [appState]);

  /**
   * Handle phase selection
   */
  const handlePhaseSelect = useCallback(
    async (phaseId: string, optionIndex: number) => {
      setIsProcessing(true);

      const phase = PHASES.find((p) => p.id === phaseId);
      if (!phase) {
        setIsProcessing(false);
        return;
      }

      try {
        // Create the response
        const response: UserResponse = {
          id: uuidv4(),
          phaseId,
          selectedOptionIndex: optionIndex,
          selectedOptionLabel: phase.options[optionIndex].label,
          timestamp: Date.now(),
          sessionId: appState.sessionId,
        };

        // Add to local state
        const updatedResponses = [...appState.userResponses, response];
        setAppState((prev) => ({ ...prev, userResponses: updatedResponses }));

        // Send to Firebase
        await addResponse(response);

        // Move to reveal screen
        setTimeout(() => {
          goToNextScreen();
          setIsProcessing(false);
        }, 300);
      } catch (error) {
        console.error('Error handling phase select:', error);
        setIsProcessing(false);
      }
    },
    [appState, goToNextScreen]
  );

  if (!appState) {
    return null;
  }

  // Show progress bar on all screens except landing and final
  const showProgress = !['landing', 'final'].includes(appState.currentScreen);
  const progressStep = getProgressStep();

  // Render current screen
  return (
    <main className="w-full min-h-screen bg-black text-white overflow-hidden">
      {showProgress && (
        <ProgressBar currentStep={progressStep} totalSteps={SCREEN_ORDER.length} />
      )}

      {appState.currentScreen === 'landing' && (
        <Landing onBegin={goToNextScreen} />
      )}

      {appState.currentScreen === 'phase1' && (
        <ExperimentPhaseComponent
          phase={PHASES[0]}
          onNext={(index) => handlePhaseSelect('phase1', index)}
          disabled={isProcessing}
          stepNumber={1}
        />
      )}

      {appState.currentScreen === 'phase1-reveal' && (
        <ResultReveal
          phase={PHASES[0]}
          selectedIndex={appState.userResponses[0]?.selectedOptionIndex ?? 0}
          onContinue={goToNextScreen}
        />
      )}

      {appState.currentScreen === 'phase2' && (
        <ExperimentPhaseComponent
          phase={PHASES[1]}
          onNext={(index) => handlePhaseSelect('phase2', index)}
          disabled={isProcessing}
          stepNumber={2}
        />
      )}

      {appState.currentScreen === 'phase2-reveal' && (
        <ResultReveal
          phase={PHASES[1]}
          selectedIndex={appState.userResponses[1]?.selectedOptionIndex ?? 0}
          onContinue={goToNextScreen}
        />
      )}

      {appState.currentScreen === 'phase3' && (
        <ExperimentPhaseComponent
          phase={PHASES[2]}
          onNext={(index) => handlePhaseSelect('phase3', index)}
          disabled={isProcessing}
          stepNumber={3}
        />
      )}

      {appState.currentScreen === 'phase3-reveal' && (
        <ResultReveal
          phase={PHASES[2]}
          selectedIndex={appState.userResponses[2]?.selectedOptionIndex ?? 0}
          onContinue={goToNextScreen}
        />
      )}

      {appState.currentScreen === 'results' && (
        <DataVisualization results={liveResults} onComplete={goToNextScreen} />
      )}

      {appState.currentScreen === 'why-matters' && (
        <WhyThisMatters onContinue={goToNextScreen} />
      )}

      {appState.currentScreen === 'final' && (
        <FinalScreen />
      )}
    </main>
  );
}
