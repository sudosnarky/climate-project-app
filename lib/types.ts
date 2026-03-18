/**
 * Experiment Types
 */

export interface ExperimentPhase {
  id: string;
  question: string;
  description?: string;
  options: {
    label: string;
    value: string;
    explanation: string;
  }[];
}

export interface UserResponse {
  id: string;
  phaseId: string;
  selectedOptionIndex: number;
  selectedOptionLabel: string;
  timestamp: number;
  sessionId: string;
}

export interface AppState {
  currentScreen:
    | 'landing'
    | 'phase1'
    | 'phase1-reveal'
    | 'phase2'
    | 'phase2-reveal'
    | 'phase3'
    | 'phase3-reveal'
    | 'results'
    | 'why-matters'
    | 'final';
  userResponses: UserResponse[];
  sessionId: string;
  startTime: number;
}

export interface PhaseResults {
  phaseId: string;
  optionCounts: number[];
  optionLabels: string[];
  percentages: number[];
  totalResponses: number;
}

export interface AllPhaseResults {
  [phaseId: string]: PhaseResults;
}
