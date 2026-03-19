# You Can't Fool the Climate, But Your Mind Can

A 3-minute interactive behavioral experiment that demonstrates how cognitive biases distort climate-related judgment and action.

## Overview

This is a production-ready single-page app built with Next.js, TypeScript, Tailwind CSS, and Firebase Realtime Database.

The experience guides participants through five bias phases, then shows real-time aggregate response patterns, followed by a meta-insight and reflection flow.

## Key Features

- Five interactive phases tied to well-known cognitive biases.
- Real-time aggregate charts across participants via Firebase Realtime Database.
- Consistent phase pattern: decision -> reveal -> climate link.
- Mobile-first responsive design with accessible interactions.
- No personal data collection beyond anonymous response events.

## Phase Map

1. Temporal Discounting (Time)
2. Availability Heuristic (Risk Salience)
3. Attribution Bias (Responsibility)
4. Optimism Bias (Personal Risk)
5. Single Action Bias (Action Scope)

## User Flow

1. Landing
2. Phase 1
3. Phase 1 Reveal
4. Phase 2
5. Phase 2 Reveal
6. Phase 3
7. Phase 3 Reveal
8. Phase 4
9. Phase 4 Reveal
10. Phase 5
11. Phase 5 Reveal
12. Data Visualization
13. Why This Matters
14. Final Reflection
15. Thank You

## Tech Stack

- Framework: Next.js 16 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- Data: Firebase Realtime Database
- State: React hooks + localStorage session persistence

## Setup

### Prerequisites

- Node.js 18+
- npm
- Firebase project

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment

Create `.env.local` with:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your_project-default-rtdb.firebaseio.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 3) Run locally

```bash
npm run dev
```

Open <http://localhost:3000>.

### 4) Build and run production

```bash
npm run build
npm run start
```

## Firebase Notes

- Enable Realtime Database in your Firebase project.
- Test mode is acceptable during development.
- Harden rules before production launch.

## Project Structure

```text
app/
  globals.css
  layout.tsx
  page.tsx
components/
  DataVisualization.tsx
  ExperimentPhase.tsx
  FinalScreen.tsx
  Landing.tsx
  ProgressBar.tsx
  ResultReveal.tsx
  ThankYouScreen.tsx
  WhyThisMatters.tsx
lib/
  data.ts
  firebase.ts
  types.ts
```

## Core Architecture

- `lib/data.ts` is the source of truth for phases, metadata, and screen order.
- `app/page.tsx` controls finite-screen navigation and phase/reveal rendering.
- `components/DataVisualization.tsx` renders aggregate bars dynamically from `PHASES`.
- `lib/firebase.ts` aggregates anonymous responses in real time.

## Customization

- Update prompts/options/explanations in `lib/data.ts`.
- Update visual styling tokens in `app/globals.css` and `tailwind.config.ts`.
- Add or remove phases by editing `PHASES`, `PHASE_DESCRIPTIONS`, and `SCREEN_ORDER` together.

## Accessibility

- Keyboard-focusable choices and controls.
- Visible focus rings and high-contrast dark theme.
- Responsive layout across desktop and mobile.

## License

Open source for educational use.
