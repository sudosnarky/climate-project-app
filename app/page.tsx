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
import ThankYouScreen from '@/components/ThankYouScreen';
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
  const [appState, setAppState] = useState<AppState>(createNewSession);
  const [isHydrated, setIsHydrated] = useState(false);
  const [liveResults, setLiveResults] = useState<AllPhaseResults>({});
  const [isProcessing, setIsProcessing] = useState(false);

  // Restore local session only after mount to avoid SSR/CSR markup mismatch.
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      try {
        setAppState(JSON.parse(stored) as AppState);
      } catch {
        setAppState(createNewSession());
      }
    }

    setIsHydrated(true);
  }, []);

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
    if (!isHydrated) {
      return;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
  }, [appState, isHydrated]);

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

  const completeExperiment = useCallback(() => {
    setAppState((prev) => ({ ...prev, currentScreen: 'thank-you' }));
  }, []);

  const getCurrentPhaseMeta = useCallback(() => {
    const phaseScreenMatch = appState.currentScreen.match(/^phase(\d+)(-reveal)?$/);
    if (!phaseScreenMatch) {
      return null;
    }

    const phaseNumber = Number(phaseScreenMatch[1]);
    const phaseIndex = phaseNumber - 1;
    const isReveal = Boolean(phaseScreenMatch[2]);
    const phase = PHASES[phaseIndex];

    if (!phase) {
      return null;
    }

    const selectedResponse = appState.userResponses.find(
      (response) => response.phaseId === phase.id
    );

    return {
      phase,
      phaseNumber,
      isReveal,
      selectedIndex: selectedResponse?.selectedOptionIndex ?? 0,
    };
  }, [appState.currentScreen, appState.userResponses]);

  if (!isHydrated || !appState) {
    return null;
  }

  // Show progress bar on all screens except landing and final
  const showProgress = !['landing', 'final', 'thank-you'].includes(appState.currentScreen);
  const progressStep = getProgressStep();
  const currentPhaseMeta = getCurrentPhaseMeta();

  // Render current screen
  return (
    <main className="w-full min-h-screen bg-black text-white overflow-hidden">
      {showProgress && (
        <ProgressBar
          currentStep={progressStep}
          totalSteps={SCREEN_ORDER.length}
          currentScreen={appState.currentScreen}
        />
      )}

      {appState.currentScreen === 'landing' && (
        <Landing onBegin={goToNextScreen} />
      )}

      {currentPhaseMeta && !currentPhaseMeta.isReveal && (
        <ExperimentPhaseComponent
          phase={currentPhaseMeta.phase}
          onNext={(index) => handlePhaseSelect(currentPhaseMeta.phase.id, index)}
          disabled={isProcessing}
          stepNumber={currentPhaseMeta.phaseNumber}
          totalPhases={PHASES.length}
        />
      )}

      {currentPhaseMeta && currentPhaseMeta.isReveal && (
        <ResultReveal
          phase={currentPhaseMeta.phase}
          selectedIndex={currentPhaseMeta.selectedIndex}
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
        <FinalScreen onFinalize={completeExperiment} />
      )}

      {appState.currentScreen === 'thank-you' && (
        <ThankYouScreen />
      )}
    </main>
  );
}
