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
  {
    id: 'phase4',
    question: 'Decision 4: Personal Climate Risk',
    description: 'Who will be more affected by climate change in the next 20 years?',
    options: [
      {
        label: 'People in other countries',
        value: 'other-countries',
        explanation:
          'Optimism Bias: You distanced climate risk from your own life, a pattern where people believe negative outcomes are more likely to affect others than themselves. This lowers perceived personal urgency and weakens support for immediate action.',
      },
      {
        label: 'Future generations',
        value: 'future-generations',
        explanation:
          'Optimism Bias: You shifted the impact into the future, reflecting a tendency to believe serious harm will affect later groups more than you. This can reduce near-term commitment to climate decisions that require present effort.',
      },
      {
        label: 'Me personally',
        value: 'me-personally',
        explanation:
          'Optimism Bias Resistance: You acknowledged personal exposure to climate risk instead of externalizing it. Recognizing direct vulnerability often increases willingness to support both personal behavior shifts and policy-level responses.',
      },
    ],
  },
  {
    id: 'phase5',
    question: 'Decision 5: Climate Action Impact',
    description: 'Which action has the most impact on climate change?',
    options: [
      {
        label: 'Using metal straws',
        value: 'metal-straws',
        explanation:
          'Single Action Bias: You selected a visible, manageable action. This bias appears when one symbolic step reduces motivation to pursue larger interventions, creating a sense of progress while high-impact systems remain mostly unchanged.',
      },
      {
        label: 'Recycling regularly',
        value: 'recycling',
        explanation:
          'Single Action Bias: You chose a familiar individual habit, which can become a stopping point rather than a starting point. In climate behavior, one small action may provide moral completion and reduce pressure for broader structural change.',
      },
      {
        label: 'Reducing flying / systemic policy change',
        value: 'systemic-change',
        explanation:
          'Single Action Bias Resistance: You prioritized a high-impact systemic lever over symbolic actions alone. Climate progress is strongest when personal choices are paired with policy and infrastructure shifts that change emissions at scale.',
      },
    ],
  },
];

export const PHASE_DESCRIPTIONS: Record<string, { title: string; icon: string }> =
  {
    phase1: { title: 'Temporal Discounting', icon: '⏰' },
    phase2: { title: 'Visibility Bias', icon: '👁️' },
    phase3: { title: 'Responsibility Attribution', icon: '🎯' },
    phase4: { title: 'Optimism Bias', icon: '🌍' },
    phase5: { title: 'Single Action Bias', icon: '⚖️' },
  };

export const SCREEN_ORDER = [
  'landing',
  'phase1',
  'phase1-reveal',
  'phase2',
  'phase2-reveal',
  'phase3',
  'phase3-reveal',
  'phase4',
  'phase4-reveal',
  'phase5',
  'phase5-reveal',
  'results',
  'why-matters',
  'final',
  'thank-you',
];
