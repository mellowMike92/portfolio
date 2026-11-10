# Implementation Plan: AI-Powered Performance & Feedback Synthesizer

Build a 0→1 full-stack web application in Next.js 14 that ingests unstructured multi-reviewer peer feedback, parses performance insights using Claude 3.5 Sonnet with Zod schema enforcement, and streams actionable 1-on-1 coaching rubrics to managers in real time.

---

## Technical Requirements & Stack

- **Framework & Language:** Next.js 14 (App Router), TypeScript (Strict Mode)
- **Styling & UI:** Tailwind CSS, Lucide Icons (`lucide-react`)
- **LLM Integration:** Anthropic SDK (`@anthropic-ai/sdk`) using Claude 3.5 Sonnet & Tool Use / JSON Schema enforcement
- **Validation:** Zod (`zod`)
- **Streaming:** Server-Sent Events (SSE) / `ReadableStream` via Next.js Route Handlers
- **Repository Name:** `ai-feedback-synthesizer`

---

## Step 1: Project Setup & Dependencies

1. Initialize a Next.js 14 App Router project with TypeScript and Tailwind CSS:
   ```bash
   npx create-next-app@latest ai-feedback-synthesizer --typescript --tailwind --app --eslint
   ```
2. Install required packages:
   ```bash
   npm install @anthropic-ai/sdk zod lucide-react clsx tailwind-merge
   ```
3. Configure `.env.local` with required environment variables:
   ```env
   ANTHROPIC_API_KEY=your_api_key_here
   ```

---

## Step 2: Schema Definitions & Types

Create `src/types/feedback.ts` to enforce structured feedback contracts via Zod:

1. **Input Schema (`FeedbackInputSchema`):**
   - `employeeName` (string)
   - `role` (string)
   - `department` (string)
   - `peerFeedbackNotes` (array of raw text notes from multiple reviewers)
   - `desiredTone` (enum: `Direct`, `Empathetic`, `Executive`, `Growth_Oriented`)

2. **Output Schema (`SynthesizedFeedbackSchema`):**
   - `executiveSummary` (string)
   - `topStrengths` (array of `{ category: string, evidence: string, impact: string }`)
   - `growthAreas` (array of `{ area: string, feedbackSynthesis: string, recommendation: string }`)
   - `actionableGoals` (array of `{ goal: string, timeframe: '30_Days' | '60_Days' | '90_Days', metric: string }`)
   - `coachingTalkingPoints` (array of string prompts for manager 1-on-1)

---

## Step 3: Streaming API Route Implementation

Create `src/app/api/synthesize/route.ts`:

1. Set runtime configuration:
   ```typescript
   export const runtime = 'nodejs';
   ```
2. Validate incoming JSON request body against `FeedbackInputSchema`.
3. Call Anthropic API (`anthropic.messages.stream`) using Claude 3.5 Sonnet:
   - Provide system prompt setting context as an executive HR talent lead and performance coach.
   - Use tool use (`tools`) with `SynthesizedFeedbackSchema` as the JSON schema definition to force clean output.
4. Transform the API stream into a `ReadableStream` yielding Server-Sent Events (SSE) back to the client UI.

---

## Step 4: Frontend UI Components

1. **`app/page.tsx` (Main Layout & Dashboard State):**
   - Manage wizard steps: `1. Input Feedback` -> `2. Synthesizing` -> `3. Manager Review & Export`.
2. **`src/components/FeedbackInputForm.tsx`:**
   - Multi-reviewer input card allowing adding/removing dynamic text areas for raw peer notes.
   - Dropdown selectors for employee role, department, and desired coaching tone.
3. **`src/components/StreamingSynthesisView.tsx`:**
   - Real-time terminal/card component displaying incoming streamed JSON payload as it populates.
   - Animated status indicators (Extracting Strengths -> Mapping Growth Areas -> Generating 30-60-90 Goals).
4. **`src/components/ManagerReviewDashboard.tsx`:**
   - Interactive review panel displaying synthesized strengths, growth areas, and 30-60-90 day goals in editable cards.
   - Action toolbar allowing inline editing, tone adjustments, and one-click copy/export to Markdown or PDF.

---

## Step 5: Verification & Testing

1. Run local development server (`npm run dev`).
2. Test end-to-end flow with sample unstructured feedback notes from 3 distinct peers.
3. Verify structured JSON output adheres strictly to Zod type bounds without truncation.
4. Execute static production build: `npm run build`.
