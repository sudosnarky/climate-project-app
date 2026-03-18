import { ExperimentPhase } from './types';

export const PHASES: ExperimentPhase[] = [
  {
    id: 'phase1',
    question: 'Decision 1: Time and Reward',
    description: 'Record your response:',
    options: [
      {
        label: '₹500 today',
        value: 'immediate',
        explanation:
          'Temporal Discounting: You favored immediate reward, a bias where future outcomes are undervalued. This decision pattern contributes to delayed climate action by prioritizing short-term comfort over long-term stability.',
      },
      {
        label: '₹2000 in 1 year',
        value: 'delayed',
        explanation:
          'Temporal Discounting Resistance: You prioritized long-term value over immediate payoff, countering a common bias. Climate progress depends on this same pattern: accepting present tradeoffs to prevent future damage.',
      },
    ],
  },
  {
    id: 'phase2',
    question: 'Decision 2: Visible vs Invisible Risk',
    description: 'Choose the threat that feels most urgent:',
    options: [
      {
        label: 'Visible Disasters (Floods)',
        value: 'visible',
        explanation:
          'Availability Heuristic: You prioritized a vivid, visible threat, where immediate events feel more dangerous than abstract risks. This bias can underweight slow climate drivers like rising CO2 that are less visible but globally destabilizing.',
      },
      {
        label: 'Invisible Threats (CO₂)',
        value: 'invisible',
        explanation:
          'Availability Heuristic Resistance: You recognized a low-visibility threat despite weaker emotional cues. Climate action improves when decisions focus on systemic risk, not only what is most visually dramatic.',
      },
    ],
  },
  {
    id: 'phase3',
    question: 'Decision 3: Responsibility Attribution',
    description: 'Assign primary responsibility:',
    options: [
      {
        label: 'Individuals',
        value: 'individuals',
        explanation:
          'Attribution Bias: You assigned responsibility at the individual level, a pattern where personal action is overweighted relative to structural forces. In climate behavior, this can dilute pressure on major institutional emitters and policy levers.',
      },
      {
        label: 'Corporations & Governments',
        value: 'systems',
        explanation:
          'Attribution Bias Resistance: You prioritized systemic responsibility, aligning with emissions concentration across institutions. Climate outcomes improve when accountability tracks where decision power and emissions scale are highest.',
      },
    ],
  },
];

export const PHASE_DESCRIPTIONS: Record<string, { title: string; icon: string }> =
  {
    phase1: { title: 'Temporal Discounting', icon: '⏰' },
    phase2: { title: 'Visibility Bias', icon: '👁️' },
    phase3: { title: 'Responsibility Attribution', icon: '🎯' },
  };

export const SCREEN_ORDER = [
  'landing',
  'phase1',
  'phase1-reveal',
  'phase2',
  'phase2-reveal',
  'phase3',
  'phase3-reveal',
  'results',
  'why-matters',
  'final',
];
