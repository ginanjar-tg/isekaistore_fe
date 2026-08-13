# Isekai Store Anime Episode Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current dark commerce-like interface with a bright, chaotic anime episode built around comic scenes, item discovery, optional audio, and a personalized loadout reveal.

**Architecture:** Remove Swiper and cart/checkout state from the home experience. A single client-side `EpisodeController` owns a finite scene state machine and passes focused props to five scene components. CSS provides the manga layout, transitions, paper texture, halftone, impact effects, and responsive comic composition.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, next/font, native HTML audio, Vitest, ESLint.

## Global Constraints

- Existing images are optional references, not design constraints.
- The experience has no prices, gold, rarity, checkout, purchase, or gambling-like reward mechanics.
- Primary surface is warm paper `#FFF8EA`; permanent dark glass panels and permanent glows are removed.
- Palette: ink `#151522`, vermilion `#FF4F3D`, electric blue `#315CFF`, acid lemon `#E4FF45`, anime violet `#9B5CFF`, soft peach `#FFC9A9`, dark navy `#10152B`.
- Typography: Bungee for impact titles, Space Grotesk for readable UI, Caveat for annotations.
- Audio is optional, starts only after `BEGIN ADVENTURE`, and missing files must not break the UI.
- Do not run `npm run dev` or `npm run build`; verify with `npm run typecheck`, `npm run lint`, and `npm run test`.
- Keep TypeScript strict and respect `prefers-reduced-motion`.

---

### Task 1: Replace the Design Foundation

**Files:**
- Modify: `package.json`, `app/layout.tsx`, `app/globals.css`
- Delete: `components/Preloader.tsx`, `components/EmberField.tsx`, `components/FantasyButton.tsx`, `components/Typewriter.tsx`, `components/GateSlide.tsx`, `components/WelcomeSlide.tsx`, `components/ShopSlide.tsx`, `components/CartDrawer.tsx`, `components/Checkout.tsx`, `lib/cart.ts`, `lib/dialogue.ts`, `lib/items.ts`, `lib/random.ts`, `tests/cart.test.ts`

**Interfaces:**
- Fonts expose CSS variables `--font-bungee`, `--font-space`, and `--font-caveat`.
- Global classes expose `.paper-canvas`, `.ink-panel`, `.comic-shadow`, `.halftone`, `.scene-enter`, `.sticker-wobble`, `.impact-text`, `.reduced-motion-safe`.

- [ ] Update dependencies by removing `swiper` and retaining only packages still used by the new app. Keep `react-icons` only if a replacement icon is genuinely needed.
- [ ] Replace `next/font` imports with `Bungee`, `Space_Grotesk`, and `Caveat`.
- [ ] Replace the dark/gold theme with the exact paper/ink/action palette in the global constraints.
- [ ] Add CSS keyframes for panel slam, ink spread, sticker wobble, speed lines, speech pop, item impact, paper shuffle, and reduced-motion overrides.
- [ ] Keep film grain subtle, but replace the old gold glass `.panel` and `.gold-text` styles.
- [ ] Verify with `npm run typecheck`, `npm run lint`, and `npm run test`.
- [ ] Commit: `replace dark fantasy theme with comic episode foundation`.

---

### Task 2: Add Episode Data and State Machine

**Files:**
- Create: `lib/episode.ts`, `lib/episodeReducer.ts`, `tests/episode.test.ts`
- Delete: any remaining cart test/data imports from removed files

**Interfaces:**

```ts
export type Scene = "intro" | "portal" | "counter" | "discovery" | "reveal"
export type DialoguePath = "reckless" | "responsible"
export type PortalChoice = "kick" | "knock"
export type Accent = "red" | "blue" | "yellow" | "violet" | "peach"

export interface EpisodeItem {
  id: number
  name: string
  hook: string
  lore: string
  bestUsedWhen: string
  trait: string
  image: string
  accent: Accent
  loadoutTitle: string
  role: string
  survivalLine: string
}

export interface EpisodeState {
  scene: Scene
  dialoguePath: DialoguePath | null
  portalChoice: PortalChoice | null
  selectedItemId: number | null
  inspectedItemIds: number[]
  audioEnabled: boolean
}

export type EpisodeAction =
  | { type: "begin" }
  | { type: "choosePortal"; choice: PortalChoice }
  | { type: "chooseDialogue"; path: DialoguePath }
  | { type: "inspectItem"; itemId: number }
  | { type: "selectItem"; itemId: number }
  | { type: "toReveal" }
  | { type: "toggleAudio" }
  | { type: "reset" }

export const INITIAL_EPISODE_STATE: EpisodeState
export function episodeReducer(state: EpisodeState, action: EpisodeAction): EpisodeState
```

- [ ] Write failing reducer tests for every scene transition, inspection deduplication, selection, audio toggling, and reset.
- [ ] Run `npm run test`; expected failure is missing `lib/episodeReducer`.
- [ ] Add six story-rich items with no price, rarity, or power fields. Use public paths so new art can replace files without changing TypeScript.
- [ ] Add branch-specific dialogue and loadout quote data.
- [ ] Implement the reducer with finite, explicit transitions. Invalid actions must return the existing state unchanged.
- [ ] Run `npm run test`; all reducer tests must pass with clean output.
- [ ] Run `npm run typecheck` and `npm run lint`.
- [ ] Commit: `add anime episode data and state machine`.

---

### Task 3: Build Comic UI Primitives and Audio

**Files:**
- Create: `components/comic/ComicPanel.tsx`, `components/comic/SceneButton.tsx`, `components/comic/SpeechBubble.tsx`, `components/comic/Sticker.tsx`, `components/ChapterRail.tsx`, `components/AudioController.tsx`

**Interfaces:**

```tsx
<ComicPanel tone="paper|blue|peach|ink" rotate="left|right|none" className="">
  {children}
</ComicPanel>

<SceneButton variant="primary|secondary|text" onClick={handler}>
  {children}
</SceneButton>

<SpeechBubble side="left|right" mood="excited|deadpan|panic">
  {children}
</SpeechBubble>

<Sticker label="KRAK!" color="red|blue|yellow|violet" />

<ChapterRail scene={scene} onSelect={optionalHandler} />

<AudioController enabled={audioEnabled} onToggle={toggleAudio} started={started} />
```

- [ ] Build primitives with thick ink borders, rough shadows, paper surfaces, and keyboard-visible focus states.
- [ ] Make rotation and tone props class-driven, not inline one-off styles.
- [ ] Mark purely decorative shapes `aria-hidden`.
- [ ] Implement audio with one looping theme and one-shot effect paths under `/audio`; call `.play()` only after `started` becomes true; catch rejected playback promises; expose a mute button.
- [ ] Add a visible fallback state when audio files are absent or unavailable.
- [ ] Verify typecheck/lint/tests.
- [ ] Commit: `add comic primitives and optional audio controller`.

---

### Task 4: Implement Episode Scenes

**Files:**
- Create: `components/EpisodeIntro.tsx`, `components/PortalScene.tsx`, `components/CounterScene.tsx`, `components/DiscoveryScene.tsx`, `components/LoadoutReveal.tsx`

**Interfaces:**

```tsx
<EpisodeIntro onBegin={() => void} audioEnabled={boolean} onToggleAudio={() => void} />
<PortalScene choice={PortalChoice | null} onChoose={(choice) => void} onContinue={() => void} />
<CounterScene path={DialoguePath | null} onChoosePath={(path) => void} onContinue={() => void} />
<DiscoveryScene inspectedIds={number[]} selectedId={number | null} onInspect={(id) => void} onSelect={(id) => void} onContinue={() => void} />
<LoadoutReveal item={EpisodeItem} path={DialoguePath} onReset={() => void} onExplore={() => void} />
```

- [ ] Build `EpisodeIntro` as a paper title page with transmission stamp, oversized episode title, short setup copy, and one decisive `BEGIN ADVENTURE` action.
- [ ] Build `PortalScene` as an asymmetrical splash page with impact typography, speed lines, speech bubbles, and two entrance choices. Use temporary existing art only as a replaceable fallback.
- [ ] Build `CounterScene` with a large character area, speech bubble sequence, explicit next action, and two personality choices. Do not use timers or auto-advance.
- [ ] Build `DiscoveryScene` as a scattered responsive item spread. Selecting an item opens its lore in a larger panel and changes the `PACK THIS` action state. Inspected items receive a visual mark without becoming a reward meter.
- [ ] Build `LoadoutReveal` as a screenshot-friendly poster with item, role, title, survival line, selected path quote, restart, and explore actions.
- [ ] Add `prefers-reduced-motion` behavior to scene transitions and item reveals.
- [ ] Verify typecheck/lint/tests.
- [ ] Commit: `build the anime episode scenes`.

---

### Task 5: Wire the Controller and Chapter Navigation

**Files:**
- Create: `components/EpisodeController.tsx`
- Modify: `app/page.tsx`

**Interfaces:**

```tsx
<EpisodeController />
```

- [ ] Replace `app/page.tsx` with a minimal server-safe shell rendering `EpisodeController`.
- [ ] Use `useReducer(episodeReducer, INITIAL_EPISODE_STATE)` in `EpisodeController`.
- [ ] Render exactly one active scene at a time and apply a scene transition key based on `state.scene`.
- [ ] Render `ChapterRail` for counter context and scene progress; chapter navigation may only move to already-unlocked scenes.
- [ ] Dispatch audio start/toggle at the intro boundary and pass state to every scene.
- [ ] Ensure reset clears selection, inspected items, branch choice, portal choice, and audio state while returning to intro.
- [ ] Verify typecheck/lint/tests.
- [ ] Commit: `wire the episode controller and chapter rail`.

---

### Task 6: Replace 404, Add Asset Brief, and Refresh Documentation

**Files:**
- Modify: `app/not-found.tsx`, `app/layout.tsx`, `README.md`
- Create: `docs/assets/isekaistore-anime-asset-brief.md`

- [ ] Redesign 404 as a comic “wrong dimension” page using paper, ink, impact text, and a route back to the episode.
- [ ] Update metadata to the new episode premise and remove outdated “magical shop beyond the gate” copy.
- [ ] Document exact replacement asset specifications and optional audio filenames in the asset brief.
- [ ] Update README with the new episode flow and scripts.
- [ ] Verify typecheck/lint/tests.
- [ ] Commit: `finish the anime episode documentation and 404`.

---

### Task 7: Final Verification and Single-Commit Integration

**Files:** none beyond any fixes discovered during verification

- [ ] Run `npm run typecheck`.
- [ ] Run `npm run lint` with zero warnings.
- [ ] Run `npm run test` with all tests passing and no warnings.
- [ ] Review the diff for leftover commerce language (`gold`, `rarity`, `checkout`, `purchase`, `cart`, `power`) in active UI/data files; remove any accidental leftovers.
- [ ] Review responsive classes for desktop and mobile layouts.
- [ ] Review keyboard labels, focus states, reduced-motion behavior, and audio fallback.
- [ ] Squash implementation commits into one commit on `main`: `redesign isekaistore as an anime adventure episode`.
