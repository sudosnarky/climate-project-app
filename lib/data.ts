import { ExperimentPhase } from './types';

export const PHASES: ExperimentPhase[] = [
  {
    id: 'phase1',
    question: 'The Future of Money',
    description: 'Choose your reward:',
    options: [
      {
        label: '₹500 today',
        value: 'immediate',
        explanation:
          'You chose immediate gratification. This bias—temporal discounting—delays climate action globally. We prioritize short-term comfort over long-term survival.',
      },
      {
        label: '₹2000 in 1 year',
        value: 'delayed',
        explanation:
          'You chose delayed gratification. Yet most humans choose the immediate reward. This same bias drives inaction on climate: we ignore future catastrophe for present convenience.',
      },
    ],
  },
  {
    id: 'phase2',
    question: 'What Threatens Us Most?',
    description: 'Select the greater danger:',
    options: [
      {
        label: 'Visible Disasters (Floods)',
        value: 'visible',
        explanation:
          'Floods are dramatic and visible. But gradual CO₂ rise is slower, invisible, harder to fear. We evolved to fear what we see. Climate change is silent.',
      },
      {
        label: 'Invisible Threats (CO₂)',
        value: 'invisible',
        explanation:
          'You recognized the slow catastrophe. Yet most people worry about disasters, not invisible gases. Our brains are wired to ignore creeping threats.',
      },
    ],
  },
  {
    id: 'phase3',
    question: 'Who Bears Responsibility?',
    description: 'Where should the blame fall?',
    options: [
      {
        label: 'Individuals',
        value: 'individuals',
        explanation:
          'Many think individual choices matter most. But here is the truth: just 100 corporations produce 71% of global emissions since 1988. The system, not you, is the problem.',
      },
      {
        label: 'Corporations & Governments',
        value: 'systems',
        explanation:
          'You understood the structural reality. Yet this knowledge is suppressed by narratives of personal responsibility. Blame is a distraction from accountability.',
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
  'final',
];
