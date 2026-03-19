'use client';

import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  getDatabase,
  Database,
  ref,
  push,
  onValue,
  Unsubscribe,
} from 'firebase/database';
import { UserResponse, AllPhaseResults } from './types';
import { PHASES } from './data';

// Firebase Configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp | null = null;
let db: Database | null = null;

const hasFirebaseConfig = Boolean(
  firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.databaseURL &&
    firebaseConfig.projectId &&
    firebaseConfig.appId
);

const createEmptyResults = (): AllPhaseResults => {
  const emptyResults: AllPhaseResults = {};

  PHASES.forEach((phase) => {
    emptyResults[phase.id] = {
      phaseId: phase.id,
      optionCounts: phase.options.map(() => 0),
      optionLabels: phase.options.map((option) => option.label),
      percentages: phase.options.map(() => 0),
      totalResponses: 0,
    };
  });

  return emptyResults;
};

try {
  if (hasFirebaseConfig) {
    app = initializeApp(firebaseConfig);
    db = getDatabase(app);
  }
} catch (error) {
  console.error('Firebase initialization error:', error);
}

/**
 * Add a user response to Firebase
 */
export const addResponse = async (response: UserResponse): Promise<void> => {
  try {
    if (!db) {
      return;
    }

    const responsesRef = ref(db, 'responses');
    await push(responsesRef, {
      phaseId: response.phaseId,
      selectedOptionIndex: response.selectedOptionIndex,
      selectedOptionLabel: response.selectedOptionLabel,
      timestamp: response.timestamp,
      sessionId: response.sessionId,
    });
  } catch (error) {
    console.error('Error adding response:', error);
    throw error;
  }
};

/**
 * Subscribe to real-time results updates
 */
export const subscribeToResults = (
  callback: (results: AllPhaseResults) => void
): Unsubscribe => {
  try {
    const emptyResults = createEmptyResults();

    if (!db) {
      callback(emptyResults);
      return () => {};
    }

    const responsesRef = ref(db, 'responses');
    return onValue(responsesRef, (snapshot) => {
      const data = snapshot.val();
      const results = createEmptyResults();

      // Always initialize every phase and option so the UI shows all bars.
      if (data) {
        // Transform flat response list into aggregated results by phase
        Object.values(data as Record<string, Record<string, unknown>>).forEach((response: Record<string, unknown>) => {
          const phaseId = response.phaseId as string;

          if (!results[phaseId]) {
            return;
          }

          const optionIndex = response.selectedOptionIndex as number;
          if (
            optionIndex < 0 ||
            optionIndex >= results[phaseId].optionCounts.length
          ) {
            return;
          }

          // Increment count and total
          results[phaseId].optionCounts[optionIndex]++;
          results[phaseId].totalResponses++;
        });

        // Calculate percentages
        Object.keys(results).forEach((phaseId) => {
          const result = results[phaseId];
          result.percentages = result.optionCounts.map((count) =>
            result.totalResponses > 0
              ? Math.round((count / result.totalResponses) * 1000) / 10
              : 0
          );
        });
      }

      callback(results);
    });
  } catch (error) {
    console.error('Error subscribing to results:', error);
    return () => {};
  }
};
